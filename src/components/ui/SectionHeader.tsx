interface SectionHeaderProps {
  tag: string;
  title: string;
  subtitle?: string;
  id?: string;
}

export function SectionHeader({ tag, title, subtitle, id }: SectionHeaderProps) {
  return (
    <div className="text-center mb-14 max-md:mb-10">
      <span className="inline-block text-[.7rem] font-bold uppercase tracking-[2.5px] text-teal mb-4 bg-teal-pale/70 px-5 py-2 rounded-full">
        {tag}
      </span>
      <h2 id={id} className="font-serif text-[clamp(1.7rem,3.2vw,2.4rem)] mb-4 leading-[1.15]">{title}</h2>
      {subtitle && (
        <p className="text-text-mid max-w-125 mx-auto text-[.98rem] leading-[1.8]">{subtitle}</p>
      )}
    </div>
  );
}
