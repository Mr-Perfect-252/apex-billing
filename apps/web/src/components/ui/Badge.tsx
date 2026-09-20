import type { ReactNode } from 'react'

type BadgeVariant = 'outline' | 'filled' | 'subtle'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

/**
 * Status/label pill. Distinguishes "live" vs "new" vs "available" purely
 * through fill weight (filled white > subtle white-on-white > outline),
 * never through hue — there is no green/red/amber anywhere in this system.
 */
export function Badge({ children, variant = 'outline', className = '' }: BadgeProps) {
  const styles: Record<BadgeVariant, string> = {
    filled: 'bg-white text-black',
    subtle: 'bg-white/10 text-white border border-transparent',
    outline: 'border border-line-strong text-ink-secondary',
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
