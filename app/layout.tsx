'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { ReactNode, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Common from './components/Common';
import ImageHeader from './components/ImageHeader';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  useEffect(() => {
   
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Header />
        <ImageHeader/>
        <main>{children}</main>
        <Common />
        <Footer />
      </body>
    </html>
  );
}
