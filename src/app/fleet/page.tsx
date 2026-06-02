import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import PageBanner from "@/components/PageBanner";
import GalleryContent from "@/components/fleet/GalleryContent";

export const metadata: Metadata = {
  title: "Our Fleet & Gallery | Murali Krishna Transport",
  description:
    "View our diverse fleet of trucks, trailers, container carriers and transport vehicles. See MKT in action with our transport operations gallery.",
};

export default function FleetPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <PageBanner
          title="Our Fleet & Gallery"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Fleet & Gallery" },
          ]}
          bgImage="https://images.pexels.com/photos/35097902/pexels-photo-35097902.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
        />
        <GalleryContent />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
