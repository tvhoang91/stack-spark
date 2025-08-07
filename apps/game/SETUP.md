# Setup Guide - Game Stats Explorer

## 🚀 Quick Start

### 1. Environment Configuration

Copy the `.env.example` to `.env.local` and replace placeholders with actual values:

```bash
cp .env.example .env.local
```

### 2. Required Service Accounts

#### Supabase Setup
1. Create a new project at [https://supabase.com](https://supabase.com)
2. Get your project URL and anon key from Settings > API
3. Get your service role key from Settings > API
4. Update these values in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` 
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `DATABASE_URL` (PostgreSQL connection string)

#### Hugging Face OAuth Setup
1. Go to [https://huggingface.co/settings/applications](https://huggingface.co/settings/applications)
2. Create a new OAuth application
3. Set redirect URI to: `http://localhost:3000/api/auth/callback/huggingface`
4. For production: `https://yourdomain.com/api/auth/callback/huggingface`
5. Update these values in `.env.local`:
   - `HUGGINGFACE_CLIENT_ID`
   - `HUGGINGFACE_CLIENT_SECRET`
   - `HUGGINGFACE_API_TOKEN` (create at [https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens))

#### NextAuth Setup
1. Generate a strong secret: `openssl rand -base64 32`
2. Update `NEXTAUTH_SECRET` in `.env.local`
3. For production, set `NEXTAUTH_URL` to your domain

### 3. Database Schema

The Supabase adapter will automatically create the required tables:
- `users` - User profiles and authentication data
- `accounts` - OAuth account linking
- `sessions` - User sessions
- `verification_tokens` - Email verification tokens

### 4. Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 5. Production Deployment (Vercel)

#### Environment Variables
Add all environment variables from `.env.local` to Vercel:

```bash
# NextAuth
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-production-secret

# Hugging Face
HUGGINGFACE_CLIENT_ID=your-hf-client-id
HUGGINGFACE_CLIENT_SECRET=your-hf-client-secret
HUGGINGFACE_API_TOKEN=your-hf-api-token

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-key
DATABASE_URL=your-supabase-postgres-url
```

#### Deploy
```bash
# Deploy to Vercel
vercel --prod
```

## 🔧 Configuration Details

### NextAuth.js v5
- Configured with Hugging Face OAuth provider
- Session strategy: JWT
- Supabase adapter for data persistence
- Custom callbacks for token and session handling

### Supabase Integration
- Client-side and server-side clients configured
- Admin client for server operations
- Automatic schema creation via NextAuth adapter

### Middleware
- Protects `/dashboard` routes (requires authentication)
- Allows public access to home page and auth routes
- API routes for NextAuth are unprotected

## 🎨 Components

### Authentication UI
- `LoginButton` - Initiates Hugging Face OAuth flow
- `LogoutButton` - Signs out user
- `UserProfile` - Complete auth status with user info
- `Providers` - Session provider wrapper

### Layout Integration
- Session provider configured in root layout
- Server-side session fetching
- Client-side session hooks available

## 🛠 Development Tips

1. **Testing Authentication**: Use Hugging Face OAuth in development
2. **Database Access**: Use Supabase dashboard to view/edit data
3. **Session Debugging**: Enable debug mode in development
4. **Type Safety**: Custom TypeScript declarations for NextAuth session

## ✅ Verification Checklist

- [ ] All environment variables set
- [ ] Supabase project created and configured
- [ ] Hugging Face OAuth app created
- [ ] Build completes successfully (`pnpm build`)
- [ ] Development server runs (`pnpm dev`)
- [ ] Authentication flow works end-to-end
- [ ] User data persists in Supabase