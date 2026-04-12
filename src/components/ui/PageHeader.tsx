import { ScrollReveal } from './ScrollReveal';

interface PageHeaderProps {
  tag: string;
  title: string;
  subtitle: string;
}

export function PageHeader({ tag, title, subtitle }: PageHeaderProps) {
  return (
    <section className="bg-white py-20 max-md:py-14">
      <div className="container-site text-center">
        <ScrollReveal>
          <span className="inline-block text-[.65rem] font-bold uppercase tracking-[2.5px] text-navy mb-4 bg-navy-pale px-5 py-2 rounded-full">
            {tag}
          </span>
          <h1 className="font-serif text-[clamp(2.2rem,4.5vw,3.4rem)] leading-[1.12] mb-5">{title}</h1>
          <p className="text-text-mid max-w-130 mx-auto text-[1.02rem] leading-[1.8]">{subtitle}</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
