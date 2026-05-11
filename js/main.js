// ================================================
// MARIIA HREZINA — PORTFOLIO
// ================================================

// --- CUSTOM CURSOR ---
// Detect touch/pointer-coarse devices — cursor system is mouse-only
const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

const cursor     = document.getElementById('cursor');
const cursorPill = document.getElementById('cursorPill');

// Declare label elements; only created on non-touch devices
let exploreEl   = null;
let goodreadsEl = null;

if (!isTouchDevice) {
  // Text-only "Explore case" label
  exploreEl = document.createElement('div');
  exploreEl.className   = 'cursor-explore';
  exploreEl.textContent = 'Explore case';
  document.body.appendChild(exploreEl);

  // "Goodreads ↗" label
  goodreadsEl = document.createElement('div');
  goodreadsEl.className = 'cursor-goodreads';
  goodreadsEl.innerHTML = 'Goodreads <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true"><path d="M2 9L9 2M9 2H4.5M9 2V6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  document.body.appendChild(goodreadsEl);

  // Mouse tracking + RAF positioning loop
  let mouseX = 0, mouseY = 0, cx = 0, cy = 0;

  document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

  (function loop() {
    cx += (mouseX - cx) * 0.14;
    cy += (mouseY - cy) * 0.14;
    if (cursor)     { cursor.style.left     = cx + 'px'; cursor.style.top     = cy + 'px'; }
    if (cursorPill) { cursorPill.style.left = cx + 'px'; cursorPill.style.top = cy + 'px'; }
    exploreEl.style.left   = cx + 'px';
    exploreEl.style.top    = cy + 'px';
    goodreadsEl.style.left = cx + 'px';
    goodreadsEl.style.top  = cy + 'px';
    requestAnimationFrame(loop);
  }());

  // Interactive elements — enlarge + glow the cursor dot on hover
  document.querySelectorAll('a, button, [role="button"]').forEach(function (el) {
    el.addEventListener('mouseenter', function () { document.body.classList.add('cursor-hover'); });
    el.addEventListener('mouseleave', function () { document.body.classList.remove('cursor-hover'); });
  });

  // Case cards — text-only "Explore case" label, no pill background
  // Covers: .card-active (homepage work grid) + .cs-card (Next Case carousel)
  (function initCaseCardCursor() {
    document.querySelectorAll('.card-active, .cs-card').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        cursor && cursor.classList.add('is-case-hover');
        exploreEl.classList.add('visible');
      });
      el.addEventListener('mouseleave', function () {
        cursor && cursor.classList.remove('is-case-hover');
        exploreEl.classList.remove('visible');
      });
    });
  }());
}

// --- NAV SCROLL ---
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav?.classList.toggle('scrolled', window.scrollY > 20), { passive: true });

// --- SCROLL REVEAL ---
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
}, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// --- HERO ENTRANCE ---
document.addEventListener('DOMContentLoaded', () => {
  const identity = document.querySelector('.hero-identity');
  if (!identity) return;

  if (window.innerWidth <= 768) {
    // Mobile: identity is in flex flow — only fade in, no translate
    identity.style.opacity = '0';
    setTimeout(() => {
      identity.style.transition = 'opacity 0.9s ease';
      identity.style.opacity    = '1';
    }, 120);
  } else {
    // Desktop: identity is absolutely centred — slide + fade in
    identity.style.cssText += 'opacity:0;transform:translate(-50%,-44%)';
    setTimeout(() => {
      identity.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
      identity.style.opacity    = '1';
      identity.style.transform  = 'translate(-50%,-50%)';
    }, 120);
  }
});


// --- PLAYER CARD ---
(function initPlayer() {
  const card = document.querySelector('.js-player-card');
  if (!card) return;

  const playBtn    = card.querySelector('.js-play');
  const iconPlay   = card.querySelector('.icon-play');
  const iconPause  = card.querySelector('.icon-pause');
  const fill       = card.querySelector('.js-progress-fill');
  const timeCur    = card.querySelectorAll('.player-time')[0];
  const timeTotal  = card.querySelectorAll('.player-time')[1];

  // Create audio element
  const audio = new Audio('images/Hero/focus-track.mp3');
  audio.preload = 'metadata';

  function formatTime(s) {
    if (!isFinite(s)) return '0:00';
    var m = Math.floor(s / 60);
    var sec = Math.floor(s % 60);
    return m + ':' + (sec < 10 ? '0' : '') + sec;
  }

  // Update progress bar and time as audio plays
  audio.addEventListener('timeupdate', function () {
    if (!audio.duration) return;
    var pct = (audio.currentTime / audio.duration) * 100;
    fill.style.transition = 'none';
    fill.style.width = pct + '%';
    timeCur.textContent  = formatTime(audio.currentTime);
    timeTotal.textContent = '−' + formatTime(audio.duration - audio.currentTime);
  });

  // Reset when track ends
  audio.addEventListener('ended', function () {
    iconPlay.style.display  = '';
    iconPause.style.display = 'none';
    fill.style.width = '0%';
    timeCur.textContent  = '0:00';
  });

  // Stop pointerdown on buttons AND spotify link so interact.js never starts a drag
  card.querySelectorAll('.player-btn, .js-spotify-link').forEach(function (btn) {
    btn.addEventListener('pointerdown', function (e) { e.stopPropagation(); });
  });

  // Play / Pause
  var playStartX = 0, playStartY = 0;
  playBtn.addEventListener('pointerdown', function (e) { playStartX = e.clientX; playStartY = e.clientY; });
  playBtn.addEventListener('pointerup', function (e) {
    e.stopPropagation();
    if (Math.abs(e.clientX - playStartX) > 8 || Math.abs(e.clientY - playStartY) > 8) return;

    if (audio.paused) {
      audio.play();
      iconPlay.style.display  = 'none';
      iconPause.style.display = '';
    } else {
      audio.pause();
      iconPlay.style.display  = '';
      iconPause.style.display = 'none';
    }
  });

  // Prev — restart track
  var prevBtn = card.querySelector('.js-prev');
  var prevStartX = 0, prevStartY = 0;
  prevBtn.addEventListener('pointerdown', function (e) { prevStartX = e.clientX; prevStartY = e.clientY; });
  prevBtn.addEventListener('pointerup', function (e) {
    e.stopPropagation();
    if (Math.abs(e.clientX - prevStartX) > 8 || Math.abs(e.clientY - prevStartY) > 8) return;
    audio.currentTime = 0;
  });

  // Next — skip to end (restarts)
  var nextBtn = card.querySelector('.js-next');
  var nextStartX = 0, nextStartY = 0;
  nextBtn.addEventListener('pointerdown', function (e) { nextStartX = e.clientX; nextStartY = e.clientY; });
  nextBtn.addEventListener('pointerup', function (e) {
    e.stopPropagation();
    if (Math.abs(e.clientX - nextStartX) > 8 || Math.abs(e.clientY - nextStartY) > 8) return;
    audio.currentTime = 0;
    audio.pause();
    iconPlay.style.display  = '';
    iconPause.style.display = 'none';
    fill.style.width = '0%';
  });
})();

// --- READING CARD: cursor label + click to open Goodreads ---
(function initReadingCard() {
  const card = document.querySelector('.js-reading-card');
  if (!card) return;

  // Show "Goodreads ↗" cursor label on hover (mouse devices only)
  if (!isTouchDevice) {
    card.addEventListener('mouseenter', function () {
      cursor     && cursor.classList.add('is-goodreads-hover');
      cursorPill && cursorPill.classList.remove('visible');
      goodreadsEl.classList.add('visible');
    });
    card.addEventListener('mouseleave', function () {
      cursor     && cursor.classList.remove('is-goodreads-hover');
      goodreadsEl.classList.remove('visible');
    });
  }

  // Click — open Goodreads (pixel threshold to avoid triggering after drag)
  var startX = 0, startY = 0;
  card.addEventListener('mousedown', function (e) { startX = e.clientX; startY = e.clientY; });
  card.addEventListener('mouseup',   function (e) {
    if (Math.abs(e.clientX - startX) < 6 && Math.abs(e.clientY - startY) < 6) {
      window.open('https://www.goodreads.com/user/show/189809547-mariia-hrezina', '_blank', 'noopener');
    }
  });
})();


// --- SHUFFLE CARD: zone-based layout rearrangement ---
(function initShuffle() {
  const shuffleCard = document.querySelector('.js-shuffle-card');
  if (!shuffleCard) return;
  if (window.innerWidth <= 768) return; // disabled on mobile

  // Six named layout zones around the central text block.
  // xRange / yRange = pixel offset of a card's top-left corner from VIEWPORT CENTER.
  // Zones are deliberately separated so cross-zone moves are always noticeable.
  var ZONES = [
    { xRange: [-620, -320], yRange: [-340, -140] }, // 0  top-left
    { xRange: [ 280,  480], yRange: [-340, -140] }, // 1  top-right
    { xRange: [-660, -340], yRange: [ -50,   90] }, // 2  mid-left
    { xRange: [ 300,  480], yRange: [ -50,   90] }, // 3  mid-right
    { xRange: [-620, -280], yRange: [ 140,  320] }, // 4  bottom-left
    { xRange: [ 280,  460], yRange: [ 140,  320] }, // 5  bottom-right
  ];

  // Left zones tilt left, right zones tilt right — natural card lean per side.
  var ZONE_ROT = [
    [-6, -1], // 0  top-left
    [ 1,  6], // 1  top-right
    [-6, -1], // 2  mid-left
    [ 1,  6], // 3  mid-right
    [-5, -1], // 4  bottom-left
    [ 2,  6], // 5  bottom-right
  ];

  var CARDS = [
    '.js-player-card',
    '.js-reading-card',
    '.js-polaroid-card',
    '.js-exp-card',
    '.js-skills-card',
  ];

  function randRange(min, max) {
    return min + Math.random() * (max - min);
  }

  // Classify which of the 6 zones a card currently occupies,
  // based on its center offset from the viewport center.
  function getCardZone(card) {
    var rect = card.getBoundingClientRect();
    var dx = (rect.left + rect.width  / 2) - window.innerWidth  / 2;
    var dy = (rect.top  + rect.height / 2) - window.innerHeight / 2;
    var isLeft = dx < 0;
    if      (dy < -100) return isLeft ? 0 : 1; // top row
    else if (dy >  100) return isLeft ? 4 : 5; // bottom row
    else                return isLeft ? 2 : 3; // middle row
  }

  // Assigns 5 zones to 5 cards (one zone left empty each shuffle) such that:
  //   - all assigned zones are distinct (no clustering)
  //   - no card lands in its current zone (guaranteed visible movement)
  function assignZones(currentZones) {
    for (var attempt = 0; attempt < 60; attempt++) {
      // Fisher-Yates shuffle of all 6 zone indices
      var pool = [0, 1, 2, 3, 4, 5];
      for (var i = pool.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = pool[i]; pool[i] = pool[j]; pool[j] = t;
      }
      // Try dropping each zone in turn; keep the first 5-element assignment
      // where no card maps to its current zone.
      for (var d = 0; d < pool.length; d++) {
        var dropped = pool[d];
        var cands = pool.filter(function(z) { return z !== dropped; });
        var ok = true;
        for (var c = 0; c < CARDS.length; c++) {
          if (cands[c] === currentZones[c]) { ok = false; break; }
        }
        if (ok) return cands;
      }
    }
    // Fallback: rotate each zone by 2 — always moves, always in-bounds.
    return currentZones.map(function(z) { return (z + 2) % ZONES.length; });
  }

  function animateMiniCards() {
    var minis = shuffleCard.querySelectorAll('.shuffle-mini');
    minis.forEach(function (mini) {
      mini.style.transition = 'transform 0.22s ease';
      mini.style.transform  = 'rotate(' + ((Math.random() - 0.5) * 40) + 'deg) translate(' +
                              ((Math.random() - 0.5) * 14) + 'px,' + ((Math.random() - 0.5) * 8) + 'px)';
    });
    setTimeout(function () {
      minis.forEach(function (mini) {
        mini.style.transition = 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)';
        mini.style.transform  = '';
      });
      setTimeout(function () {
        minis.forEach(function (mini) { mini.style.transition = ''; });
      }, 380);
    }, 260);
  }

  function doShuffle() {
    animateMiniCards();

    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var cx = vw / 2;
    var cy = vh / 2;

    // Snapshot every card's current zone before any movement begins.
    var currentZones = CARDS.map(function(sel) {
      var card = document.querySelector(sel);
      return card ? getCardZone(card) : 0;
    });

    // Derangement: every card moves to a different, unique zone.
    var newZones = assignZones(currentZones);

    // Accumulates the actual final rects of cards placed so far this shuffle,
    // so later cards can check against real destinations instead of mid-animation positions.
    var plannedRects = [];

    CARDS.forEach(function (sel, i) {
      var card = document.querySelector(sel);
      if (!card) return;

      var zone     = ZONES[newZones[i]];
      var rotRange = ZONE_ROT[newZones[i]];
      var newRot   = randRange(rotRange[0], rotRange[1]);

      // Pick a random point inside the target zone.
      // Retry up to 6 times to enforce a minimum 150 px movement distance.
      var rect0      = card.getBoundingClientRect();
      var targetLeft = cx + randRange(zone.xRange[0], zone.xRange[1]);
      var targetTop  = cy + randRange(zone.yRange[0], zone.yRange[1]);
      var MIN_SQ     = 150 * 150;
      for (var a = 1; a < 6; a++) {
        var ddx = targetLeft - rect0.left;
        var ddy = targetTop  - rect0.top;
        if (ddx * ddx + ddy * ddy >= MIN_SQ) break;
        targetLeft = cx + randRange(zone.xRange[0], zone.xRange[1]);
        targetTop  = cy + randRange(zone.yRange[0], zone.yRange[1]);
      }

      setTimeout(function () {
        var rect = card.getBoundingClientRect();
        var curX = parseFloat(card.dataset.x) || 0;
        var curY = parseFloat(card.dataset.y) || 0;

        // Translate delta to place card's top-left at target
        var rawX = curX + (targetLeft - rect.left);
        var rawY = curY + (targetTop  - rect.top);

        var finalRect = {
          left:   targetLeft,
          right:  targetLeft + rect.width,
          top:    targetTop,
          bottom: targetTop  + rect.height,
        };

        card.dataset.rot = newRot;
        var result = enforceConstraints(card, rawX, rawY, finalRect, plannedRects);

        // Record the card's actual landing rect for subsequent overlap checks.
        var actualLeft = targetLeft + (result[0] - rawX);
        var actualTop  = targetTop  + (result[1] - rawY);
        plannedRects.push({
          left: actualLeft, right: actualLeft + rect.width,
          top:  actualTop,  bottom: actualTop  + rect.height,
        });

        card.style.transition = 'transform 0.5s cubic-bezier(0.34,1.1,0.64,1)';
        card.style.transform  = 'translate(' + result[0] + 'px,' + result[1] + 'px) rotate(' + newRot + 'deg)';
        setTimeout(function () { card.style.transition = ''; }, 560);
      }, i * 80);
    });
  }

  var startX = 0, startY = 0;
  shuffleCard.addEventListener('mousedown', function (e) { startX = e.clientX; startY = e.clientY; });
  shuffleCard.addEventListener('mouseup',   function (e) {
    if (Math.abs(e.clientX - startX) < 6 && Math.abs(e.clientY - startY) < 6) doShuffle();
  });
})();

// ============================================================
// HERO DEFAULT LAYOUT
// Positions every card at a fixed pixel offset from the hero's
// geometric centre (= identity-block centre), so the composition
// is identical across any desktop resolution.
// Strictly clamps cards inside the hero — nothing overflows into
// the next section. Re-runs on resize with drag state reset.
// ============================================================
(function initHeroLayout() {
  // Fixed offsets: card top-left corner, px from hero geometric centre.
  // Derived from the reference 1440 × 900 composition.
  var OFFSETS = [
    { sel: '.js-player-card',   ox: -540, oy: -360 },
    { sel: '.js-reading-card',  ox:  330, oy: -395 },
    { sel: '.js-polaroid-card', ox: -540, oy:  230 },
    { sel: '.js-exp-card',      ox: -430, oy:  310 },
    { sel: '.js-skills-card',   ox:  358, oy:  230 },
    { sel: '.js-shuffle-card',  ox: null, oy:  270 }, // ox:null = centre on identity axis
  ];

  var EDGE = 20; // minimum gap (px) from any hero edge

  function place() {
    if (window.innerWidth <= 768) return;

    var hero = document.querySelector('.hero');
    if (!hero) return;

    var hRect = hero.getBoundingClientRect();
    // Identity is always CSS-centred in the hero — geometric centre is exact.
    var cx = hRect.width  / 2;
    var cy = hRect.height / 2;

    OFFSETS.forEach(function (def) {
      var card = document.querySelector(def.sel);
      if (!card) return;

      // Read rendered dimensions; fall back if not yet laid out.
      var cRect = card.getBoundingClientRect();
      var w = cRect.width  > 0 ? cRect.width  : 200;
      var h = cRect.height > 0 ? cRect.height : 150;

      // ox:null means centre the card exactly on the identity axis.
      var targetLeft = def.ox === null ? cx - w / 2 : cx + def.ox;

      // Target offset from centre, clamped strictly inside hero bounds.
      var left = Math.max(EDGE, Math.min(targetLeft,  hRect.width  - w - EDGE));
      var top  = Math.max(EDGE, Math.min(cy + def.oy, hRect.height - h - EDGE));

      card.style.left       = left + 'px';
      card.style.top        = top  + 'px';
      card.style.right      = '';
      card.style.bottom     = '';
      card.style.marginLeft = '';  // neutralise any inline margin-left (e.g. shuffle card)

      // Reset drag delta so the drag system starts clean from the new position.
      card.dataset.x = '0';
      card.dataset.y = '0';

      // Preserve the card's design rotation.
      var rot = parseFloat(card.dataset.rot) || 0;
      card.style.transform = 'rotate(' + rot + 'deg)';
    });
  }

  document.addEventListener('DOMContentLoaded', place);

  var resizeTimer;
  window.addEventListener('resize', function () {
    if (window.innerWidth <= 768) return;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(place, 100);
  });
})();

// --- LIGHTBOX ---
(function initLightbox() {
  const content = document.querySelector('.case-content');
  if (!content) return;

  // Build overlay once
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');

  const img = document.createElement('img');
  img.alt = '';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'lightbox-close';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.innerHTML = '&#x2715;';

  overlay.appendChild(img);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);

  let scrollY = 0;

  function open(src, alt) {
    img.src = src;
    img.alt = alt || '';
    scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    overlay.classList.add('active');
  }

  function close() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo({ top: scrollY, behavior: 'instant' });
    // Clear src after transition
    setTimeout(() => { img.src = ''; }, 230);
  }

  // Attach to all images inside .case-content (skip videos)
  content.querySelectorAll('img').forEach(el => {
    el.addEventListener('click', () => open(el.src, el.alt));
  });

  // Close triggers
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('active')) close(); });
})();

// --- VIDEO LIGHTBOX ---
(function initVideoLightbox() {
  const videos = document.querySelectorAll('.js-lightbox-video');
  if (!videos.length) return;

  // Build overlay once
  const overlay = document.createElement('div');
  overlay.className = 'video-lightbox-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');

  const vid = document.createElement('video');
  vid.muted    = true;
  vid.loop     = true;
  vid.setAttribute('playsinline', '');

  const closeBtn = document.createElement('button');
  closeBtn.className = 'video-lightbox-close';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.innerHTML = '&#x2715;';

  overlay.appendChild(vid);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);

  let scrollY = 0;

  function open(src) {
    vid.src = src;
    scrollY = window.scrollY;
    document.body.style.overflow   = 'hidden';
    document.body.style.position   = 'fixed';
    document.body.style.top        = `-${scrollY}px`;
    document.body.style.width      = '100%';
    overlay.classList.add('active');
    vid.play().catch(() => {});
  }

  function close() {
    overlay.classList.remove('active');
    document.body.style.overflow   = '';
    document.body.style.position   = '';
    document.body.style.top        = '';
    document.body.style.width      = '';
    window.scrollTo({ top: scrollY, behavior: 'instant' });
    setTimeout(() => { vid.src = ''; }, 230);
  }

  videos.forEach(el => {
    el.addEventListener('click', () => open(el.src));
  });

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) close();
  });
})();

// ============================================================
// COMPOSITION CONSTRAINTS — desktop only
// Shared by initDrag and initShuffle. All zone reads are live
// (called at event time), so they reflect any DOM state changes.
// ============================================================

// Stage: viewport-centred max-width container.
// Prevents cards from drifting to screen edges on ultra-wide displays.
function getStage() {
  var vw   = window.innerWidth;
  var vh   = window.innerHeight;
  var maxW = 1400;
  var hGap = Math.max(80, (vw - maxW) / 2);
  return { left: hGap, right: vw - hGap, top: 70, bottom: vh - 70 };
}

// Safety zone: padded rectangle around the central text block.
function getSafetyZone() {
  var id = document.querySelector('.hero-identity');
  if (!id) return null;
  var r = id.getBoundingClientRect();
  return { left: r.left - 110, right: r.right + 110,
           top:  r.top  -  55, bottom: r.bottom + 75 };
}

// Shuffle zone: the shuffle card must never be covered.
function getShuffleZone() {
  var el = document.querySelector('.js-shuffle-card');
  if (!el) return null;
  var r = el.getBoundingClientRect();
  var p = 12;
  return { left: r.left - p, right: r.right + p,
           top:  r.top  - p, bottom: r.bottom + p };
}

function rectsOverlap(a, b) {
  return !(a.right < b.left || a.left > b.right ||
           a.bottom < b.top || a.top  > b.bottom);
}

// Returns the {x, y} push vector to exit a blocked zone via
// the axis of least penetration (cheapest exit direction).
function computePush(cardRect, zone, buf) {
  if (buf === undefined) buf = 18;
  var dL = cardRect.right  - zone.left;
  var dR = zone.right  - cardRect.left;
  var dT = cardRect.bottom - zone.top;
  var dB = zone.bottom - cardRect.top;
  var min = Math.min(dL, dR, dT, dB);
  if      (min === dL) return { x: -(dL + buf), y: 0 };
  else if (min === dR) return { x:   dR + buf,  y: 0 };
  else if (min === dT) return { x: 0, y: -(dT + buf) };
  else                 return { x: 0, y:   dB + buf  };
}

// Fraction of rect a's area covered by rect b (0–1).
function overlapFraction(a, b) {
  var ox = Math.max(0, Math.min(a.right, b.right)   - Math.max(a.left, b.left));
  var oy = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top,  b.top));
  var aArea = (a.right - a.left) * (a.bottom - a.top);
  return aArea > 0 ? (ox * oy) / aArea : 0;
}

// Current screen rects of all draggable cards except excludeEl.
function getOtherCardRects(excludeEl) {
  var rects = [];
  document.querySelectorAll('.moodboard-card:not(.js-shuffle-card)').forEach(function(el) {
    if (el !== excludeEl) rects.push(el.getBoundingClientRect());
  });
  return rects;
}

// True when the candidate rect violates no constraint.
function isRectValid(r, safe, shuffleZone, stage, otherRects) {
  if (safe        && rectsOverlap(r, safe))        return false;
  if (shuffleZone && rectsOverlap(r, shuffleZone)) return false;
  if (stage && (r.left < stage.left || r.right  > stage.right ||
                r.top  < stage.top  || r.bottom > stage.bottom)) return false;
  for (var i = 0; i < otherRects.length; i++) {
    if (overlapFraction(r, otherRects[i]) > 0.30) return false;
  }
  return true;
}

// Searches outward in 8 directions at increasing step sizes.
// Returns [newX, newY] at the nearest valid placement, or null.
function findNearestValid(x, y, r, safe, shuffleZone, stage, otherRects) {
  var DIRS = [[1,0],[-1,0],[0,-1],[0,1],[1,-1],[-1,-1],[1,1],[-1,1]];
  var STEP = 20, MAX_R = 320;
  for (var radius = STEP; radius <= MAX_R; radius += STEP) {
    for (var d = 0; d < DIRS.length; d++) {
      var ox = DIRS[d][0] * radius, oy = DIRS[d][1] * radius;
      var cr = { left: r.left + ox, right: r.right + ox,
                 top:  r.top  + oy, bottom: r.bottom + oy };
      if (isRectValid(cr, safe, shuffleZone, stage, otherRects)) {
        return [x + ox, y + oy];
      }
    }
  }
  return null;
}

// Enforce all constraints synchronously.
// extraRects: planned final rects of cards already placed this shuffle pass —
//             passed instead of live rects to avoid mid-animation false reads.
// Updates el.dataset.x / .y and returns [finalX, finalY].
function enforceConstraints(el, x, y, cardRect, extraRects) {
  var r = { left: cardRect.left, right: cardRect.right,
            top:  cardRect.top,  bottom: cardRect.bottom };

  function shift(dx, dy) {
    x += dx; y += dy;
    r.left += dx; r.right  += dx;
    r.top  += dy; r.bottom += dy;
  }

  var safe      = getSafetyZone();
  var shuffleZn = getShuffleZone();
  var stage     = getStage();

  // Pass 1 — push out of protected zones, then hard-clamp to stage bounds.
  if (safe      && rectsOverlap(r, safe))      { var pa = computePush(r, safe);      shift(pa.x, pa.y); }
  if (shuffleZn && rectsOverlap(r, shuffleZn)) { var pb = computePush(r, shuffleZn); shift(pb.x, pb.y); }
  if (stage) {
    if (r.left   < stage.left)   shift(stage.left   - r.left,   0);
    if (r.right  > stage.right)  shift(stage.right  - r.right,  0);
    if (r.top    < stage.top)    shift(0, stage.top    - r.top);
    if (r.bottom > stage.bottom) shift(0, stage.bottom - r.bottom);
  }

  // Pass 2 — re-check after stage clamp (clamp can push back into a protected zone).
  if (safe      && rectsOverlap(r, safe))      { var pc = computePush(r, safe);      shift(pc.x, pc.y); }
  if (shuffleZn && rectsOverlap(r, shuffleZn)) { var pd = computePush(r, shuffleZn); shift(pd.x, pd.y); }

  // Final stage re-clamp — pass 2 pushes must not exceed stage bounds.
  if (stage) {
    if (r.left   < stage.left)   shift(stage.left   - r.left,   0);
    if (r.right  > stage.right)  shift(stage.right  - r.right,  0);
    if (r.top    < stage.top)    shift(0, stage.top    - r.top);
    if (r.bottom > stage.bottom) shift(0, stage.bottom - r.bottom);
  }

  // Card-to-card overlap — max 30% of the placed card's area.
  // During shuffle: use the caller-supplied planned rects (mid-animation live rects
  // are unreliable). During drag: fall back to live rects of all other cards.
  var others = extraRects ? extraRects.slice() : getOtherCardRects(el);

  var tooClose = false;
  for (var i = 0; i < others.length; i++) {
    if (overlapFraction(r, others[i]) > 0.30) { tooClose = true; break; }
  }

  if (tooClose) {
    var valid = findNearestValid(x, y, r, safe, shuffleZn, stage, others);
    if (valid) { shift(valid[0] - x, valid[1] - y); }
    // No valid position within search radius — keep current (best-effort fallback).
  }

  // Pass 3 — final guarantee: overlap resolution must not re-introduce zone violations.
  if (safe      && rectsOverlap(r, safe))      { var pe = computePush(r, safe);      shift(pe.x, pe.y); }
  if (shuffleZn && rectsOverlap(r, shuffleZn)) { var pf = computePush(r, shuffleZn); shift(pf.x, pf.y); }
  if (stage) {
    if (r.left   < stage.left)   shift(stage.left   - r.left,   0);
    if (r.right  > stage.right)  shift(stage.right  - r.right,  0);
    if (r.top    < stage.top)    shift(0, stage.top    - r.top);
    if (r.bottom > stage.bottom) shift(0, stage.bottom - r.bottom);
  }

  el.dataset.x = x;
  el.dataset.y = y;
  return [x, y];
}

// --- DRAGGABLE MOODBOARD (interact.js) ---
(function initDrag() {
  if (typeof interact === 'undefined') return;
  if (window.innerWidth <= 768) return; // disabled on mobile

  // Apply initial rotation — shuffle card stays fixed, skip it
  document.querySelectorAll('.moodboard-card:not(.js-shuffle-card)').forEach(el => {
    const rot = parseFloat(el.dataset.rot) || 0;
    el.style.transform = `rotate(${rot}deg)`;
  });

  let maxZ = 10;

  // Shuffle card excluded — stays fixed, not draggable
  interact('.moodboard-card:not(.js-shuffle-card)').draggable({
    inertia: { resistance: 18, minSpeed: 60, endSpeed: 8 },
    listeners: {
      start(event) {
        const el = event.target;
        el.classList.add('is-dragging');
        el.style.zIndex = ++maxZ;
      },
      move(event) {
        const el   = event.target;
        const rot  = parseFloat(el.dataset.rot) || 0;
        const xOld = parseFloat(el.dataset.x) || 0;
        const yOld = parseFloat(el.dataset.y) || 0;
        let x      = xOld + event.dx;
        let y      = yOld + event.dy;

        // Real-time stage clamp — card must stay fully inside the hero container.
        const rect  = el.getBoundingClientRect();
        const stage = getStage();
        if (rect.right  + event.dx > stage.right)  x = xOld + (stage.right  - rect.right);
        if (rect.left   + event.dx < stage.left)   x = xOld + (stage.left   - rect.left);
        if (rect.bottom + event.dy > stage.bottom) y = yOld + (stage.bottom - rect.bottom);
        if (rect.top    + event.dy < stage.top)    y = yOld + (stage.top    - rect.top);

        const tilt = rot + Math.max(-10, Math.min(10, event.dx * 0.35));
        el.style.transform = `translate(${x}px, ${y}px) rotate(${tilt}deg)`;
        el.dataset.x = x;
        el.dataset.y = y;
      },
      end(event) {
        const el   = event.target;
        const rot  = parseFloat(el.dataset.rot) || 0;
        const x    = parseFloat(el.dataset.x)  || 0;
        const y    = parseFloat(el.dataset.y)  || 0;
        const rect = el.getBoundingClientRect();

        // Enforce all constraints immediately — no delay, no double-jump
        const [cx, cy] = enforceConstraints(el, x, y, rect);

        el.style.transition = 'transform 0.38s cubic-bezier(.22,.68,0,1.2)';
        el.style.transform  = `translate(${cx}px, ${cy}px) rotate(${rot}deg)`;
        setTimeout(() => { el.style.transition = ''; }, 400);
        el.classList.remove('is-dragging');
      }
    }
  });
})();

// --- AUTOPLAY FALLBACK ---
// Ensures inline videos autoplay even if the browser initially blocks it.
// Runs after DOM is ready; forces muted + play() as a second attempt.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('video[autoplay]').forEach(video => {
    video.muted = true; // guarantee muted before attempting play
    const promise = video.play();
    if (promise !== undefined) {
      promise.catch(() => {
        // Second attempt after a short delay (helps on some mobile browsers)
        setTimeout(() => { video.muted = true; video.play().catch(() => {}); }, 300);
      });
    }
  });
});

// --- HERO INTRO: cursor-proximity letter lift ---
(function initIntroLift() {
  // Mouse-only: skip touch / stylus devices
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  var svg = document.querySelector('.hero-intro-svg');
  if (!svg) return;

  var paths = Array.from(svg.querySelectorAll('path'));

  // Pre-compute each path's horizontal center in SVG user-space.
  // getBBox() is synchronous and accurate once the element is rendered.
  var centerX = paths.map(function (p) {
    var bb = p.getBBox();
    return bb.x + bb.width / 2;
  });

  var MAX_LIFT  = 48;   // CSS px — how high the "hot" letter rises
  var SIGMA     = 80;   // SVG units — Gaussian influence radius
  var S2        = 2 * SIGMA * SIGMA;
  var FAST_T    = 'transform 0.10s cubic-bezier(0.25, 0, 0.25, 1)'; // snap to cursor
  var SETTLE_T  = 'transform 0.50s cubic-bezier(0.25, 0, 0.25, 1)'; // glide back to rest

  function setCursorTransition() {
    paths.forEach(function (p) { p.style.transition = FAST_T; });
  }
  function setSettleTransition() {
    paths.forEach(function (p) { p.style.transition = SETTLE_T; });
  }

  svg.addEventListener('mouseenter', setCursorTransition);

  svg.addEventListener('mousemove', function (e) {
    var ctm = svg.getScreenCTM();
    if (!ctm) return;

    // Convert screen cursor position → SVG user-space coordinates
    var pt  = svg.createSVGPoint();
    pt.x    = e.clientX;
    pt.y    = e.clientY;
    var svgX = pt.matrixTransform(ctm.inverse()).x;

    paths.forEach(function (p, i) {
      var dx   = svgX - centerX[i];
      var lift = -MAX_LIFT * Math.exp(-(dx * dx) / S2);
      p.style.transform = 'translateY(' + lift.toFixed(2) + 'px)';
    });
  });

  svg.addEventListener('mouseleave', function () {
    setSettleTransition();
    paths.forEach(function (p) { p.style.transform = 'translateY(0)'; });
  });
}());

// --- SPLIT REVEAL — line-by-line title entrance ---
(function initSplitReveal() {
  const el = document.querySelector('.case-title');
  if (!el) return;

  // 1. Collect raw text and split into word spans
  const raw   = el.textContent.trim();
  const words = raw.split(/\s+/);
  el.innerHTML = words.map(w =>
    '<span class="sr-word" style="display:inline-block">' + w + '\u00a0</span>'
  ).join('');

  // 2. After paint, measure which words share the same line (same top offset)
  requestAnimationFrame(() => {
    const wordEls = Array.from(el.querySelectorAll('.sr-word'));
    // Guard: another script already rebuilt the element — don't overwrite it
    if (wordEls.length === 0) return;
    const lineGroups = [];
    let lastTop = null;

    wordEls.forEach(w => {
      const top = Math.round(w.getBoundingClientRect().top);
      if (lastTop === null || Math.abs(top - lastTop) > 4) {
        lineGroups.push([]);
        lastTop = top;
      }
      lineGroups[lineGroups.length - 1].push(w.textContent.trimEnd());
    });

    // 3. Rebuild: each line gets overflow:hidden wrap + animated inner span
    el.innerHTML = lineGroups.map((words, i) => {
      const delay = (0.12 + i * 0.09).toFixed(2);
      return (
        '<span class="sr-line-wrap">' +
          '<span class="sr-line" style="transition-delay:' + delay + 's">' +
            words.join(' ') +
          '</span>' +
        '</span>'
      );
    }).join('');

    // 4. Observe once — add class when title enters viewport
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        el.classList.add('sr-visible');
        obs.disconnect();
      }
    }, { threshold: 0.15 });

    obs.observe(el);
  });
}());
