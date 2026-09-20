import { useParams, Link, Navigate } from 'react-router-dom'
import { MarketingNav } from '../components/layout/MarketingNav'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { IconTile } from '../components/ui/IconTile'
import { PRODUCTS, PLANS_BY_PRODUCT } from '../lib/data'
import { productIcon } from '../components/product/icons'

const ArrowRight = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-4 w-4">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export default function ProductDetail() {
  const { slug = '' } = useParams()
  const product = PRODUCTS.find((p) => p.slug === slug)
  if (!product) return <Navigate to="/products" replace />

  const plans = PLANS_BY_PRODUCT[slug] ?? []

  return (
    <div className="min-h-screen bg-surface-0">
      <MarketingNav />

      <section className="border-b border-line py-14">
        <div className="mx-auto flex max-w-[1200px] items-start gap-7 px-8">
          <IconTile size="xl">{productIcon(product.slug)}</IconTile>
          <div className="flex-1">
            <div className="mb-3 flex items-center gap-2.5">
              {product.subscribed && <Badge variant="filled">Subscribed</Badge>}
              <span className="text-[12.5px] text-ink-tertiary">
                {product.category} · {product.tagline}
              </span>
            </div>
            <h1 className="mb-3 text-[34px] font-bold tracking-tight text-white">
              {product.name}
            </h1>
            <p className="mb-6 max-w-[640px] text-[16.5px] leading-relaxed text-ink-secondary">
              {product.description}
            </p>
            <div className="flex gap-3">
              <Link to={`/products/${product.slug}/plans`}>
                <Button variant="primary" size="md" icon={ArrowRight}>
                  Select a Plan
                </Button>
              </Link>
              <Button variant="outline" size="md">
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Live preview panel */}
      <section className="py-14">
        <div className="mx-auto max-w-[1200px] px-8">
          <div className="overflow-hidden rounded-lg border border-line-strong bg-surface-1">
            <div className="flex items-center gap-1.5 border-b border-line px-4.5 py-3.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            </div>
            <div className="flex min-h-[280px] items-center justify-center p-10">
              <div className="flex w-full max-w-[640px] flex-col gap-3.5">
                {PRODUCTS.slice(0, 3).map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3.5 rounded-md border border-line-strong bg-white/[0.03] p-4"
                  >
                    <IconTile size="sm">{productIcon(p.slug)}</IconTile>
                    <div className="flex flex-1 flex-col gap-1.5">
                      <div className="h-2 w-3/5 rounded bg-white/15" />
                      <div className="h-2 w-1/3 rounded bg-white/8" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plans preview */}
      {plans.length > 0 && (
        <section className="border-t border-line py-14">
          <div className="mx-auto max-w-[1200px] px-8">
            <div className="mx-auto mb-11 max-w-[600px] text-center">
              <h2 className="mb-3 text-[28px] font-bold tracking-tight text-white">
                Available plans
              </h2>
              <p className="text-[15px] text-ink-secondary">
                Start free, upgrade as your automations grow.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={[
                    'rounded-lg border p-6 text-center',
                    plan.isPopular ? 'border-white bg-white/[0.03]' : 'border-line',
                  ].join(' ')}
                >
                  <div
                    className={[
                      'mb-2.5 text-[14px] font-bold uppercase tracking-wide',
                      plan.isPopular ? 'text-white' : 'text-ink-secondary',
                    ].join(' ')}
                  >
                    {plan.name}
                  </div>
                  <div className="mb-1 text-[30px] font-extrabold tracking-tight text-white">
                    {plan.priceMonthly === 0 ? 'Custom' : `$${plan.priceMonthly}`}
                    {plan.priceMonthly !== 0 && (
                      <span className="text-[13px] font-medium text-ink-tertiary">/mo</span>
                    )}
                  </div>
                  <div className="mb-4.5 text-[12.5px] text-ink-tertiary">
                    {plan.priceMonthly === 0
                      ? 'Unlimited scale, SSO, support'
                      : `Up to ${plan.features[0]}`}
                  </div>
                  <Link to={`/products/${product.slug}/plans`}>
                    <Button variant={plan.isPopular ? 'primary' : 'outline'} className="w-full">
                      Select
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-line py-16">
        <div className="mx-auto max-w-[1200px] px-8">
          <div className="flex flex-wrap items-center justify-between gap-8 rounded-xl border border-line-strong bg-surface-1 p-12">
            <div>
              <h2 className="mb-2 text-[26px] font-bold tracking-tight text-white">
                Ready to get started?
              </h2>
              <p className="text-[14.5px] text-ink-secondary">
                Choose a plan and launch {product.name} in minutes.
              </p>
            </div>
            <Link to={`/products/${product.slug}/plans`}>
              <Button variant="primary" size="md" icon={ArrowRight}>
                Select a Plan
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
