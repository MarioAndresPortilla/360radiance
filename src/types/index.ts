export interface Service {
  icon: string;
  title: string;
  description: string;
  tag: string;
  featured?: boolean;
}

export interface Testimonial {
  text: string;
  name: string;
  condition: string;
  avatarColor: string;
  initial: string;
}

export interface WhyCard {
  icon: string;
  iconTheme: 'navy' | 'gold';
  title: string;
  description: string;
}

export interface Credential {
  icon: string;
  label: string;
}

export interface JourneyStep {
  number: string;
  weekLabel: string;
  title: string;
  description: string;
  progress: number;
}

export interface ProductFeature {
  text: string;
}

export interface HourEntry {
  day: string;
  time: string;
  closed: boolean;
}

export interface TrustItem {
  icon: string;
  label: string;
}
