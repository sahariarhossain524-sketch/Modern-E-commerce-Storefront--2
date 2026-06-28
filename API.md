# NovaFlow API Documentation

## Base URL
`/api`

## Response Format
All API endpoints return a consistent JSON response:
```json
// Success
{
  "success": true,
  "data": { ... }
}

// Error
{
  "success": false,
  "error": "Error message"
}
```

## Endpoints

### 1. Health & Observability
- `GET /api/health` - Comprehensive system health (DB, Redis).
- `GET /api/health/live` - K8s liveness probe.
- `GET /api/health/ready` - K8s readiness probe.

### 2. Authentication
- `POST /api/auth/[...nextauth]` - NextAuth endpoints (Login, Logout, Providers).

### 3. Global Search
- `GET /api/search?q={query}` - Debounced multi-entity search (Users, Products, Categories, Orders).

### 4. Export
- `GET /api/export/users` - Download Users CSV (Requires Admin role).

### 5. Seeding (Dev Only)
- `GET /api/seed-comprehensive` - Seeds the database with Admin role and demo data.
