import { validateSession } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardLender from "./dashboarLender";

async function DashboardLenderPage() {
  const sessionIsValid = await validateSession();
  if (!sessionIsValid) {
    //  redirect('/');
  }

  return <DashboardLender />;
}

export default DashboardLenderPage;
