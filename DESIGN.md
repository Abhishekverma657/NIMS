---
version: alpha
name: "NIMS Hospital public website"
description: "A high-trust hospital website that makes urgent care and specialist access feel immediate, calm, and authoritative."
colors:
  primary: "#172A34"
  navy: "#172A34"
  navyDeep: "#0A171F"
  clinicalBlue: "#2A6073"
  emergencyRed: "#BD171C"
  trustGold: "#E5B64A"
  surface: "#FFFFFF"
  canvas: "#F8FAFC"
  ink: "#1E293B"
  muted: "#64748B"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, Roboto, sans-serif"
  body:
    fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, sans-serif"
rounded:
  DEFAULT: "0.875rem"
  control: "9999px"
  card: "1.125rem"
spacing:
  page-max: "80rem"
  section-gap: "3.5rem"
components:
  hero:
    backgroundColor: "{colors.navyDeep}"
    textColor: "{colors.surface}"
    rounded: "{rounded.card}"
  button-primary:
    backgroundColor: "{colors.emergencyRed}"
    textColor: "{colors.surface}"
    rounded: "{rounded.DEFAULT}"
    padding: "0.78rem"
  button-secondary:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.surface}"
    rounded: "{rounded.DEFAULT}"
  callback-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "1.65rem"
  trust-badge:
    backgroundColor: "{colors.clinicalBlue}"
    textColor: "{colors.surface}"
    rounded: "{rounded.DEFAULT}"
  gold-rule:
    backgroundColor: "{colors.trustGold}"
    height: "3px"
  page-canvas:
    backgroundColor: "{colors.canvas}"
  helper-text:
    textColor: "{colors.muted}"
---

# NIMS Hospital Design System

## Overview

### Creative North Star

The public site should feel like a luxury hospital command centre: composed under pressure, clinically authoritative, and materially rich without becoming flashy. The hero uses midnight-blue image treatment, a precise crimson action accent, and antique-gold details to make care feel exceptional and immediate.

### Product context and register

- **Audience and primary job:** Patients and families in Jaipur seeking emergency, OPD, specialist, or hospital information; guide them to care quickly.
- **Target market(s) and evidence:** India, based on NIMS Hospital Jaipur’s public-site content and Indian phone / appointment language in the repository.
- **Locale(s) and language policy:** English UI with Indian medical terminology; retain existing approved public copy.
- **Usage scene:** Mobile-first, often urgent or emotionally loaded; calls to action must be obvious and reachable.
- **Register:** Brand-led public healthcare site.
- **Memorable signature:** A calm midnight “clinical dossier” over real hospital imagery, cut by a gold precision rule and a single crimson booking action.
- **Restraint:** Information sections, forms, and emergency actions should remain direct, high-contrast, and familiar.
- **Anti-references:** Generic SaaS glass dashboards and decorative medical stock-site gradients; neither conveys institutional care or urgency.
- **Token ownership/runtime mapping:** This document mirrors the canonical CSS variables in `src/styles/index.css`; component-specific hero rules live in `src/components/home/ModernHeroSlider.css`.

## Colors

Navy provides clinical authority, white provides clarity, and emergency red is reserved for decisive care actions. Gold is a small trust accent, never a body-text color. All interactive states use contrast, motion, and outline in addition to color.

## Typography

Plus Jakarta Sans is the display face for clear, confident healthcare statements. Roboto carries body copy and forms for comfortable reading. Headlines use tight tracking; supporting copy stays at a relaxed, readable measure.

## Layout

The shared content rail is 1280px with 24px side padding. On desktop, hero copy, proof points, and app links are composed inside one restrained midnight-and-gold dossier so they read as one decision area rather than loose overlays. On tablet and mobile, this resolves back to a compact readable stack, and the service rail becomes horizontally scrollable rather than clipped.

## Elevation & Depth

Use midnight overlays on photography and one restrained shadow for interactive white surfaces. Static content should use borders and spacing before shadow. The hero’s gold rule and crimson booking action are the deliberate expressive exceptions.

## Shapes

Controls are pill-shaped for quick recognition; information cards use a 18px radius. Use hairline white or slate borders to separate layers, and Lucide’s rounded outline icons throughout.

## Components

### Foundational visual states

Interactive elements lift or brighten on hover, show a 3px visible focus ring, and respect reduced-motion preferences. Busy or unavailable controls retain their geometry.

### Buttons and actions

All shared CTAs use the same App Store-style treatment: near-black fill, crisp white 1px outline, 7px corners, and a restrained dark shadow. NIMS Tatkaal Seva is the single red emergency exception; it retains the same outline and geometry. The hero’s app-distribution pair uses Apple and Google Play icons with two-line store labels, retaining full accessible names. Every icon action retains an accessible text label or aria-label.

### Brand navigation

Use the approved horizontal NIMS Hospital logo in the header so the institution is immediately recognisable. Keep the primary navigation and urgent booking action as readable text so first-time patients can scan destinations immediately.

### Forms and overlays

The callback card remains a compact white consultation surface. Inputs gain a red focus outline and retain visible labels through placeholders only where the existing form pattern requires them.

### Motion

Slider transitions are calm fades; hover movement stays under 3px. Reduced-motion users receive no auto-advance animation or animated progress treatment.

## Do's and Don'ts

- **Do:** Let the emergency path remain visually decisive and easy to scan.
- **Do:** Use real hospital imagery as atmosphere, with text protected by a strong overlay.
- **Don't:** Add decorative gradients or glass surfaces outside the hero’s layered photograph context.
- **Don't:** Make secondary booking paths compete with the emergency action.
