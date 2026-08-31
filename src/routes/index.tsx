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
            phone: String(formData.get("phone") ?? "").trim(),
            leadVolume: String(formData.get("leadVolume") ?? "").trim(),
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
              content_name: "Old leads revival signup",
              value: 1,
              currency: "USD",
            });

            form.reset();
            setSent(true);
            sessionStorage.setItem("firstreply-activated", "true");
            trackMetaCustomEvent("FirstReplyActivated", {
              content_name: "Old leads revival signup activated",
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
          <label className="grid gap-2 text-sm font-bold text-ink">
            Name
            <input
              name="name"
              required
              autoComplete="name"
              className="h-11 rounded-lg border border-line bg-background px-3 text-base text-ink outline-none placeholder:text-muted-foreground focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/40"
              placeholder="Mike Sorensen"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-ink">
            Business name
            <input
              name="business"
              required
              autoComplete="organization"
              className="h-11 rounded-lg border border-line bg-background px-3 text-base text-ink outline-none placeholder:text-muted-foreground focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/40"
              placeholder="Anchor Remodeling"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-ink">
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
          <label className="grid gap-2 text-sm font-bold text-ink">
            Phone Number
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              className="h-11 rounded-lg border border-line bg-background px-3 text-base text-ink outline-none placeholder:text-muted-foreground focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/40"
              placeholder="(555) 123-4567"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-ink">
            About how many leads have you generated in the last 90 days?
            <select
              name="leadVolume"
              required
              defaultValue=""
              className="h-11 rounded-lg border border-line bg-background px-3 text-base text-ink outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/40"
            >
              <option value="" disabled>Select an option</option>
              <option>Under 25</option>
              <option>25–50</option>
              <option>50–100</option>
              <option>100+</option>
            </select>
          </label>

          <button
            type="submit"
            id={id}
            disabled={isSubmitting}
            className="btn-gradient h-12 w-full rounded-lg text-base font-bold disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Sending..." : "REVIVE MY OLD LEADS →"}
          </button>
        </div>
      </form>

      {error ? <p className="mt-4 text-sm font-medium text-red-600">{error}</p> : null}

      {sent ? (
        <p className="mt-4 text-sm font-semibold text-success">
          Thanks - we'll review your setup and reach out soon.
        </p>
      ) : null}

      <p className="mt-4 text-center text-sm font-medium text-body">
        What happens next? We'll contact you first. We won't message any of your leads until you've approved the campaign.
      </p>

      <p className="mt-3 text-center text-sm font-medium text-body">
        No card. No setup fee. No contract.
      </p>
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto w-full max-w-3xl px-5 pb-4">
        <section className="pt-10 pb-14 text-center sm:pt-16 sm:pb-16">
          <p className="text-sm font-bold text-gradient">FOR KITCHEN & BATH REMODELERS</p>
          <h1 className="mx-auto mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
            You Already Paid For These Leads.<span className="text-gradient"> Let's See Who's Still Interested.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base font-medium leading-relaxed text-body sm:text-lg">
            We'll re-engage your last 90 days of leads and restart the conversations - free.
          </p>
          <div className="mt-9">
            <a href="#claim" className="btn-gradient inline-flex h-12 rounded-lg px-7 text-base font-bold">
              REVIVE MY OLD LEADS →
            </a>
            <p className="mt-3 text-sm font-semibold text-body">Taking 7 remodeling companies this week.</p>
          </div>
        </section>

        <section className="pb-14 sm:pb-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-body">How It Works</p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              We Do The Follow-Up. You Keep The Opportunities.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-relaxed text-body">
              Send us your old leads. We re-engage them. Interested homeowners come back to you.
            </p>
          </div>
          <div className="mx-auto mt-7 max-w-xl rounded-2xl border border-line bg-surface p-3 text-left shadow-sm sm:p-5">
            {/* Old Lead Card */}
            <div className="border-b border-line pb-4 px-2">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-body">47 DAYS AGO</p>
              <p className="mt-2 text-sm font-bold text-ink">Kitchen Remodel Inquiry</p>
              <p className="text-xs font-semibold text-body">Mike R.</p>
            </div>

            {/* Re-engagement Flow */}
            <div className="px-2 py-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-accent-blue mb-3">FOLLOW-UP SENT 47 DAYS LATER</p>
              
              {/* Contractor message */}
              <div className="mb-3 flex justify-end">
                <div className="max-w-xs rounded-lg bg-accent-blue px-3 py-2">
                  <p className="text-sm text-white">"Hey Mike, you reached out to us a while back about your kitchen remodel. Did you end up getting that project taken care of?"</p>
                </div>
              </div>

              {/* Homeowner reply */}
              <div className="mb-4 flex justify-start">
                <div className="max-w-xs rounded-lg border border-line bg-white px-3 py-2">
                  <div className="text-xs font-bold uppercase text-body mb-1">MIKE</div>
                  <p className="text-sm font-semibold text-ink">"Not yet. We got busy and put it off. We're probably looking to get started again soon."</p>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-3 rounded-xl border border-success/25 bg-background px-4 py-3">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[color:var(--success)] text-sm font-bold text-white">✓</span>
              <p className="text-sm font-medium text-ink">Conversation restarted. Back to you.</p>
            </div>
          </div>
        </section>

        <section id="claim" className="pb-20 sm:pb-28">
          <h2 className="text-center text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            Want Us To Try This With Your Old Leads?
          </h2>
          <p className="mx-auto mt-3 mb-6 max-w-xl text-center text-sm font-medium leading-relaxed text-body">
            Tell us a little about your business. We'll check whether your lead list is a good fit for the free revival.
          </p>
          <div className="mx-auto max-w-lg">
            <LeadForm id="submit-lead" />
          </div>
          <ul className="mx-auto mt-7 grid max-w-lg gap-3 text-sm font-medium leading-relaxed text-body">
            <li><span className="mr-2 font-bold text-success">✓</span>$0 cost. No card or contract.</li>
            <li><span className="mr-2 font-bold text-success">✓</span>You keep every conversation and appointment</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
