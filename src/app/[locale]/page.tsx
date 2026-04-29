import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import BMICalculator from '@/components/home/BMICalculator';
import AboutSnippet from '@/components/home/AboutSnippet';
import TestimonialSlider from '@/components/home/TestimonialSlider';
import FAQSection from '@/components/home/FAQSection';
import FinalCTA from '@/components/home/FinalCTA';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <BMICalculator />
      <AboutSnippet />
      <TestimonialSlider />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
