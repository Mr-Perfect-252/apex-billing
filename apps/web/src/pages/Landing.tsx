import { Link } from 'react-router-dom'
import { MarketingNav } from '../components/layout/MarketingNav'
import { Footer } from '../components/layout/Footer'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { IconTile } from '../components/ui/IconTile'
import { productIcon } from '../components/product/icons'
import { PRODUCTS } from '../lib/data'

const ArrowRight = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-4 w-4">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

const Check = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

export default function Landing() {
  return (
    <div className="bg-surface-0">
      <MarketingNav />

      {/* Hero — pure black, a single soft white glow, no color anywhere */}
      <section
        className="relative overflow-hidden border-b border-line"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 60% 55% at 100% 0%, rgba(255,255,255,0.10), transparent 60%)',
        }}
      >
        <div className="mx-auto flex min-h-[600px] max-w-[1200px] flex-col justify-end px-8 pb-24 pt-28">
          <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-line-strong px-3.5 py-1.5 text-[12.5px] font-semibold uppercase tracking-wide text-ink-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            The Apex Ecosystem
          </span>
          <h1 className="mb-6 max-w-[600px] text-[56px] font-extrabold leading-[1.05] tracking-tight text-white">
            Welcome to the Apex Suite.
          </h1>
          <p className="mb-9 max-w-[540px] text-[17.5px] leading-relaxed text-ink-secondary">
            One account. Every Apex product. A single, unified workspace built for teams who
            expect more from their tools — discover, subscribe, and launch without switching
            platforms.
          </p>
          <div className="mb-9 flex flex-wrap items-center gap-3.5">
            <Link to="/dashboard">
              <Button variant="primary" size="md" icon={ArrowRight}>
                Get Started
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="outline" size="md">
                Explore Products
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-[13.5px] text-ink-tertiary">
            <span className="flex items-center gap-1.5">{Check} No credit card required</span>
            <span className="flex items-center gap-1.5">{Check} Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* Product showcase */}
      <section id="products-preview" className="py-24">
        <div className="mx-auto max-w-[1200px] px-8">
          <div className="mx-auto mb-14 max-w-[640px] text-center">
            <span className="mb-4 inline-block text-[12.5px] font-semibold uppercase tracking-wide text-ink-tertiary">
              Product showcase
            </span>
            <h2 className="mb-4 text-[38px] font-bold leading-tight tracking-tight text-white">
              Everything you need, in one suite
            </h2>
            <p className="text-[16.5px] leading-relaxed text-ink-secondary">
              Every Apex product shares the same account, billing, and design language — pick
              what your team needs and launch instantly.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {PRODUCTS.slice(0, 3).map((product) => (
              <Card key={product.id} hover className="p-7">
                <IconTile size="lg" className="mb-5">
                  {productIcon(product.slug)}
                </IconTile>
                <h3 className="mb-2.5 text-[18.5px] font-semibold tracking-tight text-white">
                  {product.name}
                </h3>
                <p className="mb-4 text-[14.5px] leading-relaxed text-ink-secondary">
                  {product.description}
                </p>
                <div className="mb-4">
                  <Badge variant="outline">{product.category}</Badge>
                </div>
                <Link
                  to={`/products/${product.slug}`}
                  className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-white"
                >
                  Explore {product.name} {ArrowRight}
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Apex */}
      <section id="features" className="border-y border-line bg-surface-1 py-24">
        <div className="mx-auto max-w-[1200px] px-8">
          <div className="mx-auto mb-14 max-w-[640px] text-center">
            <span className="mb-4 inline-block text-[12.5px] font-semibold uppercase tracking-wide text-ink-tertiary">
              Why Apex
            </span>
            <h2 className="mb-4 text-[38px] font-bold leading-tight tracking-tight text-white">
              Built as one ecosystem, not a bundle
            </h2>
            <p className="text-[16.5px] leading-relaxed text-ink-secondary">
              Apex Hub Labs unifies identity, billing, and access so every product feels like
              part of the same platform.
            </p>
          </div>

          <div className="grid gap-9 md:grid-cols-3">
            {[
              {
                title: 'Single sign-on, everywhere',
                body: 'One Apex account grants access across the entire suite — no separate logins, no duplicated profiles.',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="10" rx="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                ),
              },
              {
                title: 'Instant product access',
                body: 'Subscribe to a plan and launch the product immediately — entitlements sync in real time.',
                icon: productIcon('apex-flow'),
              },
              {
                title: 'Enterprise-grade security',
                body: 'Centralized identity, audit trails, and permissioning shared consistently across every Apex product.',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
                  </svg>
                ),
              },
            ].map((f) => (
              <div key={f.title}>
                <IconTile variant="outline" className="mb-4.5">
                  {f.icon}
                </IconTile>
                <h3 className="mb-2 text-[16.5px] font-semibold text-white">{f.title}</h3>
                <p className="text-[14.5px] leading-relaxed text-ink-secondary">{f.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-2 gap-6 border-t border-line pt-12 md:grid-cols-4">
            {[
              ['12+', 'Apex products in one suite'],
              ['99.98%', 'Platform uptime'],
              ['1', 'Account for everything'],
              ['24/7', 'Dedicated support'],
            ].map(([num, label]) => (
              <div key={label}>
                <div className="text-[34px] font-extrabold tracking-tight text-white">{num}</div>
                <div className="mt-1.5 text-[13.5px] text-ink-tertiary">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-[1200px] px-8">
          <div className="flex flex-wrap items-center justify-between gap-8 rounded-xl border border-line-strong bg-surface-1 p-14">
            <div>
              <h2 className="mb-2.5 text-[30px] font-bold tracking-tight text-white">
                Ready to reach the Apex?
              </h2>
              <p className="max-w-[440px] text-[15.5px] text-ink-secondary">
                Create your account and start exploring the full Apex product suite in
                minutes.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/dashboard">
                <Button variant="primary" size="md" icon={ArrowRight}>
                  Create your account
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="outline" size="md">
                  View all products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
