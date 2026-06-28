# NovaFlow Architecture

NovaFlow follows a strict Clean Architecture, ensuring separation of concerns, scalability, and testability.

## Layers

### 1. Presentation Layer (App Router & UI)
Located in `src/app/` and `src/components/`.
- **Server Components:** Used by default for data fetching and SEO optimization.
- **Client Components:** (`"use client"`) Used for interactive UI elements (Charts, Forms).
- **UI Framework:** Tailwind CSS and shadcn/ui.

### 2. Application Layer (Services)
Located in `src/services/`.
- Business logic is strictly contained within Service classes (e.g., `AnalyticsService`, `AuthService`, `EmailService`).
- API Routes (`src/app/api/`) act as Controllers, simply validating input via Zod and calling Services.

### 3. Domain Layer (Types & Entities)
- Prisma auto-generates the domain entities in `node_modules/@prisma/client`.
- Custom Zod schemas for input validation are located in `src/lib/validations.ts`.

### 4. Infrastructure Layer (Database & Third-Party)
Located in `src/lib/`.
- **Database:** Prisma ORM connecting to PostgreSQL.
- **Caching & Rate Limiting:** Redis via `ioredis` and `@upstash/ratelimit`.
- **Background Jobs:** BullMQ + Redis.
- **File Storage:** Cloudinary.
- **Email:** Resend.
- **Payments:** Stripe.

## Security & Observability
- **Authentication:** NextAuth.js (JWT strategy) and custom RBAC (Role-Based Access Control) using Edge Middleware (`src/middleware.ts`).
- **Observability:** Winston structured logger tracking all API hits, errors, and sensitive actions (Audit Logs). Every request is assigned a `x-request-id`.
- **Protection:** Helmet-equivalent headers via `next.config.mjs`, CSRF mitigation via SameSite cookies.
