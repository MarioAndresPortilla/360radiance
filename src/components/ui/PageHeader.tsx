import { ScrollReveal } from './ScrollReveal';

interface PageHeaderProps {
  tag: string;
  title: string;
  subtitle: string;
}

export function PageHeader({ tag, title, subtitle }: PageHeaderProps) {
  return (
    <section className="bg-cream py-20 max-md:py-14">
      <div className="container-site text-center">
        <ScrollReveal>
          <span className="inline-block text-[.68rem] font-bold uppercase tracking-[2px] text-navy mb-4 bg-navy-pale px-4 py-1.5 rounded-full">
            {tag}
          </span>
          <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.15] mb-5">{title}</h1>
          <p className="text-text-mid max-w-130 mx-auto text-[1rem] leading-[1.8]">{subtitle}</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
