# Apex Hub Labs

Unified multi-product SaaS platform: one account, one billing relationship,
every Apex product behind a shared design system.

## Stack

- **Frontend** — React + Vite + TypeScript + Tailwind CSS (`apps/web`)
- **Backend** — [Supabase](https://supabase.com) (Postgres, RLS, storage). No custom API
  server: the frontend talks to Supabase directly via `@supabase/supabase-js`.
- **Auth** — [Clerk](https://clerk.com), via its hosted `<SignIn />` / `<SignUp />` /
  `<UserButton />` components, reskinned to match the app theme. Supabase RLS
  policies key off the Clerk JWT's `sub` claim through Supabase's
  [third-party auth integration](https://supabase.com/docs/guides/auth/third-party/clerk).

## Design system

Strict monochrome: pure black background, pure white text and primary
actions, everything else expressed through opacity/weight/fill rather than
color. No brand hue, no status colors (green/red/amber) anywhere in the UI —
see `apps/web/tailwind.config.js` for the full token set (`surface-*`,
`ink-*`, `line*`).

## Project layout

```
apps/web/                 React app
  src/components/ui/      Button, Badge, Card, IconTile, Avatar, Logo
  src/components/layout/  MarketingNav, AppShell, AppTopbar, Sidebar, Footer
  src/components/product/ ProductCard, PlanCard, product icon set
  src/pages/               Landing, Products, ProductDetail, Plans, Dashboard, SignIn, SignUp
  src/lib/                 env access, Supabase client, shared types, placeholder data
supabase/
  migrations/0001_init.sql  profiles, products, plans, subscriptions + RLS
  seed.sql                  seed data mirroring src/lib/data.ts
```

## Getting started

```bash
npm install
cp apps/web/.env.example apps/web/.env   # fill in Clerk + Supabase keys
npm run dev                              # http://localhost:5173
```

The app boots and every page renders even without Clerk/Supabase keys set —
pages that require them (sign-in, sign-up) show a setup notice instead of
crashing, and product/plan data falls back to `src/lib/data.ts` until the
Supabase tables are wired in.

## Routes

| Path | Page |
|---|---|
| `/` | Landing |
| `/products` | Product catalog |
| `/products/:slug` | Product detail |
| `/products/:slug/plans` | Plan selection |
| `/dashboard` | Authenticated account dashboard |
| `/sign-in`, `/sign-up` | Clerk auth |

## Backend (Supabase)

```bash
npx supabase link --project-ref <your-project-ref>
npx supabase db push        # applies migrations/0001_init.sql
npx supabase db execute --file supabase/seed.sql
```

Then set `apps/web/.env`'s `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` and
enable Clerk as a third-party auth provider in the Supabase dashboard
(Authentication → Sign In / Providers) so RLS policies recognise Clerk's JWT.
