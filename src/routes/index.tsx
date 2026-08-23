import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

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

function useCountdown() {
  const [value, setValue] = useState(60);
  const [done, setDone] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setValue(0);
      setDone(true);
      return;
    }

    const duration = 2000;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(60 - 60 * progress));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return { value, done };
}

function LeadForm({ id }: { id: string }) {
  const [sent, setSent] = useState(false);

  return (
    <div>
      <form
        className="rounded-xl border border-line bg-surface p-5 sm:p-7"
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
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
          <button type="submit" id={id} className="btn-gradient h-12 w-full rounded-lg text-base">
            Get my free instant reply
          </button>
        </div>
      </form>

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
  const { value, done } = useCountdown();

  const objections = [
    {
      q: "Is this actually free?",
      a: "Yes. No card, no contract. We do this for free while we build out the full system, and you get real value from day one either way.",
    },
    {
      q: "Does this replace my team?",
      a: "No. It just makes sure every lead gets a fast, real reply the moment they come in. Your team still handles the estimate and the job.",
    },
    {
      q: "How much work is this for me?",
      a: "None. We connect it to your lead form by hand. You just tell us where your leads come from and we handle the rest.",
    },
  ];

  const steps = [
    {
      title: "Tell us where leads come in.",
      body: "Your website form, a Facebook lead ad, or both.",
    },
    { title: "We connect the reply.", body: "Free, no contract, nothing for you to build." },
    { title: "Your next lead gets answered.", body: "In seconds. You'll see it happen live." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="py-6 text-center">
        <span className="text-lg font-semibold tracking-tight text-ink">
          First<span className="text-gradient">Reply</span>
        </span>
      </header>

      <main className="mx-auto w-full max-w-3xl px-5 pb-4">
        <section className="pt-12 pb-14 text-center sm:pt-20 sm:pb-20">
          <h1 className="mx-auto max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
            Every new lead gets a reply <span className="text-gradient">in 60 seconds.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-body sm:text-lg">
            We connect an automatic email reply to your lead form, free. Every new inquiry gets
            answered in under 60 seconds, starting today.
          </p>
          <div className="mt-9">
            <a href="#claim" className="btn-gradient inline-flex h-12 rounded-lg px-7 text-base">
              Get my free instant reply
            </a>
            <p className="mt-3 text-sm text-body">Takes 2 minutes. No card, no commitment.</p>
          </div>
        </section>

        <section className="pb-16 sm:pb-24">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-body">
            Live example
          </p>
          <h2 className="mt-3 text-center text-xl font-semibold tracking-tight text-ink">
            A lead submits a form right now
          </h2>

          <div className="mt-6 rounded-xl border border-line p-5 sm:p-8">
            <div className="grid items-center gap-8 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-10">
              <div className="text-center sm:w-32">
                <div className="text-gradient text-6xl font-semibold tabular-nums">{value}</div>
                <p className="mt-2 text-sm text-body">seconds until reply</p>
                <p
                  className={`mt-2 text-sm font-medium text-success transition-opacity duration-500 ${
                    done ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Reply sent.
                </p>
              </div>

              <div
                className={`min-w-0 rounded-xl bg-surface p-4 transition-opacity duration-700 sm:p-5 ${
                  done ? "opacity-100" : "opacity-0"
                }`}
              >
                <p className="truncate text-xs text-body">
                  Anchor Remodeling to mike@sorensen...
                </p>
                <p className="mt-2 text-sm font-semibold text-ink">
                  Your kitchen remodel, 220 sq ft, hoping to start in spring
                </p>
                <p className="mt-3 text-sm leading-relaxed text-body">
                  Hi Mike, thanks for the details on the kitchen. Sounds like a great project for
                  spring. I saw you're hoping to redo the layout and add an island. Someone from our
                  team will call you today to talk through it. Does afternoon or evening work better?
                </p>
                <p className="mt-4 text-xs font-medium text-success">Delivered</p>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-16 sm:pb-24">
          <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
            {steps.map((step, i) => (
              <div key={step.title}>
                <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient text-sm font-semibold text-white">
                  {i + 1}
                </div>
                <h3 className="mt-4 text-base font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-16 sm:pb-24">
          <div className="divide-y divide-line border-t border-line">
            {objections.map((o) => (
              <div key={o.q} className="py-6">
                <h3 className="text-base font-semibold text-ink">{o.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{o.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="claim" className="pb-20 sm:pb-28">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Claim your free install
          </h2>
          <p className="mx-auto mt-3 mb-6 max-w-xl text-center text-sm leading-relaxed text-body">
            We only need your email to set this up and confirm it's live. No newsletters, no other
            outreach.
          </p>
          <div className="mx-auto max-w-lg">
            <LeadForm id="submit-lead" />
          </div>
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
