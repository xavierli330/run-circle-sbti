import '@/styles/globals.css'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: '跑圈SBTI - 你是哪种跑者？',
  description: '跑圈专属人格测试，110道题池随机抽题，发现你的跑步灵魂',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body>{children}</body>
    </html>
  )
}
