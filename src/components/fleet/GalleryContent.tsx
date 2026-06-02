"use client";

import { useState } from "react";
import { GALLERY_IMAGES } from "@/lib/constants";

const categories = [
  { key: "all", label: "All" },
  { key: "trucks", label: "Trucks" },
  { key: "containers", label: "Containers" },
  { key: "heavy", label: "Heavy Vehicles" },
  { key: "operations", label: "Operations" },
];

export default function GalleryContent() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeFilter === "all"
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeFilter);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const navigateLightbox = (direction: number) => {
    if (lightboxIndex === null) return;
    const newIndex = (lightboxIndex + direction + filtered.length) % filtered.length;
    setLightboxIndex(newIndex);
  };

  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-dark-gray max-w-2xl mx-auto">
              Explore our fleet of well-maintained vehicles and see our transport operations in action.
              We have the right equipment for every logistics need.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeFilter === cat.key
                    ? "bg-navy text-white shadow-lg"
                    : "bg-light-gray text-dark-gray hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((image, i) => (
              <div
                key={`${activeFilter}-${i}`}
                className="group relative rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => openLightbox(i)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/50 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    🔍
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <p className="text-white text-xs font-medium">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="lightbox-overlay"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-6 right-6 text-white text-3xl hover:text-gold transition-colors z-10"
            aria-label="Close lightbox"
          >
            ✕
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gold transition-colors z-10"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gold transition-colors z-10"
            aria-label="Next image"
          >
            ›
          </button>
          <img
            src={filtered[lightboxIndex].src}
            alt={filtered[lightboxIndex].alt}
            className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-6 text-white text-center font-medium">
            {filtered[lightboxIndex].alt} — {lightboxIndex + 1} / {filtered.length}
          </p>
        </div>
      )}
    </>
  );
}
