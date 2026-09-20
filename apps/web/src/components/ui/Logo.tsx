interface LogoProps {
  size?: number
  className?: string
}

/**
 * Wordmark and mark. Pure black/white — the mark is a plain white
 * triangle on a bordered black tile, no gradient, no brand hue.
 */
export function LogoMark({ size = 30, className = '' }: LogoProps) {
  return (
    <span
      className={`inline-flex flex-shrink-0 items-center justify-center rounded-[9px] border border-line-strong bg-white ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 24 24" fill="none" style={{ width: size * 0.5, height: size * 0.5 }}>
        <path d="M12 3L21 20H3L12 3Z" fill="black" />
      </svg>
    </span>
  )
}

export function Logo({ size = 30 }: LogoProps) {
  return (
    <span className="flex items-center gap-2.5 text-[18px] font-bold text-white">
      <LogoMark size={size} />
      Apex
    </span>
  )
}
