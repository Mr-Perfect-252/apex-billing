import { useState } from 'react'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { PlanCard } from '../components/product/PlanCard'
import { Logo } from '../components/ui/Logo'
import { Button } from '../components/ui/Button'
import { Avatar } from '../components/ui/Avatar'
import { IconTile } from '../components/ui/IconTile'
import { PRODUCTS, PLANS_BY_PRODUCT } from '../lib/data'
import { productIcon } from '../components/product/icons'
import { useSupabaseClient } from '../lib/useSupabaseClient'
import { subscribeToPlan } from '../lib/queries'
import { isClerkConfigured } from '../lib/env'

const steps = [
  { label: 'Product', state: 'done' },
  { label: 'Plan', state: 'active' },
  { label: 'Confirm', state: 'pending' },
] as const

export default function Plans() {
  const { slug = '' } = useParams()
  const navigate = useNavigate()
  const product = PRODUCTS.find((p) => p.slug === slug)
  const plans = PLANS_BY_PRODUCT[slug] ?? []
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly')
  const [selectedPlanId, setSelectedPlanId] = useState(
    plans.find((p) => p.isPopular)?.id ?? plans[0]?.id ?? '',
  )
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = useSupabaseClient()
  const { user } = isClerkConfigured ? useUser() : { user: null }

  if (!product) return <Navigate to="/products" replace />
  const selectedPlan = plans.find((p) => p.id === selectedPlanId)
  const total = selectedPlan
    ? billingCycle === 'monthly'
      ? selectedPlan.priceMonthly
      : selectedPlan.priceYearly
    : 0

  async function handleConfirm() {
    if (!product || !selectedPlan) return
    setError(null)

    // Without Clerk configured there's no real signed-in user; without
    // Supabase configured there's nowhere to persist the subscription. In
    // both cases fall back to a no-op success so the flow is still
    // click-through-able during local scaffolding.
    if (!supabase || !user) {
      navigate('/dashboard')
      return
    }

    setSubmitting(true)
    try {
      await subscribeToPlan(supabase, {
        userId: user.id,
        email: user.primaryEmailAddress?.emailAddress ?? null,
        fullName: user.fullName,
        productId: product.id,
        planId: selectedPlan.id,
        billingCycle,
      })
      navigate('/dashboard')
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Could not complete this subscription. Please try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface-0 pb-28">
      <div className="sticky top-0 z-40 border-b border-line bg-black/85 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-8">
          <Link
            to={`/products/${product.slug}`}
            className="flex items-center gap-2 text-[14px] font-semibold text-ink-secondary hover:text-white"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-4 w-4">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to {product.name}
          </Link>

          <div className="hidden items-center gap-2 text-[13px] text-ink-tertiary md:flex">
            {steps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={[
                      'flex h-[22px] w-[22px] items-center justify-center rounded-full border text-[11px] font-bold',
                      step.state === 'done'
                        ? 'border-white bg-white text-black'
                        : step.state === 'active'
                          ? 'border-white text-white'
                          : 'border-line-strong text-ink-tertiary',
                    ].join(' ')}
                  >
                    {step.state === 'done' ? '✓' : i + 1}
                  </span>
                  <span className={step.state === 'active' ? 'font-semibold text-white' : ''}>
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && <span className="h-px w-6 bg-line-strong" />}
              </div>
            ))}
          </div>

          <Avatar name={user?.fullName ?? 'Jordan Diaz'} size={34} />
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-8 py-11">
        <span className="mb-2.5 block text-[12.5px] font-semibold uppercase tracking-wide text-ink-tertiary">
          {product.subscribed ? 'Manage subscription' : 'Choose a plan'}
        </span>
        <h1 className="mb-2 text-[30px] font-bold tracking-tight text-white">
          Select a plan for {product.name}
        </h1>
        <p className="text-[15px] text-ink-secondary">
          Your plan applies only to {product.name} — every other Apex product keeps its own
          subscription.
        </p>

        <div className="mt-5 inline-flex gap-1 rounded-full border border-line-strong p-1">
          {(['monthly', 'yearly'] as const).map((cycle) => (
            <button
              key={cycle}
              type="button"
              onClick={() => setBillingCycle(cycle)}
              className={[
                'flex items-center gap-1.5 rounded-full px-4.5 py-2 text-[13px] font-semibold capitalize transition-colors',
                billingCycle === cycle ? 'bg-white text-black' : 'text-ink-secondary',
              ].join(' ')}
            >
              {cycle}
              {cycle === 'yearly' && (
                <span className="rounded-full border border-line-strong px-2 py-0.5 text-[10.5px] font-bold text-white">
                  Save 20%
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="mt-9 grid grid-cols-1 gap-7 lg:grid-cols-[300px_1fr]">
          <div className="rounded-lg border border-line bg-surface-1 p-6 lg:sticky lg:top-[110px] lg:self-start">
            <IconTile size="lg" className="mb-4.5">
              {productIcon(product.slug)}
            </IconTile>
            <h3 className="mb-2 text-[18px] font-bold text-white">{product.name}</h3>
            <p className="mb-5 text-[13.5px] leading-relaxed text-ink-secondary">
              {product.description}
            </p>
            <div className="flex flex-col gap-2.5 border-t border-line pt-4.5 text-[13px] text-ink-secondary">
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="h-3.5 w-3.5 flex-shrink-0 text-white">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Uses your Apex account
              </div>
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="h-3.5 w-3.5 flex-shrink-0 text-white">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Cancel or switch plans anytime
              </div>
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="h-3.5 w-3.5 flex-shrink-0 text-white">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Instant access after checkout
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                billingCycle={billingCycle}
                selected={plan.id === selectedPlanId}
                onSelect={() => setSelectedPlanId(plan.id)}
              />
            ))}
          </div>
        </div>

        {error && (
          <p className="mt-6 rounded-md border border-line-strong bg-white/[0.04] px-4 py-3 text-[13.5px] text-white">
            {error}
          </p>
        )}

        <p className="mt-7 text-[12.5px] text-ink-tertiary">
          Prices exclude applicable tax. By continuing you agree to the Apex{' '}
          <Link to="#" className="font-semibold text-white">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="#" className="font-semibold text-white">
            Refund Policy
          </Link>
          . You can cancel anytime from Billing settings.
        </p>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-black/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-5 px-8 py-4.5">
          <div>
            <div className="text-[12px] text-ink-tertiary">
              {product.name} — {selectedPlan?.name} plan ({billingCycle})
            </div>
            <div className="text-[20px] font-extrabold tracking-tight text-white">
              ${total.toFixed(2)}
              <span className="ml-1 text-[13px] font-medium text-ink-tertiary">
                / {billingCycle === 'monthly' ? 'mo' : 'yr'}
              </span>
            </div>
          </div>
          <Button variant="primary" size="md" onClick={handleConfirm} disabled={submitting}>
            {submitting ? 'Confirming…' : 'Confirm Subscription'}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-4 w-4">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  )
}
