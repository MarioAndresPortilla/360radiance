import { cn } from '@/lib/utils';
import { IconWhatsApp } from '@/components/icons/Icons';

type ButtonVariant = 'teal' | 'gold' | 'outline-teal' | 'whatsapp';

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
  teal: 'bg-teal text-white hover:bg-teal-dark hover:-translate-y-px hover:shadow-md',
  gold: 'bg-gold text-white hover:bg-gold-dark hover:-translate-y-0.5',
  'outline-teal': 'bg-transparent border-[1.5px] border-teal text-teal hover:bg-teal hover:text-white',
  whatsapp: 'bg-whatsapp text-white hover:bg-whatsapp-dark',
};

export function Button({ variant, href, children, className, type = 'button', external, onClick }: ButtonProps) {
  const base = 'inline-flex items-center gap-1.5 rounded-lg font-semibold text-[.82rem] px-5 py-2.5 transition-all duration-250 cursor-pointer font-sans';

  if (href) {
    return (
      <a
        href={href}
        className={cn(base, variantStyles[variant], className)}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {variant === 'whatsapp' && <IconWhatsApp size={16} className="fill-white" />}
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={cn(base, variantStyles[variant], className)} onClick={onClick}>
      {children}
    </button>
  );
}
