import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { AppShell } from '../components/layout/AppShell'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Avatar } from '../components/ui/Avatar'
import { IconTile } from '../components/ui/IconTile'
import { productIcon } from '../components/product/icons'
import { PRODUCTS } from '../lib/data'
import { useSupabaseClient } from '../lib/useSupabaseClient'
import { fetchMySubscriptions } from '../lib/queries'
import { isClerkConfigured } from '../lib/env'
import type { Product } from '../lib/types'

function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
      <div className="h-full rounded-full bg-white" style={{ width: `${percent}%` }} />
    </div>
  )
}

export default function Dashboard() {
  const supabase = useSupabaseClient()
  const { user } = isClerkConfigured ? useUser() : { user: null }
  const [subscribed, setSubscribed] = useState<Product[]>(PRODUCTS.filter((p) => p.subscribed))

  useEffect(() => {
    if (!supabase || !user) return
    let cancelled = false
    fetchMySubscriptions(supabase, user.id)
      .then((rows) => {
        if (cancelled || !rows.length) return
        const mapped = rows
          .map((row) => {
            const product = row.products
            if (!product) return null
            return {
              id: product.id,
              slug: product.slug,
              name: product.name,
              tagline: product.tagline ?? '',
              description: product.description ?? '',
              category: product.category ?? '',
              status: product.status,
              subscribed: true,
              priceFrom: 0,
            } as Product
          })
          .filter((p): p is Product => p !== null)
        if (mapped.length) setSubscribed(mapped)
      })
      .catch(() => {
        // Keep local fallback list if the table isn't seeded / reachable yet.
      })
    return () => {
      cancelled = true
    }
  }, [supabase, user])

  const displayName = user?.fullName ?? 'Jordan Diaz'
  const firstName = displayName.split(' ')[0]

  return (
    <AppShell crumb="Dashboard">
      <div className="mb-2 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="mb-1.5 text-[26px] font-bold tracking-tight text-white">Dashboard</h1>
          <p className="text-[14.5px] text-ink-secondary">
            Welcome back, {firstName}. Here&apos;s what&apos;s happening across your Apex
            products.
          </p>
        </div>
        <div className="flex gap-2.5">
          <Button variant="outline">Manage billing</Button>
          <Link to="/products">
            <Button variant="primary">Browse products</Button>
          </Link>
        </div>
      </div>
      <hr className="my-7 border-line" />

      {/* Top row: one large card + one slim card side by side, per the sketch */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">
        <Card className="p-5.5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[14.5px] font-semibold text-white">Your products</h3>
            <Link to="/products" className="text-[12.5px] font-semibold text-white/80 hover:text-white">
              View all
            </Link>
          </div>
          <div className="flex flex-col gap-2.5">
            {subscribed.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3.5 rounded-md border border-line bg-white/[0.01] p-3.5 transition-colors hover:border-line-strong hover:bg-white/[0.03]"
              >
                <IconTile>{productIcon(p.slug)}</IconTile>
                <div className="min-w-0 flex-1">
                  <div className="text-[14.5px] font-semibold text-white">{p.name}</div>
                  <div className="truncate text-[12.5px] text-ink-tertiary">{p.tagline}</div>
                </div>
                <div className="hidden flex-col items-end gap-1.5 sm:flex">
                  <span className="text-[11px] text-ink-tertiary">Usage this month</span>
                  <div className="h-1 w-[90px] overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-white" style={{ width: '58%' }} />
                  </div>
                </div>
                <Link to={`/products/${p.slug}`}>
                  <Button variant="outline" size="sm">
                    Open
                  </Button>
                </Link>
              </div>
            ))}
            {subscribed.length === 0 && (
              <div className="rounded-md border border-dashed border-line-strong p-6 text-center text-[13.5px] text-ink-tertiary">
                You haven&apos;t subscribed to any Apex products yet.{' '}
                <Link to="/products" className="font-semibold text-white">
                  Browse the catalog
                </Link>
                .
              </div>
            )}
          </div>
        </Card>

        <Card className="p-5.5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[14.5px] font-semibold text-white">Account overview</h3>
            <Link to="/settings" className="text-[12.5px] font-semibold text-white/80 hover:text-white">
              Edit
            </Link>
          </div>
          <div className="mb-4.5 flex items-center gap-3.5">
            <Avatar name={displayName} size={52} />
            <div>
              <div className="text-[15.5px] font-semibold text-white">{displayName}</div>
              <div className="truncate text-[13px] text-ink-tertiary">
                {user?.primaryEmailAddress?.emailAddress ?? 'jordan@apexhublabs.com'}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-[13.5px]">
            <div className="flex items-center justify-between">
              <span className="text-ink-tertiary">Account status</span>
              <Badge variant="filled">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-tertiary">Role</span>
              <span className="font-semibold text-white">Owner</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-tertiary">Two-factor auth</span>
              <Badge variant="subtle">Enabled</Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom row: two equal-width cards, per the sketch */}
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <Card className="p-5.5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[14.5px] font-semibold text-white">Billing summary</h3>
            <Link to="/billing" className="text-[12.5px] font-semibold text-white/80 hover:text-white">
              Details
            </Link>
          </div>
          <div className="mb-4 rounded-md border border-line-strong bg-white/[0.03] p-4">
            <div className="mb-0.5 text-[16px] font-bold text-white">Apex Pro</div>
            <div className="text-[12.5px] text-ink-secondary">
              Renews Oct 20, 2026 · <span className="font-semibold text-white">$49/mo</span>
            </div>
          </div>
          <div className="mb-1.5 flex justify-between text-[12px] text-ink-tertiary">
            <span>Seats used</span>
            <span>7 / 10</span>
          </div>
          <ProgressBar percent={70} />
          <div className="mb-1.5 mt-3.5 flex justify-between text-[12px] text-ink-tertiary">
            <span>Storage</span>
            <span>128GB / 250GB</span>
          </div>
          <ProgressBar percent={51} />
        </Card>

        <Card className="flex flex-col p-5.5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[14.5px] font-semibold text-white">Recent activity</h3>
            <Button variant="outline" size="sm">
              View changelog
            </Button>
          </div>
          <div className="flex flex-1 items-center gap-4 rounded-md border border-line-strong bg-white/[0.03] p-4">
            <IconTile variant="outline">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.7 21a2 2 0 01-3.4 0" />
              </svg>
            </IconTile>
            <div>
              <div className="text-[14px] font-semibold text-white">
                Apex Insights v2.4 is now live
              </div>
              <div className="text-[12.5px] text-ink-secondary">
                New cross-product reporting and faster dashboards.
              </div>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  )
}
