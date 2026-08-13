# Putting the site live

Written to be followed without any technical background. Roughly 20 minutes,
most of it waiting.

## What is actually happening

Right now `epaserocontracting.com` serves plain files from an Amazon S3 bucket.
That works for a fixed site, but this one needs a running server for three
things — the contact form, the lead-capture popup, and Google reviews. S3 cannot
run those, so the site moves to Vercel, which can.

**Your existing setup is not deleted at any point.** The S3 bucket stays exactly
as it is. Going live is just a change to which address the domain points at, and
it can be pointed back in minutes. See [Rollback](#rollback).

---

## Step 1 — ✅ Already done

The Vercel project **`epasero-contracting-app`** exists, is connected to
`eladmdror/EPASERO`, and deploys automatically on every push to `main`.

**Live now at → https://epasero-contracting-app.vercel.app**

Nothing public has changed: `epaserocontracting.com` still serves the old S3
site until Step 4.

> **Why nothing was live before 29 Jul 2026.** Every deployment had been failing
> with *"Vulnerable version of Next.js detected"* — Vercel refuses to release a
> build on a Next version with an open advisory. The app compiled fine each time
> and produced all 44 routes; Vercel blocked the release at the last step, so the
> failure was invisible unless you opened the build log.
>
> `next` 16.0.3 fell inside the advisory range covering a critical RCE in the
> React flight protocol, Server Actions source exposure, CSRF bypasses, cache
> poisoning, XSS and several DoS vectors. Upgrading to 16.3.0 (plus
> `npm audit fix` for a nanoid advisory) cleared it: **21 vulnerabilities → 0**,
> and the first deployment afterwards succeeded.
>
> Keep `next` current. If deployments start failing again with no obvious code
> error, check the build log for this same banner before anything else.

## Step 2 — Add the keys (do not skip)

This is the step that silently breaks things if missed. The `.env.local` file on
your Mac is deliberately never uploaded, so Vercel does not have your keys yet.

Verified against the live deployment: with no key, `POST /api/contact` returns a
500 and the visitor sees the inline error *"Something went wrong. Please try
again or contact us directly at contact@epaserocontracting.com"*. So enquiries
are **not** silently swallowed — the form fails visibly and still hands over the
email address. It is nonetheless unusable until the key is set.

`/api/reviews` degrades cleanly on its own: it returns `{"reviews":[]}` and the
Client Stories section hides itself.

In the project, go to **Settings → Environment Variables** and add:

| Name | Value | Needed for |
|---|---|---|
| `RESEND_API_KEY` | from resend.com → API Keys | **The contact form. Required.** |
| `CONTACT_FROM` | `website@epaseroadmin.com` | **Required.** |
| `GOOGLE_PLACES_API_KEY` | from Google Cloud | Reviews only — optional |
| `GOOGLE_PLACE_ID` | from Google's Place ID finder | Reviews only — optional |

> **`CONTACT_FROM` must be on a domain verified in Resend.** With an unverified
> sender, Resend refuses to deliver to anyone except the account owner and the
> form returns 502 — which is exactly how it failed the first time this was set
> up. `epaseroadmin.com` is already verified on the Epasero account, so
> `website@epaseroadmin.com` works with no DNS changes at all.
>
> Confirmed by a live send to contact@epaserocontracting.com. The enquirer's own
> address is set as `replyTo`, so replying from the inbox reaches the customer
> directly regardless of which domain sent the notification.
>
> Switching this to `@epaserocontracting.com` requires verifying that domain in
> Resend first (Domains → Add Domain → add the records it gives you).

Set each one for **Production, Preview and Development** (there are three
tick-boxes).

Then go to **Deployments**, click the most recent one, and choose **Redeploy** —
keys are only picked up on a fresh build.

> The two Google ones are genuinely optional. Without them the Client Stories
> section hides itself and nothing else is affected.

## Step 3 — Check it before anyone else sees it

Open the temporary `.vercel.app` address and go through it on a phone as well as
a computer:

- Home, Portfolio, a single project page, Contact, FAQs
- **Send yourself a test enquiry through the contact form** and confirm it
  arrives. This is the one that matters.

Send me the link at this point and I will go through every page properly.

## Step 4 — Point the domain

Only once Step 3 is genuinely clean.

Both domains are **already added in Vercel** and currently read *Invalid
Configuration* — which is correct and expected. It means Vercel is waiting for
DNS. Nothing is live until you make the change below.

**The only remaining step is in AWS Route 53.** Open the hosted zone for
`epaserocontracting.com` (its nameservers are already there —
`ns-1854.awsdns-39.co.uk` and three others) and set:

| Record | Type | Name | Value |
|---|---|---|---|
| apex | `A` | `@` (blank / root) | `216.198.79.1` |
| www | `CNAME` | `www` | `d9ce8777549b29e8.vercel-dns-017.com.` |

Replace the existing records that point at CloudFront. Note the trailing dot on
the CNAME value.

Then, back in Vercel → **Domains**, press **Refresh** on each. They should flip
to *Valid Configuration*. HTTPS certificates are issued automatically once the
records resolve — no action needed.

Propagation is usually minutes, occasionally up to an hour.

## Rollback

If anything looks wrong after Step 4, change the Route 53 record back to the
CloudFront value it had before. The old S3 site was never touched and comes
straight back.

**Before editing anything in Route 53, copy the existing record value into a
note.** That single line is the entire undo button.

---

## Before it is genuinely ready

The site deploys fine today, but these are still outstanding — see
[TODO.md](TODO.md):

- **`RESEND_API_KEY`** — without it the contact form loses every enquiry
- Four hero images still showing stand-ins
- The updated project list (32 are currently published)
- The Interior Design Guide PDF — until it exists the popup keeps itself
  disabled, which is intended, not a fault

None of these block Steps 1–3. Only the Resend key blocks Step 4.
