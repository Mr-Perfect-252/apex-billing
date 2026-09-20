import { Link } from 'react-router-dom'
import type { Product } from '../../lib/types'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { IconTile } from '../ui/IconTile'
import { productIcon } from './icons'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card hover className="flex flex-col p-6">
      <div className="mb-4.5 flex items-start justify-between">
        <IconTile size="lg">{productIcon(product.slug)}</IconTile>
        {product.subscribed ? (
          <Badge variant="filled">Subscribed</Badge>
        ) : product.status === 'new' ? (
          <Badge variant="subtle">New</Badge>
        ) : (
          <Badge variant="outline">Available</Badge>
        )}
      </div>

      <h3 className="mb-2 text-[18px] font-semibold tracking-tight text-white">{product.name}</h3>
      <p className="mb-4 flex-1 text-[14px] leading-relaxed text-ink-secondary">{product.description}</p>

      <div className="mb-4 flex flex-wrap gap-1.5">
        <Badge variant="outline">{product.category}</Badge>
      </div>

      <div className="flex items-center justify-between border-t border-line pt-4">
        <div className="text-[12.5px] text-ink-tertiary">
          From <span className="font-semibold text-white">${product.priceFrom}/mo</span>
        </div>
        <Link
          to={`/products/${product.slug}`}
          className="inline-flex items-center gap-1.5 rounded-md bg-white px-3.5 py-2 text-[13.5px] font-semibold text-black hover:bg-white/90"
        >
          View Product
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="h-3.5 w-3.5">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </Card>
  )
}
