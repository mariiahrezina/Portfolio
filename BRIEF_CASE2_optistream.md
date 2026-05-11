# Case 2 — Natera OptiStream · Brief for Claude Code

## ⚠️ CRITICAL: Styles & components
This task is NOT about designing new UI.
Use ONLY existing styles and structure from case-getmancar.html.

- Use exact same CSS classes, typography, spacing, and layout patterns
- Do NOT create new styles, colors, font sizes, or spacing
- Do NOT hardcode any colors — use only CSS variables from style.css
- If unsure → reuse the closest existing block from case-getmancar.html

All sections must reuse existing components from case-getmancar.html
(hero, cards, image blocks, captions, meta blocks, section labels, etc.)
Do NOT redesign components — only adapt content.

New components allowed (but must use same typography and colors):
- Interactive pipeline stepper (System & Complexity section)
- Key Challenges cards (3-column grid)
These are new in structure but must match the visual style of case-getmancar.html exactly.

## ⚠️ IMAGES: Placeholders only
No real images are available yet. Use placeholders only:
- Plain div with background color from existing palette only
- border-radius same as image blocks in case-getmancar.html
- No shadows, gradients, or new styles
- Keep layout, spacing, and proportions exactly as if real images were present

---

## Task
Create case-optistream.html using the exact same styles,
fonts, colors and layout patterns as case-getmancar.html.
Reuse css/style.css completely — no new CSS files.

---

## Page structure

### 1. NAV
Same as all other pages.

### 2. CASE HERO
Back link: ← All work

Headline (same typography as case-getmancar.html —
use identical font, size, weight and color as the
main headline on that page, max-width 800px):
  "Replaced manual document workflows with an
  AI-assisted review platform"

Subline:
  "OptiStream is an AI-powered platform that automates
  healthcare document processing — helping teams extract,
  classify, and validate data faster while reducing
  manual work."

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
"OptiStream is an AI-powered platform that automates
healthcare document processing, helping teams extract,
classify, and validate data faster while reducing
manual work."

Meta block below overview (4 columns, small all-caps
label above, value below):
  MY ROLE: Product Designer — end-to-end: discovery,
           hypotheses, workflow design, validation
  THE TEAM: Cross-functional team: PM, designers,
            frontend/backend and ML engineers
  TIMELINE: June 2025 – Present
            MVP in 3 months, ongoing iterations
  PLATFORM: Web Application

---

### 5. SYSTEM & COMPLEXITY
Label: SYSTEM & COMPLEXITY
Title (Lora serif): "A 5-step pipeline. Each step
designed from scratch."

Replace ONLY the text inside this section with:
"The system is built as a multi-step workflow where
each stage depends on the previous one — making early
errors costly and accuracy critical.
It combines AI automation with human validation,
requiring interfaces that balance speed, clarity,
and control.
Documents move through a pipeline: clustering,
classification, extraction, matching, and final
processing."

Then insert the INTERACTIVE PIPELINE COMPONENT below.

--- INTERACTIVE PIPELINE COMPONENT ---
Build in pure HTML/CSS/JS. No libraries.

5 steps connected by horizontal lines.
Steps: Clustering · Classification · Data Extraction
       · Tagging · Matching

Layout rules:
- All 5 step circles must be on the same vertical baseline
- Use a flex row where each connector is a flex:1 wrapper div
  containing the line — this ensures circles stay aligned
- Step circle: 48px, border-radius 50%
- Inactive: border 2px solid #E8E5DE, bg #F8F6F1, color #B0AEA8
- Active: bg #1A5C3A, border #1A5C3A, color #fff
- Done: bg #E8F4EE, border #1A5C3A, color #1A5C3A
- Connector: 2px height, bg #E8E5DE
  fills green (#1A5C3A) when step is done
- Step label: 11px, max-width 80px, centered below circle

Below pipeline: description card
(white bg, 1px #E8E5DE border, border-radius 12px,
padding 22px 28px)
- Large muted number (Lora serif ~36px, color #E8E5DE)
- Step title (15px, 500, color #1A1916)
- Step description (13px, color #7A7870, line-height 1.6)

Navigation: Back / Next buttons.
Next on last step = Restart.
Step counter: "Step X of 5" right-aligned.

Step content:
1. Clustering
   "Before anything can be processed, documents need to be
   sorted into logical batches. Wrong grouping here breaks
   everything downstream."

2. Classification
   "AI labels each document — but a human must confirm.
   Dozens of types, each with its own logic and edge cases."

3. Data Extraction
   "Fields are pulled automatically, but documents are messy.
   The reviewer validates every field side by side
   with the source."

4. Tagging
   "AI suggests standardised codes. The reviewer confirms
   or overrides. One wrong code changes the
   financial outcome."

5. Matching
   "The reviewer picks the correct match from AI-ranked
   candidates — linking the document to a person
   in the system."

Button colors:
  Back: border #E8E5DE, bg #F8F6F1, text #1A1916
  Next: bg #1A5C3A, text #fff
--- END PIPELINE COMPONENT ---

---

### 6. KEY CHALLENGES
Label: KEY CHALLENGES

3 cards in a row (1 column on mobile).
Card style: same as existing cards in case-getmancar.html
(white bg, border, border-radius, padding).
This is a new 3-column layout but must use existing card styles.

Each card:
- Large muted number — same serif font and muted color as in case-getmancar.html
- Title — same serif font, size and color as section titles in case-getmancar.html
- Body text — same size, color and line-height as body text in case-getmancar.html
- Chip tag at bottom — same style as existing tags in case-getmancar.html,
  green accent (use existing --accent-green variable)

Card 01:
  Title: "The most complex documents were processed
          manually, outside the platform"
  Body: "The goal: bring this complex type of documents
  into the platform and reduce manual effort
  significantly — without sacrificing accuracy."
  Chip: High-complexity flow

Card 02:
  Title: "Reviewers had to validate many fields at once —
          but not all of them were relevant"
  Body: "Empty fields, irrelevant data, no way to
  customise the view. The interface showed everything —
  whether it mattered or not."
  Chip: Configurable Workspace

Card 03:
  Title: "One work queue, many different use cases —
          manual setup every single session"
  Body: "Every reviewer started from scratch. No saved
  context, no shortcuts — just the same repetitive
  configuration, every time."
  Chip: Saved Filters

---

### 7. SOLUTIONS

Each solution follows this structure — same as in case-getmancar.html:
  - Large muted number + solution title + pink drop label
    (reuse exact same solution header component)
  - Key solutions block (bold label + 1 sentence)
  - Result line at bottom

--- SOLUTION 01 — EOB PROCESSING ---

Number + title:
  01  Handling the most complex financial document
      High-complexity flow  ← pink label

Key solutions (bold label · description):
  Two-tab structure ·
  Mirroring the document's own structure makes the
  interface instantly familiar. Reviewers scan faster,
  context is never lost.

  Error prevention flow ·
  Auto-calculation at every step guides the reviewer
  toward a correct outcome. The interface won't allow
  validation until the numbers add up — errors caught
  before they happen.

  Adding structured data without cluttering the table ·
  The table stays clean. Complexity opens on demand.
  An elegant entry point into a heavy task.

Result line:
  "Processing time reduced by X%"

--- SOLUTION 02 — DATA EXTRACTION ---

Number + title:
  02  Giving users control over what they see
      Configurable Workspace  ← pink label

Key solutions:
  Workspace customisation to reduce cognitive load ·
  Only the most relevant fields are shown by default —
  no empty fields, no noise. Reviewers focus on what
  actually needs validation.

Result line:
  "Validation time reduced by X%"

--- SOLUTION 03 — FILTERS ---

Number + title:
  03  Letting users configure the work queue
      to their needs
      Saved Filters  ← pink label

Key solutions:
  Saved filters ·
  Users configure their work queue once and pin it —
  every session starts with the right context already applied.
  Less setup, more work done.

Result line:
  "Filter setup time cut by X%"

---

### 8. PROTOTYPING & VALIDATION
Label: PROTOTYPING & VALIDATION
Title (Lora serif): "Prototyping close to the real thing"

Text:
"For complex B2B products, a static prototype isn't
enough. I rebuilt the full logic of each flow in
Figma Make — automations, calculations, edge cases —
so that subject matter experts could test real
behaviour, not imagine it. Their feedback drove
every iteration."

Image: placeholder only — follow placeholder rules defined above.
Same proportions as image blocks in case-getmancar.html.
Caption under image:
"228 versions of the EOB flow alone — not because
things went wrong, but because every session with
SMEs surfaced new logic to refine."

---

### 9. CASE FOOTER
← All work

Next case preview — placeholder:
Reuse existing card component from case-getmancar.html.
Text "Up next — Case 3" in same serif font as used across the site.
"Coming soon" badge — same chip/tag style as used in case-getmancar.html.
No link, not clickable.

---

## Also update index.html
Make Case 2 card active (remove coming-soon state),
link to case-optistream.html.
Card thumbnail: use same dark background approach as
other case cards on the page — no new colors, no gradients.
Tags: Desktop web app · Healthcare · AI
Title: "Natera OptiStream — Designing for complexity"
Description: "AI-powered healthcare document processing.
End-to-end design of a multi-step validation workflow."
