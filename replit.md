# SkyTails - Pet Savings Platform

## Overview

SkyTails is a fintech-style pet savings and investment platform. It is **not** insurance — it's a savings + investment platform for pet care. The app focuses on a trust-first, low-friction onboarding experience inspired by Stripe, Notion, Wealthfront, and Airbnb UX patterns.

The core user journey is a multi-step onboarding wizard (landing hero → pet details → plan selection → account creation → dashboard preview → final dashboard). The design philosophy prioritizes reducing drop-off by delaying financial/KYC details and building trust early through emotional pet-parent engagement and clean, modern UI.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework:** React with TypeScript
- **Routing:** Wouter (lightweight client-side routing)
- **State Management:** TanStack React Query for server state, React useState for local form state
- **Styling:** TailwindCSS with CSS variables for theming (fintech trust palette: soft blue, charcoal, clean white)
- **Animations:** Framer Motion for step transitions and smooth UI interactions
- **UI Components:** shadcn/ui (new-york style) with Radix UI primitives, plus custom components (Button, Input, PetCard, GrowthChart)
- **Charts:** Recharts for financial growth projections
- **Fonts:** DM Sans (body) and Outfit (display/headings)
- **Build Tool:** Vite with React plugin
- **Path Aliases:** `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Backend
- **Runtime:** Node.js with Express
- **Language:** TypeScript, executed via tsx
- **API Style:** REST endpoints under `/api/`
- **Session Management:** express-session with MemoryStore (dev) and connect-pg-simple option
- **Authentication:** Two auth systems coexist:
  1. Passport.js with local strategy (username/password) for the app's own auth
  2. Replit Auth via OpenID Connect (in `server/replit_integrations/auth/`) — this is a separate integration
- **Build:** esbuild for server bundling, Vite for client bundling (see `script/build.ts`)
- **Dev Server:** Vite dev server middleware proxied through Express with HMR

### Shared Code (`shared/`)
- **Schema:** Drizzle ORM table definitions (`users`, `pets`, `plans`) in `shared/schema.ts`
- **Routes:** Typed API route definitions with Zod validation schemas in `shared/routes.ts`
- **Auth Models:** Separate user/session models for Replit Auth in `shared/models/auth.ts`

### Database
- **ORM:** Drizzle ORM with PostgreSQL dialect
- **Database:** PostgreSQL (required via `DATABASE_URL` environment variable)
- **Schema Push:** `npm run db:push` uses drizzle-kit to push schema changes
- **Tables:**
  - `users` — id (serial), username, email, password, country, createdAt
  - `pets` — id (serial), userId, name, type, age, avatarUrl
  - `plans` — id (serial), userId, tier, monthlyContribution
  - `sessions` — sid, sess (jsonb), expire (for Replit Auth)
  - Replit Auth `users` table (separate, varchar id with UUID)

### Key API Endpoints
- `POST /api/login` — Local auth login
- `GET /api/me` — Get current user
- `POST /api/logout` — Logout
- `POST /api/onboarding` — Submit onboarding data (user + pet + plan in transaction)
- `GET /api/dashboard/:userId` — Get dashboard data
- `GET /api/mock/dashboard` — Mock dashboard data for prototype

### Design Patterns
- **Monorepo structure:** `client/`, `server/`, `shared/` directories with shared types and schemas
- **Typed API contracts:** Route definitions in `shared/routes.ts` with Zod schemas used on both client and server
- **Progressive onboarding wizard:** 6-step flow (steps 0-5) with animated transitions, deferred account creation
- **Component library:** Custom themed components wrapping shadcn/ui primitives

## External Dependencies

- **PostgreSQL** — Primary database, connected via `DATABASE_URL` environment variable
- **Drizzle ORM + drizzle-kit** — Database ORM and migration tooling
- **Radix UI** — Accessible primitive components (dialog, select, slider, tabs, toast, etc.)
- **Recharts** — Chart library for financial growth visualization
- **Framer Motion** — Animation library for onboarding step transitions
- **Passport.js** — Authentication middleware (local strategy)
- **OpenID Connect (Replit Auth)** — Alternative auth via `openid-client` and Replit OIDC provider
- **express-session + memorystore** — Session management
- **connect-pg-simple** — PostgreSQL session store option
- **Vite** — Frontend dev server and build tool with Replit-specific plugins (`@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner`)
- **Google Fonts** — DM Sans and Outfit font families loaded via CDN