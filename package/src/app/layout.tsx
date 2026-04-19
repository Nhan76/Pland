import localFont from 'next/font/local'
import './globals.css'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import { PageIntroProvider } from '@/components/Layout/PageIntroProvider'
import { ThemeProvider } from 'next-themes'
import ScrollToTop from '@/components/ScrollToTop'

const font = localFont({
  src: [
    {
      path: '../../public/fonts/plus-jakarta-sans-latin.woff2',
      weight: '400 700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-jakarta',
  preload: true,
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning className="scroll-smooth overflow-x-hidden">
      <body className={`${font.className} overflow-x-hidden`}>
        <ThemeProvider
          attribute='class'
          enableSystem={true}
          defaultTheme='system'>
          <PageIntroProvider>
            <Header />
            {children}
          </PageIntroProvider>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
