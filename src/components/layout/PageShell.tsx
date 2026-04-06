import { AnnouncementBar } from './AnnouncementBar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingButtons } from './FloatingButtons';

interface PageShellProps {
  children: React.ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main id="main-content">
        {children}
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
