import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Leyla Zülfüqarlı | Dietoloq',
  description: 'Peşəkar dietoloq Leyla Zülfüqarlı',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning style={{ overflowX: 'hidden' }}>
      <body suppressHydrationWarning style={{ overflowX: 'hidden', maxWidth: '100vw', touchAction: 'pan-y' }}>{children}</body>
    </html>
  );
}

