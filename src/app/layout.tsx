import type { Metadata } from 'next';
import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL('https://dietoloqleylazulfuqarli.az'),
  title: 'Dr. Leyla Zülfüqarlı | Diyetoloq',
  description: 'Peşəkar diyetoloq Leyla Zülfüqarlı — Funksional Tibb, Anti Age və Nutrisyon mütəxəssisi.',
  icons: {
    icon: [
      { url: '/images/logo.jpg' },
      { url: '/images/logo.jpg', sizes: '32x32', type: 'image/jpeg' },
    ],
    shortcut: '/images/logo.jpg',
    apple: '/images/logo.jpg',
  },
  openGraph: {
    title: 'Dr. Leyla Zülfüqarlı | Diyetoloq',
    description: 'Peşəkar diyetoloq Leyla Zülfüqarlı — Funksional Tibb, Anti Age və Nutrisyon mütəxəssisi.',
    url: 'https://dietoloqleylazulfuqarli.az',
    siteName: 'Dr. Leyla Zülfüqarlı',
    images: [
      {
        url: '/images/dietolog-1.jpg',
        width: 1200,
        height: 630,
        alt: 'Dr. Leyla Zülfüqarlı',
      },
    ],
    locale: 'az_AZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Leyla Zülfüqarlı | Diyetoloq',
    description: 'Peşəkar diyetoloq Leyla Zülfüqarlı — Funksional Tibb, Anti Age və Nutrisyon mütəxəssisi.',
    images: ['/images/dietolog-1.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning style={{ overflowX: 'hidden' }}>
      <body suppressHydrationWarning style={{ overflowX: 'hidden', maxWidth: '100%', touchAction: 'pan-y', position: 'relative' }}>
        {children}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}

