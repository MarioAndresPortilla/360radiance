import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageShell } from '@/components/layout/PageShell';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { PageHeader } from '@/components/ui/PageHeader';
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
      <PageHeader
        tag={t('pageTag')}
        title={t('pageTitle')}
        subtitle={t('pageSubtitle')}
      />

      {/* Featured article */}
      {featured && (
        <section className="py-16 bg-white border-b border-border" aria-labelledby="featured-article-heading">
          <div className="container-site">
            <ScrollReveal>
              <div className="grid grid-cols-[1.3fr_1fr] gap-12 items-center max-lg:grid-cols-1">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[.6rem] font-bold uppercase tracking-[1px] text-gold-a11y bg-gold-pale py-1 px-2.5 rounded-md">
                      {t('featured')}
                    </span>
                    <span className="text-[.6rem] font-bold uppercase tracking-[.5px] text-teal bg-teal-pale py-1 px-2.5 rounded-md">
                      {featured.category}
                    </span>
                  </div>
                  <h2 id="featured-article-heading" className="font-serif text-[1.8rem] leading-[1.2] mb-4">
                    <Link href={`/blog/${featured.slug}`} className="no-underline text-text hover:text-teal transition-colors">{featured.title}</Link>
                  </h2>
                  <p className="text-text-mid text-[.95rem] leading-[1.85] mb-6">{featured.excerpt}</p>
                  <Link href={`/blog/${featured.slug}`} className="text-teal text-[.88rem] font-semibold no-underline hover:underline">{t('readFullArticle')}</Link>
                  <div className="flex items-center gap-4 text-[.78rem] text-text-light mb-6">
                    <time dateTime={featured.date}>
                      {new Date(featured.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </time>
                    <span aria-hidden="true">&middot;</span>
                    <span>{featured.readTime} min read</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {featured.tags.map((tag) => (
                      <span key={tag} className="text-[.65rem] font-semibold text-text-mid bg-cream py-1 px-2.5 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden aspect-4/3 relative">
                  <Image
                    src={`/images/blog/${featured.slug}.jpg`}
                    alt={featured.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Category filter + article grid */}
      <section className="py-20 max-md:py-14" aria-labelledby="articles-heading">
        <div className="container-site">
          <ScrollReveal>
            <h2 id="articles-heading" className="font-serif text-[clamp(1.6rem,3vw,2.3rem)] text-center mb-2.5">{t('allArticles')}</h2>
            <p className="text-text-mid max-w-130 mx-auto text-[.95rem] leading-[1.7] text-center mb-10">
              {t('allArticlesSubtitle')}
            </p>
          </ScrollReveal>
          <BlogGrid posts={rest} />
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-cream" aria-labelledby="newsletter-heading">
        <div className="container-site">
          <ScrollReveal>
            <div className="max-w-150 mx-auto text-center">
              <h2 id="newsletter-heading" className="font-serif text-[1.6rem] mb-3">{t('newsletterTitle')}</h2>
              <p className="text-text-mid text-[.95rem] leading-[1.7] mb-8">
                {t('newsletterSubtitle')}
              </p>
              <NewsletterSignup />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Topics deep dive */}
      <section className="py-20 max-md:py-14" aria-labelledby="topics-heading">
        <div className="container-site">
          <ScrollReveal>
            <h2 id="topics-heading" className="font-serif text-[1.6rem] text-center mb-10">{t('topicsHeading')}</h2>
            <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
              {[
                {
                  title: t('topics.acneScience.title'),
                  desc: t('topics.acneScience.desc'),
                  count: BLOG_POSTS.filter((p) => p.category === 'Acne Science').length,
                  color: 'bg-teal-pale text-teal',
                },
                {
                  title: t('topics.ingredients.title'),
                  desc: t('topics.ingredients.desc'),
                  count: BLOG_POSTS.filter((p) => p.category === 'Ingredients').length,
                  color: 'bg-gold-pale text-gold-a11y',
                },
                {
                  title: t('topics.skinHealth.title'),
                  desc: t('topics.skinHealth.desc'),
                  count: BLOG_POSTS.filter((p) => p.category === 'Skin Health').length,
                  color: 'bg-teal-pale text-teal',
                },
                {
                  title: t('topics.treatments.title'),
                  desc: t('topics.treatments.desc'),
                  count: BLOG_POSTS.filter((p) => p.category === 'Treatments').length,
                  color: 'bg-gold-pale text-gold-a11y',
                },
                {
                  title: t('topics.productGuides.title'),
                  desc: t('topics.productGuides.desc'),
                  count: BLOG_POSTS.filter((p) => p.category === 'Product Guides').length,
                  color: 'bg-teal-pale text-teal',
                },
                {
                  title: t('topics.comingSoon.title'),
                  desc: t('topics.comingSoon.desc'),
                  count: 0,
                  color: 'bg-cream-dark text-text-light',
                },
              ].map((topic) => (
                <div key={topic.title} className="bg-white rounded-2xl p-7 border border-border hover:border-border-hover hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[.6rem] font-bold uppercase tracking-[.5px] py-0.5 px-2 rounded-md ${topic.color}`}>
                      {topic.title}
                    </span>
                    {topic.count > 0 && (
                      <span className="text-[.72rem] font-semibold text-text-light">
                        {t('topics.articleCount', { count: topic.count })}
                      </span>
                    )}
                  </div>
                  <p className="text-text-mid text-[.82rem] leading-[1.7]">{topic.desc}</p>
                </div>
              ))}
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
