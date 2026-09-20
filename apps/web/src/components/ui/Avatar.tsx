interface AvatarProps {
  name: string
  size?: number
  className?: string
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/)
  return (parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')
}

export function Avatar({ name, size = 36, className = '' }: AvatarProps) {
  return (
    <span
      className={`inline-flex flex-shrink-0 items-center justify-center rounded-full border border-line-strong bg-white/10 font-bold text-white ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.34 }}
    >
      {initials(name).toUpperCase()}
    </span>
  )
}
