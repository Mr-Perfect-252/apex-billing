import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  highlight?: boolean
}

/**
 * Base surface. Sits one step above pure black (surface-1) so content
 * never disappears into the void, separated by a hairline border rather
 * than a shadow — shadows are dropped entirely in this dark, monochrome
 * system per the dark-mode "remove all shadows" convention.
 */
export function Card({ hover = false, highlight = false, className = '', children, ...props }: CardProps) {
  return (
    <div
      className={[
        'rounded-lg border bg-surface-1',
        highlight ? 'border-white' : 'border-line',
        hover ? 'transition-colors hover:border-line-strong hover:bg-surface-2' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}
