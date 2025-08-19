import React from 'react';
import Header from '@/components/Header-Standard';
import Hero from '@/components/Hero-Standard';
import Features from '@/components/Features-Standard';
import Templates from '@/components/Templates-Standard';
import Footer from '@/components/Footer-Standard';
import GitHubStudentPackDashboard from '@/components/GitHubStudentPackDashboard';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <div id="features">
        <Features />
      </div>
      <Templates />
      
      {/* GitHub Student Pack Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              GitHub Student Developer Pack Integration
            </h2>
            <p className="text-xl text-gray-600">
              Access $200,000+ worth of free services to power your resume building experience.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <GitHubStudentPackDashboard />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
