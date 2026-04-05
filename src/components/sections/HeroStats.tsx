'use client';

import { StatCounter } from '@/components/ui/StatCounter';

export function HeroStats() {
  return (
    <div className="flex gap-10 max-lg:justify-center">
      <StatCounter target={25} suffix="+" label="Years Medical" />
      <StatCounter target={90} suffix="%" label="Avg Improvement" />
      <StatCounter target={4} suffix="+" label="Serum Origins" />
    </div>
  );
}
