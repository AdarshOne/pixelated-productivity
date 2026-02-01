import React from "react"
import type { Metadata } from 'next'
import { VT323 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const vt323 = VT323({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Focus - Retro Productivity',
  description: 'A minimalist productivity app inspired by the original Macintosh',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${vt323.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
