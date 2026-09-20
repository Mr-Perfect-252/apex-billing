import { Link } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Avatar } from '../components/ui/Avatar'
import { IconTile } from '../components/ui/IconTile'
import { productIcon } from '../components/product/icons'
import { PRODUCTS } from '../lib/data'

function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
      <div className="h-full rounded-full bg-white" style={{ width: `${percent}%` }} />
    </div>
  )
}

export default function Dashboard() {
  const subscribed = PRODUCTS.filter((p) => p.subscribed)

  return (
    <AppShell crumb="Dashboard">
      <div className="mb-2 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="mb-1.5 text-[26px] font-bold tracking-tight text-white">Dashboard</h1>
          <p className="text-[14.5px] text-ink-secondary">
            Welcome back, Jordan. Here&apos;s what&apos;s happening across your Apex products.
          </p>
        </div>
        <div className="flex gap-2.5">
          <Button variant="outline">Manage billing</Button>
          <Button variant="primary">Add product</Button>
        </div>
      </div>
      <hr className="my-7 border-line" />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[320px_1fr]">
        {/* Left column: account + billing */}
        <div className="flex flex-col gap-5">
          <Card className="p-5.5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-[14.5px] font-semibold text-white">Account overview</h3>
              <Link to="/settings" className="text-[12.5px] font-semibold text-white/80 hover:text-white">
                Edit
              </Link>
            </div>
            <div className="mb-4.5 flex items-center gap-3.5">
              <Avatar name="Jordan Diaz" size={52} />
              <div>
                <div className="text-[15.5px] font-semibold text-white">Jordan Diaz</div>
                <div className="text-[13px] text-ink-tertiary">jordan@apexhublabs.com</div>
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
                <span className="text-ink-tertiary">Member since</span>
                <span className="font-semibold text-white">Jan 2025</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink-tertiary">Two-factor auth</span>
                <Badge variant="subtle">Enabled</Badge>
              </div>
            </div>
          </Card>

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
        </div>

        {/* Right column: products + activity */}
        <div className="flex flex-col gap-5">
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
                    <div className="truncate text-[12.5px] text-ink-tertiary">
                      {p.tagline} — Pro plan
                    </div>
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
            </div>
          </Card>

          <Card className="flex items-center gap-4 border-line-strong bg-white/[0.03] p-5.5">
            <IconTile variant="outline">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.7 21a2 2 0 01-3.4 0" />
              </svg>
            </IconTile>
            <div className="flex-1">
              <div className="text-[14px] font-semibold text-white">
                Apex Insights v2.4 is now live
              </div>
              <div className="text-[12.5px] text-ink-secondary">
                New cross-product reporting and faster dashboards — see what&apos;s new.
              </div>
            </div>
            <Button variant="outline">View changelog</Button>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}
