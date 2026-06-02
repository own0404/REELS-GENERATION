import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Murali Krishna Transport | Trusted Transporters in Visakhapatnam | Container & Cargo Services",
  description:
    "Murali Krishna Transport (MKT) - Leading transport service provider in Gajuwaka, Visakhapatnam. 7+ years experience in commercial cargo, container haulage, truck transport & heavy goods. Open 24/7. Call now!",
  keywords:
    "transport service visakhapatnam, container haulage vizag, truck transport gajuwaka, cargo services andhra pradesh, murali krishna transport, MKT transport, heavy goods transport visakhapatnam",
  openGraph: {
    title: "Murali Krishna Transport | Trusted Transporters in Visakhapatnam",
    description:
      "Leading transport service provider with 7+ years experience. Commercial cargo, container haulage, truck transport & heavy goods across India.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-text antialiased">{children}</body>
    </html>
  );
}
