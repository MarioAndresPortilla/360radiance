import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function AnnouncementBar() {
  const t = useTranslations('announcement');
  return (
    <div role="banner" className="bg-navy text-white text-center py-2 px-4 text-[.78rem] font-medium">
      {t('text')}
      <Link href="/contact" className="text-gold-light underline underline-offset-2 ml-1 no-underline-imp">
        {t('linkText')}
      </Link>
    </div>
  );
}
