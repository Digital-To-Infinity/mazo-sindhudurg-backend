# Mazo Sindhudurg – Backend

Node.js + Express + Prisma (MySQL) + Cloudinary backend API.

## Stack
- **Runtime**: Node.js + TypeScript
- **Framework**: Express 4
- **ORM**: Prisma 5 (MySQL)
- **Media**: Cloudinary
- **Auth**: JWT (HTTP-only cookie)
- **Validation**: Zod

## Getting Started

```bash
# Install dependencies
npm install

# Copy and fill env file
cp .env.example .env

# Run database migrations
npm run db:migrate

# Seed initial data
npm run db:seed

# Start dev server
npm run dev
```

API runs on [http://localhost:5000](http://localhost:5000)

## Useful Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:seed` | Seed the database |
| `npm run db:studio` | Open Prisma Studio |
| `npm run script:create-admin` | Create an admin user |
| `npm run script:check-db` | Verify DB connection |
| `npm run script:sync-media` | Sync Cloudinary assets to DB |

## API Endpoints

| Method | Path | Description |
|---|---|---|
| POST | /api/auth/login | Admin login |
| POST | /api/auth/logout | Logout |
| GET | /api/auth/me | Current session |
| GET | /api/routes | All routes (for sitemap) |
| GET | /api/routes/:slug | Route by slug |
| GET | /api/content | Content list (filterable) |
| GET | /api/content/:id | Content by ID |
| POST | /api/content | Create content (auth) |
| PUT | /api/content/:id | Update content (auth) |
| DELETE | /api/content/:id | Delete content (auth) |
| GET | /api/search | Full-text search |
| POST | /api/media/upload | Upload to Cloudinary |
| DELETE | /api/media/:id | Delete media |
| GET | /api/taxonomies | All taxonomies |
| POST | /api/submissions | Submit a business |
| GET | /api/settings | Site settings |
