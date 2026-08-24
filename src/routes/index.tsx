import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { trackMetaCustomEvent, trackMetaEvent } from "../lib/meta-pixel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FirstReply: reply to every new lead in 60 seconds" },
      {
        name: "description",
        content:
          "Free instant email reply for remodeling and contracting companies. Every new lead gets answered in under 60 seconds, starting today.",
      },
      { property: "og:title", content: "FirstReply: reply to every new lead in 60 seconds" },
      {
        property: "og:description",
        content:
          "We connect an automatic email reply to your lead form, free. Every new inquiry gets answered in under 60 seconds.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WEBHOOK_URL = "https://n8n.piplineloop.com/webhook/new-signup";

function LeadForm({ id }: { id: string }) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div>
      <form
        className="rounded-xl border border-line bg-surface p-5 sm:p-7"
        onSubmit={async (e) => {
          e.preventDefault();
          setError(null);

          if (isSubmitting) return;

          const form = e.currentTarget;
          const formData = new FormData(form);
          const payload = {
            name: String(formData.get("name") ?? "").trim(),
            business: String(formData.get("business") ?? "").trim(),
            email: String(formData.get("email") ?? "").trim(),
            source: String(formData.get("source") ?? "").trim(),
          };

          setIsSubmitting(true);

          try {
            const response = await fetch(WEBHOOK_URL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            });

            if (!response.ok) {
              throw new Error(`Request failed with status ${response.status}`);
            }

            trackMetaEvent("Lead", {
              content_name: "FirstReply signup",
              value: 1,
              currency: "USD",
            });

            form.reset();
            setSent(true);
            sessionStorage.setItem("firstreply-activated", "true");
            trackMetaCustomEvent("FirstReplyActivated", {
              content_name: "FirstReply signup activated",
            });
          } catch {
            setSent(false);
            setError("Something went wrong while sending your details. Please try again.");
          } finally {
            setIsSubmitting(false);
          }
        }}
      >
        <div className="grid gap-4">
          <label className="grid gap-2 text-sm text-ink">
            Name
            <input
              name="name"
              required
              autoComplete="name"
              className="h-11 rounded-lg border border-line bg-background px-3 text-base text-ink outline-none placeholder:text-muted-foreground focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/40"
              placeholder="Mike Sorensen"
            />
          </label>
          <label className="grid gap-2 text-sm text-ink">
            Business name
            <input
              name="business"
              required
              autoComplete="organization"
              className="h-11 rounded-lg border border-line bg-background px-3 text-base text-ink outline-none placeholder:text-muted-foreground focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/40"
              placeholder="Anchor Remodeling"
            />
          </label>
          <label className="grid gap-2 text-sm text-ink">
            Email address
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="h-11 rounded-lg border border-line bg-background px-3 text-base text-ink outline-none placeholder:text-muted-foreground focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/40"
              placeholder="mike@anchorremodeling.com"
            />
          </label>
          <label className="grid gap-2 text-sm text-ink">
            Where do your leads come from?
            <select
              name="source"
              required
              defaultValue="Website form"
              className="h-11 rounded-lg border border-line bg-background px-3 text-base text-ink outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/40"
            >
              <option>Website form</option>
              <option>Facebook Lead Ads</option>
              <option>Both</option>
              <option>Something else</option>
            </select>
          </label>
          <button
            type="submit"
            id={id}
            disabled={isSubmitting}
            className="btn-gradient h-12 w-full rounded-lg text-base disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Sending..." : "Get my free instant reply"}
          </button>
        </div>
      </form>

      {error ? <p className="mt-4 text-sm font-medium text-red-600">{error}</p> : null}

      {sent ? (
        <p className="mt-4 text-sm font-semibold text-success">
          Got it. Check your email, we'll reach out within 24 hours to connect this to your lead
          form.
        </p>
      ) : null}

      <p className="mt-5 text-sm leading-relaxed text-body">
        What happens next: we'll email you within 24 hours to set this up on your actual lead form
        together. No cost, no contract.
      </p>
      <p className="mt-2 text-sm leading-relaxed text-body">
        We never sell or share your information. Unsubscribe from any email anytime.
      </p>
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <header className="py-6 text-center">
        <span className="text-lg font-semibold tracking-tight text-ink">
          First<span className="text-gradient">Reply</span>
        </span>
      </header>

      <main className="mx-auto w-full max-w-3xl px-5 pb-4">
        <section className="pt-10 pb-14 text-center sm:pt-16 sm:pb-16">
          <p className="text-sm font-semibold text-gradient">FOR REMODELING & CONTRACTING COMPANIES</p>
          <h1 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
            Stop losing new leads to <span className="text-gradient">slow follow-up.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-body sm:text-lg">
            Give every website or Facebook lead a helpful reply in 60 seconds without changing
            how your team handles estimates.
          </p>
          <div className="mt-9">
            <a href="#claim" className="btn-gradient inline-flex h-12 rounded-lg px-7 text-base">
              Get my free 60-second reply
            </a>
            <p className="mt-3 text-sm text-body">We connect it to your lead form. No card or commitment.</p>
          </div>
        </section>

        <section className="pb-14 sm:pb-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-body">The outcome</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Turn a form fill into a real conversation.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-body">
              A fast, helpful email lands in their inbox while your business is still top of mind.
            </p>
          </div>
          <div className="mx-auto mt-7 max-w-xl rounded-2xl border border-line bg-surface p-3 text-left shadow-sm sm:p-5">
            <div className="flex items-center gap-3 border-b border-line px-2 pb-4">
              <div className="grid size-8 place-items-center rounded-lg bg-accent-blue text-sm font-bold text-white">✉</div>
              <div>
                <p className="text-sm font-semibold text-ink">Inbox</p>
                <p className="text-xs text-body">Anchor Remodeling</p>
              </div>
            </div>
            <div className="px-2 py-4">
              <div className="rounded-lg border border-line bg-background p-4">
                <div className="flex items-start justify-between gap-3 text-xs">
                  <div className="min-w-0">
                    <p className="font-semibold text-ink">Anchor Remodeling <span className="font-normal text-body">&lt;hello@anchorremodeling.com&gt;</span></p>
                    <p className="mt-1 text-body">to Mike Sorensen</p>
                  </div>
                  <span className="shrink-0 text-success">Delivered</span>
                </div>
                <p className="mt-5 text-sm font-semibold text-ink">Re: Your kitchen remodel project</p>
                <div className="mt-4 text-sm leading-relaxed text-body">
                  <p>Hi Mike,</p>
                  <p className="mt-3">Thanks for reaching out about your spring kitchen remodel. A new layout and island sound like a great fit for the space.</p>
                  <p className="mt-3">Someone from our team will call today to talk through your project. Is afternoon or evening better?</p>
                  <p className="mt-3">Anchor Remodeling</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-success/25 bg-background px-4 py-3">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[color:var(--success)] text-sm font-bold text-white">✓</span>
              <p className="text-sm font-medium text-ink">Sent automatically, within 60 seconds of the inquiry.</p>
            </div>
          </div>
        </section>

        <section id="claim" className="pb-20 sm:pb-28">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Claim your free install
          </h2>
          <p className="mx-auto mt-3 mb-6 max-w-xl text-center text-sm leading-relaxed text-body">
            Tell us where your leads come from. We’ll connect the reply and confirm when your next lead is covered.
          </p>
          <div className="mx-auto max-w-lg">
            <LeadForm id="submit-lead" />
          </div>
          <ul className="mx-auto mt-7 grid max-w-lg gap-3 text-sm leading-relaxed text-body">
            <li><span className="mr-2 font-semibold text-success">✓</span>Free to install. No card or contract.</li>
            <li><span className="mr-2 font-semibold text-success">✓</span>Your team still handles every estimate and job</li>
            <li><span className="mr-2 font-semibold text-success">✓</span>Nothing to build; we connect it for you</li>
          </ul>
        </section>
      </main>

      <footer className="border-t border-line py-7 text-center">
        <p className="px-5 text-sm text-body">
          FirstReply: instant lead engagement for remodeling companies
        </p>
      </footer>
    </div>
  );
}
