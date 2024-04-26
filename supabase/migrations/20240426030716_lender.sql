drop policy "Enable ALL access for authenticated users (Review later)" on "public"."funds";

revoke delete on table "public"."funds" from "anon";

revoke insert on table "public"."funds" from "anon";

revoke references on table "public"."funds" from "anon";

revoke select on table "public"."funds" from "anon";

revoke trigger on table "public"."funds" from "anon";

revoke truncate on table "public"."funds" from "anon";

revoke update on table "public"."funds" from "anon";

revoke delete on table "public"."funds" from "authenticated";

revoke insert on table "public"."funds" from "authenticated";

revoke references on table "public"."funds" from "authenticated";

revoke select on table "public"."funds" from "authenticated";

revoke trigger on table "public"."funds" from "authenticated";

revoke truncate on table "public"."funds" from "authenticated";

revoke update on table "public"."funds" from "authenticated";

revoke delete on table "public"."funds" from "service_role";

revoke insert on table "public"."funds" from "service_role";

revoke references on table "public"."funds" from "service_role";

revoke select on table "public"."funds" from "service_role";

revoke trigger on table "public"."funds" from "service_role";

revoke truncate on table "public"."funds" from "service_role";

revoke update on table "public"."funds" from "service_role";

drop function if exists "public"."calculate_funds_loans"(user_id uuid);

drop function if exists "public"."sum_funds_amount"(user_id uuid);

alter table "public"."funds" drop constraint "investments_pkey";

drop index if exists "public"."investments_pkey";

drop table "public"."funds";

alter table "public"."loans" alter column "status" drop default;

alter type "public"."loan_status" rename to "loan_status__old_version_to_be_dropped";

create type "public"."loan_status" as enum ('draft', 'archived', 'pending', 'in_review', 'active', 'delayed', 'paid', 'write_off');

create table "public"."lender" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "loan_id" uuid,
    "amount" numeric not null,
    "user_id" uuid default gen_random_uuid()
);


alter table "public"."lender" enable row level security;

alter table "public"."loans" alter column status type "public"."loan_status" using status::text::"public"."loan_status";

alter table "public"."loans" alter column "status" set default 'active'::loan_status;

drop type "public"."loan_status__old_version_to_be_dropped";

CREATE UNIQUE INDEX lender_user_id_key ON public.lender USING btree (user_id);

CREATE UNIQUE INDEX investments_pkey ON public.lender USING btree (id);

alter table "public"."lender" add constraint "investments_pkey" PRIMARY KEY using index "investments_pkey";

alter table "public"."lender" add constraint "lender_user_id_key" UNIQUE using index "lender_user_id_key";

alter table "public"."lender" add constraint "public_funds_loan_id_fkey" FOREIGN KEY (loan_id) REFERENCES loans(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."lender" validate constraint "public_funds_loan_id_fkey";

alter table "public"."lender" add constraint "public_lender_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."lender" validate constraint "public_lender_user_id_fkey";

grant delete on table "public"."lender" to "anon";

grant insert on table "public"."lender" to "anon";

grant references on table "public"."lender" to "anon";

grant select on table "public"."lender" to "anon";

grant trigger on table "public"."lender" to "anon";

grant truncate on table "public"."lender" to "anon";

grant update on table "public"."lender" to "anon";

grant delete on table "public"."lender" to "authenticated";

grant insert on table "public"."lender" to "authenticated";

grant references on table "public"."lender" to "authenticated";

grant select on table "public"."lender" to "authenticated";

grant trigger on table "public"."lender" to "authenticated";

grant truncate on table "public"."lender" to "authenticated";

grant update on table "public"."lender" to "authenticated";

grant delete on table "public"."lender" to "service_role";

grant insert on table "public"."lender" to "service_role";

grant references on table "public"."lender" to "service_role";

grant select on table "public"."lender" to "service_role";

grant trigger on table "public"."lender" to "service_role";

grant truncate on table "public"."lender" to "service_role";

grant update on table "public"."lender" to "service_role";

create policy "Enable ALL access for authenticated users (Review later)"
on "public"."lender"
as permissive
for all
to authenticated
using (true);



