/* Lightweight, robust mobile menu toggle. */

function initMobileMenuToggle() {
  const mobileBtn = document.getElementById('mobile-menu-button');
  const nav = document.getElementById('main-navigation') || document.querySelector('.rulenav');
  const overlay = document.getElementById('mobile-nav-overlay');

  if (!mobileBtn || !nav) return;
  if (mobileBtn.dataset.menuInit) return;
  mobileBtn.dataset.menuInit = '1';

  function setOpen(open) {
    const doOpen = !!open;
    mobileBtn.classList.toggle('open', doOpen);
    nav.classList.toggle('mobile-menu-open', doOpen);
    document.body.classList.toggle('mobile-menu-open', doOpen);
    if (overlay) overlay.classList.toggle('visible', doOpen);
    mobileBtn.setAttribute('aria-expanded', doOpen ? 'true' : 'false');
  }

  function toggle() { setOpen(!mobileBtn.classList.contains('open')); }

  // Single, unified activation handler: prefer Pointer Events to avoid
  // duplicate touch+click events that required double-tap previously.
  function buttonActivateHandler(e) {
    try { if (e && typeof e.preventDefault === 'function') e.preventDefault(); } catch (err) {}
    toggle();
  }

  if (window.PointerEvent) {
    mobileBtn.addEventListener('pointerup', buttonActivateHandler);
  } else {
    mobileBtn.addEventListener('click', buttonActivateHandler);
    mobileBtn.addEventListener('touchend', function (e) { e.preventDefault(); buttonActivateHandler(e); }, { passive: false });
  }

  // Keyboard activation (Enter / Space) for accessibility
  mobileBtn.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  });

  if (overlay) overlay.addEventListener('click', function () { setOpen(false); });

  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && mobileBtn.classList.contains('open')) setOpen(false); });

  nav.addEventListener('click', function (e) {
    const a = e.target.closest && e.target.closest('a');
    if (!a) return;
    if (window.innerWidth <= 900 && mobileBtn.classList.contains('open')) setOpen(false);
  });

  // public API
  window.setMobileMenuOpen = setOpen;
  window.toggleMobileMenu = toggle;

  // start closed
  setOpen(false);
}

// Init on DOM ready
function disableCopyAndSelection() {
  document.addEventListener('selectstart', function (e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
  });
  document.addEventListener('copy', function (e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
  });
  document.addEventListener('cut', function (e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
  });
  document.addEventListener('contextmenu', function (e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
  });
  document.addEventListener('dragstart', function (e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
  });
}

function initTopbarHide() {
  const topbar = document.querySelector('.topbar');
  if (!topbar) return;

  if (topbar.dataset.topbarInit === '1') return;
  topbar.dataset.topbarInit = '1';

  function updateTopbarVisibility() {
    const currentScrollY = window.scrollY;
    const shouldHide = currentScrollY > 40;

    topbar.style.display = shouldHide ? 'none' : 'block';
    topbar.classList.toggle('is-hidden', shouldHide);
    document.body.classList.toggle('topbar-hidden', shouldHide);
  }

  updateTopbarVisibility();
  window.addEventListener('scroll', updateTopbarVisibility, { passive: true });
}

document.addEventListener('DOMContentLoaded', function () {
  document.body.classList.remove('preload');
  disableCopyAndSelection();
  try { initMobileMenuToggle(); } catch (e) { /* noop */ }
  try { initTopbarHide(); } catch (e) { /* noop */ }

  // progressive enhancement: swap hero image for video if provided
  setTimeout(function () {
    try {
      const img = document.getElementById('dtm-image');
      const video = document.getElementById('dtm-video');
      if (img && video) {
        img.style.display = 'none';
        video.style.display = 'block';
        video.play().catch(function () {});
      }
    } catch (err) { /* ignore */ }
  }, 2000);
});
