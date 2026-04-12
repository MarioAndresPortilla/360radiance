import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { TRUST_ITEMS } from '@/lib/constants';
import { Icon, type IconName } from '@/components/icons/Icons';

const TRUST_KEYS = ['biology', 'faceReality', 'medical', 'european', 'ascp', 'bilingual'] as const;

export function TrustBar() {
  const t = useTranslations('trust');
  return (
    <div className="bg-cream border-b border-border py-5" role="region" aria-label={t('label')}>
      <div className="flex justify-center items-center gap-10 flex-wrap max-lg:gap-6 max-md:gap-5 max-md:px-5">
        {TRUST_ITEMS.map((item, i) => (
          <div key={item.label} className="flex items-center gap-2.5 text-[.8rem] font-medium text-text-mid">
            <Icon name={item.icon as IconName} size={22} aria-hidden="true" />
            {t(`items.${TRUST_KEYS[i]}`)}
          </div>
        ))}
        <div className="flex items-center">
          <Image
            src="/images/ascp-member.png"
            alt="ASCP Member"
            width={80}
            height={48}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
