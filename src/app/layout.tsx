import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/context/ThemeContext'
import ThemeToggle from '@/components/ui/ThemeToggle'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ExpressAfrique - Expédition de colis vers l\'Afrique',
  description: 'Envoyez vos colis vers l\'Afrique rapidement et en toute sécurité',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors`}>
        <ThemeProvider>
          <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">ExpressAfrique</Link>
                <div className="flex items-center space-x-4">
                  <Link href="/expedition" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Expédition</Link>
                  <Link href="/suivi" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Suivi</Link>
                  <ThemeToggle />
                </div>
              </nav>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">{children}</main>
          <footer className="bg-gray-100 dark:bg-gray-800 mt-12 transition-colors">
            <div className="container mx-auto px-4 py-8">
              <p className="text-center text-gray-600 dark:text-gray-400">© 2023 ExpressAfrique - Tous droits réservés</p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
