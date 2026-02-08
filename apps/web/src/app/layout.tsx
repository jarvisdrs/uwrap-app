import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-sans',
  display: 'swap',
  preload: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export const metadata: Metadata = {
  title: {
    default: 'uWrap — Video Pre-Production Platform',
    template: '%s | uWrap',
  },
  description: 'Streamline your video pre-production workflow with uWrap. Collaborate on scripts, manage shooting schedules, and organize assets all in one place.',
  keywords: ['video production', 'pre-production', 'scriptwriting', 'filmmaking', 'video collaboration', 'production management'],
  authors: [{ name: 'uWrap Team' }],
  creator: 'uWrap',
  publisher: 'uWrap',
  metadataBase: new URL('https://uwrap.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://uwrap.vercel.app',
    siteName: 'uWrap',
    title: 'uWrap — Video Pre-Production Platform',
    description: 'Streamline your video pre-production workflow with uWrap. Collaborate on scripts, manage shooting schedules, and organize assets all in one place.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'uWrap - Video Pre-Production Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'uWrap — Video Pre-Production Platform',
    description: 'Streamline your video pre-production workflow with uWrap',
    images: ['/og-image.png'],
    creator: '@uwrap',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#9333ea',
      },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} font-sans antialiased min-h-screen`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
