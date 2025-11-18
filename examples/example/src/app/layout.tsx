import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { TranslateProvider } from '@makstashkevich/translate'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Translate Example App',
  description: 'Example app for @makstashkevich/translate plugin'
}

const translations = {
  en: {
    common: {
      hello: 'Hello, {name}!',
      welcome: 'Welcome!',
      greeting: 'Good morning!'
    },
    page: {
      title: 'Home Page'
    }
  },
  ru: {
    common: {
      hello: 'Привет, {name}!',
      welcome: 'Добро пожаловать!',
      greeting: 'Доброе утро!'
    },
    page: {
      title: 'Домашняя страница'
    }
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TranslateProvider defaultLocale="en" translations={translations}>
          {children}
        </TranslateProvider>
      </body>
    </html>
  )
}
