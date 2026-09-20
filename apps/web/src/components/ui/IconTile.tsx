import type { ReactNode } from 'react'

type IconTileSize = 'sm' | 'md' | 'lg' | 'xl'
type IconTileVariant = 'filled' | 'outline'

interface IconTileProps {
  children: ReactNode
  size?: IconTileSize
  variant?: IconTileVariant
  className?: string
}

const sizes: Record<IconTileSize, { box: string; icon: string; radius: string }> = {
  sm: { box: 'h-8 w-8', icon: 'h-4 w-4', radius: 'rounded-[9px]' },
  md: { box: 'h-10 w-10', icon: 'h-[18px] w-[18px]', radius: 'rounded-[10px]' },
  lg: { box: 'h-12 w-12', icon: 'h-[22px] w-[22px]', radius: 'rounded-xl' },
  xl: { box: 'h-[84px] w-[84px]', icon: 'h-9 w-9', radius: 'rounded-[20px]' },
}

/**
 * Product/feature icon container. Every product in the suite gets the same
 * black-fill-white-icon (or reverse) treatment — differentiation between
 * products comes from the icon glyph itself, not from a rotating color
 * wheel of gradients, per the zero-color direction.
 */
export function IconTile({ children, size = 'md', variant = 'filled', className = '' }: IconTileProps) {
  const s = sizes[size]
  const fill =
    variant === 'filled'
      ? 'bg-white text-black'
      : 'bg-white/5 text-white border border-line-strong'
  return (
    <span
      className={`inline-flex flex-shrink-0 items-center justify-center ${s.box} ${s.radius} ${fill} ${className}`}
    >
      <span className={s.icon}>{children}</span>
    </span>
  )
}
