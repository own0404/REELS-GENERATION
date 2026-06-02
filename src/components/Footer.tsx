"use client";

import Link from "next/link";
import Logo from "./Logo";
import { COMPANY, SERVICES } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 */}
          <div>
            <Logo size="md" />
            <p className="mt-4 text-gray-300 text-sm leading-relaxed">
              {COMPANY.tagline}
            </p>
            <p className="mt-3 text-gray-400 text-sm leading-relaxed">
              Trusted transport service provider based in Gajuwaka, Visakhapatnam with 7+ years of excellence in logistics.
            </p>
            <div className="flex gap-3 mt-5">
              {["Facebook", "Instagram", "LinkedIn"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm hover:bg-gold hover:text-navy transition-all"
                  aria-label={social}
                >
                  {social === "Facebook" ? "f" : social === "Instagram" ? "📷" : "in"}
                </a>
              ))}
              <a
                href={`https://wa.me/${COMPANY.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-whatsapp flex items-center justify-center text-sm text-white hover:opacity-90 transition-all"
                aria-label="WhatsApp"
              >
                💬
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-bold mb-5 text-gold">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Fleet & Gallery", href: "/fleet" },
                { label: "FAQ", href: "/faq" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-gold transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="text-gold">›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-bold mb-5 text-gold">Our Services</h3>
            <ul className="space-y-3">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.id}`}
                    className="text-gray-300 hover:text-gold transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="text-gold">›</span> {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-lg font-bold mb-5 text-gold">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="text-gold text-lg mt-0.5">📍</span>
                <p className="text-gray-300 text-sm">{COMPANY.address}</p>
              </div>
              <div className="flex gap-3 items-center">
                <span className="text-gold text-lg">📞</span>
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="text-gray-300 hover:text-gold text-sm transition-colors"
                >
                  {COMPANY.phoneDisplay}
                </a>
              </div>
              <div className="flex gap-3 items-center">
                <span className="text-gold text-lg">📧</span>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-gray-300 hover:text-gold text-sm transition-colors"
                >
                  {COMPANY.email}
                </a>
              </div>
              <div className="flex gap-3">
                <span className="text-gold text-lg mt-0.5">🕐</span>
                <div className="text-gray-300 text-sm">
                  <p>Mon-Sat: {COMPANY.hours.weekday}</p>
                  <p>Sunday: {COMPANY.hours.sunday}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Murali Krishna Transport. All Rights Reserved.
          </p>
          <div className="flex gap-4 text-sm text-gray-400">
            <a href="#" className="hover:text-gold transition-colors">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="#" className="hover:text-gold transition-colors">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
