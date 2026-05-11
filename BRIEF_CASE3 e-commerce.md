# Case 3 — Concert Archive Storefront · Brief for Claude Code

## ⚠️ CRITICAL: Styles & components
This task is NOT about designing new UI.
Use ONLY existing styles and structure from case-getmancar.html
and case-optistream.html.

- Use exact same CSS classes, typography, spacing, and layout patterns
- Do NOT create new styles, colors, font sizes, or spacing
- Do NOT hardcode any colors — use only CSS variables from style.css
- If unsure → reuse the closest existing block from existing case pages

All sections must reuse existing components
(hero, cards, image blocks, captions, meta blocks, section labels, etc.)
Do NOT redesign components — only adapt content.

## ⚠️ IMAGES: Placeholders only
No real images are available yet. Use placeholders only:
- Plain div with background color from existing palette only
- border-radius same as image blocks in existing case pages
- No shadows, gradients, or new styles
- Keep layout, spacing, and proportions exactly as if real images were present

---

## Task
Create case-storefront.html using the exact same styles,
fonts, colors and layout patterns as case-getmancar.html.
Reuse css/style.css completely — no new CSS files.

---

## Page structure

### 1. NAV
Same as all other pages.

### 2. CASE HERO

Headline (same typography as case-getmancar.html —
use identical font, size, weight and color as the
main headline on that page, max-width 800px):
  "Built a concert archive storefront, cutting
  discovery time for dedicated fans"

### 3. HERO IMAGE BAND
Full-width image placeholder.
Follow the same placeholder rules as defined above:
plain div, background color from existing palette (#1A1916),
no text, no gradients, no new styles.
Height: same as hero image band in case-getmancar.html.

---

### 4. OVERVIEW
Label: OVERVIEW

Text:
"Designed a storefront for live concert recordings —
from wireframes to production-ready in 3 weeks."

Meta block (4 columns, small all-caps label above,
value below — same component as in case-getmancar.html):
  MY ROLE: Product Designer, end-to-end
  THE TEAM: Cross-functional team
  TIMELINE: 3 weeks
  PLATFORM: Web — Desktop, Tablet, Mobile

---

### 5. SOLUTIONS

Each solution follows this structure — same as in case-getmancar.html:
  - Large muted number + solution title + pink drop label
    (reuse exact same solution header component)
  - Problem statement (short, 2–3 sentences)
  - Two options presented side by side (Option A vs Option B)
    with pros/cons for each
  - Chosen direction highlighted (Option B in all three cases)
  - Key insight / one-liner below
  - Image placeholder
  - SCROLL-DRIVEN ANIMATION (see animation rules below)

---

### ANIMATION RULES (apply to all 3 solutions)
Scroll-driven animation for each solution block:
1. Both options appear simultaneously
2. Option A fades to muted/dimmed state
3. Option B highlights with a "Chosen direction" green badge
   (same chip style as existing tags in the site)
4. Arguments/pros-cons reveal sequentially

Use IntersectionObserver to trigger on scroll.
No animation libraries — pure CSS + JS only.
Animation must work on mobile.

---

--- SOLUTION 01 — FILTERS ---

Number + title:
  Designing a filter system that scales
  Catalog Filters  ← pink label

Problem:
  "The catalog is large and growing. Users filter by
  artist, year, location, venue, and format — often
  all at once. The system needs to handle this depth
  today and scale tomorrow."

Option A — Top-bar dropdowns:
  Compact. Familiar from retail e-commerce.
  ✓ Works well for 3–4 filter categories
  ✗ Becomes cluttered as catalog grows
  ✗ Active filters hard to scan at a glance

Option B — Left sidebar ← Chosen direction:
  Always visible. Multi-select. Expandable per section.
  ✓ Scales as new categories are added
  ✓ All active filters visible simultaneously
  ✗ Takes up horizontal screen space by default

Key insight (visually connected to Option B's minus point
"Takes up horizontal screen space by default" —
display it directly below or next to that minus,
styled as a resolution note, e.g. green accent or
a small arrow/connector — NO subheading label):
  "One toggle solves it — the sidebar can be collapsed
  entirely, giving users who want a wider grid the
  option to hide filters and expand the catalog view."

Video placeholder (below key insight):
  Plain div placeholder — same rules as image placeholders.
  Label inside: "Demo: filters visible → filters hidden"

---

--- SOLUTION 02 — PRODUCT VIEW ---

Number + title:
  Keeping users in the browsing flow
  Product View  ← pink label

Problem:
  "Users choose between shows based on setlist and
  emotional connection — not technical specs.
  Navigating to a separate page per show breaks the
  browsing rhythm and reduces the chance of an
  impulse purchase."

Option A — Dedicated product page:
  Full-page experience. All show details in one place.
  ✓ Complete information architecture
  ✓ Familiar e-commerce pattern
  ✗ Breaks browsing flow — user loses catalog context
  ✗ Back-navigation required to compare shows

Option B — Quick view side panel ← Chosen direction:
  Opens within the catalog. No page transition.
  ✓ Setlist, format, price and Add to Cart in one place
  ✓ User stays in catalog context
  ✓ Can move between shows without losing position
  ✗ Less space for detailed content than a full page

Image placeholder: side panel open state

---

--- SOLUTION 03 — MOBILE FILTERS ---

Number + title:
  Bringing full filter depth to mobile
  Mobile Filters  ← pink label

Problem:
  "On mobile, the catalog requires the same filtering
  depth as on desktop. The challenge: how to present
  this complexity on a small screen without losing
  usability."

Option A — Stacked accordion:
  All categories in one scrollable sheet.
  ✓ Everything visible in one place
  ✗ Too many decisions at once on a small screen
  ✗ Easy to lose track of what's already selected

Option B — Drill-in navigation ← Chosen direction:
  Each category opens its own dedicated screen.
  ✓ One focused task per screen
  ✓ Follows native iOS and Android patterns
  ✓ Faster filter setup — less cognitive load
  ✗ Requires more taps to navigate between categories

Image placeholder: drill-in navigation state

---

### 6. CASE FOOTER
Reuse the exact same "next case" carousel/preview block
that is already implemented on other case pages.
From this case, the next case preview should show
the Getmancar case — reuse that block exactly as-is,
do not create anything new.

---

## Also update index.html
Make Case 3 card active (remove coming-soon state),
link to case-storefront.html.
Keep the existing thumbnail placeholder as-is — do not change it.

Tags:
  First tag (pink — highlighted): Product Designer
  Remaining tags: E-commerce · Web · End-to-end

Title:
  "Built a concert archive storefront, cutting
  discovery time for dedicated fans"

Description:
  "Built a concert archive storefront, cutting
  discovery time for dedicated fans."
