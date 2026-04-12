'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  target: number;
  suffix: string;
  label: string;
  dark?: boolean;
}

export function StatCounter({ target, suffix, label, dark }: Props) {
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
      <div className={`font-serif text-[2rem] ${dark ? 'text-gold-light' : 'text-navy'}`}>
        {count}{suffix}
      </div>
      <div className={`text-[.65rem] font-semibold uppercase tracking-[.8px] ${dark ? 'text-white/50' : 'text-text-light'}`}>
        {label}
      </div>
    </div>
  );
}
