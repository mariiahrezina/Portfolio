/*!
 * CaseSwitcher — shared infinite-loop case-preview carousel
 *
 * Usage (place after <section class="case-switcher" id="csSwitcher">):
 *   CaseSwitcher.init({ currentCase: 'optistream' });
 *
 * The component renders itself into #csSwitcher, filters out the current
 * case automatically, and loops through the rest as an infinite carousel.
 * Add future cases to ALL_CASES — every page picks them up automatically.
 */
(function (global) {
  'use strict';

  /* ── Portfolio-wide case registry ──────────────────────────────────────
     Order determines "Previous / Next" labels and carousel sequence.
     To add a new case: append an entry here; every page inherits it.
  ─────────────────────────────────────────────────────────────────────── */
  var ALL_CASES = [
    {
      id: 'storefront',
      previewSrc:            'images/e-commerce/e-commerce-preview-desktop.png',
      previewMobileSrc:      'images/e-commerce/e-commerce-preview-mobile.png',
      previewObjectPosition: 'top',
      tags: [
        { text: 'Product Designer', cls: 'tag-pink' },
        { text: 'E-commerce',       cls: 'tag-gray' },
        { text: 'Web',              cls: 'tag-gray' },
        { text: 'End-to-end',       cls: 'tag-gray' }
      ],
      title: 'Built a concert archive storefront, cutting discovery time for dedicated fans',
      href:  'case-storefront.html'
    },
    {
      id: 'getmancar',
      images: [
        { src: 'images/getmancar/after-1.png',          alt: 'Redesigned onboarding' },
        { src: 'images/getmancar/after-2.png',          alt: 'Tariff selection redesign' },
        { src: 'images/getmancar/no-cars-around-3.png', alt: 'No cars nearby solution' }
      ],
      tags: [
        { text: 'Growth Design', cls: 'tag-pink' },
        { text: 'iOS',           cls: 'tag-gray' },
        { text: 'Mobility',      cls: 'tag-gray' }
      ],
      title: 'Carsharing app — Increasing first trip conversion',
      href:  'case-getmancar.html'
    },
    {
      id: 'optistream',
      previewSrc: 'images/optiSTREAM/optistream-preview-desktop.png',
      tags: [
        { text: 'Product Design', cls: 'tag-pink' },
        { text: 'Web',            cls: 'tag-gray' },
        { text: 'Healthcare',     cls: 'tag-gray' },
        { text: 'AI',             cls: 'tag-gray' }
      ],
      title: 'Making document review faster with AI',
      href:  'case-optistream.html'
    }
  ];

  /* ── Derive "Previous case" / "Next case" label ────────────────────── */
  function labelFor(caseObj, currentIdx) {
    var idx = -1;
    for (var i = 0; i < ALL_CASES.length; i++) {
      if (ALL_CASES[i] === caseObj) { idx = i; break; }
    }
    return idx < currentIdx ? 'Previous case' : 'Next case';
  }

  /* ── Build a single <div class="cs-slide"> ─────────────────────────── */
  function buildSlide(c) {
    var slide = document.createElement('div');
    slide.className = 'cs-slide';

    /* --- thumb area --- */
    var thumb = document.createElement('div');
    thumb.className = 'cs-thumb' +
      (c.placeholder ? ' is-placeholder' : '') +
      (c.previewSrc  ? ' has-preview'   : '');

    if (c.placeholder) {
      var innerContent = c.placeholderImage
        ? '<img src="' + c.placeholderImage + '" loading="lazy" alt="" ' +
          'style="display:block;width:100%;height:100%;object-fit:cover;border-radius:12px;">'
        : '';
      thumb.innerHTML =
        '<div class="cs-thumb-inner">' +
          '<div class="cs-thumb-placeholder">' + innerContent + '</div>' +
        '</div>';
    } else if (c.previewSrc) {
      var objStyle = c.previewObjectPosition
        ? ' style="object-position:' + c.previewObjectPosition + '"'
        : '';
      var previewImg = '<img class="cs-preview-img" src="' + c.previewSrc +
        '" alt="' + c.title + '" loading="lazy"' + objStyle + '>';
      thumb.innerHTML = c.previewMobileSrc
        ? '<picture>' +
            '<source media="(max-width: 768px)" srcset="' + c.previewMobileSrc + '">' +
            previewImg +
          '</picture>'
        : previewImg;
    } else {
      thumb.innerHTML =
        '<div class="cs-thumb-inner"><div class="cs-images">' +
        c.images.map(function (img) {
          return '<img class="cs-phone" src="' + img.src +
                 '" alt="' + img.alt + '" loading="lazy">';
        }).join('') +
        '</div></div>';
    }

    /* --- body area --- */
    var body = document.createElement('div');
    body.className = 'cs-body';
    body.innerHTML =
      '<div class="card-tags">' +
      c.tags.map(function (t) {
        return '<span class="' + t.cls + '">' + t.text + '</span>';
      }).join('') +
      '</div>' +
      '<h3 class="cs-title">' + c.title + '</h3>';

    slide.appendChild(thumb);
    slide.appendChild(body);
    return slide;
  }

  /* ── Public init ───────────────────────────────────────────────────── */
  function init(options) {
    var currentId = options.currentCase;
    var container = options.mount ||
                    document.getElementById('csSwitcher') ||
                    document.querySelector('.case-switcher');
    if (!container) return;

    var DURATION = 400; // ms — keep >= CSS transition duration (0.38s)

    /* Find current position in ALL_CASES */
    var currentIdx = -1;
    for (var i = 0; i < ALL_CASES.length; i++) {
      if (ALL_CASES[i].id === currentId) { currentIdx = i; break; }
    }

    /* Build filtered list, preserving portfolio order */
    var cases = ALL_CASES.filter(function (c) { return c.id !== currentId; });
    var N = cases.length;
    if (N === 0) return;

    /* Starting slide: first case that appears AFTER current in portfolio order.
       Falls back to the last filtered case if current is at the end. */
    var startIdx = cases.length - 1;
    for (var j = 0; j < cases.length; j++) {
      var globalIdx = -1;
      for (var k = 0; k < ALL_CASES.length; k++) {
        if (ALL_CASES[k] === cases[j]) { globalIdx = k; break; }
      }
      if (globalIdx > currentIdx) { startIdx = j; break; }
    }

    /* trackPos: 0 = clone of last, 1..N = real slides, N+1 = clone of first */
    var trackPos    = startIdx + 1;
    var isAnimating = false;
    var currentHref = cases[startIdx].href;

    /* SVG chevron icons — 1.5px stroke, round caps, inherits currentColor */
    var SVG_PREV =
      '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" ' +
          'xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
        '<path d="M9 11L5 7L9 3" stroke="currentColor" stroke-width="1.5" ' +
              'stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>';
    var SVG_NEXT =
      '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" ' +
          'xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
        '<path d="M5 3L9 7L5 11" stroke="currentColor" stroke-width="1.5" ' +
              'stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>';

    /* ── Render container shell ───────────────────────────────────────── */
    container.innerHTML =
      '<p class="cs-label" id="csSwitcherLabel"></p>' +
      '<div class="cs-card" id="csSwitcherCard">' +
        '<div class="cs-track" id="csSwitcherTrack"></div>' +
        '<button class="cs-arrow cs-arrow-prev" ' +
          'id="csSwitcherPrev" aria-label="Previous case">' + SVG_PREV + '</button>' +
        '<button class="cs-arrow cs-arrow-next" ' +
          'id="csSwitcherNext" aria-label="Next case">' + SVG_NEXT + '</button>' +
      '</div>';

    var elLabel = container.querySelector('#csSwitcherLabel');
    var elCard  = container.querySelector('#csSwitcherCard');
    var elTrack = container.querySelector('#csSwitcherTrack');
    var btnPrev = container.querySelector('#csSwitcherPrev');
    var btnNext = container.querySelector('#csSwitcherNext');

    /* ── Inject 4 slides: [clone-last, case0, …, caseN-1, clone-first] ─ */
    var slideOrder = [cases[N - 1]].concat(cases).concat([cases[0]]);
    slideOrder.forEach(function (c) { elTrack.appendChild(buildSlide(c)); });

    /* ── Snap to position without animation ────────────────────────────── */
    function snapTo(pos) {
      elTrack.style.transition = 'none';
      elTrack.style.transform  = 'translateX(-' + pos + '00%)';
      elTrack.offsetWidth;     // force reflow — ensures transition stays off
    }

    snapTo(trackPos);

    /* ── Resolve the filtered-cases entry for a given trackPos ─────────── */
    function caseAtPos(pos) {
      if (pos === 0)     return cases[N - 1];
      if (pos === N + 1) return cases[0];
      return cases[pos - 1];
    }

    /* ── Sync label + card state to the visible case ───────────────────── */
    function applyMeta(c) {
      elLabel.textContent = labelFor(c, currentIdx);
      currentHref = c.href;
      elCard.classList.toggle('is-inactive', !c.href);
    }

    /* ── Animate to a new track position ───────────────────────────────── */
    function goTo(newPos) {
      if (isAnimating) return;
      isAnimating = true;

      trackPos = newPos;
      applyMeta(caseAtPos(trackPos)); // update label at animation start

      elTrack.style.transition = 'transform 0.38s cubic-bezier(0.4, 0, 0.2, 1)';
      elTrack.style.transform  = 'translateX(-' + trackPos + '00%)';

      setTimeout(function () {
        /* Silently jump from clone back to its real counterpart */
        if (trackPos === 0) {
          snapTo(N); trackPos = N;
        } else if (trackPos === N + 1) {
          snapTo(1); trackPos = 1;
        }
        isAnimating = false;
      }, DURATION);
    }

    /* ── Event listeners ────────────────────────────────────────────────── */
    btnPrev.addEventListener('click', function (e) {
      e.stopPropagation();
      goTo(trackPos - 1);
    });
    btnNext.addEventListener('click', function (e) {
      e.stopPropagation();
      goTo(trackPos + 1);
    });
    elCard.addEventListener('click', function (e) {
      if (btnPrev.contains(e.target) || btnNext.contains(e.target)) return;
      if (currentHref) window.location.href = currentHref;
    });

    /* ── Initial state ──────────────────────────────────────────────────── */
    applyMeta(cases[startIdx]);
  }

  /* ── Expose ──────────────────────────────────────────────────────────── */
  global.CaseSwitcher = { init: init };

}(window));
