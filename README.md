# FirstReply Instant

Build a landing page for "FirstReply", a free tool that gets an automatic email reply sent to every new lead within 60 seconds, for remodeling and contracting companies.

FOLLOW THIS CONVERSION FRAMEWORK FOR EVERY DECISION:
- Headline must state a clear outcome, not a vague benefit. It should stop a remodeling company owner mid-scroll.
- Subheadline clarifies and adds context to the headline's promise.
- The demo/proof element below the hero must be actual PROOF of the headline, showing the outcome happening, not a generic stock photo or abstract illustration.
- The CTA button text should say what they get. Supporting microcopy underneath the button should say how (effort, time required), nothing else.
- The form should collect the fewest fields needed for a qualified lead. Cap it at 4 to 5 fields, no more.
- Directly above the form, include a single line answering "why should I give you my email," not vague trust language.
- Include exactly 3 objection-handling bullets below the fold, ordered from the single biggest objection to the smallest, written as question and answer, short and direct.
- Skip heavy social proof. This is an early-stage offer with no case studies yet, so do not fabricate testimonials, review counts, or client logos.
- Keep generous whitespace. Every element on the page should point toward the one action: filling out the form.
- Keep the page short: hero, proof/demo, how it works, objections, form, footer. No extra sections.
- Fully responsive and mobile-first. No large images, use CSS only for any graphics.
- Include a short legal/trust line near the form: no spam, no sharing of info, can unsubscribe anytime.
- Do not use dashes or em dashes anywhere in the copy. Use periods or commas instead.

AUDIENCE: Remodeling and contracting company owners. Trade-industry, no-nonsense, blue-collar-adjacent business buyers, skeptical of tech gimmicks and slick SaaS marketing, but responsive to directness, speed, and proof over polish.

VISUAL DIRECTION: Extremely clean and plain. White background throughout, no dark sections anywhere. Black or dark charcoal text (#14161A) for headlines, softer gray (#5B5F66) for body copy. One single accent used sparingly: a diagonal gradient from periwinkle blue (#4C6FE8) to teal green (#22C7A9), taken from the brand's hummingbird logo mark. This gradient is used only on the primary button, the highlighted phrase in the headline, the countdown number in the demo, and the small numbered circles in the how it works section. Nothing else on the page has color. No shadows, no borders thicker than 1px, no bold poster fonts, no dark or black sections, no glow effects, no illustrations or icons beyond simple numbered circles. Rounded corners around 8 to 12px on cards and buttons. Font: Inter, for everything, with weight and size doing all the hierarchy work rather than multiple typefaces.

PAGE STRUCTURE, IN ORDER:

1. TOP BAR: centered wordmark "FirstReply" with "Reply" rendered in the blue to teal gradient as a text fill.

2. HERO (white background, centered, generous vertical padding):
- Headline: "Every new lead gets a reply in 60 seconds." with "in 60 seconds" styled in the blue to teal gradient text fill.
- Subheadline: "We connect an automatic email reply to your lead form, free. Every new inquiry gets answered in under 60 seconds, starting today."
- Primary button (gradient fill, white text, rounded corners): "Get my free instant reply"
- Small gray microcopy under the button: "Takes 2 minutes. No card, no commitment."

3. LIVE DEMO (a single bordered card, white background, rounded corners, sits right below the CTA):
- Small centered label above the title: "Live example"
- Centered title: "A lead submits a form right now"
- Inside the card, two elements side by side (stacked on mobile): 
  a) A countdown number that animates from 60 down to 0 over about 2 seconds on page load, rendered large and bold in the blue to teal gradient text fill, with a small gray label underneath reading "seconds until reply", and a status line below that that reads "Reply sent." in a small green, once it hits zero. Respect prefers-reduced-motion by skipping straight to the end state.
  b) A simple light gray card that fades in once the countdown finishes, containing: a from/to line ("Anchor Remodeling" to "mike@sorensen..."), a bold subject line "Your kitchen remodel, 220 sq ft, hoping to start in spring", a reply body: "Hi Mike, thanks for the details on the kitchen. Sounds like a great project for spring. I saw you're hoping to redo the layout and add an island. Someone from our team will call you today to talk through it. Does afternoon or evening work better?", and a small green "Delivered" line at the bottom.

4. HOW IT WORKS (white background, 3 columns on desktop, stacked on mobile, each with a small gradient-filled numbered circle above the text):
- 1: Tell us where leads come in. "Your website form, a Facebook lead ad, or both."
- 2: We connect the reply. "Free, no contract, nothing for you to build."
- 3: Your next lead gets answered. "In seconds. You'll see it happen live."

5. OBJECTIONS (simple stacked list with thin gray divider lines between each, no numbers or icons, ordered biggest objection first):
- Is this actually free? "Yes. No card, no contract. We do this for free while we build out the full system, and you get real value from day one either way."
- Does this replace my team? "No. It just makes sure every lead gets a fast, real reply the moment they come in. Your team still handles the estimate and the job."
- How much work is this for me? "None. We connect it to your lead form by hand. You just tell us where your leads come from and we handle the rest."

6. FORM SECTION (white background):
- Heading: "Claim your free install"
- One line directly above the form: "We only need your email to set this up and confirm it's live. No newsletters, no other outreach."
- Light gray form card with a thin border and rounded corners, containing exactly 4 fields: Name, Business name, Email address, and a dropdown "Where do your leads come from?" (Website form / Facebook Lead Ads / Both / Something else)
- Full-width gradient-filled submit button: "Get my free instant reply"
- On submit, show a small bold green confirmation line: "Got it. Check your email, we'll reach out within 24 hours to connect this to your lead form."
- Two short gray fine-print lines under the form: "What happens next: we'll email you within 24 hours to set this up on your actual lead form together. No cost, no contract." and "We never sell or share your information. Unsubscribe from any email anytime."

7. FOOTER: thin top border, small centered gray text: "FirstReply: instant lead engagement for remodeling companies"

TECHNICAL REQUIREMENTS:
- Fully responsive, mobile-first, test down to 375px width
- Visible keyboard focus states using the blue accent color
- No images, only CSS and web fonts, so the page loads fast
- Form field names should be simple and clean (name, business, email, source) so it's easy to later wire to a webhook or CRM
- No dashes or em dashes anywhere in copy
- No fabricated testimonials, logos, or review counts anywhere on the page

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://first-reply-instant.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/dd187a41-6c43-442c-8bc6-0b1760ce4200).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
