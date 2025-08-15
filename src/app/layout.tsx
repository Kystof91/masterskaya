import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import Analytics from "@/components/Analytics";

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
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://masterskaya.clinic'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Мастерская - Лечение зависимостей | Медицинский центр в Санкт-Петербурге",
    description: "Профессиональная помощь в лечении алкогольной и наркотической зависимости в Санкт-Петербурге. Анонимно, конфиденциально, эффективно.",
    url: 'https://masterskaya.clinic',
    siteName: 'Мастерская - Лечение зависимостей',
    images: [
      {
        url: '/logotip.png',
        width: 1200,
        height: 630,
        alt: 'Мастерская - Лечение зависимостей',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Мастерская - Лечение зависимостей | Медицинский центр в Санкт-Петербурге",
    description: "Профессиональная помощь в лечении алкогольной и наркотической зависимости в Санкт-Петербурге",
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
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationData = {
    name: "Мастерская - Лечение зависимостей",
    description: "Медицинский центр специализирующийся на лечении алкогольной и наркотической зависимости",
    url: "https://masterskaya.clinic",
    telephone: ["8-812-407-3-407", "+7-911-750-07-00"],
    email: "masterskaya.clinic@yandex.ru",
    address: {
      streetAddress: "ул. Заставская, 33л",
      addressLocality: "Санкт-Петербург",
      addressCountry: "RU"
    },
    services: [
      {
        name: "Детоксикация",
        description: "Безопасное выведение токинов из организма"
      },
      {
        name: "Реабилитация", 
        description: "Комплексная программа восстановления"
      },
      {
        name: "Психотерапия",
        description: "Индивидуальные и групповые сеансы"
      }
    ]
  };

  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logotip.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logotip.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logotip.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#B39A7C" />
        <meta name="msapplication-TileColor" content="#B39A7C" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/logotip.png" as="image" />
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* DNS prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <StructuredData type="organization" data={organizationData} />
        <Analytics 
          gaId={process.env.NEXT_PUBLIC_GA_ID}
          yandexId={process.env.NEXT_PUBLIC_YANDEX_ID}
        />
        {children}
      </body>
    </html>
  );
}
