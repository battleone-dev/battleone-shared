document.addEventListener('DOMContentLoaded', function(){
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-nav');
  const brand = document.querySelector('.brand');

  const toggleNav = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
    // update accessibility
    nav.setAttribute('aria-hidden', String(!nav.classList.contains('open')));
  }; 

  // Use Pointer events when available for better touch handling
  if (window.PointerEvent) {
    toggle.addEventListener('pointerup', toggleNav);
  } else {
    toggle.addEventListener('click', toggleNav);
    toggle.addEventListener('touchend', toggleNav);
  }

  // Brand opens nav on small screens (single tap to reveal nav)
  if (brand) {
    const brandHandler = (e) => {
      if (window.innerWidth < 768) {
        if (!nav.classList.contains('open')) {
          if (e && e.preventDefault) e.preventDefault(); // prevent navigating away
          nav.classList.add('open');
          toggle.setAttribute('aria-expanded', 'true');
          nav.setAttribute('aria-hidden', 'false');
        }
      }
    };

    if (window.PointerEvent) brand.addEventListener('pointerup', brandHandler);
    else brand.addEventListener('click', brandHandler);
  }

  // Prevent clicks inside nav from closing it
  nav.addEventListener('click', (e) => e.stopPropagation());

  // Close nav on outside click/pointerup for small screens
  const closeIfOutside = (e) => {
    if (window.innerWidth < 768 && !nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');      nav.setAttribute('aria-hidden', 'true');    }
  };

  if (window.PointerEvent) {
    document.addEventListener('pointerup', closeIfOutside);
  } else {
    document.addEventListener('click', closeIfOutside);
    document.addEventListener('touchend', closeIfOutside);
  }

  // Close nav when resizing to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      nav.setAttribute('aria-hidden', 'true');
    }
  });
});
