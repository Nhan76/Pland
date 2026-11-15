# PLAND

PLAND is a Next.js landing app for an AI-driven crypto portfolio command center. The current frontend positions the product around disciplined portfolio reviews, explainable AI reasoning, and portfolio-level risk guardrails.

## Project Structure

- `package/`: active Next.js app.
- `package/markdown/blog/Project_Propose.md`: product brief and source-of-truth positioning.
- root `package.json`: convenience scripts that proxy into `package/`.

## Development

Install dependencies from the app directory:

```bash
cd package
corepack pnpm install
```

Start the development server:

```bash
corepack pnpm dev
```

If you explicitly want to try Turbopack again:

```bash
corepack pnpm dev:turbo
```

Run validation:

```bash
corepack pnpm lint
corepack pnpm build
```

## Performance Conventions

- Animate only `transform` and `opacity` in looping CSS keyframes so they run on the compositor (no per-frame layout/paint).
- Below-the-fold sections go through `LazySection`: their chunks are prefetched on idle after the hero intro, rendered with a deferred (interruptible) update, and their CSS animations are paused via `data-offscreen` while scrolled out of view. JS-driven loops should pause off screen too (`useInView`).
- Pointer-driven effects write CSS custom properties directly (see `SpotlightCard`) instead of React state, so hovering never re-renders charts.
- The hero `LaserFlow` WebGL canvas renders at ≤1x pixel ratio, caps at ~60 fps, stops entirely when off screen or the tab is hidden, and only steps its resolution down if the GPU can't keep up.
- Static illustrations (including animated SVGs) live in `public/` and are rendered with `next/image` and explicit dimensions to avoid layout shift and keep them out of the JS bundle.

## Notes

- App package name: `pland`
- Root workspace package name: `pland-root`
- Landing copy and branding have been aligned to `PLAND`
- `dev` is pinned to `next dev --webpack` because Turbopack currently panics in this Windows nested-package setup with `Next.js package not found`.


