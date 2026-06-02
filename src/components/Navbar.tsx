"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { NAV_LINKS, COMPANY } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg py-2" : "bg-white/95 backdrop-blur-sm py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo size="sm" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors hover:text-brand-red ${
                pathname === link.href ? "text-brand-red" : "text-dark-gray"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href={`tel:${COMPANY.phone}`}
            className="flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-brand-red transition-colors"
          >
            <span className="text-lg">📞</span>
            {COMPANY.phoneDisplay}
          </a>
          <Link
            href="/contact"
            className="bg-brand-red text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-red-700 transition-all hover:scale-105 shadow-md"
          >
            Get Quote
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-navy transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`w-6 h-0.5 bg-navy transition-all ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`w-6 h-0.5 bg-navy transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <Logo size="sm" />
            <button onClick={() => setMobileOpen(false)} className="text-2xl text-dark-gray">
              ✕
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-semibold py-2 border-b border-gray-100 transition-colors ${
                  pathname === link.href ? "text-brand-red" : "text-dark-gray hover:text-brand-red"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${COMPANY.phone}`}
              className="flex items-center gap-2 text-base font-semibold text-navy mt-4"
            >
              📞 {COMPANY.phoneDisplay}
            </a>
            <Link
              href="/contact"
              className="bg-brand-red text-white px-5 py-3 rounded-lg text-center font-bold mt-2"
            >
              Get Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </nav>
  );
}
