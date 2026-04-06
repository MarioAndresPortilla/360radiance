interface SectionHeaderProps {
  tag: string;
  title: string;
  subtitle?: string;
  id?: string;
}

export function SectionHeader({ tag, title, subtitle, id }: SectionHeaderProps) {
  return (
    <div className="text-center mb-14 max-md:mb-10">
      <span className="inline-block text-[.68rem] font-bold uppercase tracking-[2px] text-teal mb-3 bg-teal-pale px-4 py-1.5 rounded-full">
        {tag}
      </span>
      <h2 id={id} className="font-serif text-[clamp(1.6rem,3vw,2.3rem)] mb-3">{title}</h2>
      {subtitle && (
        <p className="text-text-mid max-w-130 mx-auto text-[.95rem] leading-[1.75]">{subtitle}</p>
      )}
    </div>
  );
}
