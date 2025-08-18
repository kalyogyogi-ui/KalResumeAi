import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/providers/AuthProvider'
import { ToastProvider } from '@/providers/ToastProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KalResumeAI - Advanced AI-Powered Resume Builder',
  description: 'Create professional resumes with AI assistance, ATS optimization, and cloud storage. Build your perfect resume with our advanced tools.',
  keywords: 'resume builder, AI resume, ATS optimization, professional resume, job application',
  authors: [{ name: 'KalResumeAI Team' }],
  creator: 'KalResumeAI',
  publisher: 'KalResumeAI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://kalresumeai.vercel.app'),
  openGraph: {
    title: 'KalResumeAI - Advanced AI-Powered Resume Builder',
    description: 'Create professional resumes with AI assistance, ATS optimization, and cloud storage.',
    url: 'https://kalresumeai.vercel.app',
    siteName: 'KalResumeAI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'KalResumeAI - Advanced AI-Powered Resume Builder',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KalResumeAI - Advanced AI-Powered Resume Builder',
    description: 'Create professional resumes with AI assistance, ATS optimization, and cloud storage.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
