# Developer Portfolio

A modern, animated single-page developer portfolio built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, GSAP, Motion, and Three.js.

## Stack

- **Framework:** Next.js 16, React 19, App Router, TypeScript 5
- **Styling:** Tailwind CSS v4, PostCSS
- **Fonts:** Geist Sans, Geist Mono (`next/font` via `geist` package)
- **Animation:** Motion (motion/react), GSAP, ScrollTrigger, Three.js (@react-three/fiber, @react-three/drei)
- **Icons:** Lucide React, React Icons, Tabler Icons
- **Code highlight:** react-syntax-highlighter (Prism)

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Before Going Live

1. **Resume:** Add your `resume.pdf` to the `public/` folder so the "Download Resume" button works (links to `/resume.pdf`). If the file is missing, the button will still appear but the download may 404 until you add it.
2. **Data:** Edit `src/data/portfolio.ts` with your name, tagline, projects, certifications, gallery images, and social links.
3. **Images:** Add assets to `public/images/`, `public/projects/`, and `public/gallery/` as needed. Update paths in `portfolio.ts` if you use different filenames.
4. **Routes page:** Update UPI ID, QR image, and name in `app/routes/page.tsx`.

## Structure

- `app/` — App Router: `layout.tsx`, `page.tsx`, `globals.css`, `routes/page.tsx`
- `app/components/` — Sections (Nav, Landing, About, Skills, Certifications, Projects, Gallery, Contact, Footer) and shared UI
- `app/components/three/` — Three.js hero scene (ParticleField, FloatingObjects, HeroScene)
- `app/components/ui/` — Reusable UI (navbar-menu, textType, sparkles, button_moving_border, etc.)
- `src/lib/utils.ts` — `cn()` for class names
- `src/hooks/` — useOutsideClick, useScroll, useMousePosition
- `src/data/portfolio.ts` — Mock/placeholder data (replace with your content)

## Sections & IDs (smooth scroll)

- `#landing` — Hero with Three.js background and typing text
- `#about` — About me card and stats
- `#skills` — Code-editor style skills block
- `#certifications` — Certification cards
- `#projects` — Project grid and modal
- `#gallery` — Masonry gallery and lightbox
- `#contact` — Social links only (no backend)

## Routes

- `/` — Main portfolio (single-page scroll)
- `/routes` — Support / coffee page (UPI, QR, sparkles)

No backend is included; the contact section uses social links only.
