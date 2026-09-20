import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline'
type Size = 'sm' | 'md'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  as?: 'button'
}

/**
 * Monochrome button system. Exactly one filled ("primary") style exists —
 * pure white fill, black text, the highest-contrast element on the page.
 * Every other action uses outline, secondary (translucent white fill), or
 * ghost (text-only). No hue is ever used to signal state; only weight,
 * fill, and opacity do that work.
 */
const base =
  'inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-40'

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-[13px]',
  md: 'h-11 px-5 text-[14.5px]',
}

const variants: Record<Variant, string> = {
  primary: 'bg-white text-black hover:bg-white/90 active:bg-white/80',
  secondary: 'bg-white/10 text-white hover:bg-white/15 active:bg-white/20',
  outline: 'border border-line-strong text-white hover:bg-white/5 active:bg-white/10',
  ghost: 'text-ink-secondary hover:text-white hover:bg-white/5',
}

export function Button({
  variant = 'secondary',
  size = 'md',
  icon,
  iconPosition = 'right',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' ? icon : null}
      <span>{children}</span>
      {icon && iconPosition === 'right' ? icon : null}
    </button>
  )
}
