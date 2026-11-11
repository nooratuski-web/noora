---
name: Noora Portfolio Archive
description: A restrained editorial portfolio archive with warm paper, serif display type, and handwritten annotations.
colors:
  paper: "#eee9df"
  paper-shadow: "#d2ccc1"
  ink: "#171717"
  burgundy: "#5a1824"
  annotation-pink: "#e98db2"
typography:
  display-home:
    fontFamily: "Cormorant Garamond MISTE, Georgia, serif"
    fontSize: "clamp(76px, 10.4vw, 168px)"
    fontWeight: 430
    lineHeight: 0.72
    letterSpacing: "-0.04em"
  display-resume:
    fontFamily: "Cormorant Garamond MISTE, Georgia, serif"
    fontSize: "clamp(72px, 10vw, 156px)"
    fontWeight: 450
    lineHeight: 0.68
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
    letterSpacing: "0.16em"
  annotation:
    fontFamily: "Segoe Print, Bradley Hand, cursive"
    fontWeight: 600
    lineHeight: 1.08
rounded:
  square: "0"
  sheet: "20px 20px 0 0"
  tab: "18px 18px 0 0"
  pill: "999px"
spacing:
  compact: "12px"
  control-x: "18px"
  section: "58px"
  page-x: "clamp(28px, 6vw, 96px)"
components:
  archive-action:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "12px 18px"
  folder-tab:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.tab}"
    padding: "14px 28px 12px"
  resume-sheet:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sheet}"
---

# Design System: Noora Portfolio Archive

## Overview

**Creative North Star: "The Personal Editorial Archive"**

The homepage, work index, and résumé form one restrained portfolio extension: warm paper surfaces and oversized serif titles frame the personal archive, while compact sans-serif labels keep navigation and metadata practical. Burgundy supplies emphasis inside the display typography, and pink handwriting appears as an occasional human annotation rather than a general-purpose accent.

This document records the implemented extension; it does not replace the wider portfolio's existing project-specific visual languages. The résumé is intentionally structural at this stage: its factual content remains pending and must not be inferred from the layout.

**Key Characteristics:**

- Warm paper and near-black ink establish an editorial base.
- Large, tightly set serif display type contrasts with small tracked sans-serif labels.
- Burgundy emphasis and pink handwriting are sparse, role-specific accents.
- Layouts are spacious and asymmetrical, with the résumé becoming a contained paper sheet.

## Colors

The palette is paper-led and quiet, with one dark typographic accent and one handwritten annotation color.

### Primary

- **Archive Ink:** The principal text, image-ground, button, and tab color.
- **Warm Paper:** The homepage field and résumé sheet surface.

### Secondary

- **Deep Burgundy:** Emphasis inside the large serif name and résumé title only.
- **Annotation Pink:** Handwritten notes, the portrait arrow, selection, and focus emphasis.

### Neutral

- **Paper Shadow:** The outer résumé-page field that visually separates the inner paper sheet.

### Named Rules

**The Annotation Rule.** Pink belongs to handwritten or interaction-level marks; it is not a fill color for large surfaces.

**The Extension Rule.** Preserve project-specific case-study palettes. These archive colors govern the personal homepage and résumé, not every portfolio project.

## Typography

**Display Font:** Cormorant Garamond MISTE (with Georgia and serif fallbacks)  
**Body Font:** System UI (with platform sans-serif fallbacks)  
**Annotation Font:** Segoe Print (with Bradley Hand and cursive fallbacks)

**Character:** High-contrast serif display type gives the personal pages their editorial identity. Small sans-serif text carries navigation, labels, and body copy; handwriting is deliberately informal and rare.

### Hierarchy

- **Homepage Display** (430 weight, fluid oversized scale, 0.72 line-height): the two-line personal introduction.
- **Résumé Display** (450 weight, fluid oversized scale, 0.68 line-height): the centered résumé title on wide screens and left-aligned title on mobile.
- **Body** (400 weight, 14px, 1.9 line-height): résumé copy, kept to a maximum of 66 characters per line in the implemented content region.
- **Label** (400 weight, 10px, tracked): roles, archive metadata, and compact section labels.
- **Annotation** (600 weight, 1.08 line-height): short handwritten portrait and résumé notes only.

### Named Rules

**The Three-Voice Rule.** Use serif for display, sans-serif for information, and handwriting only for a brief personal aside.

## Layout

The homepage uses a two-column composition with text beside a tall portrait, separated by a wide fluid gap. Page padding grows fluidly up to 96px. The résumé begins with a three-column header, followed by a two-column paper sheet: profile information occupies roughly one third and content occupies the remainder. The work page retains its sparse image-led carousel and fixed archive navigation rather than adopting the résumé sheet.

At 820px and below, the homepage becomes a vertical composition, the portrait narrows to 88% and aligns right, and the résumé header and sheet collapse to single columns. At 600px and below, the work carousel imagery expands from 23vw to 52vw while fixed navigation moves to 16px side insets.

## Elevation & Depth

The archive uses no box shadows. Depth comes from tonal separation between the paper sheet and its darker surrounding field, image contrast, borders, overlap, and fixed foreground navigation.

### Named Rules

**The Paper-Not-Shadow Rule.** Separate archive surfaces with tone, thin borders, and overlap; do not add floating card shadows.

## Shapes

The base work interface remains square and image-led. Personal archive controls use full pills, while the folder tab and résumé sheet round only their upper corners so they still read as physical filing and paper forms. Images remain rectangular without decorative rounding.

## Components

### Archive Actions

- **Shape:** Full pill with a fine ink border.
- **Primary:** Ink fill with paper text; the first homepage action is primary at rest.
- **Secondary:** Transparent paper surface with ink text.
- **Hover / Focus:** Secondary actions invert to ink and paper; keyboard focus uses the pink outline treatment already implemented globally.

### Fixed Navigation

- **Style:** Small sans-serif links at the upper-left and footer edges, initially muted through opacity.
- **Hover / Active:** Text reaches full opacity and a thin underline grows from left to right.
- **Mobile:** Side insets tighten while typography remains compact.

### Resume Sheet

- **Corner Style:** Upper corners only, square at the bottom.
- **Background:** Warm paper over the darker paper-shadow field.
- **Depth Strategy:** Tonal layering and fine internal dividers, with no shadow.
- **Structure:** Profile column and content column on wide screens; one continuous column on mobile.
- **Content Status:** Pending facts remain visibly marked as pending until confirmed source content is supplied.

### Handwritten Annotation

- **Style:** Pink cursive text, slightly rotated, paired with a hand-drawn arrow only on the portrait treatment.
- **Usage:** One short personal aside per major personal surface; it is not body copy or navigation.

### Folder Tab

- **Style:** Ink background, paper text, tracked uppercase label, and rounded top corners.
- **Placement:** Attached to the bottom edge of the homepage as a direct route to selected work.

## Do's and Don'ts

### Do:

- **Do** preserve generous negative space around display type and portrait imagery.
- **Do** keep burgundy inside the serif emphasis role and pink inside annotation or interaction roles.
- **Do** retain the work page's sparse image-led behavior as part of the same archive, even though its canvas remains white.
- **Do** leave résumé facts explicitly pending until verified content is available.

### Don't:

- **Don't** turn this extension into a replacement identity for individual case studies.
- **Don't** use handwriting for long copy, labels, or navigation.
- **Don't** add shadows, gradients, or rounded cards that are absent from the implemented archive.
- **Don't** fabricate résumé details, credentials, dates, tools, or contact information.
