import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import { IconWhatsApp } from '@/components/icons/Icons';

type ButtonVariant = 'navy' | 'gold' | 'outline-navy' | 'whatsapp';

interface ButtonProps {
  variant: ButtonVariant;
  href?: string;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  external?: boolean;
  onClick?: () => void;
}

const variantStyles: Record<ButtonVariant, string> = {
  navy: 'bg-navy text-white hover:bg-navy-deep hover:-translate-y-px hover:shadow-md',
  gold: 'bg-gold text-navy hover:bg-gold-light hover:-translate-y-0.5',
  'outline-navy': 'bg-transparent border-[1.5px] border-navy text-navy hover:bg-navy hover:text-white',
  whatsapp: 'bg-whatsapp text-white hover:bg-whatsapp-dark',
};

const base = 'inline-flex items-center gap-1.5 rounded-lg font-semibold text-[.82rem] px-5 py-2.5 transition-all duration-250 cursor-pointer font-sans';

export function Button({ variant, href, children, className, type = 'button', external, onClick }: ButtonProps) {
  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={cn(base, variantStyles[variant], className)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {variant === 'whatsapp' && <IconWhatsApp size={16} className="fill-white" />}
          {children}
        </a>
      );
    }
    return (
      <Link href={href as '/contact' | '/services' | '/results' | '/about' | '/blog' | '/products' | '/reviews' | '/'} className={cn(base, variantStyles[variant], className)}>
        {variant === 'whatsapp' && <IconWhatsApp size={16} className="fill-white" />}
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cn(base, variantStyles[variant], className)} onClick={onClick}>
      {children}
    </button>
  );
}
