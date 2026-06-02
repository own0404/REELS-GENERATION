"use client";

import { useState } from "react";
import Link from "next/link";
import { FAQS } from "@/lib/constants";

export default function FAQContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-dark-gray">
            Can&apos;t find what you&apos;re looking for? Feel free to{" "}
            <Link href="/contact" className="text-brand-red font-semibold hover:underline">
              contact us
            </Link>{" "}
            and we&apos;ll be happy to help.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                openIndex === i
                  ? "border-navy shadow-lg"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span
                  className={`font-semibold text-base pr-4 transition-colors ${
                    openIndex === i ? "text-navy" : "text-dark-gray"
                  }`}
                >
                  {faq.q}
                </span>
                <span
                  className={`text-2xl font-light flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-45 text-brand-red" : "text-gray-400"
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`accordion-content ${openIndex === i ? "open" : ""}`}
              >
                <div className="px-6 pb-5">
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-dark-gray text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 bg-navy rounded-2xl p-8 md:p-10 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">Still Have Questions?</h3>
          <p className="text-gray-300 mb-6">
            Our team is ready to help you with any transport-related queries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-brand-red text-white px-7 py-3.5 rounded-lg font-bold hover:bg-red-700 transition-all"
            >
              Contact Us
            </Link>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-whatsapp text-white px-7 py-3.5 rounded-lg font-bold hover:opacity-90 transition-all"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
