# Performance Optimization & Dark Mode

**Date:** 2026-08-05
**Status:** Approved (pending user review of written spec)
**Owner:** etalase-digital-kuanyar

## Goal

Reduce page-to-page navigation latency and add a class-based dark mode that respects system preference, persists across reloads, and never flashes the wrong theme.

### Targets

- Inter-page navigation: **< 300 ms** (after first paint, on warm cache)
- Village Profile (`/profil`): **< 500 ms** first contentful paint
- Lighthouse Performance: **> 90**
- Zero theme flash on reload
- Every component works in light and dark mode

## Scope

In scope:

- Client-side route prefetch for the 5 main nav items
- Lazy `VillageMap` (Leaflet) via dynamic import + IntersectionObserver
- NProgress top bar wired to React Router
- Skeleton fallbacks + fade transitions between routes
- Dark mode: toggle, no-flash inline boot script, dark variants across all surfaces
- Vite `manualChunks` vendor split
- Lint + build green

Out of scope:

- SSR / server-side rendering (Vite SPA only)
- New design system / visual overhaul
- Backend / API changes

## Stack Context

- React 19, Vite 8, TypeScript 6
- Tailwind CSS v4 (CSS-first, `@theme` + `@custom-variant dark`)
- `react-router-dom` v7 (`createBrowserRouter` + `RouterProvider`)
- `react-leaflet` v5 + `leaflet` v1.9 (heavy, ~150 KB)
- `@tanstack/react-query` v5
- Linter: `oxlint`

Existing dark-mode primitives that we will reuse and not rewrite:

- `@custom-variant dark (&:where(.dark, .dark *))` in `src/index.css:43`
- `.dark { ... }` token overrides in `src/index.css:117`
- `DarkModeToggle` + `useDarkMode` in `src/components/ui/DarkModeToggle.tsx`

## Design

### 1. Instant navigation

- All routes already use `react-router-dom` `Link` — no full reloads.
- Add a `prefetchRoute(path)` helper in `src/lib/prefetch.ts`:
  - Maps path → dynamic `import()` matching `src/router.tsx` lazy imports.
  - Called on link `onMouseEnter` / `onFocus` and once on `requestIdleCallback` for the 5 main nav items.
  - Side effect: warms the route chunk so the subsequent navigation is instant.
- NProgress bar (`nprogress` package, ~3 KB):
  - Mounted once in `App.tsx` above `RouterProvider` (or in a small `<TopProgress />` component).
  - `start()` on `useLocation` pathname change.
  - `done()` 100 ms after the lazy chunk settles (tracked via a small `useEffect` that listens to the router's `useNavigation` state).
  - Style the bar with `primary` color via `nprogress.configure({ template: ... })`.

### 2. Code splitting & lazy loading

Already done (kept):

- Route-level `lazy()` in `src/router.tsx`.

To add:

- **`src/components/sections/MapLazy.tsx`**: thin wrapper that
  - returns `<LoadingSkeleton variant="image" />` initially,
  - uses `IntersectionObserver` to mount a `lazy(() => import('./VillageMap'))`,
  - renders a `Suspense` boundary around the actual map.
- Re-export `MapLazy` as the default `VillageMap` import in callers (Profil page, Kontak page). The heavy original stays untouched and is only reached via the lazy wrapper.
- **`vite.config.ts`**: add `build.rollupOptions.output.manualChunks`:
  - `react-vendor`: `react`, `react-dom`, `react-router-dom`
  - `map-vendor`: `leaflet`, `react-leaflet`
  - `tanstack`: `@tanstack/react-query`
  - `forms`: `react-hook-form`, `@hookform/resolvers`, `zod`
- **`@tanstack/react-query`** default options: `staleTime: 60_000`, `refetchOnWindowFocus: false`, `retry: 1`. **SKIP** — current app uses static mock data, no active query hooks at runtime.

### 3. Loading UX

- `LoadingSkeleton` already supports `card` / `list` / `text` / `image` variants. `LazyWrapper` in `router.tsx:24` uses `variant="card"`; for `Profil` and `Kontak` add `variant="image"` for the map slot.
- Fade transition:
  - Wrap `<Outlet />` in `MainLayout` with `<div key={location.pathname} className="animate-fade-in">`.
  - Keyframe `fadeIn` already exists at `src/index.css:430`.
- No blank white: dark-mode boot script (see §4) sets `<html class="dark">` before the first paint, so the very first frame already matches the user's theme.

### 4. Dark mode

**No-flash boot script** — insert at the top of `<head>` in `index.html`:

```html
<script>
  (function () {
    try {
      var saved = localStorage.getItem('theme');
      var dark = saved ? saved === 'dark'
        : window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (dark) document.documentElement.classList.add('dark');
    } catch (e) {}
  })();
</script>
```

Runs synchronously before CSS loads. The catch guards against `localStorage` being blocked (private mode, etc.).

**`DarkModeToggle` refactor** (`src/components/ui/DarkModeToggle.tsx`):

- Drop the `useState(false)` + `useEffect` init pattern (causes a one-tick mismatch with the boot script).
- Read initial state from `document.documentElement.classList.contains('dark')` via a lazy initializer.
- On toggle: write `localStorage`, flip class on `documentElement`.
- Subscribe to `matchMedia('(prefers-color-scheme: dark)')` change so the app follows system changes when the user has not picked a manual preference.
- Track manual preference with a `localStorage.theme === 'manual'` sentinel; if absent, follow system.

**Mount** in `src/components/layout/Navbar.tsx:69` (right side, before the Admin button). Use the existing `Button` ghost variant.

**Dark variants to add / verify:**

- `HeroSection` gradient: `dark:from-primary-light/20 dark:via-background dark:to-surface` (`src/components/sections/HeroSection.tsx:15`).
- Leaflet popup overrides in `.dark` block of `src/index.css`:
  - `.leaflet-popup-content-wrapper`, `.leaflet-popup-tip` — set `background-color: var(--color-surface)`, `color: var(--color-text)`.
  - `.leaflet-control-attribution` — readable on dark.
- Audit for hardcoded `bg-white` / `bg-gray-*` / `text-black` / `text-white` outside intentional logo/icon contexts. Replace with token classes (`bg-background`, `text-text`, `border-border`) so dark mode Just Works.
- `AdminLayout` sidebar already uses `bg-background`/`bg-surface`/`text-text-muted` — automatic.
- `DataTable` uses `bg-surface` + `border-border` — automatic.

### 5. Performance tweaks

- `vite.config.ts` manual chunks (see §2).
- `<img>` cards: keep `loading="lazy"`, add `decoding="async"`.
- `index.html`: keep the existing `preconnect` to Google Fonts; add `media="print" onload="this.media='all'"` swap pattern only if Lighthouse flags font CSS as render-blocking (otherwise leave alone — YAGNI).
- `queryClient` defaults — skipped (see §2).

### 6. Audit & commit

- `npm run lint` — fix any new violations.
- `npm run build` — must pass (tsc -b && vite build). No `any` regression, no unused imports.
- `npm run preview` + manual Lighthouse run (Chrome devtools) — record scores; do NOT commit any binary artifacts.
- Commit: `feat: optimize navigation performance and add dark mode`
- Push: `origin/master` (user requested).
- Final report: list of changed files, build output, perf estimate, and a description of the light/dark mode visual states (no PNGs committed).

## File-level change list (planned)

| File | Change |
| --- | --- |
| `index.html` | Add no-flash boot script in `<head>` |
| `src/index.css` | Add Leaflet popup dark overrides, hero gradient dark variant |
| `src/router.tsx` | Keep as-is |
| `src/lib/prefetch.ts` | **New** — `prefetchRoute(path)` helper |
| `src/components/ui/TopProgress.tsx` | **New** — NProgress wrapper bound to RR7 |
| `src/components/sections/MapLazy.tsx` | **New** — IntersectionObserver-based lazy map |
| `src/components/ui/DarkModeToggle.tsx` | Refactor to read from DOM + matchMedia subscription |
| `src/components/layout/Navbar.tsx` | Mount `<DarkModeToggle />` + prefetch on hover |
| `src/layouts/MainLayout.tsx` | Wrap `<Outlet />` with key-based fade-in |
| `src/App.tsx` | Mount `<TopProgress />` |
| `src/components/sections/HeroSection.tsx` | Add dark gradient variant |
| `vite.config.ts` | Add `manualChunks` |
| `src/pages/*` | Use `MapLazy` instead of `VillageMap` where the map is below the fold |
| `src/components/cards/*.tsx` | Add `decoding="async"` to `<img>` |

## Non-goals / explicit skips

- No new dependencies beyond `nprogress` and its CSS (already tiny, well-known, MIT). Everything else uses already-installed packages.
- No service worker / PWA (not requested).
- No SSR migration (would change the project shape entirely).
- No `View Transitions` API (browser support incomplete as of 2026-Q1).
- No re-architecting of `AuthContext` or query layer.

## Verification

- `npm run build` exits 0.
- `npm run lint` exits 0.
- Manual: navigate Beranda → Profil → BeritaGaleri → UMKM → Kontak in DevTools "Fast 3G" throttling — observe NProgress bar, no blank white, map chunk loads on demand.
- Manual: toggle dark mode, refresh — no flash, theme persists.
- Manual: Lighthouse Performance > 90 on `/` and `/profil`.

## Risk & rollback

- Inline boot script is small and wrapped in try/catch; worst case it does nothing and falls back to current behavior.
- `manualChunks` may shift file names; if a hardcoded `import('@/assets/...')` path breaks, the build will fail loudly.
- `MapLazy` adds one extra render before the real map mounts; the skeleton keeps perceived performance acceptable.
- All changes are reversible by `git revert <commit-sha>`.
