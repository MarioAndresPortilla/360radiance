'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  target: number;
  suffix: string;
  label: string;
}

export function StatCounter({ target, suffix, label }: Props) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const step = Math.max(1, Math.floor(target / 30));
          let current = 0;
          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }
            setCount(current);
          }, 35);
          obs.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-serif text-[2rem] text-teal">
        {count}{suffix}
      </div>
      <div className="text-[.65rem] text-text-light font-semibold uppercase tracking-[.8px]">
        {label}
      </div>
    </div>
  );
}
