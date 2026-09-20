import { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { MarketingNav } from '../components/layout/MarketingNav'
import { ProductCard } from '../components/product/ProductCard'
import { PRODUCTS } from '../lib/data'
import { useSupabaseClient } from '../lib/useSupabaseClient'
import { fetchProducts } from '../lib/queries'
import { isClerkConfigured } from '../lib/env'
import type { Product } from '../lib/types'

const categories = ['All products', 'Automation', 'Analytics', 'Finance', 'Subscribed']

export default function Products() {
  const [active, setActive] = useState('All products')
  const [products, setProducts] = useState<Product[]>(PRODUCTS)
  const supabase = useSupabaseClient()
  const { user } = isClerkConfigured ? useUser() : { user: null }

  useEffect(() => {
    if (!supabase) return
    let cancelled = false
    fetchProducts(supabase, user?.id)
      .then((rows) => {
        if (!cancelled && rows.length) setProducts(rows)
      })
      .catch(() => {
        // Table not seeded yet, or RLS not configured — keep local fallback data.
      })
    return () => {
      cancelled = true
    }
  }, [supabase, user?.id])

  const filtered = products.filter((p) => {
    if (active === 'All products') return true
    if (active === 'Subscribed') return p.subscribed
    return p.category === active
  })

  return (
    <div className="min-h-screen bg-surface-0">
      <MarketingNav />
      <div className="mx-auto max-w-[1200px] px-8 py-11 pb-24">
        <h1 className="mb-2 text-[30px] font-bold tracking-tight text-white">Products</h1>
        <p className="max-w-[560px] text-[15.5px] text-ink-secondary">
          Everything in your Apex suite. Products you own are marked Subscribed — pick a plan
          on anything else to add it to your account.
        </p>

        <div className="mt-7 flex flex-wrap gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={[
                'rounded-full px-4 py-2 text-[13px] font-semibold transition-colors',
                active === cat
                  ? 'bg-white text-black'
                  : 'border border-line-strong text-ink-secondary hover:bg-white/5',
              ].join(' ')}
            >
              {cat}
            </button>
          ))}
        </div>
        <hr className="my-7 border-line" />

        <div className="grid gap-5 md:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
