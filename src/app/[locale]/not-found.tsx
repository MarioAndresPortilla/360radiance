import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center px-6">
        <h1 className="font-serif text-[4rem] text-teal mb-4">404</h1>
        <h2 className="font-serif text-2xl mb-3">Page Not Found</h2>
        <p className="text-text-mid text-[.95rem] leading-[1.7] max-w-100 mx-auto mb-8">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to exploring our skincare services.
        </p>
        <Button variant="teal" href="/">
          Back to Home
        </Button>
      </div>
    </main>
  );
}
