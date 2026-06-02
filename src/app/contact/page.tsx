import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import PageBanner from "@/components/PageBanner";
import ContactContent from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact Us | Murali Krishna Transport - Get a Free Quote",
  description:
    "Contact Murali Krishna Transport for transport quotes, bookings, and inquiries. Located in Gajuwaka, Visakhapatnam. Call us 24/7 or send a message.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <PageBanner
          title="Contact Us"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Contact Us" },
          ]}
          bgImage="https://images.pexels.com/photos/1267325/pexels-photo-1267325.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
        />
        <ContactContent />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
