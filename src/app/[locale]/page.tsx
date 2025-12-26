import React from 'react';
import Header from '@/components/Header';
import Header2 from '@/components/Header2';
import Footer from '@/components/Footer';
import HomeContent from '@/components/HomeContent';

export default function Home() {
  const layout = process.env.NEXT_PUBLIC_LAYOUT;

  return (
      <div className="min-h-screen">
        { layout === 'Layout2' ? <Header2 /> : <Header />}

        <HomeContent />

        <Footer />
      </div>
  );
}
