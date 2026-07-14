# NovaFlow (Internal Operations Dashboard)

> **NovaFlow** is a highly responsive internal operational dashboard tailored for visualizing key business metrics and managing fast-moving data streams. Built with a product-centric engineering philosophy, it treats internal teams as first-class customers by delivering an enterprise-grade UX.


## Engineering Philosophy

Internal tools often suffer from poor design and fragile codebases. NovaFlow reverses this trend by applying B2B SaaS engineering standards to internal operations.

- **"Internal Teams as Customers"**: Shipped rapidly to gather immediate feedback, iterating on a reusable, scalable UI system.
- **High-Performance Data Visualization**: Engineered to handle fast-moving, real-time data streams without UI blocking or unnecessary re-renders.
- **Self-Service Capabilities**: Enables non-technical operational staff to complete complex workflows independently, drastically reducing engineering support tickets.

## System Architecture & Tech Stack

- **Framework:** Next.js (App Router) 
- **Styling & UI:** Tailwind CSS, Framer Motion (for fluid micro-interactions)
- **State Management:** Zustand (optimized for minimal re-rendering during data stream updates)
- **Database Architecture:** PostgreSQL powered by Supabase with Prisma ORM
- **API Design:** Strict, strongly-typed RESTful endpoints ensuring robust data integrity between client and server.

## Setup & Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Configure your environment variables in `.env`:
   ```env
   DATABASE_URL="your_postgresql_connection_string"
   ```
4. Run Prisma migrations: `npx prisma db push`
5. Start the development server: `npm run dev`

## Developed By

**Sahariar Hossain**  
*AI Product Engineer & Full-Stack Developer*  
Specializing in AI-native internal tools, intelligent automation, and LLM-powered operational software.
