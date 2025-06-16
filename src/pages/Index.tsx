
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ServicesGrid } from "@/components/ServicesGrid";
import { FeaturedDestinations } from "@/components/FeaturedDestinations";
import { CarsSection } from "@/components/CarsSection";
import { VenuesSection } from "@/components/VenuesSection";
import { PackagesSection } from "@/components/PackagesSection";
import { BookNowSection } from "@/components/BookNowSection";
import { Newsletter } from "@/components/Newsletter";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { Footer } from "@/components/Footer";
import { LoginBar } from "@/components/LoginBar";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <LoginBar />
      <Header />
      <Hero />
      <ServicesGrid />
      <FeaturedDestinations />
      <CarsSection />
      <VenuesSection />
      <PackagesSection />
      <BookNowSection />
      <Newsletter />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
