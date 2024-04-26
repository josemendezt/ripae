alter table "public"."loans" add constraint "public_loans_borrower_id_fkey" FOREIGN KEY (borrower_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."loans" validate constraint "public_loans_borrower_id_fkey";


