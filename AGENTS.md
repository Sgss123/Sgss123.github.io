# AGENTS.md

> Guidelines for AI coding agents working on this project.

## Project Overview

- **Name**: mfjip612-github-io
- **Type**: Personal blog (Vue 3 + Vite + SSG)
- **Domain**: https://www.waterspo.top

## Tech Stack

- **Framework**: Vue 3 + Vite
- **Styling**: Tailwind CSS v4 + shadcn-vue (New York style)
- **Animation**: GSAP + animate.css
- **UI Components**: Lucide icons, reka-ui, class-variance-authority
- **Content**: Markdown (.md as assets), KaTeX, Mermaid, Shiki code highlighting
- **Media**: xgplayer (video player)
- **Deployment**: Tencent EdgeOne Makers (via Git integration)
- **Package Manager**: bun

## Key Commands

```bash
bun run dev           # Dev server (port 5173)
bun run build         # Type check + build (vue-tsc && vite build && SSG render)
bun run type-check    # vue-tsc --noEmit
bun run dev:edgeone   # EdgeOne Makers local dev
```

## Project Structure

```
pages/                 # Vike file-based routing (SSR)
  +config.ts           # Global Vike configuration
  +Layout.vue          # Root layout component
  +Head.vue            # Global head/SEO
  +onPageTransition*.ts # Page transition hooks
  index/               # Home page
  about/               # About page
  article/             # Article/blog pages
  friends/             # Friends/links page
  shows/               # Shows page

src/
  components/          # Shared Vue components
    ui/                # shadcn-vue components
  lib/                 # Utilities (e.g., utils.ts)
  types/               # TypeScript type definitions
  views/               # Page-level view components
  articles/            # Article content/data
  assets/              # Static assets (CSS, images)
  router/              # Router-related code

edge-functions/        # EdgeOne Makers edge functions
dist/                  # Build output (client)
```

## Conventions

### Code Style

- TypeScript: strict mode, no unused locals/parameters
- Path alias: `@/` maps to `./src/`, `@/types` maps to `./src/types/index.ts`
- Vue: use `<script setup lang="ts">` for SFCs
- No comments unless explicitly requested

### Routing

- Vike file-based routing — pages live in `pages/`
- URL route matches directory name (e.g., `pages/about/` → `/about`)

### Styling

- Tailwind CSS v4 (via `@tailwindcss/vite` plugin)
- Custom CSS: `src/assets/css/custom.css`
- shadcn-vue components use `neutral` base color with CSS variables
- Use `cn()` from `@/lib/utils` for merging Tailwind classes

### Build

- Client assets output: `dist/client/`
- SSG pre-render via `scripts/render-html.ts`
- Manual chunks: vue, highlight.js, katex, animate.css, gsap

### Edge Functions

- EdgeOne Makers edge functions live in `edge-functions/`
- `/api` endpoint: `edge-functions/api/index.js`

## Important Notes

- Vue SPA entry: `src/main.ts` / `src/router`
- Static site generation (SSG) via `scripts/render-html.ts`
- Custom Vite plugins: `vite-ssg-plugin.ts`
- Base URL: `https://www.waterspo.top`
