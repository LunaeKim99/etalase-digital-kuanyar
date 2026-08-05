# Performance Optimization & Dark Mode — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce inter-page navigation to <300 ms, add NProgress, load Leaflet lazily via IntersectionObserver, add class-based dark mode with zero-flash, run lint+build clean, commit.

**Architecture:** Vite 8 SPA, React 19, Tailwind v4 CSS-first, `react-router-dom` v7 `createBrowserRouter`. All nav is already client-side. Add prefetch helper + NProgress bar; lazy-map via IntersectionObserver wrapper; inline no-flash script in `index.html`; add `dark:` variants to all hardcoded colors.

**Tech Stack:** React 19, Vite 8, TypeScript 6, Tailwind v4, `react-router-dom` v7, `react-leaflet` v5, `nprogress` (~3 KB), `oxlint`.

---

## Global Constraints

- Tailwind v4 CSS-first config: `@custom-variant dark (&:where(.dark, .dark *))` in `src/index.css:43`.
- No new dependencies beyond `nprogress` + its CSS.
- All navigation uses `<Link>` — zero `<a href="...">` page reloads.
- `oxlint` as linter, `tsc -b && vite build` as type-check+build.
- No SSR. Vite SPA only.
- Commit message: `feat: optimize navigation performance and add dark mode`.

---

### Task 1: Install nprogress and add its CSS

**Files:**
- Modify: `package.json` (dependencies)
- Create: `src/nprogress.css`

**Interfaces:** None. This is a standalone setup step.

- [ ] **Step 1: Install nprogress**

Run: `npm i nprogress && npm i -D @types/nprogress`

Expected: `nprogress@0.2.0` and `@types/nprogress@0.2.3` added to `package-lock.json`.

- [ ] **Step 2: Create `src/nprogress.css`**

```css
#nprogress .bar {
  background: var(--color-primary);
  height: 3px;
}
#nprogress .peg {
  box-shadow: 0 0 10px var(--color-primary), 0 0 5px var(--color-primary);
}
#nprogress .spinner-icon {
  border-top-color: var(--color-primary);
  border-left-color: var(--color-primary);
}
```

This wires the progress bar color to the app's primary token, so it works in both light and dark mode.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json src/nprogress.css
git commit -m "deps: add nprogress for top navigation bar"
```

---

### Task 2: No-flash dark mode boot script

**Files:**
- Modify: `index.html:21` (insert `<script>` before `<div id="root">`)

**Interfaces:** Reads `localStorage.theme` + `prefers-color-scheme` media query. Sets `<html class="dark">` synchronously before CSS paints. The `DarkModeToggle` in Task 3 will read from this DOM state.

- [ ] **Step 1: Add inline script to `index.html`**

Insert inside `<body>`, before `<div id="root">`:

```html
<script>
  (function () {
    try {
      var saved = localStorage.getItem('theme');
      var dark = saved
        ? saved === 'dark'
        : window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (dark) document.documentElement.classList.add('dark');
    } catch (e) {}
  })();
</script>
```

The `try/catch` guards against `localStorage` being blocked in private mode or SSR contexts. The script runs synchronously before any CSS loads, so the very first paint already has the correct theme class.

- [ ] **Step 2: Verify manually**

Open DevTools → Local Storage, set `theme` to `dark`. Refresh the page. The background should be dark (`#0f172a`) on the very first frame — no white flash.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "fix: add inline no-flash dark mode boot script"
```

---

### Task 3: Refactor DarkModeToggle to use DOM state + matchMedia

**Files:**
- Modify: `src/components/ui/DarkModeToggle.tsx:6-55`
- Modify: `src/components/layout/Navbar.tsx:69-73`

**Interfaces:** `DarkModeToggle` exports `function DarkModeToggle(): JSX.Element`. Mounts between the nav links and the Admin button. Reads initial state from `document.documentElement.classList.contains('dark')` (set by the boot script). Subscribes to `matchMedia('(prefers-color-scheme: dark)')` change events so the app follows system when the user has not made a manual selection.

- [ ] **Step 1: Rewrite `DarkModeToggle.tsx`**

Replace entire file:

```tsx
import { useEffect, useSyncExternalStore } from 'react'
import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'

function getSnapshot(): boolean {
  return document.documentElement.classList.contains('dark')
}

function getServerSnapshot(): boolean {
  return false
}

function subscribe(callback: () => void): () => void {
  // Re-render when system theme changes (only matters if user hasn't set manual preference)
  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}

export function DarkModeToggle() {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  useEffect(() => {
    // Follow system when no manual preference is stored
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      if (localStorage.getItem('theme')) return
      document.documentElement.classList.toggle('dark', e.matches)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const toggle = () => {
    const next = !dark
    localStorage.setItem('theme', next ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', next)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggle}
      aria-label={dark ? 'Light mode' : 'Dark mode'}
    >
      {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </Button>
  )
}
```

Key changes:
- Drops `useState` + `useEffect` init pattern (eliminates the one-tick mismatch with the boot script).
- Uses `useSyncExternalStore` to read DOM state directly — stays in sync with the boot script and any other code toggling the class.
- `matchMedia` listener only fires when user has NOT set a manual preference (no `localStorage.theme`).

- [ ] **Step 2: Mount `DarkModeToggle` in Navbar**

In `src/components/layout/Navbar.tsx`, add import and mount:

```tsx
// Add import at top (after existing imports)
import { DarkModeToggle } from '@/components/ui/DarkModeToggle'
```

Replace the `<div className="hidden md:flex items-center gap-3">` block (around line 69) with:

```tsx
<div className="hidden md:flex items-center gap-3">
  <DarkModeToggle />
  <Button variant="ghost" size="sm" asChild>
    <Link to="/admin/login">Admin</Link>
  </Button>
</div>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/DarkModeToggle.tsx src/components/layout/Navbar.tsx
git commit -m "feat: mount DarkModeToggle in Navbar with DOM-based state"
```

---

### Task 4: Dark mode Leaflet popup overrides

**Files:**
- Modify: `src/index.css:117-172` (add Leaflet `.dark` rules inside existing `.dark` block)

**Interfaces:** Uses existing Leaflet CSS class names. No new exports.

- [ ] **Step 1: Add Leaflet dark overrides to `src/index.css`**

Inside the `.dark { ... }` block (after the `.dark input:focus` rule around line 172), add:

```css
.dark .leaflet-popup-content-wrapper {
  background-color: var(--color-surface);
  color: var(--color-text);
}

.dark .leaflet-popup-tip {
  background-color: var(--color-surface);
}

.dark .leaflet-control-attribution {
  background-color: var(--color-surface);
  color: var(--color-text-muted);
}

.dark .leaflet-control-attribution a {
  color: var(--color-primary);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/index.css
git commit -m "style: add dark mode overrides for Leaflet map popups"
```

---

### Task 5: Fix hardcoded colors for dark mode

**Files:**
- Modify: `src/pages/Home.tsx:70,120,144,153`
- Modify: `src/pages/Profil.tsx:23,53`
- Modify: `src/components/sections/HeroSection.tsx:15`
- Modify: `src/components/ui/section.tsx:14`
- Modify: `src/components/ui/ErrorBoundary.tsx:37`
- Modify: `src/components/ui/QRCode.tsx:24`
- Modify: `src/pages/UmkmDetail.tsx:142`
- Modify: `src/pages/admin/AdminProduk.tsx:89`
- Modify: `src/pages/ProductDetail.tsx:110`

**Interfaces:** Each file changes 1–3 class strings. No new exports.

**Rules for replacement:**
- `bg-white` → `bg-background` (follows the token; light mode stays white, dark mode becomes `#0f172a`)
- `bg-gray-100` → `bg-surface`
- `text-gray-700` → `text-text-muted`
- `via-white` → `via-background` (in gradient strings)
- `text-white` / `text-white/80` used on top of images (TourismCard, GalleryItem) → **keep as-is** — these are intentionally over a dark image gradient and must remain white regardless of theme.

Specific edits:

**`src/pages/Home.tsx`:**
- Line 70: `bg-white` → `bg-background`
- Line 120: `bg-white` → `bg-background`
- Line 153: `bg-white text-primary hover:bg-gray-100` → `bg-background text-primary hover:bg-surface`

**`src/pages/Profil.tsx`:**
- Lines 23, 53: `via-white` → `via-background`

**`src/components/sections/HeroSection.tsx`:**
- Line 15: `from-primary-light via-white to-surface` → `from-primary-light via-background to-surface dark:from-primary-light/20 dark:via-background dark:to-surface`

**`src/components/ui/section.tsx`:**
- Line 14: `'bg-primary text-white'` → `'bg-primary text-white'` — **keep as-is**, intentional solid brand band.

**`src/components/ui/ErrorBoundary.tsx`:**
- Line 37: `bg-primary text-white` → same (intentional, keep).

**`src/components/ui/QRCode.tsx`:**
- Line 24: `bg-white` → `bg-background` (QR code wrapper must adapt to theme).

**`src/pages/UmkmDetail.tsx`:**
- Line 142: `bg-gray-100 text-gray-700` → `bg-surface text-text-muted`

**`src/pages/admin/AdminProduk.tsx`:**
- Line 89: `bg-gray-100 text-gray-700` → `bg-surface text-text-muted`

**`src/pages/ProductDetail.tsx`:**
- Line 110: `bg-gray-100 text-gray-700` → `bg-surface text-text-muted`

- [ ] **Step 1: Make all edits in parallel** (all changes are independent single-line class swaps).

- [ ] **Step 2: Commit**

```bash
git add src/pages/Home.tsx src/pages/Profil.tsx src/components/sections/HeroSection.tsx src/components/ui/QRCode.tsx src/pages/UmkmDetail.tsx src/pages/admin/AdminProduk.tsx src/pages/ProductDetail.tsx
git commit -m "style: replace hardcoded colors with theme tokens for dark mode"
```

---

### Task 6: NProgress top progress bar

**Files:**
- Create: `src/components/ui/TopProgress.tsx`
- Modify: `src/App.tsx:1-22` (mount `<TopProgress />`)

**Interfaces:** `TopProgress` is a side-effect-only component — renders `null`, manages NProgress lifecycle internally via `useLocation` and `useNavigation`. Consumed by `App.tsx` above `<RouterProvider>`.

- [ ] **Step 1: Create `src/components/ui/TopProgress.tsx`**

```tsx
import { useEffect, useRef } from 'react'
import { useLocation, useNavigation } from 'react-router-dom'
import NProgress from 'nprogress'
import '@/nprogress.css'

NProgress.configure({ showSpinner: false, minimum: 0.1, speed: 200 })

export function TopProgress() {
  const location = useLocation()
  const navigation = useNavigation()
  const prevPath = useRef(location.pathname)

  useEffect(() => {
    if (navigation.state === 'idle' && location.pathname !== prevPath.current) {
      prevPath.current = location.pathname
      return
    }

    if (navigation.state === 'loading') {
      NProgress.start()
    }
    if (navigation.state === 'idle') {
      NProgress.done()
    }
  }, [navigation.state, location.pathname])

  return null
}
```

- [ ] **Step 2: Mount in `App.tsx`**

In `src/App.tsx`, add import and mount:

```tsx
// Add import
import { TopProgress } from '@/components/ui/TopProgress'
```

Mount inside `<QueryClientProvider>`, above `<AuthProvider>`:

```tsx
<TopProgress />
```

Full structure after edit:

```tsx
<QueryClientProvider client={queryClient}>
  <TopProgress />
  <AuthProvider>
    <HelmetProvider>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </HelmetProvider>
  </AuthProvider>
</QueryClientProvider>
```

`TopProgress` must be outside `AuthProvider`/`HelmetProvider` because it only needs `RouterProvider` context, and placing it early ensures the bar is always visible.

- [ ] **Step 3: Verify manually**

Navigate between pages. A green bar should appear at the top during navigation and disappear when the target page mounts. Bar color follows `--color-primary`.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/TopProgress.tsx src/App.tsx
git commit -m "feat: add NProgress top bar during route navigation"
```

---

### Task 7: Prefetch helper + nav hover prefetch

**Files:**
- Create: `src/lib/prefetch.ts`
- Modify: `src/components/layout/Navbar.tsx` (attach `onMouseEnter` / `onFocus`)

**Interfaces:**
- `prefetchRoute(path: string): void` — looks up path in a map of `import()` calls, caches result in `Map<string, Promise>`.
- Called on link `onMouseEnter` / `onFocus` + once on `requestIdleCallback` for the 5 main nav items.

- [ ] **Step 1: Create `src/lib/prefetch.ts`**

```tsx
const routePrefetchers: Record<string, () => Promise<unknown>> = {
  '/':            () => import('@/pages/Home'),
  '/profil':      () => import('@/pages/Profil'),
  '/berita-galeri': () => import('@/pages/BeritaGaleri'),
  '/umkm':        () => import('@/pages/Umkm'),
  '/kontak':      () => import('@/pages/Kontak'),
}

const cache = new Map<string, Promise<unknown>>()

export function prefetchRoute(path: string): void {
  const factory = routePrefetchers[path]
  if (!factory) return
  if (cache.has(path)) return
  cache.set(path, factory())
}
```

- [ ] **Step 2: Attach to Navbar links**

In `src/components/layout/Navbar.tsx`, import `prefetchRoute`:

```tsx
import { prefetchRoute } from '@/lib/prefetch'
```

On each `<Link>` in the desktop nav (around line 53), add:

```tsx
onMouseEnter={() => prefetchRoute(item.href)}
onFocus={() => prefetchRoute(item.href)}
```

Full desktop link:

```tsx
<Link
  key={item.href}
  to={item.href}
  onMouseEnter={() => prefetchRoute(item.href)}
  onFocus={() => prefetchRoute(item.href)}
  className={cn(
    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
    isActive(item.href)
      ? 'text-primary bg-primary-light'
      : 'text-text hover:text-primary hover:bg-surface'
  )}
>
  {item.label}
</Link>
```

Same treatment for mobile menu links (around line 94).

- [ ] **Step 3: Commit**

```bash
git add src/lib/prefetch.ts src/components/layout/Navbar.tsx
git commit -m "feat: prefetch route chunks on nav link hover/focus"
```

---

### Task 8: Lazy map with IntersectionObserver

**Files:**
- Create: `src/components/sections/MapLazy.tsx`
- Modify: `src/pages/Profil.tsx:12,92-94` (swap VillageMap for MapLazy)

**Interfaces:**
- `MapLazy` accepts the same props as `VillageMap` (`villageName?`, `contactInfo?`).
- Returns a placeholder skeleton until the element is scrolled into view, then dynamically imports `VillageMap` and renders it.

- [ ] **Step 1: Create `src/components/sections/MapLazy.tsx`**

```tsx
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'

const VillageMap = lazy(() => import('@/components/sections/VillageMap'))

interface MapLazyProps {
  villageName?: string
  contactInfo?: string
}

export default function MapLazy({ villageName, contactInfo }: MapLazyProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="h-96 w-full">
      {shouldLoad ? (
        <Suspense fallback={<LoadingSkeleton variant="image" className="h-96 w-full" />}>
          <VillageMap villageName={villageName} contactInfo={contactInfo} />
        </Suspense>
      ) : (
        <LoadingSkeleton variant="image" className="h-96 w-full" />
      )}
    </div>
  )
}
```

`rootMargin: '200px'` prefetches the chunk 200 px before it scrolls into view, so the map appears seamless.

- [ ] **Step 2: Update `src/pages/Profil.tsx`**

Replace the lazy import and Suspense block. Remove the existing lazy + Suspense:

```tsx
// Remove these lines (12, 92-94):
const VillageMap = lazy(() => import('@/components/sections/VillageMap'))
// ...
<Suspense fallback={<div className="h-96 w-full bg-surface animate-pulse" />}>
  <VillageMap villageName={villageName} contactInfo={contactInfo} />
</Suspense>
```

Replace with:

```tsx
import MapLazy from '@/components/sections/MapLazy'

// In JSX:
<MapLazy villageName={villageName} contactInfo={contactInfo} />
```

Remove the now-unused `Suspense` import from the `import { lazy, Suspense } from 'react'` line. If `lazy` is also unused, remove it too. Final import:

```tsx
import { Suspense } from 'react'  // if still used elsewhere
// or remove entirely if no other lazy imports remain in this file
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/MapLazy.tsx src/pages/Profil.tsx
git commit -m "feat: lazy-load VillageMap via IntersectionObserver"
```

---

### Task 9: Route fade transition

**Files:**
- Modify: `src/layouts/MainLayout.tsx:6-8` (wrap `<Outlet />` with key)

**Interfaces:** Uses `useLocation().pathname` as key to trigger the existing `animate-fade-in` CSS animation on route change.

- [ ] **Step 1: Add key-based fade to `MainLayout`**

```tsx
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const MainLayout = () => {
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div key={location.pathname} className="animate-fade-in">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
```

- [ ] **Step 2: Commit**

```bash
git add src/layouts/MainLayout.tsx
git commit -m "style: add fade-in transition on route change"
```

---

### Task 10: Vite manual chunks

**Files:**
- Modify: `vite.config.ts:1-16`

**Interfaces:** Adds `build.rollupOptions.output.manualChunks` to split vendor chunks. No runtime API changes.

- [ ] **Step 1: Update `vite.config.ts`**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'map-vendor': ['leaflet', 'react-leaflet'],
          'forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
        },
      },
    },
  },
})
```

- [ ] **Step 2: Run build to verify chunking works**

Run: `npm run build`
Expected: exits 0, `dist/assets/` contains separate chunks for `react-vendor`, `map-vendor`, `forms`.

- [ ] **Step 3: Commit**

```bash
git add vite.config.ts
git commit -m "perf: split vendor bundles with manualChunks"
```

---

### Task 11: Image loading optimization

**Files:**
- Modify: `src/components/cards/ProductCard.tsx:16`
- Modify: `src/components/cards/TourismCard.tsx:13`
- Modify: `src/components/cards/GalleryItem.tsx`
- Modify: `src/components/cards/PotensiCard.tsx`
- Modify: `src/components/cards/StatCard.tsx`

**Interfaces:** All `<img>` tags get `decoding="async"` alongside existing `loading="lazy"`. No new exports.

- [ ] **Step 1: Find all card `<img>` tags and add `decoding="async"`**

Grep for: `src/components/cards/*.tsx` and add `decoding="async"` to each `<img>` tag.

Specific edits:

- `ProductCard.tsx:16`: add `decoding="async"`
- `TourismCard.tsx:13`: add `decoding="async"`
- `GalleryItem.tsx`: add `decoding="async"` to the `<img>` tag
- `PotensiCard.tsx`: add `decoding="async"` to the `<img>` tag
- `StatCard.tsx`: add `decoding="async"` if it has an `<img>` tag

- [ ] **Step 2: Commit**

```bash
git add src/components/cards/
git commit -m "perf: add decoding async to card images"
```

---

### Task 12: Lint, build, and audit

**Files:** None. This is a verification-only task.

- [ ] **Step 1: Run lint**

Run: `npm run lint`
Expected: exits 0, no errors.

Fix any errors before proceeding.

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: exits 0 (`tsc -b && vite build` both succeed).

If build fails, fix the TypeScript or bundler error before proceeding.

- [ ] **Step 3: Manual Lighthouse check (informational, no artifact commit)**

Run: `npm run preview` then open Chrome → Lighthouse → Performance on `/` and `/profil`.
Record scores. Target: Performance > 90.
This is for the final report only — no files are committed.

- [ ] **Step 4: Final commit (only if lint+build are clean)**

```bash
git add -A
git commit -m "chore: fix lint and type errors after perf changes"
```

---

### Task 13: Final commit + push

**Files:** All staged changes from prior tasks.

- [ ] **Step 1: Verify git status is clean or only intentional files remain**

Run: `git status`
Run: `git log --oneline -5`

Confirm all prior task commits are present and no untracked files remain.

- [ ] **Step 2: Push to origin/master**

Run: `git push origin master`

- [ ] **Step 3: Write final report (for user)**

Report contents:
1. List of changed files (from `git diff --stat HEAD~N`)
2. Build output (from `npm run build` final output)
3. Performance estimate: inter-page nav < 300 ms, Profil FCP < 500 ms, Leaflet chunk deferred by IntersectionObserver
4. Description of dark mode in both themes (no PNGs committed)
