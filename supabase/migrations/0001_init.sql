-- Apex Hub Labs — initial schema
-- Auth identity lives in Clerk, not Supabase Auth. `profiles.id` stores the
-- Clerk user id directly (text, e.g. "user_2abc..."), and RLS policies key
-- off the Clerk JWT via Supabase's third-party auth integration
-- (Authentication → Sign In / Providers → Clerk in the Supabase dashboard).

create extension if not exists "pgcrypto";

create table if not exists profiles (
  id text primary key,                -- Clerk user id
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  tagline text,
  description text,
  category text,
  status text not null default 'available' check (status in ('live', 'new', 'available')),
  created_at timestamptz not null default now()
);

create table if not exists plans (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  name text not null,
  price_monthly numeric(10, 2) not null default 0,
  price_yearly numeric(10, 2) not null default 0,
  features jsonb not null default '[]'::jsonb,
  is_popular boolean not null default false,
  sort_order int not null default 0
);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id text not null references profiles(id) on delete cascade,
  product_id uuid not null references products(id) on delete cascade,
  plan_id uuid not null references plans(id) on delete restrict,
  status text not null default 'active' check (status in ('active', 'canceled', 'past_due')),
  billing_cycle text not null default 'monthly' check (billing_cycle in ('monthly', 'yearly')),
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);

-- Row Level Security ---------------------------------------------------

alter table profiles enable row level security;
alter table products enable row level security;
alter table plans enable row level security;
alter table subscriptions enable row level security;

-- Products and plans are public catalog data.
create policy "products are publicly readable" on products
  for select using (true);

create policy "plans are publicly readable" on plans
  for select using (true);

-- Profiles and subscriptions are only visible to their owner, identified
-- by the `sub` claim Clerk puts on the JWT Supabase receives.
create policy "users can read their own profile" on profiles
  for select using (id = auth.jwt()->>'sub');

create policy "users can update their own profile" on profiles
  for update using (id = auth.jwt()->>'sub');

create policy "users can read their own subscriptions" on subscriptions
  for select using (user_id = auth.jwt()->>'sub');
