import { Analytics } from '@vercel/analytics/next'
import { Inter, Playfair_Display } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'imeetify | Ideas for better meetings',
  description: 'Ideas, tools, and practical thinking for teams that want to do their best work together.',
  metadataBase: new URL('https://imeetify.blog'),
  alternates: { canonical: '/' },
  openGraph: { title: 'imeetify | Ideas for better meetings', description: 'The imeetify journal.', type: 'website' },
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#ffffff', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background"><body className={`${inter.variable} ${playfair.variable} antialiased`}>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
