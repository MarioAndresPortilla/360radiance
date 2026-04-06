import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { CREDENTIALS } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Icon, type IconName } from '@/components/icons/Icons';
import { IconDiploma } from '@/components/icons/Icons';

export function AboutSection() {
  const t = useTranslations('about');
  return (
    <section className="py-24 max-md:py-16" id="about" aria-labelledby="about-heading">
      <div className="container-site">
        <div className="grid grid-cols-[1fr_1.4fr] gap-20 max-lg:gap-12 items-center max-lg:grid-cols-1">
          <ScrollReveal>
            <div className="relative max-lg:max-w-75 max-lg:mx-auto">
              <div className="rounded-2xl overflow-hidden aspect-3/4 shadow-md relative">
                <Image
                  src="/images/marta-nazzar.jpg"
                  alt="Marta Nazzar, Licensed Paramedical Aesthetician"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 300px, 35vw"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-white rounded-xl py-4 px-5 shadow-lg flex items-center gap-3">
                <div className="w-9 h-9 bg-gold-pale rounded-2.5 flex items-center justify-center" aria-hidden="true">
                  <IconDiploma size={18} className="text-gold-dark" />
                </div>
                <div className="text-[.75rem] font-semibold text-teal">
                  {t('yearsBadge')}
                  <span className="block font-normal text-text-light text-[.65rem] mt-0.5">{t('yearsBadgeSub')}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div>
              <span className="inline-block text-[.68rem] font-bold uppercase tracking-[2px] text-teal mb-4 bg-teal-pale px-4 py-1.5 rounded-full">
                {t('tag')}
              </span>
              <h2 id="about-heading" className="font-serif text-[1.9rem] mb-5 leading-[1.2]">
                {t('titleText')} <em className="text-teal not-italic">{t('titleHighlight')}</em>
              </h2>
              <p className="text-text-mid leading-[1.85] mb-5 text-[.92rem]">
                {t('p1')}
              </p>
              <p className="text-text-mid leading-[1.85] mb-5 text-[.92rem]">
                {t('p2')}
              </p>
              <div className="flex items-center gap-4 mt-6 mb-6">
                <Image
                  src="/images/ascp-member.png"
                  alt="Associated Skin Care Professionals Member"
                  width={100}
                  height={60}
                  className="object-contain"
                />
              </div>
              <ul className="flex flex-wrap gap-3 list-none" aria-label="Professional credentials">
                {CREDENTIALS.map((cred) => (
                  <li key={cred.label}>
                    <span className="bg-teal-pale text-teal-dark py-2 px-4 rounded-lg text-[.72rem] font-semibold flex items-center gap-2">
                      <Icon name={cred.icon as IconName} size={14} className="text-teal" aria-hidden="true" />
                      {cred.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
