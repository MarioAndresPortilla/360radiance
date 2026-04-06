'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  targetWidth: number;
}

export function ProgressBar({ targetWidth }: Props) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(targetWidth), 200);
          obs.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [targetWidth]);

  return (
    <div ref={ref} className="h-1 bg-cream-dark rounded-sm mt-5 overflow-hidden">
      <div
        className="h-full rounded-sm bg-teal transition-[width] duration-[1200ms] ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
