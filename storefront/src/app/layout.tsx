import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ToastProvider } from '@/components/ui/Toast';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ELEMENTAL | Architectural Luxury & Everyday Artifacts',
  description:
    'Handcrafted apparel, artisanal footwear, fine horology, and sculptural home goods made from noble natural materials.',
  keywords: ['luxury ecommerce', 'pashmina', 'artisanal footwear', 'minimalist design', 'sustainable luxury india'],
  openGraph: {
    title: 'ELEMENTAL | Architectural Luxury & Everyday Artifacts',
    description: 'A study in form, texture, and pure materiality.',
    url: 'https://elemental.in',
    siteName: 'ELEMENTAL',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-white text-stone-900 selection:bg-stone-900 selection:text-white flex flex-col min-h-screen">
        <ToastProvider>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </ToastProvider>
      </body>
    </html>
  );
}
