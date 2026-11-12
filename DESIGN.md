---
name: Noora Portfolio Archive
description: A continuous champagne-paper editorial archive with royal-brown type and restrained puce accents.
colors:
  archive-light: "#f5e6d1"
  archive-pale: "#d5c5c8"
  archive-silver: "#b5aca3"
  archive-steel: "#9da3a4"
  archive-ink: "#533a33"
  archive-pink: "#c96d8a"
  archive-bright-pink: "#db7f8e"
  archive-night: "#604d53"
typography:
  display:
    fontFamily: "Cormorant Garamond MISTE, Georgia, serif"
    fontSize: "clamp(4rem, 9vw, 6rem)"
    fontWeight: 430
    lineHeight: 0.77
    letterSpacing: "-0.04em"
  body:
    fontFamily: "system-ui, -apple-system, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.9
  label:
    fontFamily: "system-ui, -apple-system, sans-serif"
    fontSize: "10px"
    fontWeight: 400
    letterSpacing: "0.13em"
  annotation:
    fontFamily: "Segoe Print, Bradley Hand, cursive"
    fontWeight: 600
    lineHeight: 1.08
rounded:
  square: "0"
  archive-tab: "0 0 12px 12px"
spacing:
  section-x: "clamp(24px, 6vw, 96px)"
  section-top: "clamp(86px, 9vw, 132px)"
  section-bottom: "clamp(72px, 8vw, 112px)"
components:
  archive-tab:
    backgroundColor: "{colors.archive-steel}"
    textColor: "{colors.archive-ink}"
    rounded: "{rounded.archive-tab}"
    padding: "13px 18px 11px"
  archive-tab-active:
    backgroundColor: "{colors.archive-pale}"
    textColor: "{colors.archive-pink}"
    rounded: "{rounded.archive-tab}"
    padding: "13px 18px 11px"
  archive-section:
    backgroundColor: "{colors.archive-light}"
    textColor: "{colors.archive-ink}"
    padding: "clamp(86px, 9vw, 132px) clamp(24px, 6vw, 96px) clamp(72px, 8vw, 112px)"
---

# Design System: Noora Portfolio Archive

## Overview

**Creative North Star: "The Steel-Gray Personal Archive"**

The `/1` résumé is a six-section personal archive built on one continuous champagne-paper field with royal-brown type and restrained puce accents. Oversized serif headings, compact indexed labels, documentary imagery, handwritten asides, and object-based interactions let personal interests and professional experience coexist without turning the page into a conventional résumé sheet.

This is a distinct extension within the broader portfolio, not a replacement for it. The main work index remains sparse, white, image-led, and spatial; project case studies retain their own visual languages. Archive tokens govern the personal résumé surface and should not be imposed on MISTÉ or other case studies.

**Key Characteristics:**

- Six full-viewport editorial sections: profile, off duty, midnight poem, education, experience, and skills/contact.
- Fixed folder-like tabs connect five named archive destinations; the poem remains part of Off Duty.
- Light sections share one continuous champagne field; the plum poem is an inset literary interlude rather than a full-width color break.
- Pink is used for emphasis, active state, annotation, and selected details rather than broad surface fills.
- Motion reveals content and physical archive objects, with a complete reduced-motion fallback.

## Colors

The archive palette is warm and material: champagne paper, royal-brown ink, silver structure, and one controlled puce accent.

### Primary

- **Archive Ink:** Primary text and dark interaction labels.
- **Archive Pink:** Active navigation, secondary emphasis, dates, indices, and selected experience names.

### Secondary

- **Bright Annotation Pink:** Display emphasis, handwriting, arrows, poem accents, and contact emphasis.
- **Archive Night:** The midnight-poem field, supporting light text and vertical Japanese verse.

### Neutral

- **Archive Light:** Light sections, light-on-dark text, and the experience surface.
- **Archive Pale:** Profile and skills surfaces, plus the active archive tab.
- **Archive Steel:** Off-duty surface, rules, inactive tabs, and quiet metadata.

### Named Rules

**The Pink Hierarchy Rule.** Use muted pink for structure and active state; reserve bright pink for expressive emphasis and handwriting.

**The Continuous Field Rule.** Light sections share one paper field. Use spacing, rules, imagery, and the inset poem for rhythm rather than changing the page background at every boundary.

**The Extension Rule.** Keep these colors on the personal archive. Preserve the wider portfolio's white work index and project-specific palettes.

## Typography

**Display Font:** Cormorant Garamond MISTE (with Georgia and serif fallbacks)  
**Body Font:** System UI (with platform sans-serif fallbacks)  
**Poem Fonts:** Noto Serif SC and Noto Serif JP (with serif fallbacks)
**Annotation Font:** Segoe Print (with Bradley Hand and cursive fallbacks)

**Character:** Large, tightly set serif typography gives the archive an editorial voice. Neutral sans-serif carries explanatory text, metadata, navigation, and indexes. Serif CJK text slows the poem into a literary interlude, while handwriting is limited to personal asides.

### Hierarchy

- **Primary Display** (430 weight, fluid 4rem–6rem range, 0.77 line-height): profile introduction.
- **Section Display** (fluid, generally 3.1rem–6rem, approximately 0.78–0.85 line-height): Off Duty, Education, Experience, Skills, and contact headings.
- **Poem Display** (450 weight, fluid 2.5rem–5.5rem, 1.12 line-height): Chinese poem title.
- **Body** (13–16px, 1.8–1.9 line-height): biography, education, project explanation, and interest copy.
- **Label** (9–10px, widely tracked): tabs, metadata, dates, indices, and object controls.
- **Annotation** (600 weight, 1.05–1.4 line-height): portrait caption, bard note, and closing thanks only.

### Named Rules

**The Four-Voice Rule.** Serif leads, sans-serif explains, CJK serif carries poetry, and handwriting adds a short personal aside.

## Layout

Every archive section spans the viewport and uses fluid horizontal padding from 24px to 96px. Desktop layouts vary by content: Profile is a two-column copy/portrait split; Off Duty is a wide collage plus narrower text column; the poem pairs horizontal Chinese text with vertical Japanese text; Education and Experience use three columns; Skills uses paired columns followed by a five-step work-style row and full-bleed contact footer.

The fixed archive tabs sit at the top center and track the visible section. PROFILE, OFF DUTY, EDUCATION, EXPERIENCE, and SKILLS are destinations; the midnight poem shares the OFF DUTY active state.

At 900px and below, tabs become a horizontally scrollable row, section padding becomes 88px 20px 78px, and all multi-column content sections stack. The profile portrait remains right-aligned at 90% width; poem translation keeps its vertical setting; experience rows simplify to two columns; skills and work-style content collapse to single columns.

## Elevation & Depth

The archive uses no box-shadow vocabulary. Depth comes from the continuous paper field, photographic contrast, clipped collage edges, thin silver rules, object rotation, and the fixed tabs overlapping the page edge.

### Named Rules

**The Flat Archive Rule.** Separate sections and objects through tone, crop, rule, and overlap; do not add floating card shadows.

## Shapes

Most content is square-edged and editorial. The fixed archive tabs are the deliberate exception: their lower corners are rounded to read as file-folder tabs hanging from the top edge. Portraits, preview windows, collage fields, rules, and contact blocks remain rectangular.

## Components

### Fixed Archive Tabs

- **Shape:** Top-anchored tabs with rounded lower corners.
- **Default:** Steel background, ink label, and a slight upward offset.
- **Active / Hover:** Active tabs settle flush, switch to pale gray, and use muted pink text; precise-pointer hover also settles the tab.
- **Mobile:** Horizontally scrollable, left-aligned, with a 116px minimum width.

### Section Reveal

- **Default:** Content is readable without JavaScript.
- **Enhanced State:** With JavaScript, reveal elements begin transparent and 5% lower, then resolve over 500ms with the archive ease-out curve.
- **Reduced Motion:** Elements remain visible and unshifted; only a short opacity transition remains.

### Profile Portrait

- **Style:** Tall rectangular night portrait with bright-pink handwritten caption and arrow.
- **Mobile:** Narrows to 90% and aligns to the right beneath the profile copy.

### Off-Duty Collage and Cat Track

- **Style:** Wide documentary collage extends into the section gutter; an animated interest loop crosses the image.
- **Behavior:** On precise pointers, a hand-drawn butterfly follows the pointer and the black cat trails it with damped motion, flipping to face the travel direction. Touch devices use an automatic reversible path.
- **Reduced Motion:** Pointer tracking and translation are removed; the cat and butterfly remain static.

### Artist Book Toggle

- **Style:** Two transparent object images occupy the same frame with a compact ink label.
- **Behavior:** Click toggles closed/open images through opacity, rotation, and scale over 500ms; the accessible pressed state and label change with the object.
- **Reduced Motion:** Rotation and scale are removed; the object changes with opacity only.

### Experience Rows and Preview

- **Style:** Ruled rows combine an index, serif project name, project metadata, and optional detail.
- **Behavior:** Hover or keyboard focus selects the row, colors its name pink, and swaps the adjacent project preview with a brief 200ms entrance.
- **Reduced Motion:** Preview swapping has no animation.

### Skills and Contact

- **Style:** Paired skill/tool columns and numbered work-style statements sit on the pale field; a dark full-width contact block closes the archive.
- **Accent:** Bright pink marks the opportunity heading and handwritten closing note.

## Do's and Don'ts

### Do:

- **Do** treat each section as a distinct editorial field with one clear composition.
- **Do** keep fixed tabs compact, indexed, and synchronized with the visible section.
- **Do** use muted pink for system state and bright pink for expressive emphasis.
- **Do** preserve keyboard focus behavior and all reduced-motion alternatives.
- **Do** keep the work index and individual case studies visually autonomous from the résumé archive.

### Don't:

- **Don't** convert archive sections into a uniform dashboard or card grid.
- **Don't** apply bright pink to large backgrounds or long body copy.
- **Don't** add shadows, gradients, or generalized rounded containers.
- **Don't** remove the poem's vertical Japanese setting or merge it into résumé metadata.
- **Don't** treat the six-section `/1` composition as a new global portfolio template.
