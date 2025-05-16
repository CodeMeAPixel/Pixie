import { Toaster } from 'sonner';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/ui/theme/theme-provider';

import './globals.css';
import { Footer } from './../components/layout/Footer';
import { Navbar } from './../components/layout/Navbar';

export const metadata: Metadata = {
  metadataBase: new URL('https://pixie.codemeapixel.dev'),
  title: 'Pixie - Your AI Assistant',
  description: 'Chat with Pixie, your personal AI assistant',
};

export const viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
};

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <ThemeProvider>
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
