import NextAuth from "next-auth"
import { SupabaseAdapter } from "@auth/supabase-adapter"
import type { NextAuthConfig } from "next-auth"

export const config = {
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  providers: [
    {
      id: "huggingface",
      name: "Hugging Face",
      type: "oauth",
      authorization: {
        url: "https://huggingface.co/oauth/authorize",
        params: {
          scope: "read-repos",
          response_type: "code",
        },
      },
      token: "https://huggingface.co/oauth/token",
      userinfo: "https://huggingface.co/api/whoami",
      clientId: process.env.HUGGINGFACE_CLIENT_ID,
      clientSecret: process.env.HUGGINGFACE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.fullname || profile.name,
          email: profile.email,
          image: profile.avatarUrl,
        }
      },
    },
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
      }
      if (profile) {
        token.profile = profile
      }
      return token
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken as string
      }
      if (token.profile) {
        session.user.profile = token.profile
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)