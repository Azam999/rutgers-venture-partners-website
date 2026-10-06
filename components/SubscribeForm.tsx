import { MAILCHIMP } from "@/content/site";

// Plain HTML form that posts straight to Mailchimp in a new tab, where the subscriber
// confirms. No JavaScript, no API route. The endpoint values live in content/site.ts.
export function SubscribeForm({ id = "subscribe" }: { id?: string }) {
  return (
    <form action={MAILCHIMP.formAction} method="post" target="_blank" className="relative">
      <label htmlFor={`${id}-email`} className="eyebrow block">
        Email address
      </label>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <input
          id={`${id}-email`}
          type="email"
          name="EMAIL"
          required
          autoComplete="email"
          placeholder="you@rutgers.edu"
          className="min-w-0 flex-1 border border-cream/20 bg-bg px-4 py-3 text-base text-cream placeholder:text-stone-dim focus-visible:border-cream"
        />
        <button type="submit" className="btn px-7 py-3 text-base">
          Subscribe
        </button>
      </div>
      <p className="mt-3 text-xs text-stone-dim">Opens Mailchimp in a new tab to confirm.</p>

      {/* Bot trap: Mailchimp rejects submissions that fill this in. It must stay in the DOM, off-screen. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-5000px" }}>
        <input type="text" name={MAILCHIMP.botTrapName} tabIndex={-1} defaultValue="" />
      </div>
    </form>
  );
}
