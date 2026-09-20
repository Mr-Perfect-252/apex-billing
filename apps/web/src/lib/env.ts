/**
 * Centralised environment access. Every var is optional at build time so
 * the app still boots (and shows a clear setup banner) before real Clerk /
 * Supabase credentials are wired in — see components/layout/ConfigNotice.
 */
export const env = {
  clerkPublishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ?? '',
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL ?? '',
  // Supabase's newer projects issue a "publishable key" (sb_publishable_...)
  // instead of the legacy anon JWT; accept either env var name.
  supabaseAnonKey:
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
    import.meta.env.VITE_SUPABASE_ANON_KEY ??
    '',
} as const

export const isClerkConfigured = Boolean(env.clerkPublishableKey)
export const isSupabaseConfigured = Boolean(env.supabaseUrl && env.supabaseAnonKey)
