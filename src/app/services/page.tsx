import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import PageBanner from "@/components/PageBanner";
import ServicesContent from "@/components/services/ServicesContent";

export const metadata: Metadata = {
  title: "Our Services | Murali Krishna Transport - Container Haulage, Cargo & Truck Transport",
  description:
    "Explore MKT's comprehensive transport services: commercial cargo, container haulage, truck transport, heavy goods, car transport, and industrial goods transportation across India.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <PageBanner
          title="Our Services"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Services" },
          ]}
          bgImage="https://images.pexels.com/photos/16325212/pexels-photo-16325212.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
        />
        <ServicesContent />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
