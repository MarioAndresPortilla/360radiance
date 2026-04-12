interface SectionHeaderProps {
  tag: string;
  title: string;
  subtitle?: string;
  id?: string;
}

export function SectionHeader({ tag, title, subtitle, id }: SectionHeaderProps) {
  return (
    <div className="text-center mb-10 max-md:mb-8">
      <span className="inline-block text-[.65rem] font-bold uppercase tracking-[2.5px] text-navy mb-4 bg-navy-pale/70 px-5 py-2 rounded-full">
        {tag}
      </span>
      <h2 id={id} className="font-serif text-[clamp(1.7rem,3.2vw,2.4rem)] mb-4 leading-[1.12]">{title}</h2>
      {subtitle && (
        <p className="text-text-mid max-w-125 mx-auto text-[1.02rem] leading-[1.8]">{subtitle}</p>
      )}
    </div>
  );
}
