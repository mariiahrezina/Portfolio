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
      '<a class="nav-mobile-link js-mob-mentorship" href="#">mentor</a>' +
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
        window.location.href = '/#work';
      }
    });

    menu.querySelector('.js-mob-about')?.addEventListener('click', function (e) {
      e.preventDefault();
      closeMobileMenu();
      if (isHome) {
        scrollToEl(document.getElementById('about'));
      } else {
        window.location.href = '/#about';
      }
    });

    menu.querySelector('.js-mob-mentorship')?.addEventListener('click', function (e) {
      e.preventDefault();
      closeMobileMenu();
      if (isHome) {
        holdActive('.js-nav-mentorship');
        scrollToEl(document.getElementById('mentorship'));
      } else {
        window.location.href = '/#mentorship';
      }
    });

    menu.querySelector('.js-mob-contacts')?.addEventListener('click', function (e) {
      e.preventDefault();
      closeMobileMenu();
      holdActive('.js-nav-contacts');
      scrollToEl(document.querySelector('.footer'));
    });
  }

  // ── CLICK HOLD ───────────────────────────────────────────────────────
  // Mentorship is the last section, so the page can't scroll far enough to
  // bring it to the top: "mentorship" and "contacts" both land at the very
  // bottom. After a nav click we keep the clicked item underlined until the
  // smooth scroll settles and the visitor scrolls on their own.
  var held = null;        // selector kept active after a click
  var settling = false;   // true while the click-triggered scroll is running
  var settleTimer = null;

  function holdActive(selector) {
    if (!isHome) return;
    held = selector;
    settling = true;
    setActive(selector);
    clearTimeout(settleTimer);
    settleTimer = setTimeout(function () { settling = false; }, 900);
  }

  function onScrollForHold() {
    if (!held) return;
    if (settling) {
      // still animating: push the settle point back until scrolling stops
      clearTimeout(settleTimer);
      settleTimer = setTimeout(function () { settling = false; }, 150);
      return;
    }
    held = null;          // a scroll after settling = the visitor scrolled
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
        window.location.href = '/#work';
      }
    });

    document.querySelector('#nav .js-nav-about')?.addEventListener('click', function (e) {
      e.preventDefault();
      if (isHome) {
        scrollToEl(document.getElementById('about'));
      } else {
        window.location.href = '/#about';
      }
    });

    document.querySelector('#nav .js-nav-mentorship')?.addEventListener('click', function (e) {
      e.preventDefault();
      if (isHome) {
        holdActive('.js-nav-mentorship');
        scrollToEl(document.getElementById('mentorship'));
      } else {
        window.location.href = '/#mentorship';
      }
    });

    document.querySelector('#nav .js-nav-contacts')?.addEventListener('click', function (e) {
      e.preventDefault();
      holdActive('.js-nav-contacts');
      scrollToEl(document.querySelector('.footer'));
    });

    // ── ACTIVE STATES: home page only ───────────────────────────────
    if (!isHome) return;

    var workEl       = document.getElementById('work');
    var aboutEl      = document.getElementById('about');
    var mentorshipEl = document.getElementById('mentorship');
    var footerEl     = document.querySelector('.footer');
    var intersecting = new Map();

    function atPageBottom() {
      return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    }

    // A section becomes active once its top rises above 60% of the screen,
    // so it doesn't light up while the previous section still fills the view
    var sections = [
      [workEl,       '.js-nav-works'],
      [aboutEl,      '.js-nav-about'],
      [mentorshipEl, '.js-nav-mentorship']
    ];

    function applyActive() {
      if (held) { setActive(held); return; }
      if (window.scrollY < 80) { setActive(null); return; }
      // The footer is visible together with Mentorship, so "contacts" only
      // wins once the page is scrolled all the way down
      if (intersecting.get(footerEl) && atPageBottom()) { setActive('.js-nav-contacts'); return; }
      var line = window.innerHeight * 0.6;
      var current = null;
      sections.forEach(function (s) {
        if (s[0] && s[0].getBoundingClientRect().top <= line) current = s[1];
      });
      setActive(current);
    }

    var navEl      = document.getElementById('nav');
    var rootMargin = '-' + (navEl ? navEl.offsetHeight : 64) + 'px 0px 0px 0px';

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { intersecting.set(e.target, e.isIntersecting); });
      applyActive();
    }, { rootMargin: rootMargin, threshold: 0 });

    [workEl, aboutEl, mentorshipEl, footerEl].forEach(function (el) { if (el) obs.observe(el); });

    window.addEventListener('scroll', function () {
      onScrollForHold();
      applyActive();
    }, { passive: true });

    // Handle hash on direct load (arriving via /#work from another page)
    if (window.location.hash) {
      setTimeout(function () {
        var target = document.querySelector(window.location.hash);
        if (window.location.hash === '#mentorship') holdActive('.js-nav-mentorship');
        if (target) scrollToEl(target);
      }, 50);
    }

  });

})();
