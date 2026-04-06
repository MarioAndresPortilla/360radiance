'use client';

import { useTranslations } from 'next-intl';
import { StatCounter } from '@/components/ui/StatCounter';

export function HeroStats() {
  const t = useTranslations('hero');
  return (
    <div className="flex gap-10 max-lg:justify-center">
      <StatCounter target={25} suffix="+" label={t('stat1Label')} />
      <StatCounter target={90} suffix="%" label={t('stat2Label')} />
      <StatCounter target={4} suffix="+" label={t('stat3Label')} />
    </div>
  );
}
