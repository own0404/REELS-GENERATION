import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import PageBanner from "@/components/PageBanner";
import AboutContent from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About Us | Murali Krishna Transport - 7+ Years of Excellence",
  description:
    "Learn about Murali Krishna Transport (MKT) - a trusted transport service provider based in Gajuwaka, Visakhapatnam with 7+ years of experience in commercial cargo and container haulage.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <PageBanner
          title="About Us"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "About Us" },
          ]}
          bgImage="https://images.pexels.com/photos/2348359/pexels-photo-2348359.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
        />
        <AboutContent />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
