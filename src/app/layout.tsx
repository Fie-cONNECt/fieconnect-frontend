import type { Metadata } from 'next';
import { Nunito, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'FieConnect | Premium Property Management & Rental Portal',
  description:
    'Browse verified rental properties, submit digital tenancy agreements, and manage leases seamlessly across Ghana.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
