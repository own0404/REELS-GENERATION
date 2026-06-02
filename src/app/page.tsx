import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import HeroSlider from "@/components/home/HeroSlider";
import StatsBar from "@/components/home/StatsBar";
import AboutSnippet from "@/components/home/AboutSnippet";
import ServicesGrid from "@/components/home/ServicesGrid";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import QuoteForm from "@/components/home/QuoteForm";
import ClientsStrip from "@/components/home/ClientsStrip";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <HeroSlider />
        <StatsBar />
        <AboutSnippet />
        <ServicesGrid />
        <WhyChooseUs />
        <Testimonials />
        <QuoteForm />
        <ClientsStrip />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
