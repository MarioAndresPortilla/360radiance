import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { BUSINESS, INSTAGRAM_POSTS } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function InstagramSection() {
  const t = useTranslations('instagram');
  return (
    <section className="py-24 max-md:py-16" aria-labelledby="instagram-heading">
      <div className="container-site">
        <ScrollReveal>
          <SectionHeader
            id="instagram-heading"
            tag={t('tag')}
            title={t('title')}
            subtitle={t('subtitle')}
          />
        </ScrollReveal>

        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-2 max-md:gap-3">
          {INSTAGRAM_POSTS.map((post) => (
            <ScrollReveal key={post.id}>
              <a
                href={post.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative rounded-2xl overflow-hidden aspect-square border border-border hover:border-navy transition-all hover:shadow-lg no-underline"
                aria-label={post.alt}
              >
                <Image
                  src={post.image}
                  alt={post.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/85 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 p-4">
                  <div className="text-white text-center">
                    <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2.5">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="5" />
                      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                    </svg>
                    <span className="block text-[.78rem] font-semibold mb-1">{post.caption}</span>
                    <span className="block text-[.7rem] opacity-80">{t('viewOnInstagram')}</span>
                  </div>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href={BUSINESS.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-transparent border-[1.5px] border-navy text-navy rounded-xl font-semibold text-[.88rem] px-7 py-3.5 transition-all hover:bg-navy hover:text-white no-underline"
          >
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
            {t('follow')}
          </a>
        </div>
      </div>
    </section>
  );
}
