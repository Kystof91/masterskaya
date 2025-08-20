import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import SEOSchema from "@/components/SEOSchema";
import Analytics from "@/components/Analytics";
import RubleReplacer from "@/components/RubleReplacer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Мастерская - Лечение зависимостей | Медицинский центр в Санкт-Петербурге",
  description: "Профессиональная помощь в лечении алкогольной и наркотической зависимости в Санкт-Петербурге. Анонимно, конфиденциально, эффективно. Детоксикация, реабилитация, психотерапия. Лицензия №Л041-01148-78/02897906",
  keywords: "лечение зависимостей, наркология, алкоголизм, наркомания, детоксикация, реабилитация, психотерапия, Санкт-Петербург, анонимно, круглосуточно",
  authors: [{ name: "Мастерская - Лечение зависимостей" }],
  creator: "Мастерская - Лечение зависимостей",
  publisher: "Мастерская - Лечение зависимостей",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  metadataBase: new URL('https://mstrclinic.ru'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Мастерская - Лечение зависимостей | Медицинский центр в Санкт-Петербурге",
    description: "Профессиональная помощь в лечении алкогольной и наркотической зависимости в Санкт-Петербурге. Анонимно, конфиденциально, эффективно.",
    url: 'https://mstrclinic.ru',
    siteName: 'Мастерская - Лечение зависимостей',
    images: [
      {
        url: '/logotip.png',
        width: 1200,
        height: 630,
        alt: 'Мастерская - Лечение зависимостей'
      }
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Мастерская - Лечение зависимостей',
    description: 'Профессиональная помощь в лечении зависимостей в Санкт-Петербурге',
    images: ['/logotip.png'],
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
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || 'your-google-verification-code',
    yandex: '22b6d1b31f053b53',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={inter.className}>
        {children}
        <SEOSchema type="medical-organization" />
        <Analytics />
        <RubleReplacer />
      </body>
    </html>
  );
}
