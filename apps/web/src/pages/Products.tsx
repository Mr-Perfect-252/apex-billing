import { useState } from 'react'
import { MarketingNav } from '../components/layout/MarketingNav'
import { ProductCard } from '../components/product/ProductCard'
import { PRODUCTS } from '../lib/data'

const categories = ['All products', 'Automation', 'Analytics', 'Finance', 'Subscribed']

export default function Products() {
  const [active, setActive] = useState('All products')

  const filtered = PRODUCTS.filter((p) => {
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
          Browse the full Apex suite. Every product shares your Apex account, billing, and
          access — subscribe and launch in seconds.
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
