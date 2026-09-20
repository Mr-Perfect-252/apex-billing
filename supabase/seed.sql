-- Seed data mirroring src/lib/data.ts, for local development against a
-- real Supabase project instead of the hardcoded frontend fallback.

insert into products (slug, name, tagline, description, category, status) values
  ('apex-flow', 'Apex Flow', 'Automation & workflows', 'Automate multi-step workflows across every connected Apex product with a visual, no-code builder.', 'Automation', 'live'),
  ('apex-insights', 'Apex Insights', 'Analytics & reporting', 'Real-time analytics and reporting across your entire Apex footprint, in one unified dashboard.', 'Analytics', 'live'),
  ('apex-ledger', 'Apex Ledger', 'Billing & finance', 'Billing, invoicing, and financial operations built to scale with every subscription you manage.', 'Finance', 'new'),
  ('apex-studio', 'Apex Studio', 'Design & prototyping', 'Design, prototype, and ship UI faster with a shared component library across every Apex product.', 'Design', 'new'),
  ('apex-pulse', 'Apex Pulse', 'Monitoring & alerts', 'Uptime, incident, and status monitoring for every Apex product and your own integrations.', 'Monitoring', 'available'),
  ('apex-vault', 'Apex Vault', 'Security & secrets', 'Secrets, credentials, and access management shared securely across your Apex workspace.', 'Security', 'available')
on conflict (slug) do nothing;

insert into plans (product_id, name, price_monthly, price_yearly, features, is_popular, sort_order)
select id, 'Starter', 15, 180, '["Up to 5 workflows", "1,000 runs / month", "Community support", "1 team member"]'::jsonb, false, 1
from products where slug = 'apex-flow'
on conflict do nothing;

insert into plans (product_id, name, price_monthly, price_yearly, features, is_popular, sort_order)
select id, 'Pro', 39, 468, '["Unlimited workflows", "25,000 runs / month", "Priority email support", "Up to 10 team members"]'::jsonb, true, 2
from products where slug = 'apex-flow'
on conflict do nothing;

insert into plans (product_id, name, price_monthly, price_yearly, features, is_popular, sort_order)
select id, 'Enterprise', 0, 0, '["Unlimited everything", "SSO & SCIM provisioning", "Dedicated support engineer", "Unlimited team members"]'::jsonb, false, 3
from products where slug = 'apex-flow'
on conflict do nothing;
