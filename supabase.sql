-- HELIOS: Ana <-> Bobi shared dispatcher
-- Run this in Supabase SQL Editor.
create table if not exists public.service_jobs (
  id uuid primary key default gen_random_uuid(),
  team_code text not null,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  address text,
  maps_url text,
  brand text,
  model text,
  symptom text,
  note text,
  scheduled_date date,
  photo text,
  status text not null default 'novo' check (status in ('novo','preuzeto','zakazano','teren','zavrseno','otkazano'))
);
alter table public.service_jobs enable row level security;
drop policy if exists "team read" on public.service_jobs;
drop policy if exists "team insert" on public.service_jobs;
drop policy if exists "team update" on public.service_jobs;
create policy "team read" on public.service_jobs for select to authenticated using ((auth.jwt()->'user_metadata'->>'team_code') = team_code);
create policy "team insert" on public.service_jobs for insert to authenticated with check ((auth.jwt()->'user_metadata'->>'team_code') = team_code);
create policy "team update" on public.service_jobs for update to authenticated using ((auth.jwt()->'user_metadata'->>'team_code') = team_code) with check ((auth.jwt()->'user_metadata'->>'team_code') = team_code);
create index if not exists service_jobs_team_created_idx on public.service_jobs(team_code, created_at desc);
