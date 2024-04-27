import './globals.css';
export const metadata = {
  title: 'Welcome to Ripae!',
  description: 'Best peer to peer platform',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicons/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicons/favicon-16x16.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/favicons/apple-touch-icon.png',
    },
    {
      rel: 'android-chrome',
      sizes: '192x192',
      url: '/favicons/android-chrome-192x192.png',
    },
    {
      rel: 'android-chrome',
      sizes: '512x512',
      url: '/favicons/android-chrome-512x512.png',
    },
  ],
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
