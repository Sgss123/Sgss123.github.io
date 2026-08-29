# Waterspo Studio SOTD Redesign Implementation Plan

## Global Constraints

- Preserve all public routes, EdgeOne fallback redirects, two locales, three theme modes, six Lab experiments, product URLs, filings, Google Analytics, and the current simplified logo.
- Use only verified company and product facts. Do not invent customers, metrics, awards, team history, or competitive claims.
- Use the approved signal-editorial direction: cream `#f7e8c1`, slate `#262d32`, signal red `#a52228`; Bricolage Grotesque display, Noto Sans SC body/CJK, IBM Plex Mono utility; locally hosted and project-glyph-subsetted.
- Motion uses SVG/CSS, `requestAnimationFrame`, and `IntersectionObserver`; no GSAP, WebGL, scroll hijacking, or compulsory loader. Reduced-motion users receive a static completed state.
- Keep runtime React 18 and align React type packages to major 18.
- Do not commit the Next-generated `AGENTS.md` or `CLAUDE.md`; remove only those known generated files after all development-server runs.

## Task 1: Locale root layout and routing semantics

- Add failing tests for locale-to-document-language mapping and locale message parity, then implement the smallest helpers needed.
- Move the document root layout into the locale segment so production HTML emits `lang="en"` and `lang="zh-CN"` without request-bound header or cookie reads.
- Put `/` and unprefixed English fallback redirects behind a lightweight fallback root layout while preserving current canonical URLs, proxy behavior, static EdgeOne fallbacks, metadata, fonts, themes, top loader, and Analytics.
- Align `@types/react` and `@types/react-dom` with React 18.
- Verify unit tests, typecheck, production build, and route status/redirect behavior.

## Task 2: Signal-editorial design system and motion primitives

- Add failing tests for the public `SignalField` variant preset contract (`hero`, `band`, `lab`) and reduced-motion-safe defaults.
- Implement locally hosted, glyph-subsetted Bricolage Grotesque, Noto Sans SC, and IBM Plex Mono assets with combined WOFF2 size near or below 500 KB and corresponding license notices.
- Replace mixed color usage with a single semantic token system for light/dark modes and create the responsive editorial layout utilities.
- Implement the client SVG `SignalField` with typed props, line-draw entrance, pointer-responsive CSS variables updated via one animation frame, intersection-triggered activation, and static reduced-motion behavior.
- Keep the supplied simplified Logo geometry and make all focus/selection/motion primitives accessible.

## Task 3: Content, public product media, and complete page redesign

- Add failing tests for product media metadata, verified external URLs, bilingual key parity, navigation priorities, and the `mailto:support@waterspo.top` contact action.
- Capture only publicly visible Waterspo Bridge and SentenceGymnasium pages; crop representative UI, store responsive AVIF/WebP locally, and provide localized alt text.
- Extend `ProductItem` with media and presentation fields, then rewrite bilingual copy using only existing verified facts.
- Rebuild Home in this order: brand thesis, two products, capabilities, Lab proof, studio statement, email CTA.
- Rebuild Services with products first, About with verified business/field facts, Contact with the clickable email, and Lab/list/detail shells without changing experiment behavior.
- Rebuild Header/Footer: main navigation is Products & Services, About, Contact; Logo returns Home; Lab is secondary/footer navigation; preserve language/theme controls and Chinese filings.

## Task 4: Accessibility, integration regression coverage, and release verification

- Add skip navigation, focus-visible consistency, 44 px targets, mobile-menu Escape/focus behavior, accurate footer nav labels, long-email wrapping, theme color metadata, and polite live-region success updates.
- Add an HTTP smoke test runner for development and production covering `/`, `/zh`, primary pages, legacy Lab redirects, canonical/hreflang, and document language.
- Run format check, lint, unit tests, TypeScript, production build, and smoke tests in both server modes.
- Complete real-browser QA at 1440 px and 390 px for both locales and light/dark/system themes, including keyboard, reduced motion, menu, product links, and screenshots. Do not claim visual verification until the browser runtime succeeds.
- Remove only the generated `AGENTS.md` and `CLAUDE.md`, then confirm the final working-tree diff contains only intended implementation files.