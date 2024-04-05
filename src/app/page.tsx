import React from "react";
import { createClient } from "@/lib/supabase/server";
import DashboardLender from "./(internal)/dashboardLender/page";
import Login from "./(external)/login/page";
import { redirect } from "next/navigation";
import LayoutExt from "./(external)/layout";
import LayoutInt from "./(internal)/layout";

async function page() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  // if (!data.user) {
  //   return <Login />;
  // }

  // if (error) {
  //   redirect("/error");
  // }

  return data.user ? (
    <LayoutInt>
      <DashboardLender />
    </LayoutInt>
  ) : (
    <LayoutExt>
      <Login />
    </LayoutExt>
  );
}

export default page;
