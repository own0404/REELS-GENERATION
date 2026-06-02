"use client";

import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const serviceImages = [
  "https://images.pexels.com/photos/29057949/pexels-photo-29057949.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  "https://images.pexels.com/photos/15346128/pexels-photo-15346128.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  "https://images.pexels.com/photos/20581299/pexels-photo-20581299.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  "https://images.pexels.com/photos/24246926/pexels-photo-24246926.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  "https://images.pexels.com/photos/2348359/pexels-photo-2348359.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  "https://images.pexels.com/photos/5961982/pexels-photo-5961982.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  "https://images.pexels.com/photos/29057947/pexels-photo-29057947.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  "https://images.pexels.com/photos/27490857/pexels-photo-27490857.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  "https://images.pexels.com/photos/16325212/pexels-photo-16325212.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
];

const majorRoutes = [
  "Visakhapatnam to Hyderabad",
  "Visakhapatnam to Chennai",
  "Visakhapatnam to Bangalore",
  "Visakhapatnam to Mumbai",
  "Visakhapatnam to Kolkata",
  "Visakhapatnam to Delhi",
  "Visakhapatnam to Vijayawada",
  "Visakhapatnam to Pune",
  "Inter-state routes across India",
  "Port-to-factory direct delivery",
];

function ServiceBlock({ service, index, image }: { service: typeof SERVICES[0]; index: number; image: string }) {
  const { ref, isVisible } = useScrollReveal(0.1);
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} id={service.id} className="scroll-mt-24">
      <div
        className={`grid md:grid-cols-2 gap-10 items-center transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        } ${isEven ? "" : "md:[direction:rtl]"}`}
      >
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img
            src={image}
            alt={service.title}
            className="w-full h-72 md:h-80 object-cover hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <div className={isEven ? "" : "md:[direction:ltr]"}>
          <div className="text-4xl mb-3">{service.icon}</div>
          <h3 className="text-2xl font-bold text-navy mb-4">{service.title}</h3>
          <p className="text-dark-gray leading-relaxed mb-5">{service.fullDesc}</p>
          <ul className="space-y-2 mb-6">
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-success font-bold">✓</span>
                {feature}
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="inline-block bg-brand-red text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-red-700 transition-all hover:scale-105 shadow-md"
          >
            Enquire Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ServicesContent() {
  const { ref: routesRef, isVisible: routesVisible } = useScrollReveal();

  return (
    <>
      {/* Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-navy mb-5">Comprehensive Transport Solutions</h2>
          <p className="text-dark-gray leading-relaxed">
            Murali Krishna Transport offers a wide range of transport and logistics services
            designed to meet the diverse needs of businesses across India. From commercial
            cargo and container haulage to heavy goods and car transport, we have the
            expertise, fleet, and network to deliver your goods safely and on time.
          </p>
        </div>
      </section>

      {/* Individual Service Blocks */}
      <section className="py-10 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 space-y-20">
          {SERVICES.map((service, i) => (
            <ServiceBlock
              key={service.id}
              service={service}
              index={i}
              image={serviceImages[i]}
            />
          ))}
        </div>
      </section>

      {/* Service Areas */}
      <section ref={routesRef} className="py-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-gold font-semibold uppercase tracking-wider text-sm">Coverage</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Service Areas & Major Routes</h2>
            <div className="w-20 h-1 bg-brand-red mx-auto mt-4 rounded-full" />
          </div>
          <div
            className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-700 ${
              routesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {majorRoutes.map((route, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white/10 rounded-lg px-5 py-4 hover:bg-white/20 transition-colors"
              >
                <span className="text-gold text-lg">📍</span>
                <span className="text-sm font-medium">{route}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/contact"
              className="inline-block bg-gold text-navy px-8 py-3.5 rounded-lg font-bold hover:bg-yellow-400 transition-all hover:scale-105"
            >
              Request Custom Route Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
