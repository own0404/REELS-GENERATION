"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const companyDetails = [
  { label: "Nature of Business", value: "Service Provider" },
  { label: "Legal Status", value: "Proprietorship" },
  { label: "Annual Turnover", value: "₹5-25 Crore" },
  { label: "GST Registered", value: "July 2017" },
  { label: "Experience", value: "7+ Years" },
  { label: "Operations", value: "24/7" },
];

const coreValues = [
  { icon: "🏛️", title: "Integrity", desc: "Honest and transparent business practices" },
  { icon: "🛡️", title: "Safety", desc: "Zero-compromise approach to cargo safety" },
  { icon: "⏱️", title: "Reliability", desc: "Consistent on-time deliveries, every time" },
  { icon: "🤝", title: "Customer Focus", desc: "Your success is our success" },
  { icon: "💡", title: "Innovation", desc: "Modern solutions for logistics challenges" },
];

export default function AboutContent() {
  const { ref: storyRef, isVisible: storyVisible } = useScrollReveal();
  const { ref: detailsRef, isVisible: detailsVisible } = useScrollReveal();
  const { ref: missionRef, isVisible: missionVisible } = useScrollReveal();
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollReveal();

  return (
    <>
      {/* Company Story */}
      <section ref={storyRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700 ${
              storyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/29057947/pexels-photo-29057947.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                alt="Murali Krishna Transport fleet"
                className="w-full h-80 md:h-[450px] object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <span className="text-gold font-semibold uppercase tracking-wider text-sm">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2 mb-5">
                About Murali Krishna Transport
              </h2>
              <div className="space-y-4 text-dark-gray leading-relaxed">
                <p>
                  Murali Krishna Transport, based in Gajuwaka, Visakhapatnam, is known to
                  satisfactorily cater to the demands of its customer base. Established as a
                  proprietorship firm, we have grown to become one of the most reliable
                  transport service providers in Andhra Pradesh with an annual turnover of
                  5-25 Crores.
                </p>
                <p>
                  We provide excellent transport services including our prestigious work
                  with L&T ECC Division. Customer centricity is at the core of our business,
                  and it is this belief that has led us to build long-term relationships
                  with our clients.
                </p>
                <p>
                  Our location at Simhagiri Colony, near Old RTO Office, makes us easily
                  accessible and strategically positioned for efficient logistics operations
                  connecting Visakhapatnam Port to destinations across India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Details Grid */}
      <section ref={detailsRef} className="py-16 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy">Company Details</h2>
            <div className="w-20 h-1 bg-brand-red mx-auto mt-4 rounded-full" />
          </div>
          <div
            className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ${
              detailsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {companyDetails.map((detail, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="text-sm text-gray-500 font-medium mb-1">{detail.label}</div>
                <div className="text-xl font-bold text-navy">{detail.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section ref={missionRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className={`grid md:grid-cols-2 gap-8 transition-all duration-700 ${
              missionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-navy rounded-2xl p-8 md:p-10 text-white">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-4 text-gold">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                To provide reliable, safe, and cost-effective transportation solutions
                while maintaining the highest standards of customer service. We strive to
                be the backbone of India&apos;s logistics infrastructure, ensuring every
                shipment reaches its destination safely and on time.
              </p>
            </div>
            <div className="bg-brand-red rounded-2xl p-8 md:p-10 text-white">
              <div className="text-4xl mb-4">🔭</div>
              <h3 className="text-2xl font-bold mb-4 text-gold">Our Vision</h3>
              <p className="text-red-100 leading-relaxed">
                To be the most trusted transport partner across India, known for our
                commitment to excellence and timely delivery. We envision expanding our
                network to cover every corner of the nation while maintaining the
                personal touch that sets us apart.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section ref={valuesRef} className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-gold font-semibold uppercase tracking-wider text-sm">What Drives Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2">Core Values</h2>
            <div className="w-20 h-1 bg-brand-red mx-auto mt-4 rounded-full" />
          </div>
          <div
            className={`grid sm:grid-cols-2 lg:grid-cols-5 gap-6 transition-all duration-700 ${
              valuesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {coreValues.map((val, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{val.icon}</div>
                <h3 className="font-bold text-navy mb-2">{val.title}</h3>
                <p className="text-xs text-gray-500">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
