CREATE UNIQUE INDEX unique_email ON auth.users USING btree (email);

CREATE UNIQUE INDEX unique_user_email ON auth.users USING btree (email);

alter table "auth"."users" add constraint "unique_email" UNIQUE using index "unique_email";

alter table "auth"."users" add constraint "unique_user_email" UNIQUE using index "unique_user_email";

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();


