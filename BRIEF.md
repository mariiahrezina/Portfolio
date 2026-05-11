# Portfolio Website — Master Brief for Claude Code

## Project overview
Personal portfolio for Mariia Hrezina, Product Designer. 2 years experience, background in communication management at a product IT company. Completed Growth Design course (Projector Institute). Targeting product IT companies, UA and international market. Audience: hiring managers and recruiters.

---

## Tech stack
Plain HTML + CSS + JavaScript. No frameworks. Multi-page site. All files clean and well-structured — text content easy to find and edit.

---

## Design system

### Colors
```css
--accent-green: #1A5C3A;       /* primary accent */
--accent-green-light: #E8F4EE;
--accent-green-mid: #134A2E;
--accent-pink: #F4A0BC;        /* secondary accent */
--accent-pink-light: #FDE8F0;
--bg: #F8F6F1;                 /* creamy background — used everywhere */
--bg-card: #FFFFFF;
--text: #1A1916;
--text-muted: #7A7870;
--text-light: #B0AEA8;
--border: #E8E5DE;
```

### Typography
- Headings: **Lora** (Google Fonts) — serif, italic for name and key accents
- Body: **DM Sans** (Google Fonts) — clean, modern sans
- Heading sizes: 80px hero name → 64px case title → 32px section title → 24px card title
- Body: 16–17px, line-height 1.7

### Color logic
- Green `#1A5C3A` — primary: name italic, section labels, nav active, stat numbers, main CTAs
- Pink `#F4A0BC` — secondary: "Growth Design" tags, "View case →" arrows, hypothesis borders, solution drop labels, widget accents
- Never use orange — previous version used it, now fully replaced

### Spacing & shape
- Border radius: 12px components, 20px cards
- Nav: fixed, `backdrop-filter: blur(12px)`, becomes bordered on scroll
- Cards: white bg, 1px `#E8E5DE` border, hover lifts with shadow

---

## Navigation (all pages)
```
Mariia Hrezina    Work · About · CV · Email
```
- Logo: Lora serif, links to index.html
- Links: DM Sans 14px, muted color, green on active/hover
- CV opens in new tab (cv.pdf)
- Email: placeholder `your@email.com` — user will replace

---

## Page 1 — index.html (Homepage)

### Hero section — Digital Journal / Moodboard format
Inspired by jackiehu.design. Full viewport height. Creamy background. Large serif headline on the left, floating widgets (journal cards) on the right.

**Left side — text:**
```
[tag] Product Designer
Mariia
Hrezina  ← italic, green
[short description]
I design digital products that are both beautiful and functional —
where strong UX logic meets considered visual craft.
[CTA] View my work →
```

**Right side — floating widgets (journal moodboard):**
Four cards positioned absolutely, each slightly rotated, with subtle float animation. Leave these as **placeholder stubs** — content to be filled in later. Each stub should be a white card with a dashed border and a label like "widget placeholder" in muted text. Approximate positions:
- Top left: rotated −2°
- Top right: rotated +1.5°
- Bottom left: rotated −1° — with left pink border accent
- Bottom right: rotated +2°

Cards should have hover state: straighten slightly + lift.

**Important:** Hero must be fully responsive on mobile. On mobile, widgets stack below the text in a 2×2 grid (not floating/overlapping).

### Work section — Case cards grid
Label: `Selected work` with a thin green line extending right.

2-column grid, gap 24px. On mobile: 1 column.

**Card 1 — Getmancar (active, links to case-getmancar.html):**
```
[thumbnail: dark green gradient with large "G" letter]
[tags] Growth Design (pink bg) · iOS · Mobility
[title] Getmancar — Raise conversion to the first trip
[desc] Only 8.6% of new drivers completed their first ride.
       We redesigned the critical moments that blocked them.
[arrow] View case → (pink color)
```
Hover: card lifts, thumbnail scales slightly.

**Card 2 — Coming soon (not clickable, 60% opacity):**
```
[thumbnail: dark blue gradient with abstract shape]
[tags] Desktop web app · Complex UX · [badge] Coming soon
[title] Desktop web application
[desc] Complex domain, deep UX logic, tight collaboration
       with subject matter experts.
```

**Card 3 — Coming soon:**
```
[thumbnail: neutral dark gradient]
[tags] E-commerce · [badge] Coming soon
[title] E-commerce project
[desc] Retrospective product case — coming soon.
```

### Footer
```
Mariia Hrezina          Email · LinkedIn · CV
```

---

## Page 2 — case-getmancar.html

### Case hero
Back link: `← All work`

Meta block (small labels + values in a row):
```
Role: Product Designer
Team: 3 designers
Type: Growth Design · iOS app
Status: Solutions delivered to client for review
```

Headline (Lora serif, large, max-width 800px):
```
Only 8.6% of new drivers completed their first trip.
We redesigned the critical moments that blocked them.
```
The `8.6%` in italic green.

Subline:
```
A growth design sprint for Getmancar — a carsharing app
operating across Ukraine, Georgia and Moldova.
```

### Hero image band
Full-width band, dark green gradient background (`#0A1F14` → `#1A5C3A` → `#2D8A58`). Three phones displayed side by side, each in a black rounded phone frame (border-radius 28px, padding 8px), slightly rotated. Use `<img>` tags with paths:
- `images/getmancar/tariff-new.png` (rotate −2°)
- `images/getmancar/verif-new-2.png` (rotate +1°)
- `images/getmancar/notify-3.png` (rotate −1°)

### Case content sections

**Section: Context**
Label: `Context`
```
Getmancar is a carsharing service launched in Kyiv in 2018.
Users find a car on the map, unlock it in the app, and pay per
minute, hour or day — no paperwork, no keys. Our team analysed
the activation funnel and identified why the majority of new
users never made it to their first ride.
```

**Section: The problem**
Label: `The problem`
Large stat: `8.6%` in green Lora serif (~96px)
Below: `of new drivers completed their first trip after signing up`

**Section: Research**
Label: `Research`
```
We rode the cars ourselves, interviewed users, and analysed
competitors. The key insight: users weren't failing because of
bad intentions — they were failing because the app never gave
them a reason to stay.
```

---

### Solution 1
Header with large number `01` in muted gray (Lora, ~72px) + title + pink drop label:
```
01  Tariff selection as a separate step
    Drop at "Started adding data" → −18%  ← pink color
```

Problem text:
```
Users saw all tariff information dumped onto the car card —
prices, conditions, deposits — with no way to understand which
tariff made sense for their trip. Confusion led to drop-off.
```

**Before / After grid (2 columns):**

Before:
- Label: `Before` with short gray line
- Two phones side by side:
  - `images/getmancar/tariff-old-1.png`
  - `images/getmancar/tariff-old-2.png`

After:
- Label: `After` with short green line
- Two phones side by side:
  - `images/getmancar/tariff-new.png`
  - `images/getmancar/tariff-new-2.png`

Hypothesis box (white card, pink left border):
```
Hypothesis
"If we separate tariff selection into its own step and let users
calculate the cost based on their destination, more users will
feel confident enough to book."
```

Detail screens row (horizontal scroll on mobile):
- `images/getmancar/tariff-list.png`
- `images/getmancar/car-details.png`
- `images/getmancar/tariff-details.png`

Caption: `Tariff list → car details → tariff breakdown with estimator`

Metrics line:
```
Metrics we'd track: First ride conversion · Tariff selection rate · Drop-off at tariff selection
```

---

### Solution 2
```
02  Verification after car selection
    Drop during document upload → −19.5%  ← pink
```

Problem text:
```
The old flow pushed users to verify their identity right after
sign-up — before they'd seen a single car or understood why
Getmancar was worth the hassle. Many dropped off during
verification never to return.
```

Before / After:

Before phones:
- `images/getmancar/verif-old-1.png`
- `images/getmancar/verif-old-2.png`

Caption below before: `Registration prompted immediately — before the user has seen any value`

After phones:
- `images/getmancar/verif-new-1.png`
- `images/getmancar/verif-new-2.png`

Caption below after: `Sign-in appears after choosing a car and tariff — user already has motivation`

Hypothesis:
```
"If users first choose a car and a tariff — and feel the pull of
an actual trip — they'll have enough motivation to complete
verification."
```

Detail screens:
- `images/getmancar/verif-new-3.png`
- `images/getmancar/verif-new-7.png`

Caption: `Scanning license → car reserved while documents are being checked (motion available)`

Metrics:
```
Metrics we'd track: Verification completion rate · First ride conversion · Drop-off during verification
```

---

### Solution 3
```
03  "Notify me" when a car is nearby
    Concept by me · UI implementation by teammate  ← pink, smaller
```

Problem text:
```
In many cases, new users opened the app to find no cars nearby —
and had no reason to return. They closed the app and opened a
competitor.
```

Screens row (4 phones, horizontal scroll on mobile):
- `images/getmancar/notify-1.png`
- `images/getmancar/notify-3.png`
- `images/getmancar/notify-4.png`
- `images/getmancar/notify-5.png`

Caption: `Empty state → car found alert → home screen push → lock screen notification`

Hypothesis:
```
"If users can subscribe to a notification when a car appears
nearby, they'll return to the app instead of switching to a
competitor."
```

Metrics:
```
Metrics we'd track: Push opt-in rate · Return rate · First ride conversion
```

---

### Also addressed section
Label: `Also addressed`

Intro text:
```
Beyond the three core solutions, we also worked on improving
other friction points across the funnel.
```

4-column grid (2 columns on mobile):
```
Location permission
Redesigned opt-in prompt with clear value explanation
before asking for access

Social proof
Added ratings and reviews to car cards to reduce fear
before the first trip

UI kit update
Refreshed the visual language and updated Google Maps
styling for clarity

Dynamic Island
Designed Live Activity states for active searches —
keeping users informed out of app
```

### What we'd measure
Label: `What we'd measure`

Table (full width, thin borders):
```
Solution              | Primary metric               | Secondary
Tariff step           | First ride conversion        | Tariff selection rate
Verification timing   | Verification completion rate | Drop-off rate
Notify me             | Push opt-in rate             | Return rate
```

### Case footer
```
← All work                                    Case 2 coming soon
```

---

## Page 3 — about.html (placeholder)
Clean centered placeholder. Large decorative symbol (Lora serif). Text:
```
About page
Digital journal format coming soon — a more personal look
at who I am beyond the work.
← Back to work
```

---

## Reference sites (for style inspiration)
- jackiehu.design — hero digital journal format, widget/moodboard style
- artemis1.framer.website — clean structure, minimal
- hellodani.co — hover animations, micro-interactions
- danielsun.space — animations, energy
- oisheesen.webflow.io — case study presentation
- whepworth.co — case structure, clean
- dianarenko.com — case structure

Key animation notes from refs:
- Custom cursor: show label "You" on hover (like jackiehu.design) — implement as a small pill that follows cursor
- Case card hover: smooth lift + thumbnail scale
- Hero widgets: subtle float animation (CSS keyframes, no libraries)
- Section reveals: fade-in on scroll using IntersectionObserver

---

## Image files available at
All images in `images/getmancar/`:
```
tariff-new.png, tariff-new-2.png
tariff-list.png, car-details.png, tariff-details.png
tariff-old-1.png, tariff-old-2.png
verif-new-1.png, verif-new-2.png, verif-new-3.png, verif-new-7.png
verif-old-1.png, verif-old-2.png
notify-1.png, notify-3.png, notify-4.png, notify-5.png
```

---

## What to replace manually after generation
- `your@email.com` → real email
- `yourprofile` in LinkedIn URL → real username
- `cv.pdf` → upload real CV file
- Hero widget placeholders → real journal content (to be decided later)

---

## First message to send Claude Code
```
Read BRIEF.md and build the portfolio website exactly as described.
Start with the file structure, then index.html, case-getmancar.html,
about.html, and css/style.css. Use the images already in the
images/getmancar/ folder.
```
