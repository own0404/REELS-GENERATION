"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const features = [
  {
    icon: "🕐",
    title: "24/7 Availability",
    desc: "Round the clock service, every day of the year",
  },
  {
    icon: "🛡️",
    title: "Safe & Secure",
    desc: "Your cargo safety is our top priority with full insurance",
  },
  {
    icon: "💰",
    title: "Competitive Pricing",
    desc: "Best rates in the industry without compromising quality",
  },
  {
    icon: "📍",
    title: "Real-time Tracking",
    desc: "Track your shipment status in real-time",
  },
  {
    icon: "🤝",
    title: "Customer First",
    desc: "Building long-term relationships through trust",
  },
  {
    icon: "📋",
    title: "Fully Licensed",
    desc: "GST registered, fully compliant operations since 2017",
  },
];

export default function WhyChooseUs() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-gold font-semibold uppercase tracking-wider text-sm">Our Strengths</span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2">
            Why Choose Murali Krishna Transport?
          </h2>
          <div className="w-20 h-1 bg-brand-red mx-auto mt-4 rounded-full" />
        </div>

        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {features.map((f, i) => (
            <div
              key={i}
              className="text-center p-8 rounded-2xl bg-light-gray hover:bg-navy group transition-all duration-300 hover:shadow-xl"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-navy group-hover:text-white transition-colors mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-gray-600 group-hover:text-gray-300 transition-colors">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
