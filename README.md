# NovaFlow Enterprise SaaS Dashboard

NovaFlow is a highly scalable, full-stack enterprise SaaS Admin Dashboard built with modern web technologies and clean architecture.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Database**: PostgreSQL (Supabase) + Prisma ORM
- **Authentication**: Custom JWT (jose for Edge) + HTTP-only cookies
- **Charts**: Recharts
- **Form Validation**: Zod + React Hook Form

## Features
- **Clean Architecture**: Repositories, Services, and Controllers (API Routes).
- **Role-Based Access Control (RBAC)**: Admin, Manager, User roles.
- **Real-time Notifications**: Integrated with `sonner`.
- **Advanced Data Grids**: Search, Pagination for Users and Products.
- **Enterprise Security**: XSS Protection, CSP, Strict-Transport-Security, and Helmet equivalents.

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (Supabase recommended)

### Installation
1. Clone the repository.
2. Run `npm install`.
3. Configure your `.env` file with `DATABASE_URL`, `DIRECT_URL`, and `JWT_SECRET`.
4. Run `npx prisma db push` to synchronize your database.
5. Run `npm run dev` to start the development server at `http://localhost:3000`.

## Deployment (Docker)
This project is optimized for Docker using Next.js standalone mode.
```bash
docker build -t novaflow-dashboard .
docker run -p 3000:3000 novaflow-dashboard
```
