import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { env, isSupabaseConfigured } from './env'
import type { Database } from './database.types'

/**
 * Single shared Supabase client for the whole app. Returns `null` when the
 * project hasn't been configured yet so pages can render a setup notice
 * instead of crashing on a missing env var.
 *
 * Once Clerk is wired as the auth provider, pass its session token through
 * `accessToken()` here (Supabase's native third-party auth integration) so
 * RLS policies can key off `auth.jwt()` claims from Clerk instead of
 * Supabase's own auth.users table.
 */
export const supabase: SupabaseClient<Database> | null = isSupabaseConfigured
  ? createClient<Database>(env.supabaseUrl, env.supabaseAnonKey)
  : null
