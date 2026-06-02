"use client";

import Link from "next/link";

interface PageBannerProps {
  title: string;
  breadcrumbs: { label: string; href?: string }[];
  bgImage?: string;
}

export default function PageBanner({ title, breadcrumbs, bgImage }: PageBannerProps) {
  return (
    <section
      className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: bgImage
          ? `linear-gradient(rgba(27,42,74,0.85), rgba(27,42,74,0.85)), url(${bgImage})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: bgImage ? undefined : "#1B2A4A",
      }}
    >
      <div className="text-center text-white z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <div className="flex items-center justify-center gap-2 text-sm">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-gold">›</span>}
              {crumb.href ? (
                <Link href={crumb.href} className="text-gray-300 hover:text-gold transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-gold font-semibold">{crumb.label}</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
