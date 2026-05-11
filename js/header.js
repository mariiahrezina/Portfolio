// ================================================
// HEADER — global navigation behavior
// ================================================
(function () {
  'use strict';

  var p      = window.location.pathname;
  var isHome = p === '/' || p === '/index.html' || p.endsWith('/index.html');

  // Scroll element into view, offset by fixed nav via scroll-padding-top
  function scrollToEl(el) {
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Activate a single desktop nav link; null clears all
  function setActive(selector) {
    document.querySelectorAll('#nav .nav-link').forEach(function (l) {
      l.classList.remove('active');
    });
    if (selector) {
      document.querySelector('#nav ' + selector)?.classList.add('active');
    }
  }

  // ── MOBILE MENU HELPERS ──────────────────────────────────────────────
  function closeMobileMenu() {
    var menu   = document.getElementById('navMobileMenu');
    var burger = document.getElementById('navBurger');
    if (!menu || !burger) return;
    menu.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Menu');
  }

  // ── INJECT MOBILE UI ─────────────────────────────────────────────────
  // Burger button and dropdown are created once and shared across all pages
  function injectMobileNav() {
    var nav = document.getElementById('nav');
    if (!nav) return;

    // Burger button (appended inside nav, floats right via space-between)
    var burger = document.createElement('button');
    burger.className = 'nav-burger';
    burger.id        = 'navBurger';
    burger.setAttribute('aria-label', 'Menu');
    burger.setAttribute('aria-expanded', 'false');
    burger.innerHTML =
      '<span class="nav-burger-line"></span>' +
      '<span class="nav-burger-line"></span>' +
      '<span class="nav-burger-line"></span>';
    nav.appendChild(burger);

    // Dropdown menu (inserted immediately after nav in the DOM)
    var menu = document.createElement('div');
    menu.className = 'nav-mobile-menu';
    menu.id        = 'navMobileMenu';
    menu.innerHTML =
      '<a class="nav-mobile-link js-mob-works"    href="#">work</a>'    +
      '<a class="nav-mobile-link js-mob-about"    href="#">about</a>'   +
      '<a class="nav-mobile-link js-mob-cv"       href="https://drive.google.com/file/d/1klCs2PK-_KOJNL5gTzBldAoeOR_LEwvj/view?usp=sharing" target="_blank" rel="noopener noreferrer">cv</a>' +
      '<a class="nav-mobile-link js-mob-contacts" href="#">contacts</a>';
    nav.parentNode.insertBefore(menu, nav.nextSibling);

    // Toggle open/close
    burger.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('is-open');
      burger.classList.toggle('is-open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
      burger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Menu');
    });

    // Close on outside tap
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !menu.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // ── MOBILE LINK NAVIGATION ───────────────────────────────────────
    menu.querySelector('.js-mob-works')?.addEventListener('click', function (e) {
      e.preventDefault();
      closeMobileMenu();
      if (isHome) {
        scrollToEl(document.getElementById('work'));
      } else {
        window.location.href = 'index.html#work';
      }
    });

    menu.querySelector('.js-mob-about')?.addEventListener('click', function (e) {
      e.preventDefault();
      closeMobileMenu();
      if (isHome) {
        scrollToEl(document.getElementById('about'));
      } else {
        window.location.href = 'index.html#about';
      }
    });

    menu.querySelector('.js-mob-contacts')?.addEventListener('click', function (e) {
      e.preventDefault();
      closeMobileMenu();
      scrollToEl(document.querySelector('.footer'));
    });

    // cv opens in new tab — just close the menu
    menu.querySelector('.js-mob-cv')?.addEventListener('click', function () {
      closeMobileMenu();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {

    injectMobileNav();

    // ── DESKTOP CLICK HANDLERS ───────────────────────────────────────

    document.querySelector('#nav .js-nav-home')?.addEventListener('click', function (e) {
      if (isHome) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    document.querySelector('#nav .js-nav-works')?.addEventListener('click', function (e) {
      e.preventDefault();
      if (isHome) {
        scrollToEl(document.getElementById('work'));
      } else {
        window.location.href = 'index.html#work';
      }
    });

    document.querySelector('#nav .js-nav-about')?.addEventListener('click', function (e) {
      e.preventDefault();
      if (isHome) {
        scrollToEl(document.getElementById('about'));
      } else {
        window.location.href = 'index.html#about';
      }
    });

    document.querySelector('#nav .js-nav-contacts')?.addEventListener('click', function (e) {
      e.preventDefault();
      scrollToEl(document.querySelector('.footer'));
    });

    // ── ACTIVE STATES: home page only ───────────────────────────────
    if (!isHome) return;

    var workEl   = document.getElementById('work');
    var aboutEl  = document.getElementById('about');
    var footerEl = document.querySelector('.footer');
    var intersecting = new Map();

    function applyActive() {
      if (window.scrollY < 80) { setActive(null); return; }
      if (intersecting.get(footerEl)) { setActive('.js-nav-contacts'); return; }
      if (intersecting.get(aboutEl))  { setActive('.js-nav-about');    return; }
      if (intersecting.get(workEl))   { setActive('.js-nav-works');    return; }
      setActive(null);
    }

    var navEl      = document.getElementById('nav');
    var rootMargin = '-' + (navEl ? navEl.offsetHeight : 64) + 'px 0px 0px 0px';

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { intersecting.set(e.target, e.isIntersecting); });
      applyActive();
    }, { rootMargin: rootMargin, threshold: 0 });

    [workEl, aboutEl, footerEl].forEach(function (el) { if (el) obs.observe(el); });

    window.addEventListener('scroll', applyActive, { passive: true });

    // Handle hash on direct load (arriving via index.html#work from another page)
    if (window.location.hash) {
      setTimeout(function () {
        var target = document.querySelector(window.location.hash);
        if (target) scrollToEl(target);
      }, 50);
    }

  });

})();
