/* Lightweight, robust mobile menu toggle
   - Simple API: `setMobileMenuOpen(bool)` and `toggleMobileMenu()`
   - Works when header is injected asynchronously (MutationObserver)
   - Keeps ARIA attributes, overlay, and body locking in sync
*/

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

  mobileBtn.addEventListener('click', function (e) { e.preventDefault(); toggle(); });
  mobileBtn.addEventListener('touchstart', function (e) { e.preventDefault(); toggle(); }, { passive: false });

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
document.addEventListener('DOMContentLoaded', function () {
  document.body.classList.remove('preload');
  try { initMobileMenuToggle(); } catch (e) { /* noop */ }

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

// Re-init after include loader (if header is loaded asynchronously)
document.addEventListener('includes:loaded', function () { try { initMobileMenuToggle(); } catch (e) { /* noop */ } });

// MutationObserver fallback if header injected later
(function () {
  if (document.getElementById('mobile-menu-button') && document.getElementById('main-navigation')) {
    try { initMobileMenuToggle(); } catch (e) { /* noop */ }
    return;
  }
  var mo = new MutationObserver(function () {
    if (document.getElementById('mobile-menu-button') && document.getElementById('main-navigation')) {
      try { initMobileMenuToggle(); } catch (e) { /* noop */ }
      mo.disconnect();
    }
  });
  mo.observe(document.documentElement || document.body, { childList: true, subtree: true });
})();

/* Helper: if the menu still doesn't behave, open devtools and check
   for JS errors that stop execution before this file runs. */
