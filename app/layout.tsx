import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { DefaultSeo } from 'next-seo'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Southwave - Official Website',
  description: 'Official website of Southwave. Listen to the latest electronic music, shop merchandise, and get updates on upcoming concerts.',
  keywords: 'music, artist, concerts, merchandise, streaming, spotify, apple music',
  authors: [{ name: 'Southwave' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://southwave.com',
    siteName: 'Southwave',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Southwave',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@artisthandle',
    creator: '@artisthandle',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'MusicGroup',
              name: 'Southwave',
              genre: 'Electronic/Deep House',
              url: 'https://southwave.com',
              sameAs: [
                'https://open.spotify.com/artist/your-spotify-id',
                'https://music.apple.com/artist/your-apple-id',
                'https://instagram.com/artisthandle',
                'https://twitter.com/artisthandle',
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}