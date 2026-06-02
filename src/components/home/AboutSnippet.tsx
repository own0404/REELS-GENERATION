"use client";

import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const highlights = [
  { icon: "🕐", text: "24/7 Operations" },
  { icon: "📋", text: "GST Registered (Since July 2017)" },
  { icon: "💰", text: "Annual Turnover: 5-25 Cr" },
  { icon: "✅", text: "Verified & Trusted" },
];

export default function AboutSnippet() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/29057946/pexels-photo-29057946.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                alt="Murali Krishna Transport operations"
                className="w-full h-80 md:h-[450px] object-cover"
                loading="lazy"
              />
            </div>
            {/* Experience badge */}
            <div className="absolute -bottom-6 -right-4 md:-right-6 bg-brand-red text-white py-4 px-6 rounded-xl shadow-xl">
              <div className="text-3xl font-extrabold">7+</div>
              <div className="text-sm font-semibold">Years</div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-gold font-semibold uppercase tracking-wider text-sm">About Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2 mb-5">
              Welcome to Murali Krishna Transport
            </h2>
            <p className="text-dark-gray leading-relaxed mb-6">
              Based in Gajuwaka, Visakhapatnam, Murali Krishna Transport has been a
              trusted name in logistics and transportation for over 7 years. We specialize
              in commercial cargo, container haulage, truck transport, and heavy goods
              movement across India. Our commitment to customer satisfaction and timely
              delivery has made us one of the leading transport service providers in
              Andhra Pradesh.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-light-gray rounded-xl p-3.5 hover:shadow-md transition-shadow"
                >
                  <span className="text-2xl">{h.icon}</span>
                  <span className="text-sm font-semibold text-dark-gray">{h.text}</span>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-brand-red font-bold text-base hover:gap-4 transition-all"
            >
              Learn More About Us
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
