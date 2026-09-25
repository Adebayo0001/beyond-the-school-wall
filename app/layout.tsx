import type { Metadata, Viewport } from 'next';
import './globals.css';
import Layout from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Beyond the School Wall | Where Learning Meets Possibilities',
  description: 'Equipping the next generation of builders, founders, and leaders with real-world skills, simulations, and career pathways.',
  keywords: ['Beyond the School Wall', 'BTSW', 'Education', 'Nigeria', 'Inter Junior Workspace', 'Cash on Campus', 'Luminaire', 'Simulation Games', 'Tabletop Games'],
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#F16736',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
