import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/header';
import Footer from './components/footer';
import Container from './components/container';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Events App',
  description: 'Making events easy to find and share',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // overflow-y-scroll class applied to the body to ensure scrollbar is always visible
  // to prevent layout shift when navigating between pages with different heights that
  // may or may not require scrolling
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-950 text-white overflow-y-scroll`}
      >
        <Container>
          <Header />
          {children}
          <Footer />
        </Container>
      </body>
    </html>
  );
}
