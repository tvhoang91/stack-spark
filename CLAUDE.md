# Stack Spark - Monorepo Guidelines

This monorepo contains hobby projects optimized for vibe coding with a curated tech stack.

## Structure

### Apps Directory (`apps/`)
Each app should be a **separate Next.js application** with its own:
- Independent deployment
- Isolated routing and pages
- App-specific features and logic
- Individual `package.json` with dependencies

### Packages Directory (`packages/`)
Contains **shared configuration packages only**:
- ESLint configs
- TypeScript configs
- Build tools and utilities

## Preferred Tech Stack

### Frontend Framework
- **Next.js** - Full-stack React framework with excellent DX
- **TypeScript** - Type safety and better development experience

### UI & Styling
- **Shadcn UI** - High-quality, customizable components
- **Tailwind CSS v4** - Utility-first CSS framework (latest version)
- **DndKit** - Drag and drop library
- **React Hook Form** - Form management

### State Management & Data Fetching
- **TanStack Query** - Server state management and caching
- **react-use** - Essential React hooks collection
- **TanStack Table** - Powerful table/datagrid solution

### Database & Backend
- **PostgreSQL** - Reliable relational database
- **Kysely** - Type-safe SQL query builder
- **tRPC** - End-to-end typesafe APIs
- **Zod** - Runtime type validation

### Utilities & Services
- **date-fns** - Modern date utility library
- **Vercel** - Deployment platform with excellent Next.js integration
- **Supabase** - Backend-as-a-Service with generous free tier
- **Hugging Face** - AI Powered API with generous free tier

## Development Philosophy

Choose technologies that are:
- Popular with large communities
- Well-documented with excellent TypeScript support
- Have generous free tiers for hobby projects
- Provide exceptional developer experience
- Battle-tested and reliable

Perfect for rapid prototyping and weekend hacking sessions.