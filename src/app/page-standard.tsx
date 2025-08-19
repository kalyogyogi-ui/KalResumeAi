import React from 'react';
import Header from '@/components/Header-Standard';
import Hero from '@/components/Hero-Standard';
import Features from '@/components/Features-Standard';
import Templates from '@/components/Templates-Standard';
import Footer from '@/components/Footer-Standard';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <div id="features">
        <Features />
      </div>
      <Templates />
      <Footer />
    </main>
  );
}
