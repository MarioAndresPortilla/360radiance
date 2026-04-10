import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageShell } from '@/components/layout/PageShell';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { BLOG_POSTS } from '@/lib/constants';
import { buildPageMetadata } from '@/lib/seo';
import { BlogGrid } from './BlogGrid';
import { NewsletterSignup } from './NewsletterSignup';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  return buildPageMetadata({
    locale,
    path: '/blog',
    title: t('pageTitle'),
    description: t('pageSubtitle'),
  });
}

const featured = BLOG_POSTS.find((p) => p.featured);
const rest = BLOG_POSTS.filter((p) => !p.featured);

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('blog');

  return (
    <PageShell>
      {/* ── Featured hero ────────────────────────────────────────── */}
      {featured && (
        <section className="relative bg-navy-deep overflow-hidden" aria-labelledby="featured-article-heading">
          {/* Background image with overlay */}
          <div className="absolute inset-0">
            <Image
              src={`/images/blog/${featured.slug}.jpg`}
              alt=""
              fill
              className="object-cover opacity-25"
              sizes="100vw"
              priority
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/95 to-navy-deep/60" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          </div>

          <div className="container-site relative z-1 py-24 max-md:py-16">
            <ScrollReveal>
              <div className="grid grid-cols-[1fr_1fr] gap-16 items-center max-lg:grid-cols-1 max-lg:gap-10">
                {/* Copy */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[.6rem] font-bold uppercase tracking-[2px] text-gold bg-gold/10 border border-gold/20 py-1.5 px-3 rounded-full">
                      {t('featured')}
                    </span>
                    <span className="text-[.6rem] font-bold uppercase tracking-[1px] text-white/60 bg-white/[.08] border border-white/10 py-1.5 px-3 rounded-full">
                      {featured.category}
                    </span>
                  </div>

                  <h1 id="featured-article-heading" className="font-serif text-white text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.12] mb-5">
                    <Link href={`/blog/${featured.slug}`} className="no-underline text-white hover:text-gold transition-colors duration-300">
                      {featured.title}
                    </Link>
                  </h1>

                  <p className="text-white/60 text-[1rem] leading-[1.85] mb-8 max-w-110">
                    {featured.excerpt}
                  </p>

                  <div className="flex items-center gap-5 mb-8">
                    <Link
                      href={`/blog/${featured.slug}`}
                      className="inline-flex items-center gap-2.5 bg-white text-navy-deep font-semibold text-[.88rem] px-7 py-3.5 rounded-xl no-underline hover:-translate-y-px hover:shadow-lg transition-all"
                    >
                      {t('readFullArticle')}
                    </Link>
                  </div>

                  <div className="flex items-center gap-5 text-[.78rem] text-white/40">
                    <time dateTime={featured.date}>
                      {new Date(featured.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </time>
                    <span aria-hidden="true" className="w-1 h-1 rounded-full bg-white/20" />
                    <span>{featured.readTime} min read</span>
                  </div>
                </div>

                {/* Featured image */}
                <div className="relative max-lg:order-first">
                  <div className="rounded-2xl overflow-hidden aspect-4/3 relative ring-1 ring-white/10 shadow-2xl">
                    <Image
                      src={`/images/blog/${featured.slug}.svg`}
                      alt={featured.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      unoptimized
                    />
                  </div>
                  {/* Decorative glow */}
                  <div className="absolute -inset-4 bg-gold/[.04] rounded-3xl -z-1 blur-2xl" aria-hidden="true" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ── Category filter + article grid ────────────────────── */}
      <section className="py-20 max-md:py-14 bg-cream" aria-labelledby="articles-heading">
        <div className="container-site">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block text-[.62rem] font-bold uppercase tracking-[2.5px] text-navy mb-4 bg-navy-pale px-4 py-1.5 rounded-full">
                {t('pageTag')}
              </span>
              <h2 id="articles-heading" className="font-serif text-[clamp(1.6rem,3vw,2.3rem)] mb-3">{t('allArticles')}</h2>
              <p className="text-text-mid max-w-130 mx-auto text-[.95rem] leading-[1.7]">
                {t('allArticlesSubtitle')}
              </p>
            </div>
          </ScrollReveal>
          <BlogGrid posts={rest} />
        </div>
      </section>

      {/* ── Newsletter ────────────────────────────────────────── */}
      <section className="relative bg-navy-deep overflow-hidden py-20 max-md:py-14" aria-labelledby="newsletter-heading">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gold/[.04]" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-white/[.02]" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        </div>

        <div className="container-site relative z-1">
          <ScrollReveal>
            <div className="max-w-150 mx-auto text-center">
              <span className="inline-block text-[.6rem] font-bold uppercase tracking-[2.5px] text-gold mb-5 border border-gold/25 px-3.5 py-1.5 rounded-full">
                {t('pageTag')}
              </span>
              <h2 id="newsletter-heading" className="font-serif text-white text-[clamp(1.4rem,3vw,2rem)] mb-4">{t('newsletterTitle')}</h2>
              <p className="text-white/55 text-[.95rem] leading-[1.7] mb-10">
                {t('newsletterSubtitle')}
              </p>
              <NewsletterSignup variant="dark" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CtaBanner
        heading={t('ctaHeading')}
        subtitle={t('ctaSubtitle')}
      />
    </PageShell>
  );
}
