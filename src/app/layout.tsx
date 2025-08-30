import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import SEOSchema from "@/components/SEOSchema";
import Analytics from "@/components/Analytics";
import YandexGoals from "@/components/YandexGoals";
import RubleReplacer from "@/components/RubleReplacer";
import Script from "next/script";

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
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
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
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || '70d29db80d4b9a25',
  },
  other: {
    'msapplication-config': '/browserconfig.xml',
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
        {/* Yandex.Metrika counter */}
        <Script id="yandex-metrika-head" strategy="beforeInteractive">
          {`
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${process.env.NEXT_PUBLIC_YANDEX_ID || '103855878'}', 'ym');

            ym(${process.env.NEXT_PUBLIC_YANDEX_ID || '103855878'}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
          `}
        </Script>
        <noscript>
          <div>
            <img src={`https://mc.yandex.ru/watch/${process.env.NEXT_PUBLIC_YANDEX_ID || '103855878'}`} style={{position:'absolute', left:'-9999px'}} alt="" />
          </div>
        </noscript>
        {/* /Yandex.Metrika counter */}
      </head>
      <body className={inter.className}>
        {children}
        <SEOSchema type="medical-organization" />
        <Analytics 
          gaId={process.env.NEXT_PUBLIC_GA_ID}
        />
        <YandexGoals yandexId={process.env.NEXT_PUBLIC_YANDEX_ID} />
        <RubleReplacer />
      </body>
    </html>
  );
}
