alter table "public"."lender" add constraint "public_funds_loan_id_fkey" FOREIGN KEY (loan_id) REFERENCES loans(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."lender" validate constraint "public_funds_loan_id_fkey";

alter table "public"."loans" add constraint "public_loans_borrower_id_fkey" FOREIGN KEY (borrower_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."loans" validate constraint "public_loans_borrower_id_fkey";


