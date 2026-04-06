import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/lib/constants';
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
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      images: [`/images/blog/${post.slug}.jpg`],
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 2);

  return (
    <PageShell>
      {/* Header */}
      <section className="bg-cream py-16 max-md:py-10">
        <div className="container-site">
          <div className="max-w-175 mx-auto">
            <nav className="flex items-center gap-2.5 mb-8 text-[.82rem]" aria-label="Breadcrumb">
              <Link href="/blog" className="text-text-light no-underline hover:text-teal transition-colors">&larr; All Articles</Link>
              <span className="text-text-faint">/</span>
              <span className="font-bold uppercase tracking-[1px] text-teal bg-teal-pale py-1 px-3 rounded-lg text-[.68rem]">{post.category}</span>
            </nav>
            <h1 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.15] mb-6">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-[.84rem] text-text-light">
              <span>By Marta Nazzar</span>
              <span aria-hidden="true">&middot;</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </time>
              <span aria-hidden="true">&middot;</span>
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Image */}
      <div className="container-site">
        <div className="max-w-175 mx-auto">
          <div className="rounded-2xl overflow-hidden -mt-2 mb-12">
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
      </div>

      {/* Article content */}
      <section className="pb-20 max-md:pb-14">
        <div className="container-site">
          <article className="max-w-155 mx-auto">
            {/* Lead paragraph */}
            <p className="text-[1.1rem] text-text leading-loose mb-10 font-medium">
              {post.excerpt}
            </p>

            {/* Full content sections */}
            {post.content.map((section, i) => (
              <div key={i} className="mb-10">
                {section.heading && (
                  <h2 className="font-serif text-[1.4rem] mb-4 mt-12 first:mt-0">{section.heading}</h2>
                )}
                {section.body.map((paragraph, j) => (
                  <p key={j} className="text-[.98rem] text-text-mid leading-loose mb-5 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}

            {/* CTA within article */}
            {post.cta && (
              <div className="bg-teal-pale rounded-2xl p-8 mt-12 text-center">
                <p className="text-[.98rem] text-text leading-[1.8] mb-5">{post.cta}</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 bg-teal text-white rounded-xl font-semibold text-[.9rem] px-7 py-3.5 transition-all hover:bg-teal-dark hover:-translate-y-px hover:shadow-md no-underline"
                >
                  Book Your Consultation &rarr;
                </Link>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2.5 mt-12 pt-8 border-t border-border">
              {post.tags.map((tag) => (
                <span key={tag} className="text-[.75rem] font-semibold text-text-mid bg-cream py-2 px-4 rounded-xl">
                  #{tag}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 bg-cream" aria-labelledby="related-heading">
          <div className="container-site">
            <h2 id="related-heading" className="font-serif text-[1.4rem] text-center mb-10">More in {post.category}</h2>
            <div className="grid grid-cols-2 gap-7 max-w-175 mx-auto max-md:grid-cols-1">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="group no-underline">
                  <article className="bg-white rounded-2xl border border-border overflow-hidden hover:border-teal hover:shadow-md transition-all">
                    <div className="aspect-video relative overflow-hidden">
                      <Image
                        src={`/images/blog/${r.slug}.jpg`}
                        alt={r.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="350px"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-[1.05rem] group-hover:text-teal transition-colors leading-[1.3]">{r.title}</h3>
                      <p className="text-[.8rem] text-text-light mt-2">{r.readTime} min read</p>
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
        subtitle="Book a consultation and get expert answers backed by 25+ years of clinical experience."
      />
    </PageShell>
  );
}
