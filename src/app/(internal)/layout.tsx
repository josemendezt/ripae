import "../globals.css";
import AuthHeader from "./auth-header";
import Sidebar from "./sidebar";
export const metadata = {
  title: "Welcome to Ripae!",
  description: "Best peer to peer platform",
};

export default function IntLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthHeader />
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </>
  );
}
