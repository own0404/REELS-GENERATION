"use client";

export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeMap = {
    sm: { font: "text-xl", sub: "text-[8px]" },
    md: { font: "text-3xl", sub: "text-[10px]" },
    lg: { font: "text-5xl", sub: "text-sm" },
  };
  const s = sizeMap[size];

  return (
    <div className="flex flex-col items-start">
      <div className={`${s.font} font-extrabold tracking-tight font-[var(--font-heading)] leading-none`}>
        <span className="text-[#F5A623]">M</span>
        <span className="text-[#E74C3C]">K</span>
        <span className="text-[#2C3E8F]">T</span>
      </div>
      <span className={`${s.sub} font-semibold text-gray-500 tracking-widest uppercase leading-none mt-0.5`}>
        Transport
      </span>
    </div>
  );
}
