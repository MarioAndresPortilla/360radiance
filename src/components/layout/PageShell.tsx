import { AnnouncementBar } from './AnnouncementBar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingButtons } from './FloatingButtons';
import { CartProvider } from '@/lib/cart';
import { CartDrawer } from '@/components/cart/CartDrawer';

interface PageShellProps {
  children: React.ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  // Read the Stripe key on the server. The boolean (NOT the key itself) is
  // passed down to the client-side CartProvider so the cart UI knows whether
  // to render. When the env var is missing, every cart surface (header
  // button, "Add to cart" CTA, drawer) hides itself — the buy flow doesn't
  // appear in prod until Marta sets the key in Vercel.
  const stripeEnabled = !!process.env.STRIPE_SECRET_KEY;

  return (
    <CartProvider stripeEnabled={stripeEnabled}>
      <AnnouncementBar />
      <Navbar />
      <main id="main-content">
        {children}
      </main>
      <Footer />
      <FloatingButtons />
      <CartDrawer />
    </CartProvider>
  );
}
