drop policy "Enable ALL access for authenticated users (Review later)" on "public"."lenders";

revoke delete on table "public"."lenders" from "anon";

revoke insert on table "public"."lenders" from "anon";

revoke references on table "public"."lenders" from "anon";

revoke select on table "public"."lenders" from "anon";

revoke trigger on table "public"."lenders" from "anon";

revoke truncate on table "public"."lenders" from "anon";

revoke update on table "public"."lenders" from "anon";

revoke delete on table "public"."lenders" from "authenticated";

revoke insert on table "public"."lenders" from "authenticated";

revoke references on table "public"."lenders" from "authenticated";

revoke select on table "public"."lenders" from "authenticated";

revoke trigger on table "public"."lenders" from "authenticated";

revoke truncate on table "public"."lenders" from "authenticated";

revoke update on table "public"."lenders" from "authenticated";

revoke delete on table "public"."lenders" from "service_role";

revoke insert on table "public"."lenders" from "service_role";

revoke references on table "public"."lenders" from "service_role";

revoke select on table "public"."lenders" from "service_role";

revoke trigger on table "public"."lenders" from "service_role";

revoke truncate on table "public"."lenders" from "service_role";

revoke update on table "public"."lenders" from "service_role";

alter table "public"."lenders" drop constraint "lender_user_id_key";

alter table "public"."lenders" drop constraint "investments_pkey";

drop index if exists "public"."investments_pkey";

drop index if exists "public"."lender_user_id_key";

drop table "public"."lenders";

create table "public"."lender" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "loan_id" uuid,
    "amount" numeric not null,
    "user_id" uuid default gen_random_uuid()
);


alter table "public"."lender" enable row level security;

CREATE UNIQUE INDEX investments_pkey ON public.lender USING btree (id);

CREATE UNIQUE INDEX lender_user_id_key ON public.lender USING btree (user_id);

alter table "public"."lender" add constraint "investments_pkey" PRIMARY KEY using index "investments_pkey";

alter table "public"."lender" add constraint "lender_user_id_key" UNIQUE using index "lender_user_id_key";

alter table "public"."lender" add constraint "public_lender_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."lender" validate constraint "public_lender_user_id_fkey";

alter table "public"."payments" add constraint "payments_loan_id_fkey" FOREIGN KEY (loan_id) REFERENCES loans(id) not valid;

alter table "public"."payments" validate constraint "payments_loan_id_fkey";

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



