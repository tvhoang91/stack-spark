# Game Stats Explorer

An AI-powered application that provides detailed statistics, trivia, and insights about any game users want to explore. Get fascinating data analysis, historical information, and fun facts about your favorite games.

## Features

- **AI-Powered Game Analysis**: Leverages Hugging Face models to generate comprehensive game statistics and insights
- **User Authentication**: Secure OAuth authentication via Hugging Face accounts
- **Game Database**: Comprehensive database of games with detailed statistics and metadata
- **Interactive Queries**: Ask specific questions about games and receive AI-generated responses
- **Data Visualization**: Visual representations of game statistics and trends
- **Personalized Experience**: Save favorite games and track your query history

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **Shadcn/UI** - High-quality component library
- **TanStack Query** - Server state management and caching

### Backend & Database
- **tRPC** - End-to-end typesafe API
- **Supabase** - Backend-as-a-Service platform
- **PostgreSQL** - Relational database (via Supabase)
- **Kysely** - Type-safe SQL query builder
- **NextAuth.js** - Authentication solution

### AI & External Services
- **Hugging Face** - AI models and OAuth provider
- **Zod** - Runtime type validation and schema parsing

### Deployment
- **Vercel** - Hosting and deployment platform

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm
- Supabase account
- Hugging Face account
- Vercel account (for deployment)

### Environment Variables
Create a `.env.local` file with:

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Hugging Face OAuth
HUGGINGFACE_CLIENT_ID=your-hf-client-id
HUGGINGFACE_CLIENT_SECRET=your-hf-client-secret

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-key

# Database
DATABASE_URL=your-supabase-postgres-url

# Hugging Face API
HUGGINGFACE_API_TOKEN=your-hf-api-token
```

### Installation

```bash
# Install dependencies
npm install

# Set up database schema
npm run db:push

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Database Schema

The application uses PostgreSQL with the following main entities:

- **Users** - User profiles and authentication data
- **Games** - Game metadata and basic information
- **GameStats** - Detailed statistics for each game
- **UserQueries** - User search history and AI responses
- **UserFavorites** - User's saved favorite games

## API Routes

### tRPC Routes
- `auth.*` - Authentication and user management
- `games.*` - Game data and search functionality
- `ai.*` - AI-powered game analysis and insights
- `user.*` - User preferences and history

## Development

### Database Operations
```bash
# Generate database types
npm run db:generate

# Push schema changes
npm run db:push

# Reset database
npm run db:reset
```

### Code Quality
```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build production
npm run build
```

## Deployment

The app is optimized for deployment on Vercel with automatic deployments from the main branch. Database migrations and environment variables are handled through the Vercel dashboard and Supabase console.

## Contributing

1. Follow the monorepo guidelines in the root CLAUDE.md
2. Use TypeScript for all new code
3. Follow the established patterns for tRPC procedures
4. Add proper Zod schemas for all data validation
5. Test authentication flows thoroughly
