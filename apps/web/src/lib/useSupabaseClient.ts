import { useMemo } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { env, isClerkConfigured, isSupabaseConfigured } from './env'

/**
 * Returns a Supabase client whose requests carry the signed-in Clerk
 * session token, using supabase-js's native third-party-auth support
 * (`accessToken` callback, resolved fresh per request).
 *
 * For RLS policies (`auth.jwt()->>'sub' = ...`) to actually recognise that
 * token, Clerk must be enabled as a Third-Party Auth provider in the
 * Supabase dashboard: Authentication -> Sign In / Providers -> Clerk,
 * with your Clerk instance's domain configured there. This is a one-time
 * manual dashboard step, not something settable via this client.
 *
 * `isClerkConfigured` is a build-time constant (from env vars), so this
 * conditional hook call is stable across the app's whole lifetime and
 * never actually changes order between renders of a given instance.
 *
 * Deliberately untyped (`SupabaseClient` with no schema generic): the
 * hand-authored `Database` type doesn't carry the `Relationships` metadata
 * supabase-js's generic inference expects, which turns every joined/`.eq()`
 * chain into `never`. Once real generated types
 * (`supabase gen types typescript`) replace `database.types.ts`, swap the
 * generic back in here.
 */
export function useSupabaseClient(): SupabaseClient | null {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const auth = isClerkConfigured ? useAuth() : null
  const getToken = auth?.getToken

  return useMemo(() => {
    if (!isSupabaseConfigured) return null
    return createClient(env.supabaseUrl, env.supabaseAnonKey, {
      accessToken: getToken ? async () => (await getToken()) ?? null : undefined,
    })
  }, [getToken])
}
