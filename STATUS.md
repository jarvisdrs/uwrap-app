# uWrap - Video Pre-Production Platform

## Project ID
**uwrap-mvp-001**

## Status
🟢 **OPERATIVO** — Setup completato, server in esecuzione

## Ultimo Aggiornamento
2026-02-08

## Server Attivi
- 🌐 **Frontend**: http://localhost:3000 (Next.js 14 + Tailwind)
- ⚙️ **API**: http://localhost:3001 (NestJS + Prisma)

## Fix Applicati
- ✅ Rimossa dipendenza `@radix-ui/react-button` inesistente
- ✅ Aggiunto `@nestjs/config` e creato upload module placeholder
- ✅ Fixato routing Next.js conflitto `[id]` → `[projectId]`
- ✅ Corretto tsconfig per decoratori NestJS (`experimentalDecorators`)
- ✅ Fixate relazioni Prisma (lockedBy, createdBy con relation name)
- ✅ Creato prisma.ts locale per API (evita path resolution issues)
- ✅ Fixato gateway notification `server!: Server`
- ✅ Prisma client rigenerato correttamente
- ✅ **FIX Google OAuth**: Aggiunte variabili d'ambiente mancanti in `.env.local`
- ✅ **UI Login**: Rifatta con error handling, design migliorato, feature highlights
- ✅ **Tailwind**: Aggiunti colori `uwrap` palette completa
- ✅ **Documentazione**: Creata guida setup Google OAuth (`GOOGLE_OAUTH_SETUP.md`)

## Ambiente
- Database: Supabase PostgreSQL
- Auth: Google OAuth configurato
- Node: v22.22.0
- Package Manager: npm 10.2.0

## Comandi Utili
```bash
# Avvio completo (dalla root uwrap)
npm run dev

# Solo API
cd apps/api && node dist/main

# Database
cd packages/database && npx prisma studio
```

## Scope MVP
### ✅ In Scope (5 Macro-Aree)
1. **Auth + RBAC** — Google OAuth, ruoli (Owner/Admin/Producer/Director/Editor/Client)
2. **Gestione Progetti** — Dashboard Kanban, lista progetti, timeline view
3. **Script Editor** — Tiptap rich text, NO real-time collab, version history manuale, commenti inline
4. **Shooting Schedule + Call Sheet** — Timeline drag-drop, generatore PDF call sheet
5. **Asset Management** — Upload multi-file, preview, tagging, Google Drive sync base

### ❌ Out of Scope (Post-MVP)
- Budgeting base → v1.1
- Workflow Approvals → v1.2
- Real-time collaborative editing
- Storyboard editor avanzato
- API pubblica

## Tech Stack
- **Monorepo**: Turborepo
- **Frontend**: Next.js 14+ App Router, Tailwind CSS
- **Backend**: NestJS (API separata)
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js v4 + Google OAuth
- **Storage**: Supabase Storage
- **Editor**: Tiptap
- **PDF**: Puppeteer

## Timeline Stimata
- **Fase 1**: Setup & Scaffold — ✅ COMPLETATO
- **Fase 2**: Core Features — 10 giorni
- **Fase 3**: Polish & Deploy — 5 giorni

## Note
- UI ad hoc, super cool — NO riuso componenti videopreprod-ai
- Schema DB validato — relazioni Prisma corrette
- Design ispirato a Linear, Notion, Figma
