# Beyond the School Wall (BTSW)

> Where Learning Meets Possibilities! Equipping the next generation of builders, founders, and leaders with real-world execution tools, AI companions, and simulations.

[![Next.js 15](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS%20v4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

---

## 🌟 Brand Design System & Color Palette

All colors and surface tokens are defined in [`app/globals.css`](./app/globals.css):

- **Primary Orange**: `#F16736` (`--btsw-primary`)
- **Primary Hover / Active**: `#e05524` / `#c84618`
- **Orange Tint / Badge Surface**: `#fff1eb` (`--btsw-primary-tint`)
- **Dark Text & Canvas**: `#1e1e1e` (`--btsw-dark`)
- **Hero Dark Gradients**: `#121212` to `#1a1a1a`
- **Soft Background**: `#faf9f7` (`--btsw-bg-soft`)
- **Subtle Border**: `#e8e5e0` (`--btsw-border`)
- **Muted Text**: `#6b6b6b` (`--btsw-muted`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18+ or 20+ (tested on Node v24)
- npm 10+

### Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build

# 4. Start production server
npm run start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🧭 Project Architecture

- **`app/`**: Next.js 15 App Router pages and layouts:
  - `page.tsx`: Homepage with Three.js 3D motion hero
  - `globals.css`: Centralized brand CSS tokens & component utilities
  - `layout.tsx`: Root layout with Inter font and persistent shell
  - `programs/`: Programs catalog and dynamic `[slug]` pages
  - `portal/`: Student Ecosystem & interactive simulation playground
  - `tools/`: AI tools (Scholarship Finder, University Match, Learnin Star, Project Generator, Industry Explorer, Career Path)
  - `events/`: Catalyst Conference, Prefect Conference, Game Tech Convention
  - `simulations/`: Simulations & Strategic Games (Virtual simulation training games, Get Table top Games, Game Recommendations for you)
  - `luminaire/`: Luminaire Virtual Academy
  - `admin/`: Director and admin controls
- **`components/`**: Reusable Next.js components (`Navbar`, `Footer`, `Logo`, `Layout`)
- **`lib/`**: Business logic, storage with SSR safeguards, Anthropic / Gemini integration, simulation engine
- **`types.ts`**: TypeScript data contracts
