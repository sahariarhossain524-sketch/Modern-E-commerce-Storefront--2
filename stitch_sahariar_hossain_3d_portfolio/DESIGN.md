---
name: Cyber-Professional
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#ebb2ff'
  on-secondary: '#520072'
  secondary-container: '#b600f8'
  on-secondary-container: '#fff6fc'
  tertiary: '#f5f5ff'
  on-tertiary: '#2b3040'
  tertiary-container: '#d4d8ee'
  on-tertiary-container: '#595e70'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#f8d8ff'
  secondary-fixed-dim: '#ebb2ff'
  on-secondary-fixed: '#320047'
  on-secondary-fixed-variant: '#74009f'
  tertiary-fixed: '#dee1f7'
  tertiary-fixed-dim: '#c2c6db'
  on-tertiary-fixed: '#161b2b'
  on-tertiary-fixed-variant: '#414658'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: '800'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  section-gap: 120px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style
The design system is engineered for a "Cyber-Professional" aesthetic, balancing technical rigor with high-energy visual accents. It targets a sophisticated audience of tech recruiters, engineering managers, and open-source contributors who value precision and modern tooling. 

The visual narrative combines a **Minimalist** foundation—focused on whitespace and structured data—with **Glassmorphism** and **High-Contrast** elements. The goal is to evoke a sense of an advanced IDE or a futuristic terminal interface that remains highly readable and professional. The emotional response is one of reliability, cutting-edge expertise, and digital craftsmanship.

## Colors
The palette is rooted in deep, low-light environments to reduce eye strain and emphasize luminous content. 

- **Base Surfaces:** Use "Midnight Blue" (#0A0F1E) for primary backgrounds and "Deep Charcoal" (#121212) for secondary sections to create subtle structural depth.
- **Accents:** "Neon Cyan" (#00F0FF) is the primary action color, used for links, active states, and critical data points. "Electric Purple" (#BC13FE) serves as a secondary accent for gradients, tags, and brand highlights.
- **Functionals:** Success states should utilize a desaturated cyan-green; error states should use a high-vibrancy coral to contrast against the dark background.

## Typography
The typography system uses a dual-font approach to reinforce the developer identity. 

**Inter** provides a highly legible, neutral canvas for headers and prose, ensuring the portfolio feels premium and accessible. **JetBrains Mono** is utilized for labels, metadata, and technical snippets to inject a "functional" aesthetic. 

Headlines should utilize tight tracking and heavy weights. For display text, use a subtle text-shadow of the primary cyan color at very low opacity (5-10%) to create a "digital glow" effect without compromising legibility.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a 12-column structure for desktop. 

- **Desktop (1440px+):** 12 columns, 64px margins, 24px gutters.
- **Tablet (768px - 1024px):** 8 columns, 40px margins, 20px gutters.
- **Mobile (Under 768px):** 4 columns, 20px margins, 16px gutters.

The spacing rhythm is strictly based on an 8px base unit. Section vertical spacing is generous (120px+) to allow the "neon on dark" elements room to breathe and prevent visual clutter. Use asymmetrical layouts for project showcases to create a more dynamic, "engineered" feel.

## Elevation & Depth
Depth in this design system is achieved through **Glassmorphism** and **Tonal Layering** rather than traditional shadows.

- **Level 0 (Background):** Deepest blue/charcoal, flat.
- **Level 1 (Cards/Sections):** Slightly lighter charcoal with a 1px border (#ffffff10).
- **Level 2 (Overlays/Modals):** Backdrop blur (20px) with a semi-transparent dark fill (#0A0F1E80). 
- **Glows:** Use "Ambient Glows"—large, low-opacity radial gradients of Cyan and Purple placed behind key components to create a sense of light-emitting hardware.
- **Outlines:** Use thin, high-contrast borders for interactive elements to mimic the precision of a technical UI.

## Shapes
The shape language is "Soft" yet precise. Elements use a 0.25rem (4px) base radius to maintain a professional, slightly sharp edge that feels more like a dashboard than a consumer social app.

Large containers like cards can use up to 0.75rem (12px) for a more modern feel, but buttons and inputs should remain at the tighter 4px radius.

## Components
- **Buttons:** Primary buttons feature a solid Cyan background with black text for maximum contrast. Secondary buttons use a ghost style with a 1px Cyan border and a subtle hover glow.
- **Cards:** Project cards utilize the Level 2 elevation (glassmorphism). On hover, the border color should transition from gray to Cyan or Purple.
- **Chips/Tags:** Monospaced text (JetBrains Mono) inside a subtle Purple-tinted capsule with 0.1 opacity fill.
- **Inputs:** Darker than the background surface, using a Cyan bottom-border focus state.
- **Code Blocks:** Styled to match a customized "One Dark" or "Night Owl" theme, integrated seamlessly into the card structures.
- **Progress Bars:** Use a gradient from Cyan to Purple to represent skill proficiency or project completion.