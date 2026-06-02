"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const slides = [
  {
    bg: "https://images.pexels.com/photos/29057949/pexels-photo-29057949.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
    title: "Reliable Transport Solutions Across India",
    subtitle: "7+ Years of Trusted Service | 24/7 Operations",
    ctas: [
      { label: "Request a Quote", href: "/contact", primary: true },
      { label: "Our Services", href: "/services", primary: false },
    ],
  },
  {
    bg: "https://images.pexels.com/photos/15346128/pexels-photo-15346128.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
    title: "Container Haulage & Delivery Experts",
    subtitle: "From Visakhapatnam Port to Anywhere in India",
    ctas: [
      { label: "Contact Us Today", href: "/contact", primary: true },
    ],
  },
  {
    bg: "https://images.pexels.com/photos/2348359/pexels-photo-2348359.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
    title: "Heavy Goods & Industrial Transport Specialists",
    subtitle: "Safe, Timely, Cost-Effective",
    ctas: [
      { label: "View Our Fleet", href: "/fleet", primary: true },
    ],
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    setAnimKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const slide = slides[current];

  return (
    <section className="relative h-[600px] md:h-[700px] lg:h-[80vh] overflow-hidden">
      {/* Background images */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${s.bg})` }}
        />
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/70 to-navy/50" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div key={animKey} className="max-w-2xl">
            <h1
              className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 animate-fade-in-left"
              style={{ animationDelay: "0.1s" }}
            >
              {slide.title}
            </h1>
            <p
              className="text-lg md:text-xl text-gray-200 mb-8 animate-fade-in-left"
              style={{ animationDelay: "0.3s", animationFillMode: "both" }}
            >
              {slide.subtitle}
            </p>
            <div
              className="flex flex-wrap gap-4 animate-fade-in-left"
              style={{ animationDelay: "0.5s", animationFillMode: "both" }}
            >
              {slide.ctas.map((cta, ci) => (
                <Link
                  key={ci}
                  href={cta.href}
                  className={`px-7 py-3.5 rounded-lg font-bold text-base transition-all hover:scale-105 shadow-lg ${
                    cta.primary
                      ? "bg-brand-red text-white hover:bg-red-700"
                      : "bg-white/20 text-white border-2 border-white hover:bg-white hover:text-navy"
                  }`}
                >
                  {cta.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={() => goTo((current - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xl hover:bg-white/40 transition-all"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        onClick={() => goTo((current + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xl hover:bg-white/40 transition-all"
        aria-label="Next slide"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current ? "bg-gold w-8" : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
