drop policy "Enable ALL access for authenticated users (Review later)" on "public"."lender";

revoke delete on table "public"."lender" from "anon";

revoke insert on table "public"."lender" from "anon";

revoke references on table "public"."lender" from "anon";

revoke select on table "public"."lender" from "anon";

revoke trigger on table "public"."lender" from "anon";

revoke truncate on table "public"."lender" from "anon";

revoke update on table "public"."lender" from "anon";

revoke delete on table "public"."lender" from "authenticated";

revoke insert on table "public"."lender" from "authenticated";

revoke references on table "public"."lender" from "authenticated";

revoke select on table "public"."lender" from "authenticated";

revoke trigger on table "public"."lender" from "authenticated";

revoke truncate on table "public"."lender" from "authenticated";

revoke update on table "public"."lender" from "authenticated";

revoke delete on table "public"."lender" from "service_role";

revoke insert on table "public"."lender" from "service_role";

revoke references on table "public"."lender" from "service_role";

revoke select on table "public"."lender" from "service_role";

revoke trigger on table "public"."lender" from "service_role";

revoke truncate on table "public"."lender" from "service_role";

revoke update on table "public"."lender" from "service_role";

alter table "public"."lender" drop constraint "lender_user_id_key";

alter table "public"."lender" drop constraint "public_funds_loan_id_fkey";

alter table "public"."lender" drop constraint "public_lender_user_id_fkey";

alter table "public"."loans" drop constraint "public_loans_borrower_id_fkey";

alter table "public"."payments" drop constraint "payments_loan_id_fkey";

alter table "public"."lender" drop constraint "investments_pkey";

drop index if exists "public"."investments_pkey";

drop index if exists "public"."lender_user_id_key";

drop table "public"."lender";

create table "public"."lenders" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "loan_id" uuid,
    "amount" numeric not null,
    "user_id" uuid default gen_random_uuid()
);


alter table "public"."lenders" enable row level security;

CREATE UNIQUE INDEX investments_pkey ON public.lenders USING btree (id);

CREATE UNIQUE INDEX lender_user_id_key ON public.lenders USING btree (user_id);

alter table "public"."lenders" add constraint "investments_pkey" PRIMARY KEY using index "investments_pkey";

alter table "public"."lenders" add constraint "lender_user_id_key" UNIQUE using index "lender_user_id_key";

grant delete on table "public"."lenders" to "anon";

grant insert on table "public"."lenders" to "anon";

grant references on table "public"."lenders" to "anon";

grant select on table "public"."lenders" to "anon";

grant trigger on table "public"."lenders" to "anon";

grant truncate on table "public"."lenders" to "anon";

grant update on table "public"."lenders" to "anon";

grant delete on table "public"."lenders" to "authenticated";

grant insert on table "public"."lenders" to "authenticated";

grant references on table "public"."lenders" to "authenticated";

grant select on table "public"."lenders" to "authenticated";

grant trigger on table "public"."lenders" to "authenticated";

grant truncate on table "public"."lenders" to "authenticated";

grant update on table "public"."lenders" to "authenticated";

grant delete on table "public"."lenders" to "service_role";

grant insert on table "public"."lenders" to "service_role";

grant references on table "public"."lenders" to "service_role";

grant select on table "public"."lenders" to "service_role";

grant trigger on table "public"."lenders" to "service_role";

grant truncate on table "public"."lenders" to "service_role";

grant update on table "public"."lenders" to "service_role";

create policy "Enable ALL access for authenticated users (Review later)"
on "public"."lenders"
as permissive
for all
to authenticated
using (true);



