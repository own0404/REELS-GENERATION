"use client";

import { useState, useEffect, useCallback } from "react";
import { TESTIMONIALS } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const { ref, isVisible } = useScrollReveal();

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section ref={ref} className="py-20 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-gold font-semibold uppercase tracking-wider text-sm">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2">
            What Our Clients Say
          </h2>
          <div className="w-20 h-1 bg-brand-red mx-auto mt-4 rounded-full" />
        </div>

        <div
          className={`max-w-3xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center relative">
            {/* Quote mark */}
            <div className="text-6xl text-gold/30 font-serif absolute top-4 left-6">&ldquo;</div>

            <div className="flex justify-center mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-xl ${
                    i < TESTIMONIALS[current].rating ? "text-gold" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-6 italic min-h-[80px]">
              &ldquo;{TESTIMONIALS[current].text}&rdquo;
            </p>

            <div>
              <div className="w-14 h-14 rounded-full bg-navy text-white text-xl font-bold flex items-center justify-center mx-auto mb-3">
                {TESTIMONIALS[current].name[0]}
              </div>
              <h4 className="font-bold text-navy text-lg">
                {TESTIMONIALS[current].name}
              </h4>
              <p className="text-sm text-gray-500">{TESTIMONIALS[current].company}</p>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === current ? "bg-brand-red w-8" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
