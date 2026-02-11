import React from "react"
import type { Metadata, Viewport } from 'next'
import { Quicksand, Dancing_Script } from 'next/font/google'

import './globals.css'

const quicksand = Quicksand({ subsets: ['latin'], variable: '--font-quicksand' })
const dancingScript = Dancing_Script({ subsets: ['latin'], variable: '--font-dancing' })

export const metadata: Metadata = {
  title: 'Seni Bekliyorum',
  description: 'Sensiz gecen her an...',
}

export const viewport: Viewport = {
  themeColor: '#e8a0b4',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <body className={`${quicksand.variable} ${dancingScript.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
