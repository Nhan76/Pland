import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import { PageIntroProvider } from '@/components/Layout/PageIntroProvider'
import { ThemeProvider } from 'next-themes'
import ScrollToTop from '@/components/ScrollToTop'
import Aoscompo from '@/utils/aos'
const font = Plus_Jakarta_Sans({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning className="scroll-smooth">
      <body className={`${font.className}`}>
        <ThemeProvider
          attribute='class'
          enableSystem={true}
          defaultTheme='system'>
          <PageIntroProvider>
            <Aoscompo>
              <Header />
              {children}
              <Footer />
            </Aoscompo>
          </PageIntroProvider>
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
