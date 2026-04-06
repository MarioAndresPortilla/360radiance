import Image from 'next/image';
import { TRUST_ITEMS } from '@/lib/constants';
import { Icon, type IconName } from '@/components/icons/Icons';

export function TrustBar() {
  return (
    <div className="bg-white border-b border-border py-6" role="region" aria-label="Professional credentials">
      <div className="flex justify-center items-center gap-10 flex-wrap max-lg:gap-6 max-md:gap-5 max-md:px-5">
        {TRUST_ITEMS.map((item) => (
          <div key={item.label} className="flex items-center gap-2.5 text-[.8rem] font-medium text-text-mid">
            <Icon name={item.icon as IconName} size={22} aria-hidden="true" />
            {item.label}
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
