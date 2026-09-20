import type { Plan, Product } from './types'

/**
 * Placeholder content used until the Supabase `products` / `plans` tables
 * are seeded. Shape matches `database.types.ts` so swapping in a real
 * `supabase.from('products').select()` call is a drop-in replacement.
 */
export const PRODUCTS: Product[] = [
  {
    id: 'apex-flow',
    slug: 'apex-flow',
    name: 'Apex Flow',
    tagline: 'Automation & workflows',
    description:
      'Automate multi-step workflows across every connected Apex product with a visual, no-code builder.',
    category: 'Automation',
    status: 'live',
    subscribed: true,
    priceFrom: 15,
  },
  {
    id: 'apex-insights',
    slug: 'apex-insights',
    name: 'Apex Insights',
    tagline: 'Analytics & reporting',
    description:
      'Real-time analytics and reporting across your entire Apex footprint, in one unified dashboard.',
    category: 'Analytics',
    status: 'live',
    subscribed: true,
    priceFrom: 29,
  },
  {
    id: 'apex-ledger',
    slug: 'apex-ledger',
    name: 'Apex Ledger',
    tagline: 'Billing & finance',
    description:
      'Billing, invoicing, and financial operations built to scale with every subscription you manage.',
    category: 'Finance',
    status: 'new',
    subscribed: false,
    priceFrom: 15,
  },
  {
    id: 'apex-studio',
    slug: 'apex-studio',
    name: 'Apex Studio',
    tagline: 'Design & prototyping',
    description:
      'Design, prototype, and ship UI faster with a shared component library across every Apex product.',
    category: 'Design',
    status: 'new',
    subscribed: false,
    priceFrom: 25,
  },
  {
    id: 'apex-pulse',
    slug: 'apex-pulse',
    name: 'Apex Pulse',
    tagline: 'Monitoring & alerts',
    description:
      'Uptime, incident, and status monitoring for every Apex product and your own integrations.',
    category: 'Monitoring',
    status: 'available',
    subscribed: false,
    priceFrom: 12,
  },
  {
    id: 'apex-vault',
    slug: 'apex-vault',
    name: 'Apex Vault',
    tagline: 'Security & secrets',
    description:
      'Secrets, credentials, and access management shared securely across your Apex workspace.',
    category: 'Security',
    status: 'available',
    subscribed: false,
    priceFrom: 22,
  },
]

export const PLANS_BY_PRODUCT: Record<string, Plan[]> = {
  'apex-flow': [
    {
      id: 'starter',
      name: 'Starter',
      priceMonthly: 15,
      priceYearly: 180,
      features: ['Up to 5 workflows', '1,000 runs / month', 'Community support', '1 team member'],
      isPopular: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      priceMonthly: 39,
      priceYearly: 468,
      features: [
        'Unlimited workflows',
        '25,000 runs / month',
        'Priority email support',
        'Up to 10 team members',
      ],
      isPopular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      priceMonthly: 0,
      priceYearly: 0,
      features: [
        'Unlimited everything',
        'SSO & SCIM provisioning',
        'Dedicated support engineer',
        'Unlimited team members',
      ],
      isPopular: false,
    },
  ],
}
