import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import PageBanner from "@/components/PageBanner";
import FAQContent from "@/components/faq/FAQContent";

export const metadata: Metadata = {
  title: "FAQ | Murali Krishna Transport - Frequently Asked Questions",
  description:
    "Find answers to commonly asked questions about Murali Krishna Transport services, shipping, tracking, pricing, and more.",
};

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <PageBanner
          title="Frequently Asked Questions"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "FAQ" },
          ]}
          bgImage="https://images.pexels.com/photos/29057952/pexels-photo-29057952.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
        />
        <FAQContent />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
