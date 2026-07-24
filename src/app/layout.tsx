import type { Metadata } from 'next'
import { Poppins, Caveat, VT323 } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/nav/NavBar'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100','200','300','400','500','600','700','800','900'],
  variable: '--font-poppins',
})

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400','500','600','700'],
  variable: '--font-caveat',
})

const vt323 = VT323({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-vt323',
})

export const metadata: Metadata = {
  title: 'Lumina',
  description: 'Dating application using Next 16, Prisma, BetterAuth and Hero UI',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='en'
      className={`${poppins.variable} ${caveat.variable} ${vt323.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col'>
        <NavBar />
        <main className='container mx-auto mt-24'></main>
        {children}
      </body>
    </html>
  )
}
