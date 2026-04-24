import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Leyla Zülfüqarlı | Diyetoloq',
  description: 'Peşəkar diyetoloq Leyla Zülfüqarlı',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

