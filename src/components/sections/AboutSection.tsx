import Image from 'next/image';
import { CREDENTIALS } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Icon, type IconName } from '@/components/icons/Icons';
import { IconDiploma } from '@/components/icons/Icons';

export function AboutSection() {
  return (
    <section className="py-24 max-md:py-16" id="about" aria-labelledby="about-heading">
      <div className="container-site">
        <div className="grid grid-cols-[1fr_1.4fr] gap-20 max-lg:gap-12 items-center max-lg:grid-cols-1">
          <ScrollReveal>
            <div className="relative max-lg:max-w-75 max-lg:mx-auto">
              <div className="rounded-2xl overflow-hidden aspect-3/4 shadow-md relative">
                <Image
                  src="/images/marta-nazzar.jpg"
                  alt="Marta Nazzar, Licensed Paramedical Aesthetician"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 300px, 35vw"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-white rounded-xl py-4 px-5 shadow-lg flex items-center gap-3">
                <div className="w-9 h-9 bg-gold-pale rounded-2.5 flex items-center justify-center" aria-hidden="true">
                  <IconDiploma size={18} className="text-gold-dark" />
                </div>
                <div className="text-[.75rem] font-semibold text-teal">
                  25+ Years
                  <span className="block font-normal text-text-light text-[.65rem] mt-0.5">Medical Experience</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div>
              <span className="inline-block text-[.68rem] font-bold uppercase tracking-[2px] text-teal mb-4 bg-teal-pale px-4 py-1.5 rounded-full">
                Meet Marta Nazzar
              </span>
              <h2 id="about-heading" className="font-serif text-[1.9rem] mb-5 leading-[1.2]">
                The Science Behind Your <em className="text-teal not-italic">Best Skin</em>
              </h2>
              <p className="text-text-mid leading-[1.85] mb-5 text-[.92rem]">
                Marta Nazzar is a licensed Paramedical Aesthetician with a B.S. in Biology and A.S. in Medical &amp; Laboratory Studies from Florida College of Natural Health. Her 25+ years of medical background allow her to merge clinical precision with aesthetic artistry.
              </p>
              <p className="text-text-mid leading-[1.85] mb-5 text-[.92rem]">
                Certified under renowned acne expert Dr. James E. Fulton through the Face Reality program, Marta evaluates diverse skin types to determine the best solution for each individual. She created the Radiance Skin Care Line — botanical formulas free of toxins, parabens, and sulfates.
              </p>
              <div className="flex items-center gap-4 mt-6 mb-6">
                <Image
                  src="/images/ascp-member.png"
                  alt="Associated Skin Care Professionals Member"
                  width={100}
                  height={60}
                  className="object-contain"
                />
              </div>
              <ul className="flex flex-wrap gap-3 list-none" aria-label="Professional credentials">
                {CREDENTIALS.map((cred) => (
                  <li key={cred.label}>
                    <span className="bg-teal-pale text-teal-dark py-2 px-4 rounded-lg text-[.72rem] font-semibold flex items-center gap-2">
                      <Icon name={cred.icon as IconName} size={14} className="text-teal" aria-hidden="true" />
                      {cred.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
