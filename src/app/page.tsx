import React from 'react';
import Image from 'next/image';
import { 
  HeroSection, 
  FeatureHighlights, 
  HowItWorks, 
  AboutDoctors, 
  Testimonials, 
  FAQ, 
  Footer 
} from '@/components/Landing';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-16"> {/* Add padding to account for fixed navbar */}
        <HeroSection />
        <FeatureHighlights />
        <HowItWorks />
        <AboutDoctors />
        <Testimonials />
        <FAQ />
        <Footer />
      </div>
    </main>
  );
}
