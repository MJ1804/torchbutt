# TorchButt — Project Spec

**Version:** 1.0
**Last updated:** 2026-11-02

---

## Concept & Vision

TorchButt is a meme. A crude, irreverent, low-effort-looking web presence built around a single character illustration — a butt with a torch poking up from the top, crowned with an emerald flame. The vibe is pure internet nonsense, channeling the energy of Dick Butt (K.C. Green's legendary 2006 webcomic meme). The character is the entire brand. The site exists to put it in your face and let people share it.

The joke is the simplicity. The character is stupid. The site should look a little stupid too — but in a deliberate, self-aware way that makes it memorable.

---

## Dick Butt Reference — What We're Emulating

Dick Butt (K.C. Green, 2006) is an anthropomorphic butt with a phallus protruding from its backside, drawn in a crude cartoon style. It became a legendary meme through:
- **Unexpected reveal format** — hidden in image macros, revealed in the final frame
- **Anti-aesthetic** — deliberately crude, low-effort-looking art that subverts polished meme culture
- **Character persistence** — the same simple character recognizable across thousands of variants
- **Shock humor** — transgressive without being genuinely offensive, just absurd
- **Surprise domain** — dickbutt.com is a real, functional (if sparse) website selling merch

**TorchButt is the same concept with a torch:**
- Butt with a torch poking up instead of a... thing
- Emerald green flame at the top
- Crude cartoon style
- Same irreverent, absurdist energy
- The character is the entire product

---

## Design Language

### Aesthetic Direction
**"Meme Site Brutalism"** — No polish, no design system, no UX theater. The character dominates. Everything else is scaffolding. Think: what if a meme had a website because it went viral hard enough to deserve one.

### Color Palette
| Role | Hex | Notes |
|------|-----|-------|
| Background | `#0D0D0D` | Near-black — character pops |
| Primary (flame) | `#6EE786` | LibertyTorch emerald green |
| Secondary (flame core) | `#F5D300` | Gold/yellow flame inner |
| Accent | `#FF4D4D` | Red for contrast moments |
| Text | `#F5F5F5` | Off-white |
| Muted | `#666666` | Secondary text |

### Typography
- **Headings:** Impact, Arial Black, sans-serif — the Dick Butt aesthetic (bold, all-caps, aggressive)
- **Body:** Arial, sans-serif — deliberately basic web 1.0 energy
- **No custom fonts** — keeps it raw

### Spatial System
- Character is full-width or near-full-width, centered
- Generous vertical breathing room above/below character
- Minimal padding elsewhere
- Mobile-first, character always visible above the fold

### Motion Philosophy
- Minimal — the character is static, the site is simple
- Optional: subtle flame flicker animation (CSS keyframes)
- Optional: hover scale on character (1.0 → 1.02)
- No page transitions, no scroll animations, no loading states

### Visual Assets
- **Character:** `torchbutt.png` — the TorchButt illustration (AI-generated or future custom art)
- **Flame overlay:** CSS gradient or separate flame image
- **No stock photos, no icons, no illustrations other than the character**

---

## Layout & Structure

### Single-Page Layout (index.html)

```
┌─────────────────────────────────────────┐
│  [TORCHBUTT logo / text — top center]   │
├─────────────────────────────────────────┤
│                                         │
│         [CHARACTER IMAGE — huge]        │
│         [flame animation overlay]       │
│                                         │
├─────────────────────────────────────────┤
│  "THE MEME THAT LIGHTS YOUR BEHIND."    │
│  [SHARE THIS IMAGE ↗] [DOWNLOAD ↓]      │
├─────────────────────────────────────────┤
│  ABOUT  |  GALLERY  |  MERCH (future)   │
├─────────────────────────────────────────┤
│  © 2026 TorchButt — a TorchTorch product │
└─────────────────────────────────────────┘
```

### Pages
1. **`index.html`** — The main page. Character + tagline + share/download CTAs
2. **`gallery.html`** — Grid of TorchButt variants, macros, and reaction images (future content)
3. **`about.html`** — Brief explainer, "what is TorchButt?" (optional — keep it short)
4. **`assets/`** — Character images, variants, meme templates

### Responsive Strategy
- Character scales with viewport width (max 600px wide)
- Nav collapses to minimal on mobile
- Everything stacks vertically

---

## Features & Interactions

### Core Features
1. **Hero Character Display** — TorchButt character front and center, with optional CSS flame flicker
2. **Share Button** — Opens native share dialog (Web Share API) or copies image URL to clipboard
3. **Download Button** — Triggers download of `torchbutt.png` character image
4. **Minimal Nav** — About | Gallery | Merch (future)
5. **Footer** — Copyright, TorchTorch attribution

### Interactions
- **Share button:** Web Share API → falls back to clipboard copy with "Copied!" toast
- **Download button:** direct `<a download>` trigger
- **Character hover:** subtle scale (1.0 → 1.02) for tactile feel
- **Flame:** CSS `@keyframes` flicker animation on the character overlay

### Edge Cases
- Web Share API not supported → clipboard copy fallback
- Image fails to load → alt text "🔥" with dark background
- Gallery page with no images yet → "More coming soon..." placeholder

---

## Component Inventory

### Hero Character
- `<img>` tag, `max-width: 100%`, centered
- Optional CSS overlay for flame flicker
- States: loading (blank dark BG) | loaded | error (🔥 fallback)

### Share Button
- Primary CTA, emerald green background, black text
- Hover: slightly brighter green
- Active: scale down 0.98
- Success state: "Copied!" text swap (2s, then revert)

### Download Button
- Secondary CTA, transparent background, white border
- Hover: white background, black text
- Active: scale down 0.98

### Nav
- Simple `<nav>` with `<a>` links
- No hamburger menu needed — links fit on one line even on mobile
- Active page: emerald underline

### Footer
- Muted text, centered
- Links: TorchTorch project, GitHub

---

## Technical Approach

### Stack
- **Plain HTML + CSS + vanilla JS** — no framework, no build step, pure meme energy
- **Single HTML file per page** — no routing, no SPA
- **All assets in `/assets/`** — character images, variants

### File Structure
```
projects/torchbutt/
  site/
    index.html          — main page
    gallery.html        — meme gallery
    about.html          — about page
    css/
      styles.css        — all styles
    js/
      app.js            — share, download, interactions
    assets/
      torchbutt.png     — main character image
      variants/         — macro/variant images (future)
  SPEC.md
  README.md
```

### SEO / Meta
- `og:image` = TorchButt character
- Title: "TorchButt — The Meme That Lights Your Behind"
- Description: "TorchButt. A butt with a torch. Emerald flame. That's it. That's the meme."
- No analytics, no tracking — just the meme

### Deployment
- **Vercel** — static site, `site/` as root
- Deploy command: `cd projects/torchbutt/site && ./deploy.sh <token>`
- Domain: `torchbutt.com` (future) or `torchbutt.vercel.app` for now
- Vercel project: `torchbutt`, team `mj1804`

---

## Meme Template System (Future)

Once variants are ready, TorchButt follows the Dick Butt tradition:
- Character isolated on transparent PNG → can be dropped into any meme template
- Standard position: character bottom-left or bottom-right, small, for reveal-in-final-frame format
- Caption format: `[setup panels]` → `[TorchButt reveal]`
- Caption placement: below character in Impact font, all-caps

Example macro structure:
```
Panel 1: [situation setup — text in Impact]
Panel 2: [escalation — text in Impact]
Panel 3: TORCHBUTT [character image, large]
```

---

## Dick Butt Meme Archetypes (for TorchButt evolution)

1. **The Reveal** — setup panels → TorchButt in the final frame
2. **The Reaction** — TorchButt as a reaction image with caption
3. **The Crossover** — TorchButt inserted into unrelated scenes/memes
4. **The Absurd Context** — TorchButt in an official-looking document or serious setting
5. **The Product** — "TorchButt brand" merchandise mockups

---

## Status (as of 2026-11-02)

- [x] GitHub repo initialized (`MJ1804/torchbutt`)
- [x] TorchButt character image sourced (AI-generated)
- [x] **Full comic site built** — redesign inspired by reference site
  - index.html: hero + ticker + latest comic + archive preview + downloads
  - archive.html: full comic archive with all 3 issues
  - css/styles.css: paper-grain aesthetic, Zine/Impact/Share Tech Mono fonts, ink/green/paper palette
  - js/app.js: comic modal reader, X share, punchline editor + canvas download
  - Assets: `torchbutt.png`, `issue-01.png`, `issue-02.png`, `issue-03.png`
  - **Quick-ref:** `projects/torchbutt/TORCHBUTT.MD` (for AI sessions)
- [x] Custom domain `torchbutt.com` live with SSL (Vercel)
- [ ] Custom font (Zine/headline.otf) — currently using Share Tech Mono + Impact fallback
- [ ] More comic issues (archive is sparse with only 2)
- [ ] Meme template assets (isolated transparent PNG variants)
