import { Analytics } from '@vercel/analytics/next'
import { Lexend_Deca } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const lexend = Lexend_Deca({ subsets: ['latin'], variable: '--font-lexend' })

export const metadata: Metadata = {
  title: 'imeetify | Ideas for better meetings',
  description: 'Ideas, tools, and practical thinking for teams that want to do their best work together.',
  metadataBase: new URL('https://imeetify.blog'),
  alternates: { canonical: '/' },
  openGraph: { title: 'imeetify | Ideas for better meetings', description: 'The imeetify journal.', type: 'website' },
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#ffffff', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="light bg-background"><body className={`${lexend.variable} antialiased font-sans`}>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
