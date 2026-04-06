import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageShell } from '@/components/layout/PageShell';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { PageHeader } from '@/components/ui/PageHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { BLOG_POSTS } from '@/lib/constants';
import { BlogGrid } from './BlogGrid';
import { NewsletterSignup } from './NewsletterSignup';

export const metadata: Metadata = {
  title: 'Blog — Skincare Science & Expert Insights',
  description: 'Expert skincare articles from 360 Radiance. Acne science, ingredient guides, treatment breakdowns, and product education from a licensed paramedical aesthetician.',
};

const featured = BLOG_POSTS.find((p) => p.featured);
const rest = BLOG_POSTS.filter((p) => !p.featured);

export default function BlogPage() {
  return (
    <PageShell>
      <PageHeader
        tag="The Radiance Journal"
        title="Skincare Science & Expert Insights"
        subtitle="Evidence-based articles from Marta Nazzar and the 360 Radiance team. No fluff, no trends — just the science behind your best skin."
      />

      {/* Featured article */}
      {featured && (
        <section className="py-16 bg-white border-b border-border" aria-labelledby="featured-article-heading">
          <div className="container-site">
            <ScrollReveal>
              <div className="grid grid-cols-[1.3fr_1fr] gap-12 items-center max-lg:grid-cols-1">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[.6rem] font-bold uppercase tracking-[1px] text-gold-dark bg-gold-pale py-1 px-2.5 rounded-md">
                      Featured
                    </span>
                    <span className="text-[.6rem] font-bold uppercase tracking-[.5px] text-teal bg-teal-pale py-1 px-2.5 rounded-md">
                      {featured.category}
                    </span>
                  </div>
                  <h2 id="featured-article-heading" className="font-serif text-[1.8rem] leading-[1.2] mb-4">
                    <Link href={`/blog/${featured.slug}`} className="no-underline text-text hover:text-teal transition-colors">{featured.title}</Link>
                  </h2>
                  <p className="text-text-mid text-[.95rem] leading-[1.85] mb-6">{featured.excerpt}</p>
                  <Link href={`/blog/${featured.slug}`} className="text-teal text-[.88rem] font-semibold no-underline hover:underline">Read full article &rarr;</Link>
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
            <h2 id="articles-heading" className="font-serif text-[clamp(1.6rem,3vw,2.3rem)] text-center mb-2.5">All Articles</h2>
            <p className="text-text-mid max-w-130 mx-auto text-[.95rem] leading-[1.7] text-center mb-10">
              Browse by category or explore our full library of skincare science.
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
              <h2 id="newsletter-heading" className="font-serif text-[1.6rem] mb-3">Get Skincare Science in Your Inbox</h2>
              <p className="text-text-mid text-[.95rem] leading-[1.7] mb-8">
                One article per week. No spam, no sales pitches — just evidence-based insights from a clinician who&apos;s been in the field for 25+ years.
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
            <h2 id="topics-heading" className="font-serif text-[1.6rem] text-center mb-10">Explore by Topic</h2>
            <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
              {[
                {
                  title: 'Acne Science',
                  desc: 'Clinical research on what causes acne, why certain treatments work, and how to break the cycle for good.',
                  count: BLOG_POSTS.filter((p) => p.category === 'Acne Science').length,
                  color: 'bg-teal-pale text-teal',
                },
                {
                  title: 'Ingredients',
                  desc: 'Deep dives into active ingredients — what the clinical data says, how they work, and which ones are worth your money.',
                  count: BLOG_POSTS.filter((p) => p.category === 'Ingredients').length,
                  color: 'bg-gold-pale text-gold-dark',
                },
                {
                  title: 'Skin Health',
                  desc: 'Your skin barrier, microbiome, inflammation, and the fundamentals that determine whether any product or treatment will work.',
                  count: BLOG_POSTS.filter((p) => p.category === 'Skin Health').length,
                  color: 'bg-teal-pale text-teal',
                },
                {
                  title: 'Treatments',
                  desc: 'How professional treatments work at a cellular level. Microdermabrasion, chemical peels, LED therapy, and more.',
                  count: BLOG_POSTS.filter((p) => p.category === 'Treatments').length,
                  color: 'bg-gold-pale text-gold-dark',
                },
                {
                  title: 'Product Guides',
                  desc: 'How to build routines, layer products correctly, and choose formulas based on your skin type — not marketing.',
                  count: BLOG_POSTS.filter((p) => p.category === 'Product Guides').length,
                  color: 'bg-teal-pale text-teal',
                },
                {
                  title: 'Coming Soon',
                  desc: 'Nutrition & skin, hormonal health, seasonal skincare, and interviews with dermatology researchers.',
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
                        {topic.count} article{topic.count !== 1 ? 's' : ''}
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
        heading="Knowledge Is the First Step to Clear Skin"
        subtitle="Ready to put the science into practice? Book a free consultation and let Marta design a plan for your skin."
      />
    </PageShell>
  );
}
