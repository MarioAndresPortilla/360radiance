import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS, BUSINESS } from '@/lib/constants';
import { PageShell } from '@/components/layout/PageShell';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 2);

  return (
    <PageShell>
      {/* Article header */}
      <section className="bg-cream py-16 max-md:py-10">
        <div className="container-site">
          <ScrollReveal>
            <div className="max-w-175 mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <Link href="/blog" className="text-[.82rem] text-text-light no-underline hover:text-teal transition-colors">&larr; All Articles</Link>
                <span className="text-text-faint">/</span>
                <span className="text-[.68rem] font-bold uppercase tracking-[1px] text-teal bg-teal-pale py-1 px-3 rounded-md">{post.category}</span>
              </div>
              <h1 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.15] mb-5">{post.title}</h1>
              <div className="flex items-center gap-4 text-[.82rem] text-text-light">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </time>
                <span aria-hidden="true">&middot;</span>
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Article image */}
      <section className="bg-white">
        <div className="container-site">
          <ScrollReveal>
            <div className="max-w-175 mx-auto -mt-2">
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src={`/images/blog/${post.slug}.jpg`}
                  alt={post.title}
                  width={800}
                  height={450}
                  className="w-full h-auto"
                  priority
                  sizes="(max-width: 768px) 100vw, 700px"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Article body */}
      <section className="py-16 max-md:py-10">
        <div className="container-site">
          <ScrollReveal>
            <article className="max-w-160 mx-auto">
              <p className="text-[1.05rem] text-text-mid leading-[2] mb-8 font-medium">
                {post.excerpt}
              </p>
              <div className="prose-placeholder space-y-6">
                <p className="text-[.95rem] text-text-mid leading-[1.9]">
                  This article is coming soon. We&apos;re working with Marta to ensure every piece of content is clinically accurate, evidence-based, and genuinely helpful for your skincare journey.
                </p>
                <p className="text-[.95rem] text-text-mid leading-[1.9]">
                  In the meantime, if you have questions about {post.category.toLowerCase()}, book a consultation and Marta will address your concerns directly with 25+ years of clinical expertise.
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2.5 mt-10 pt-8 border-t border-border">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-[.72rem] font-semibold text-text-mid bg-cream py-1.5 px-3.5 rounded-lg">
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          </ScrollReveal>
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="py-16 bg-cream" aria-labelledby="related-heading">
          <div className="container-site">
            <h2 id="related-heading" className="font-serif text-[1.4rem] text-center mb-8">More in {post.category}</h2>
            <div className="grid grid-cols-2 gap-6 max-w-175 mx-auto max-md:grid-cols-1">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="group no-underline">
                  <article className="bg-white rounded-2xl border border-border overflow-hidden hover:border-teal hover:shadow-md transition-all">
                    <div className="aspect-video relative">
                      <Image
                        src={`/images/blog/${r.slug}.jpg`}
                        alt={r.title}
                        fill
                        className="object-cover"
                        sizes="350px"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-[1rem] group-hover:text-teal transition-colors leading-[1.3]">{r.title}</h3>
                      <p className="text-[.78rem] text-text-light mt-2">{r.readTime} min read</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner
        heading="Have Questions About Your Skin?"
        subtitle="Book a free consultation and get expert answers backed by 25+ years of clinical experience."
      />
    </PageShell>
  );
}
