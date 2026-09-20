export type ProductStatus = 'live' | 'new' | 'available'

export interface Product {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  category: string
  status: ProductStatus
  subscribed: boolean
  priceFrom: number
}

export interface Plan {
  id: string
  name: string
  priceMonthly: number
  priceYearly: number
  features: string[]
  isPopular: boolean
}
