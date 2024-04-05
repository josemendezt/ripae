import React from "react";
import AuthHeader from "./auth-header";
import { createClient } from "@/lib/supabase/server";

async function AuthHeaderWrapper() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (data.user?.email) return <AuthHeader name={data.user.email} />;
  return <></>;
}

export default AuthHeaderWrapper;
