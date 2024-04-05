import "./globals.css";
export const metadata = {
  title: "Welcome to Ripae!",
  description: "Best peer to peer platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
