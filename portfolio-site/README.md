# Tasin — Portfolio & Toolkit Site

A personal portfolio and business site built with Next.js (App Router) and TypeScript. The
hero is a hand-built Three.js car scene (no external `.glb` model — every panel is a
primitive, so there's nothing to fail to load). Below it is a genuinely working toolkit: a
Pomodoro-style focus timer, a task board, and an analytics chart that reflects real completed
sessions.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000. The first build needs internet access once, to fetch the
Inter and Space Grotesk fonts via `next/font/google` — after that they're self-hosted from
`.next/`, same as any Next.js font-optimized project.

## Before you deploy

- **Contact info** — already filled in and live: `tasink898@gmail.com`, GitHub
  (`github.com/Tasink2k`), and LinkedIn, in both `Navigation.tsx` and `ContactSection.tsx`.
- **Copy** — the "What I work on" and "About" sections use placeholder-free but generic
  copy about your interests (cybersecurity/DFIR, C++, networking). Adjust freely to match
  your actual experience and specific projects as you build more of them.
- **Not deployed yet** — this is a local project. To make it live for real visitors, deploy
  it (Vercel is the natural fit for Next.js) and point a domain at it if you have one.

## Project structure

```
app/                  Next.js App Router entry (layout, page, globals.css)
components/
  3d/                 CarScene, CarModel, CarConfigurator, CarHotspots, error boundary
  ui/                 Button, Card — small reusable primitives
  dashboard/          ProgressRing, HUDPanel
  analytics/          PerformanceChart (recharts)
  tasks/              TaskBoard
  focus/              FocusTimer
  Navigation.tsx, HeroSection.tsx, WorkSection.tsx, AboutSection.tsx, ContactSection.tsx
  ToolkitSection.tsx  Wires timer + board + chart together
hooks/                useFocusTimer, useTasks — state/business logic, kept out of components
lib/                  utils.ts (formatting, WebGL/reduced-motion detection), analytics.ts
types/                Shared TypeScript types
```

## What's real vs. what's a fallback

- **3D scene**: if WebGL isn't supported, or the canvas throws at runtime, a static SVG
  fallback panel renders instead of a blank section or a crash (see `CarScene.tsx` and
  `CanvasErrorBoundary.tsx`).
- **Reduced motion**: `prefers-reduced-motion` disables auto-rotate and wheel-spin animation,
  and the global CSS collapses all other transitions/animations.
- **Task board**: persists to `localStorage`; empty columns show a real empty state, not a
  blank space.
- **Focus timer**: a real countdown (`setInterval` + delta-based state), not a static mockup.
- **Analytics chart**: reads a small session log written to `localStorage` each time a focus
  session completes — it starts empty (with an explicit empty state) and fills in as you use
  the timer, rather than shipping fake seed data.

## Verified locally

- `npx tsc --noEmit` — passes with no type errors.
- `npm run build` — succeeds (requires network access for Google Fonts on a clean install).
