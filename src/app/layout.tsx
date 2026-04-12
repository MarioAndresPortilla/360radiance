// Root layout — required by Next.js for routes outside [locale] (API, etc.).
// The real app layout lives at src/app/[locale]/layout.tsx.

export const metadata = {
  title: '360 Radiance',
  description: '360 Radiance Skin Care',
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
