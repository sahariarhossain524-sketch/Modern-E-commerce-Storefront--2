# NovaFlow Database Schema

NovaFlow uses a highly normalized PostgreSQL database managed via Prisma ORM. 

## Key Design Principles
1. **UUID Primary Keys:** All tables use UUIDs for primary keys to prevent ID enumeration attacks and support distributed architectures.
2. **Soft Deletes:** Key entities (`User`, `Product`, `Category`) utilize an `isDeleted` boolean flag to prevent accidental data loss and maintain referential integrity.
3. **Foreign Keys & Cascading:** Strict foreign key constraints with `onDelete: Cascade` where appropriate (e.g., deleting an `Order` cascades to `OrderItem`).
4. **Indexing:** Indexes are applied to heavily queried fields (e.g., `email`, `roleId`, `status`, `userId`).

## Core Tables

### User Management & RBAC
- **User:** Stores authentication details, profile info, and soft delete flags.
- **Role:** Defines access levels (`Admin`, `Manager`, `User`).
- **Permission & RolePermission:** Granular permissions associated with Roles.
- **Session:** Tracks active user sessions and refresh tokens.

### Products & Inventory
- **Category:** Categorizes products.
- **Product:** Manages inventory, pricing, tags, and status (`DRAFT`, `ACTIVE`, `ARCHIVED`).

### Orders & Payments
- **Order:** Tracks the overall order total and status.
- **OrderItem:** Normalizes individual products within an order, locking the price at the time of purchase.
- **Payment:** Stores Stripe Payment Intents and transaction statuses.

### System & Observability
- **Notification:** User-specific realtime and historical notifications.
- **AuditLog:** Centralized tracking of all sensitive mutations across the system.
