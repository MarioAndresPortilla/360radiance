import { BUSINESS } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';

const INSTAGRAM_POSTS = [
  { id: 1, caption: 'Acne transformation — 12-week program results', tag: 'Before & After' },
  { id: 2, caption: 'Glass ampule serum application technique', tag: 'Treatment' },
  { id: 3, caption: 'Radiance Skin Care Line — new arrivals', tag: 'Products' },
  { id: 4, caption: 'HydraFacial glow — instant results', tag: 'Treatment' },
  { id: 5, caption: 'Client testimonial — rosacea cleared in 4 weeks', tag: 'Results' },
  { id: 6, caption: 'Behind the scenes at 360 Radiance', tag: 'Clinic Life' },
];

export function InstagramSection() {
  return (
    <section className="py-24 max-md:py-16" aria-labelledby="instagram-heading">
      <div className="max-w-300 mx-auto px-8 max-md:px-5">
        <ScrollReveal>
          <SectionHeader
            id="instagram-heading"
            tag="Follow Us"
            title="See Our Work on Instagram"
            subtitle="Real treatments, real results, real clients. Follow @360radianceinc for daily skincare science and transformations."
          />
        </ScrollReveal>

        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-2 max-md:gap-3">
          {INSTAGRAM_POSTS.map((post) => (
            <ScrollReveal key={post.id}>
              <a
                href={BUSINESS.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative rounded-2xl overflow-hidden aspect-square bg-linear-to-br from-teal-pale to-cream border border-border hover:border-teal transition-all hover:shadow-lg no-underline"
                aria-label={`Instagram post: ${post.caption}`}
              >
                {/* Placeholder gradient — replace with real IG embeds or images */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                  <div className="font-serif text-[2.5rem] text-teal/10" aria-hidden="true">
                    {String(post.id).padStart(2, '0')}
                  </div>
                  <span className="text-[.6rem] font-bold uppercase tracking-[1px] text-teal bg-white/80 py-1 px-2.5 rounded-md">
                    {post.tag}
                  </span>
                  <p className="text-[.78rem] text-text-mid leading-[1.5] max-w-40">{post.caption}</p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-teal/0 group-hover:bg-teal/80 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="text-white text-center">
                    <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="5" />
                      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                    </svg>
                    <span className="text-[.75rem] font-semibold">View on Instagram</span>
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
            className="inline-flex items-center gap-2.5 bg-transparent border-[1.5px] border-teal text-teal rounded-xl font-semibold text-[.88rem] px-7 py-3.5 transition-all hover:bg-teal hover:text-white no-underline"
          >
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
            Follow @360radianceinc
          </a>
        </div>
      </div>
    </section>
  );
}
