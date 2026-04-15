import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import { PageIntroProvider } from '@/components/Layout/PageIntroProvider'
import { ThemeProvider } from 'next-themes'
import ScrollToTop from '@/components/ScrollToTop'

const font = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  preload: true,
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className={`${font.className}`}>
        <ThemeProvider
          attribute='class'
          enableSystem={true}
          defaultTheme='system'>
          <PageIntroProvider>
            <Header />
            {children}
            <Footer />
          </PageIntroProvider>
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
