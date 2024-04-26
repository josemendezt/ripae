
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE TYPE "public"."loan_status" AS ENUM (
    'draft',
    'archived',
    'pending',
    'in_review',
    'active',
    'delayed',
    'paid',
    'default'
);

ALTER TYPE "public"."loan_status" OWNER TO "postgres";

CREATE TYPE "public"."payment_frequency" AS ENUM (
    'Monthly',
    'Semimonthly',
    'Biweekly',
    'Weekly'
);

ALTER TYPE "public"."payment_frequency" OWNER TO "postgres";

CREATE TYPE "public"."role_type" AS ENUM (
    'lender',
    'borrower',
    'all'
);

ALTER TYPE "public"."role_type" OWNER TO "postgres";

CREATE TYPE "public"."signup_flow" AS ENUM (
    'lenderPersonal',
    'lenderFinancial',
    'lenderPreferences',
    'lenderCompliance',
    'lenderVerification',
    'lenderDashboard',
    'borrowerPersonal',
    'borrowerFinancial',
    'borrowerEmployment',
    'borrowerLoan',
    'borrowerDashboard'
);

ALTER TYPE "public"."signup_flow" OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."calculate_funds_loans"("user_id" "uuid") RETURNS TABLE("total_amount_funds_projected" numeric, "total_amount_active_loans" numeric, "average_interest_active" numeric, "total_amount_paid_loans" numeric, "average_interest_paid" numeric)
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  RETURN QUERY
  WITH loan_sums AS (
    SELECT
      SUM(CASE WHEN l.status = 'active' THEN l.amount ELSE 0 END) AS total_amount_active,
      AVG(CASE WHEN l.status = 'active' THEN l.interest_rate ELSE NULL END) AS average_interest_active,
      SUM(CASE WHEN l.status = 'paid' THEN l.amount ELSE 0 END) AS total_amount_paid,
      AVG(CASE WHEN l.status = 'paid' THEN l.interest_rate ELSE NULL END) AS average_interest_paid
    FROM loans l
    JOIN funds f ON f.loan_id = l.id
    WHERE f.lender_id = user_id AND l.status IN ('active', 'paid')
  ),
  fund_amount AS (
    SELECT 
      SUM(amount) AS total_amount
    FROM funds
    WHERE loan_id IS NULL AND lender_id = user_id
  )
  SELECT
    COALESCE(f.total_amount, 0) AS total_amount_funds_projected,
    l.total_amount_active AS total_amount_active_loans,
    l.average_interest_active AS average_interest_active,
    l.total_amount_paid AS total_amount_paid_loans,
    l.average_interest_paid AS average_interest_paid
  FROM loan_sums l, fund_amount f;
END;
$$;

ALTER FUNCTION "public"."calculate_funds_loans"("user_id" "uuid") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  INSERT INTO public.users (email)
  VALUES (NEW.email);
  RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."sum_funds_amount"("user_id" "uuid") RETURNS numeric
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  RETURN (SELECT SUM(amount) FROM funds WHERE lender_id = user_id);
END;
$$;

ALTER FUNCTION "public"."sum_funds_amount"("user_id" "uuid") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_modified_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.updated_at = now(); -- `now()` retorna la fecha y hora actual
    RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."update_modified_column"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."users_encrypt_secret_sin"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
		BEGIN
		        new.sin = CASE WHEN new.sin IS NULL THEN NULL ELSE
			CASE WHEN '6d4d8a70-dfc7-4bfe-9a51-e95a04327826' IS NULL THEN NULL ELSE pg_catalog.encode(
			  pgsodium.crypto_aead_det_encrypt(
				pg_catalog.convert_to(new.sin, 'utf8'),
				pg_catalog.convert_to(('')::text, 'utf8'),
				'6d4d8a70-dfc7-4bfe-9a51-e95a04327826'::uuid,
				NULL
			  ),
				'base64') END END;
		RETURN new;
		END;
		$$;

ALTER FUNCTION "public"."users_encrypt_secret_sin"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "first_name" "text",
    "middle_name" "text",
    "last_name" "text",
    "address" "text",
    "email" character varying NOT NULL,
    "role" "public"."role_type",
    "sin" "text",
    "yearly_income" numeric,
    "job" "text",
    "province" "text",
    "postal_code" "text",
    "city" "text",
    "job_time" integer,
    "signup_flow" "public"."signup_flow",
    "updated_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text"),
    "dob" "date",
    "income" numeric,
    "expenses" numeric,
    "payment_frequency" "public"."payment_frequency",
    "politically_exposed" boolean,
    "risk_tolerance" "text",
    "automatic_mode" boolean,
    "living_situation" "text",
    "living_time" integer,
    "phone" "text"
);

ALTER TABLE "public"."users" OWNER TO "postgres";

COMMENT ON COLUMN "public"."users"."job_time" IS 'In months';

COMMENT ON COLUMN "public"."users"."dob" IS 'Day of birth';

COMMENT ON COLUMN "public"."users"."income" IS 'amount per payment';

COMMENT ON COLUMN "public"."users"."expenses" IS 'monthly obligations';

SECURITY LABEL FOR "pgsodium" ON COLUMN "public"."users"."sin" IS 'ENCRYPT WITH KEY ID 6d4d8a70-dfc7-4bfe-9a51-e95a04327826';

CREATE OR REPLACE VIEW "public"."decrypted_users" AS
 SELECT "users"."id",
    "users"."created_at",
    "users"."first_name",
    "users"."middle_name",
    "users"."last_name",
    "users"."address",
    "users"."email",
    "users"."role",
    "users"."sin",
        CASE
            WHEN ("users"."sin" IS NULL) THEN NULL::"text"
            ELSE
            CASE
                WHEN ('6d4d8a70-dfc7-4bfe-9a51-e95a04327826' IS NULL) THEN NULL::"text"
                ELSE "convert_from"("pgsodium"."crypto_aead_det_decrypt"("decode"("users"."sin", 'base64'::"text"), "convert_to"(''::"text", 'utf8'::"name"), '6d4d8a70-dfc7-4bfe-9a51-e95a04327826'::"uuid", NULL::"bytea"), 'utf8'::"name")
            END
        END AS "decrypted_sin",
    "users"."yearly_income",
    "users"."job",
    "users"."province",
    "users"."postal_code",
    "users"."city",
    "users"."job_time",
    "users"."signup_flow",
    "users"."updated_at",
    "users"."dob",
    "users"."income",
    "users"."expenses",
    "users"."payment_frequency",
    "users"."politically_exposed",
    "users"."risk_tolerance",
    "users"."automatic_mode",
    "users"."living_situation",
    "users"."living_time",
    "users"."phone"
   FROM "public"."users";

ALTER TABLE "public"."decrypted_users" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."funds" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "loan_id" "uuid",
    "lender_id" "uuid",
    "amount" numeric NOT NULL,
    "taken_on" timestamp with time zone
);

ALTER TABLE "public"."funds" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."loans" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "amount" numeric,
    "term" integer,
    "borrower_id" "uuid",
    "interest_rate" numeric,
    "status" "public"."loan_status" DEFAULT 'active'::"public"."loan_status",
    "pending_amount" numeric,
    "payment_period" "text",
    "reason" "text"
);

ALTER TABLE "public"."loans" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."payments" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "loan_id" "uuid" DEFAULT "gen_random_uuid"(),
    "pay_date" timestamp with time zone,
    "amount" numeric
);

ALTER TABLE "public"."payments" OWNER TO "postgres";

ALTER TABLE ONLY "public"."funds"
    ADD CONSTRAINT "investments_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."loans"
    ADD CONSTRAINT "loan_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."payments"
    ADD CONSTRAINT "payments_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_email_key" UNIQUE ("email");

CREATE OR REPLACE TRIGGER "update_users_updated_at" BEFORE UPDATE ON "public"."users" FOR EACH ROW EXECUTE FUNCTION "public"."update_modified_column"();

CREATE OR REPLACE TRIGGER "users_encrypt_secret_trigger_sin" BEFORE INSERT OR UPDATE OF "sin" ON "public"."users" FOR EACH ROW EXECUTE FUNCTION "public"."users_encrypt_secret_sin"();

ALTER TABLE ONLY "public"."payments"
    ADD CONSTRAINT "payments_loan_id_fkey" FOREIGN KEY ("loan_id") REFERENCES "public"."loans"("id");

ALTER TABLE ONLY "public"."funds"
    ADD CONSTRAINT "public_funds_investor_id_fkey" FOREIGN KEY ("lender_id") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."funds"
    ADD CONSTRAINT "public_funds_loan_id_fkey" FOREIGN KEY ("loan_id") REFERENCES "public"."loans"("id") ON UPDATE CASCADE ON DELETE CASCADE;

CREATE POLICY "Enable ALL access for authenticated users (Review later)" ON "public"."funds" TO "authenticated" USING (true);

CREATE POLICY "Enable ALL access for authenticated users (review later)" ON "public"."loans" TO "authenticated" USING (true);

CREATE POLICY "Enable ALL for authenticated users only" ON "public"."users" TO "authenticated" USING ((( SELECT "auth"."email"() AS "email") = ("email")::"text"));

ALTER TABLE "public"."funds" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."loans" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."payments" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."calculate_funds_loans"("user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."calculate_funds_loans"("user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."calculate_funds_loans"("user_id" "uuid") TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";

GRANT ALL ON FUNCTION "public"."sum_funds_amount"("user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."sum_funds_amount"("user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."sum_funds_amount"("user_id" "uuid") TO "service_role";

GRANT ALL ON FUNCTION "public"."update_modified_column"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_modified_column"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_modified_column"() TO "service_role";

GRANT ALL ON FUNCTION "public"."users_encrypt_secret_sin"() TO "anon";
GRANT ALL ON FUNCTION "public"."users_encrypt_secret_sin"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."users_encrypt_secret_sin"() TO "service_role";

GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";

GRANT ALL ON TABLE "public"."decrypted_users" TO "anon";
GRANT ALL ON TABLE "public"."decrypted_users" TO "authenticated";
GRANT ALL ON TABLE "public"."decrypted_users" TO "service_role";

GRANT ALL ON TABLE "public"."funds" TO "anon";
GRANT ALL ON TABLE "public"."funds" TO "authenticated";
GRANT ALL ON TABLE "public"."funds" TO "service_role";

GRANT ALL ON TABLE "public"."loans" TO "anon";
GRANT ALL ON TABLE "public"."loans" TO "authenticated";
GRANT ALL ON TABLE "public"."loans" TO "service_role";

GRANT ALL ON TABLE "public"."payments" TO "anon";
GRANT ALL ON TABLE "public"."payments" TO "authenticated";
GRANT ALL ON TABLE "public"."payments" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
