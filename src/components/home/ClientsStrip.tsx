"use client";

const clients = [
  "L&T ECC Division",
  "Industrial Partners",
  "Port Authorities",
  "Manufacturing Units",
  "Construction Companies",
  "FMCG Brands",
  "Steel Industries",
  "Chemical Plants",
];

export default function ClientsStrip() {
  return (
    <section className="py-14 bg-white overflow-hidden">
      <div className="text-center mb-10">
        <span className="text-gold font-semibold uppercase tracking-wider text-sm">Our Partners</span>
        <h2 className="text-2xl md:text-3xl font-bold text-navy mt-2">Trusted By</h2>
      </div>

      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...clients, ...clients].map((client, i) => (
            <div
              key={i}
              className="mx-8 flex items-center justify-center min-w-[200px] h-20 bg-light-gray rounded-xl px-6"
            >
              <span className="text-navy font-bold text-sm whitespace-nowrap">{client}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
