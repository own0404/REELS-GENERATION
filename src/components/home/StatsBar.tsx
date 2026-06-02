"use client";

import { useScrollReveal, useCountUp } from "@/hooks/useScrollReveal";

const stats = [
  { icon: "🚛", value: 500, suffix: "+", label: "Deliveries/Month" },
  { icon: "📦", value: 7, suffix: "+", label: "Years Experience" },
  { icon: "🌍", value: 28, suffix: "+", label: "States Covered" },
  { icon: "⭐", value: 4.4, suffix: "/5", label: "Customer Rating", isDecimal: true },
];

function StatItem({ stat, isVisible }: { stat: typeof stats[0]; isVisible: boolean }) {
  const count = useCountUp(stat.isDecimal ? 44 : stat.value, 2000, isVisible);
  const display = stat.isDecimal ? (count / 10).toFixed(1) : count;

  return (
    <div className="text-center py-6">
      <div className="text-4xl mb-3">{stat.icon}</div>
      <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">
        {display}
        {stat.suffix}
      </div>
      <div className="text-gray-300 text-sm font-medium">{stat.label}</div>
    </div>
  );
}

export default function StatsBar() {
  const { ref, isVisible } = useScrollReveal(0.3);

  return (
    <section ref={ref} className="bg-navy py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatItem key={i} stat={stat} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
