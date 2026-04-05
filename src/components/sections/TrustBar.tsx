import { TRUST_ITEMS } from '@/lib/constants';
import { Icon, type IconName } from '@/components/icons/Icons';

export function TrustBar() {
  return (
    <div className="bg-white border-b border-border py-5" role="region" aria-label="Professional credentials">
      <ul className="flex justify-center gap-10 flex-wrap list-none max-md:gap-6 max-md:px-4">
        {TRUST_ITEMS.map((item) => (
          <li key={item.label} className="flex items-center gap-2 text-[.78rem] font-medium text-text-mid">
            <Icon name={item.icon as IconName} size={22} aria-hidden="true" />
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
