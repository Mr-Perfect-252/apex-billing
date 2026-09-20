/**
 * Hand-authored types mirroring `supabase/migrations/0001_init.sql`.
 * Once the Supabase project is live, replace this file with the generated
 * output of `supabase gen types typescript --linked > src/lib/database.types.ts`.
 */
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          avatar_url: string | null
          created_at: string
        }
        Insert: Partial<Database['public']['Tables']['profiles']['Row']> & { id: string }
        Update: Partial<Database['public']['Tables']['profiles']['Row']>
      }
      products: {
        Row: {
          id: string
          slug: string
          name: string
          tagline: string | null
          description: string | null
          category: string | null
          status: 'live' | 'new' | 'available'
          created_at: string
        }
        Insert: Partial<Database['public']['Tables']['products']['Row']>
        Update: Partial<Database['public']['Tables']['products']['Row']>
      }
      plans: {
        Row: {
          id: string
          product_id: string
          name: string
          price_monthly: number
          price_yearly: number
          features: string[]
          is_popular: boolean
          sort_order: number
        }
        Insert: Partial<Database['public']['Tables']['plans']['Row']>
        Update: Partial<Database['public']['Tables']['plans']['Row']>
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          product_id: string
          plan_id: string
          status: 'active' | 'canceled' | 'past_due'
          billing_cycle: 'monthly' | 'yearly'
          current_period_end: string
          created_at: string
        }
        Insert: Partial<Database['public']['Tables']['subscriptions']['Row']>
        Update: Partial<Database['public']['Tables']['subscriptions']['Row']>
      }
    }
  }
}
