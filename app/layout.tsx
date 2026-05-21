import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from './lib/context';
import { Navbar } from './components/Navbar';

const baseUrl = 'https://vexor.team';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Vexor — Розробка сайтів, застосунків та дизайн продуктів',
    template: '%s | Vexor',
  },
  description:
    'Аутсорс-команда з розробки сайтів, мобільних застосунків та дизайну продуктів в Україні. Next.js, React Native, Figma. Від ідеї до готового рішення.',
  keywords: [
    'розробка сайтів Україна',
    'аутсорс розробка',
    'веб розробка Київ',
    'мобільний застосунок розробка',
    'Next.js розробник Україна',
    'UI UX дизайн Україна',
    'software development Ukraine',
    'outsource web development',
    'React Native developer Ukraine',
  ],
  authors: [{ name: 'Vexor', url: baseUrl }],
  creator: 'Vexor',
  publisher: 'Vexor',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    alternateLocale: 'en_US',
    url: baseUrl,
    siteName: 'Vexor',
    title: 'Vexor — We build what you ship.',
    description:
      'Аутсорс-команда з розробки сайтів, застосунків та дизайну продуктів. Від ідеї до готового рішення.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Vexor — Software Development Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vexor — We build what you ship.',
    description: 'Аутсорс-команда з розробки сайтів, застосунків та дизайну продуктів.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: baseUrl,
  },
  verification: {
    google: 'YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
      </head>
      <body>
        <AppProvider>
          <Navbar />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
