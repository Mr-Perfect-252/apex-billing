import type { Plan } from '../../lib/types'

interface PlanCardProps {
  plan: Plan
  selected: boolean
  billingCycle: 'monthly' | 'yearly'
  onSelect: () => void
}

/**
 * Selection state is shown with a solid white border + filled white
 * "Selected" button — no color, no glow. Everything else stays outline.
 */
export function PlanCard({ plan, selected, billingCycle, onSelect }: PlanCardProps) {
  const price = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly / 12
  const isEnterprise = plan.priceMonthly === 0

  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        'relative flex flex-col rounded-lg border p-6 text-left transition-colors',
        selected ? 'border-white bg-white/[0.04]' : 'border-line-strong hover:border-white/40',
      ].join(' ')}
    >
      {plan.isPopular && (
        <span className="absolute -top-3 left-6 rounded-full bg-white px-3 py-1 text-[10.5px] font-bold uppercase tracking-wide text-black">
          Most popular
        </span>
      )}
      <span
        className={[
          'absolute right-5 top-5 h-5 w-5 rounded-full border-2',
          selected ? 'border-white bg-white' : 'border-line-strong',
        ].join(' ')}
      />

      <div className="mb-3.5 text-[13px] font-bold uppercase tracking-wide text-ink-secondary">
        {plan.name}
      </div>

      <div className="mb-1 flex items-baseline gap-1">
        <span className="text-[34px] font-extrabold tracking-tight text-white">
          {isEnterprise ? 'Custom' : `$${Math.round(price)}`}
        </span>
        {!isEnterprise && <span className="text-[13.5px] text-ink-tertiary">/mo</span>}
      </div>
      <div className="mb-5 text-[12.5px] text-ink-tertiary">
        {isEnterprise ? 'Annual contract' : `Billed $${plan.priceYearly} yearly`}
      </div>

      <div className="mb-6 flex flex-1 flex-col gap-3">
        {plan.features.map((feature) => (
          <div key={feature} className="flex items-start gap-2 text-[13.5px] text-ink-secondary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="mt-0.5 h-4 w-4 flex-shrink-0 text-white">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            {feature}
          </div>
        ))}
      </div>

      <div
        className={[
          'w-full rounded-md py-2.5 text-center text-[14px] font-semibold',
          selected ? 'bg-white text-black' : 'border border-line-strong text-white',
        ].join(' ')}
      >
        {isEnterprise ? 'Contact Sales' : selected ? 'Selected' : `Select ${plan.name}`}
      </div>
    </button>
  )
}
