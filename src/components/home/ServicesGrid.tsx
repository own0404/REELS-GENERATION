"use client";

import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function ServicesGrid() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-20 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-gold font-semibold uppercase tracking-wider text-sm">What We Offer</span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2">Our Services</h2>
          <div className="w-20 h-1 bg-brand-red mx-auto mt-4 rounded-full" />
        </div>

        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {SERVICES.map((service, i) => (
            <div
              key={service.id}
              className="bg-white rounded-xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border border-gray-100"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-navy mb-3 group-hover:text-brand-red transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {service.shortDesc}
              </p>
              <Link
                href={`/services#${service.id}`}
                className="text-brand-red font-semibold text-sm inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all"
              >
                Learn More <span>→</span>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-block bg-navy text-white px-8 py-3.5 rounded-lg font-bold hover:bg-secondary-blue transition-all hover:scale-105 shadow-md"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
