
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConfessionWall from '@/components/ConfessionWall';

const Wall = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <ConfessionWall />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Wall;
