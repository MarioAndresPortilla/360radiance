'use client';

import { useState } from 'react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-navy-pale rounded-2xl p-8 text-center" role="status" aria-live="polite">
        <p className="font-serif text-[1.2rem] text-navy mb-2">You&apos;re in!</p>
        <p className="text-text-mid text-[.88rem]">
          Check your inbox for a welcome email. Your first article arrives next week.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 max-w-120 mx-auto max-md:flex-col" aria-label="Subscribe to newsletter">
      <div className="flex-1">
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="w-full py-3.5 px-5 rounded-xl border border-border bg-white text-text text-[.88rem] outline-none focus:border-navy focus:ring-2 focus:ring-navy/20 transition-all font-sans"
        />
      </div>
      <button
        type="submit"
        className="bg-navy text-white py-3.5 px-8 rounded-xl font-semibold text-[.88rem] border-none cursor-pointer transition-all hover:bg-navy-deep hover:-translate-y-px hover:shadow-md font-sans shrink-0"
      >
        Subscribe
      </button>
    </form>
  );
}
