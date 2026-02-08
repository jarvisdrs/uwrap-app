# uWrap — Video Pre-Production Platform

A modern platform for video pre-production workflow management.

## 🎬 Features

- **Auth + RBAC** — Google OAuth with role-based access control
- **Project Management** — Dashboard with Kanban, list, and timeline views
- **Script Editor** — Rich text editing with Tiptap, version history, inline comments
- **Shooting Schedule** — Timeline management with drag-drop (coming soon)
- **Asset Management** — Upload, preview, tag, and organize production assets
- **Real-time Notifications** — Socket.io for live updates

## 🏗️ Architecture

This is a Turborepo monorepo containing:

```
├── apps/
│   ├── web/          # Next.js 14+ frontend
│   └── api/          # NestJS backend API
├── packages/
│   ├── database/     # Prisma ORM + database schema
│   ├── shared/       # TypeScript types and validation schemas
│   ├── ui/           # Design system components
│   └── typescript-config/  # Shared TS configs
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (we use Supabase)

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create `.env.local` in `apps/web/`:

```env
# Database (Supabase)
DATABASE_URL="postgresql://postgres.gvxndxhiiflzqnjaykgr:G8Rp8m8M0qWlRofM%40@aws-1-eu-west-3.pooler.supabase.com:6543/postgres?pgbouncer=true"

# NextAuth.js
AUTH_SECRET="your_auth_secret_here"
AUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your_google_client_id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# API
API_URL="http://localhost:3001"
```

Create `.env` in `apps/api/`:

```env
PORT=3001
FRONTEND_URL="http://localhost:3000"
DATABASE_URL="your_database_url_here"
```
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# (Optional) Open Prisma Studio
npm run db:studio
```

### 4. Run Development Servers

```bash
# Run both frontend and backend
cd /home/drs/.openclaw/workspace/projects/uwrap
npm run dev

# Or run individually:
npm run dev --workspace=@uwrap/web   # Frontend on port 3000
npm run dev --workspace=@uwrap/api   # Backend on port 3001
```

## 📚 Project Structure

### Frontend (`apps/web/`)

- **App Router** — Next.js 14+ with server components
- **Authentication** — NextAuth.js v4 with Google OAuth
- **Styling** — Tailwind CSS with dark mode support
- **UI Components** — Custom design system with Radix UI primitives
- **Editor** — Tiptap for rich text editing
- **State** — React hooks + server actions

### Backend (`apps/api/`)

- **Framework** — NestJS with TypeScript
- **Database** — Prisma ORM with PostgreSQL
- **Real-time** — Socket.io for notifications
- **API** — RESTful endpoints for all resources

### Database (`packages/database/`)

Complete Prisma schema with:
- Multi-tenant organizations
- Users with RBAC
- Projects with status tracking
- Scripts with versioning
- Shooting days and call sheets
- Assets with tagging
- Notifications

## 🔐 Authentication

The app uses NextAuth.js with Google OAuth. After login, users can:
- Create/join organizations
- Be invited to projects with different roles (Owner, Admin, Member, Viewer)
- Access resources based on their permissions

## 🎨 Design System

The UI package provides:
- **Components** — Button, Card, Input, Avatar, Badge, etc.
- **Animations** — Framer Motion for smooth transitions
- **Theming** — Dark mode with CSS variables
- **Icons** — Lucide React

## 📝 API Endpoints

### Projects
- `GET /api/projects` — List all projects
- `GET /api/projects/:id` — Get project details
- `POST /api/projects` — Create project
- `PATCH /api/projects/:id` — Update project
- `DELETE /api/projects/:id` — Delete project

### Scripts
- `GET /api/scripts/project/:projectId` — List scripts
- `GET /api/scripts/:id` — Get script with versions
- `POST /api/scripts` — Create script
- `PATCH /api/scripts/:id` — Update script (auto-creates version)
- `POST /api/scripts/:id/lock` — Lock script for editing
- `POST /api/scripts/:id/unlock` — Unlock script

### Assets
- `GET /api/assets/project/:projectId` — List assets
- `POST /api/assets` — Create asset record
- `DELETE /api/assets/:id` — Delete asset

## 🔄 Development Workflow

```bash
# Install new dependency in a package
npm install package-name --workspace=@uwrap/ui

# Run type checking
npm run type-check

# Lint code
npm run lint

# Format code
npm run format
```

## 🚧 Roadmap

- [x] Auth with Google OAuth
- [x] Project CRUD
- [x] Script editor with Tiptap
- [x] Asset upload
- [ ] Drag-drop shooting schedule
- [ ] Call sheet PDF generator
- [ ] Google Drive sync
- [ ] Real-time collaborative editing
- [ ] Advanced search

## 📄 License

MIT License — Built for filmmakers.

---

Made with ❤️ for video production teams.
