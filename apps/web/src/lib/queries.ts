import type { SupabaseClient } from '@supabase/supabase-js'
import type { Plan, Product } from './types'

/**
 * Deliberately untyped client parameter — see the comment in
 * `useSupabaseClient.ts` for why the hand-authored `Database` generic is
 * skipped here. Row shapes below are asserted manually instead.
 */
type Client = SupabaseClient

interface ProductRow {
  id: string
  slug: string
  name: string
  tagline: string | null
  description: string | null
  category: string | null
  status: 'live' | 'new' | 'available'
}

interface PlanRow {
  id: string
  name: string
  price_monthly: number
  price_yearly: number
  features: string[]
  is_popular: boolean
}

function toProduct(row: ProductRow, subscribedSlugs: Set<string>, priceFrom: number): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline ?? '',
    description: row.description ?? '',
    category: row.category ?? '',
    status: row.status,
    subscribed: subscribedSlugs.has(row.slug),
    priceFrom,
  }
}

/** All catalog products, annotated with whether the current user is subscribed. */
export async function fetchProducts(
  client: Client,
  userId: string | null | undefined,
): Promise<Product[]> {
  const { data, error } = await client
    .from('products')
    .select('*, plans(price_monthly)')
    .order('created_at')

  if (error || !data) throw error ?? new Error('No products returned')
  const products = data as unknown as Array<ProductRow & { plans: Array<{ price_monthly: number }> }>

  let subscribedSlugs = new Set<string>()
  if (userId) {
    const { data: subs } = await client
      .from('subscriptions')
      .select('product_id, status')
      .eq('user_id', userId)
      .eq('status', 'active')
    const activeProductIds = new Set(
      ((subs ?? []) as Array<{ product_id: string }>).map((s) => s.product_id),
    )
    subscribedSlugs = new Set(
      products.filter((p) => activeProductIds.has(p.id)).map((p) => p.slug),
    )
  }

  return products.map((row) => {
    const plans = row.plans ?? []
    const priceFrom = plans.length ? Math.min(...plans.map((p) => p.price_monthly)) : 0
    return toProduct(row, subscribedSlugs, priceFrom)
  })
}

export async function fetchProduct(
  client: Client,
  slug: string,
  userId: string | null | undefined,
): Promise<{ product: Product; plans: Plan[] } | null> {
  const { data, error } = await client.from('products').select('*').eq('slug', slug).single()
  if (error || !data) return null
  const row = data as unknown as ProductRow

  const { data: planData } = await client
    .from('plans')
    .select('*')
    .eq('product_id', row.id)
    .order('sort_order')
  const planRows = (planData ?? []) as unknown as PlanRow[]

  let subscribed = false
  if (userId) {
    const { data: sub } = await client
      .from('subscriptions')
      .select('id')
      .eq('user_id', userId)
      .eq('product_id', row.id)
      .eq('status', 'active')
      .maybeSingle()
    subscribed = Boolean(sub)
  }

  const plans: Plan[] = planRows.map((p) => ({
    id: p.id,
    name: p.name,
    priceMonthly: Number(p.price_monthly),
    priceYearly: Number(p.price_yearly),
    features: p.features ?? [],
    isPopular: p.is_popular,
  }))

  const priceFrom = plans.length ? Math.min(...plans.map((p) => p.priceMonthly)) : 0

  return {
    product: toProduct(row, subscribed ? new Set([slug]) : new Set(), priceFrom),
    plans,
  }
}

/** Subscriptions for the dashboard's "Your products" list, joined with product + plan info. */
export async function fetchMySubscriptions(client: Client, userId: string) {
  const { data, error } = await client
    .from('subscriptions')
    .select('*, products(*), plans(*)')
    .eq('user_id', userId)
    .eq('status', 'active')
  if (error) throw error
  return (data ?? []) as unknown as Array<{ products: ProductRow; plans: PlanRow }>
}

/**
 * "Buy" a plan: ensures a profile row exists for the user, then creates or
 * updates their subscription for this product. There's no payment
 * processor wired in yet — this records the entitlement directly, which is
 * enough to drive the UI end-to-end. Swap in a real Stripe/Razorpay
 * checkout before this touches real money.
 */
export async function subscribeToPlan(
  client: Client,
  params: {
    userId: string
    email: string | null
    fullName: string | null
    productId: string
    planId: string
    billingCycle: 'monthly' | 'yearly'
  },
) {
  await client.from('profiles').upsert({
    id: params.userId,
    email: params.email,
    full_name: params.fullName,
  })

  const periodDays = params.billingCycle === 'monthly' ? 30 : 365
  const currentPeriodEnd = new Date(Date.now() + periodDays * 24 * 60 * 60 * 1000).toISOString()

  const { error } = await client.from('subscriptions').upsert(
    {
      user_id: params.userId,
      product_id: params.productId,
      plan_id: params.planId,
      status: 'active',
      billing_cycle: params.billingCycle,
      current_period_end: currentPeriodEnd,
    },
    { onConflict: 'user_id,product_id' },
  )
  if (error) throw error
}
