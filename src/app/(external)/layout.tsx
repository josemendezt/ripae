import type { Metadata } from "next";
import "../globals.css";
import Header from "./ext-header";

export const metadata: Metadata = {
  title: "Ripae App",
  description: "Log in or sign up to get access to Ripae",
};

export default function ExtLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
