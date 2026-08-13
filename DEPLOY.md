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

## Step 1 — Create the Vercel project

1. Go to **vercel.com** and click **Sign Up**.
2. Choose **Continue with GitHub** and sign in as `eladmdror`. Pick the **Hobby**
   (free) plan when asked.
3. On the dashboard click **Add New… → Project**.
4. Find **EPASERO** in the list and click **Import**.
5. Change nothing on the settings screen. Vercel recognises Next.js and fills it
   in correctly by itself.
6. Click **Deploy** and wait about two minutes.

You now have a working site on a temporary address like
`epasero-abc123.vercel.app`. **Nothing public has changed** —
`epaserocontracting.com` still shows the old site.

## Step 2 — Add the keys (do not skip)

This is the step that silently breaks things if missed. The `.env.local` file on
your Mac is deliberately never uploaded, so Vercel does not have your keys yet.

Without them the contact form still *looks* like it works — it shows the success
message — but nothing is sent and the enquiry is lost.

In the project, go to **Settings → Environment Variables** and add:

| Name | Value | Needed for |
|---|---|---|
| `RESEND_API_KEY` | from resend.com | **The contact form. Required.** |
| `CONTACT_FROM` | `website@epaserocontracting.com` | **Required.** |
| `GOOGLE_PLACES_API_KEY` | from Google Cloud | Reviews only — optional |
| `GOOGLE_PLACE_ID` | from Google's Place ID finder | Reviews only — optional |

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

1. In Vercel: **Settings → Domains → Add**, enter `epaserocontracting.com`, and
   add `www.epaserocontracting.com` too.
2. Vercel shows you the DNS record it wants. Keep that page open.
3. In **AWS Route 53** (the domain's nameservers are already there —
   `ns-1854.awsdns-39.co.uk` and three others), open the hosted zone for
   `epaserocontracting.com`.
4. Edit the existing record that currently points at CloudFront and change it to
   the value Vercel gave you.
5. Wait. It is usually minutes, but can take up to an hour to spread.

Vercel issues the HTTPS certificate automatically once it sees the record.

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
