/* Lightweight, resilient menu and UI init. Uses delegation, caches elements and avoids layout thrashing. */
document.addEventListener('DOMContentLoaded', function () {
  document.body.classList.remove('preload');

  function initMobileMenuToggle() {
    const mobileBtn = document.getElementById('mobile-menu-button');
    const nav = document.getElementById('main-navigation') || document.querySelector('.rulenav');
    const overlay = document.getElementById('mobile-nav-overlay');

    if (!mobileBtn || !nav) return;
    if (mobileBtn.dataset.menuInit) return;
    mobileBtn.dataset.menuInit = '1';

    function setMenuOpen(open) {
      const isMobile = window.innerWidth <= 900;
      requestAnimationFrame(() => {
        mobileBtn.classList.toggle('open', open);
        nav.classList.toggle('mobile-menu-open', open);
        mobileBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.classList.toggle('mobile-menu-open', open);
        if (overlay) overlay.classList.toggle('visible', open);
      });
    }

    let _lastToggle = 0;
    function _handleToggleEvent(e) {
      e.preventDefault();
      const now = Date.now();
      if (now - _lastToggle < 350) return; // debounce duplicate touch/click events
      _lastToggle = now;
      const isOpen = mobileBtn.classList.contains('open');
      setMenuOpen(!isOpen);
    }

    mobileBtn.addEventListener('click', _handleToggleEvent);
    mobileBtn.addEventListener('touchstart', _handleToggleEvent, { passive: false });
    // prevent unwanted pointer interaction duplicates on some devices
    mobileBtn.addEventListener('pointerdown', function (e) {
      if (e.pointerType && e.pointerType !== 'mouse') e.preventDefault();
    });

    if (overlay) {
      overlay.addEventListener('click', function () { setMenuOpen(false); });
      if (!overlay.hasAttribute('aria-hidden')) overlay.setAttribute('aria-hidden', 'true');
    }

    // Close on escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileBtn.classList.contains('open')) setMenuOpen(false);
    });

    // Delegated click: close menu when a link inside nav is clicked (mobile)
    nav.addEventListener('click', function (e) {
      const a = e.target.closest('a');
      if (!a) return;
      if (window.innerWidth <= 900 && mobileBtn.classList.contains('open')) setMenuOpen(false);
    });

    // Keep menu state consistent on resize
    let lastMobile = window.innerWidth <= 900;
    window.addEventListener('resize', function () {
      const nowMobile = window.innerWidth <= 900;
      if (nowMobile !== lastMobile) {
        if (!nowMobile) setMenuOpen(false);
        lastMobile = nowMobile;
      }
    });

    // initial closed state
    setMenuOpen(false);

    // expose for includes/init ordering
    window.initMobileMenuToggle = initMobileMenuToggle;
  }

  try { initMobileMenuToggle(); } catch (e) { /* noop */ }

  // Optional: progressive enhancement to swap hero image for video if present
  setTimeout(function () {
    try {
      const img = document.getElementById('dtm-image');
      const video = document.getElementById('dtm-video');
      if (img && video) {
        img.style.display = 'none';
        video.style.display = 'block';
        video.play().catch(() => {});
      }
    } catch (err) { /* ignore */ }
  }, 2000);
});

// Re-initialize after includes loader signals completion
document.addEventListener('includes:loaded', function () {
  if (typeof window.initMobileMenuToggle === 'function') {
    try { window.initMobileMenuToggle(); } catch (e) { console.warn('initMobileMenuToggle failed', e); }
  }
});
