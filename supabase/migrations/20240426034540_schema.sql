alter table "public"."lender" drop constraint "public_funds_loan_id_fkey";

alter table "public"."lender" drop constraint "public_lender_user_id_fkey";

alter table "public"."loans" drop constraint "public_loans_borrower_id_fkey";


