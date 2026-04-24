import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import AboutSnippet from '@/components/home/AboutSnippet';
import TestimonialSlider from '@/components/home/TestimonialSlider';
import FAQSection from '@/components/home/FAQSection';
import FinalCTA from '@/components/home/FinalCTA';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSnippet />
      <TestimonialSlider />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
