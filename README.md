# Safar.pk — Pakistan Travel Guide, Booking & Reviews

A full-stack site for exploring famous places in Pakistan: browse and search places,
sign up / log in, book tours or hotel stays (request-based, no payment), and leave
ratings/reviews with photos. Logged-in visitors can also suggest new places, which
publish immediately.

## Tech stack
- **Backend:** Node.js, Express
- **Database:** SQLite via Node's built-in `node:sqlite` module — a single file,
  no separate DB server, and no native compiling required on install
- **Views:** EJS (server-rendered HTML)
- **Auth:** Session-based (`express-session`) with hashed passwords (`bcryptjs`)
- **File uploads:** `multer` (place photos, review photos), stored in `/uploads`

## Setup

1. Make sure you have **Node.js 22.5 or later** installed (this app uses Node's
   built-in SQLite support, which needs at least that version). You'll see a
   harmless `ExperimentalWarning: SQLite is an experimental feature` message
   when the server starts — that's expected and fine.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Seed the database with 10 real, famous Pakistani places (Hunza, Fairy Meadows,
   Badshahi Mosque, Mohenjo-daro, Faisal Mosque, Saif-ul-Malook, Swat, Clifton Beach,
   Katas Raj, Ziarat), each with sample hotels and tours:
   ```bash
   npm run seed
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Open **http://localhost:3000** in your browser.

The database file is created automatically at `db/pak-travel.sqlite` the first time
you run the app. If you ever want to start fresh, delete that file and run
`npm run seed` again.

## What's included

- **Home page** — search by keyword, filter by province and category
- **Place detail page** — photo gallery, description, best time to visit, how to
  get there, entry fee, estimated trip cost, embedded map (OpenStreetMap, no API
  key needed), nearby hotels, guided tours, and reviews
- **Accounts** — register/login/logout, passwords hashed with bcrypt
- **Bookings** — logged-in users can request a tour or hotel booking (date, guests);
  view and cancel their bookings under "My bookings." No real payment is processed —
  this is a request/confirmation flow, which you can wire up to a real payment
  provider (e.g. Stripe) later.
- **Reviews** — logged-in users can rate (1–5 stars), write a review, and attach
  photos. Reviews publish immediately (no moderation queue yet).
- **Suggest a place** — logged-in users can add a new place with all the same
  fields as the seeded ones, including map coordinates and photos. Publishes
  immediately.

## Things worth knowing / natural next steps

- **Editing seed data:** open `db/seed.js` to change descriptions, prices, or add
  more places, then delete `db/pak-travel.sqlite` and re-run `npm run seed`.
- **Moderation:** reviews and suggested places currently auto-publish, as
  requested. If spam becomes a concern, add a `status` column (`pending`/`approved`)
  and only show `approved` rows on public pages, with a simple admin page to
  approve/reject.
- **Payments:** bookings are request-only right now. To take real payments, the
  cleanest path is Stripe Checkout — swap the "Request booking" button for a
  Checkout session and mark the booking `confirmed` on webhook success.
- **Deployment:** this app runs as a normal Node process, so it deploys easily to
  Render, Railway, Fly.io, or a VPS. See "Deploying to Render (free)" below for
  step-by-step instructions.
- **Session secret:** change `SESSION_SECRET` in production (set it as an
  environment variable rather than using the default in `server.js`).

## Deploying to Render (free)

This gets your site a real, public URL like `https://safar-pk.onrender.com` that
anyone can visit, without needing your own computer turned on.

1. **Push this code to GitHub.** Create a new repository (e.g. `pak-travel`) on
   GitHub and upload this folder's contents to it (via the GitHub website's
   "upload files" option, GitHub Desktop, or `git push` if you're comfortable
   with Git).
2. **Sign up at [render.com](https://render.com)** (free, can sign up with GitHub).
3. Click **New +** → **Web Service**, and connect your GitHub repository.
4. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Click **Create Web Service**. Render will install dependencies, start the
   app, and give you a live URL within a minute or two.
6. The database seeds itself automatically on first boot — no extra step needed.

### Known limitation: storage resets

Render's **free** tier does not keep a persistent disk. That means the SQLite
database file and any uploaded photos will reset back to the seeded sample data
whenever the service restarts or redeploys (Render free services also sleep
after inactivity and wake on the next visit, which can trigger this too). This
is fine for showing the site off publicly, but if you want bookings, reviews,
and suggested places to stick around permanently, you have two options later:
- Upgrade to a Render paid plan with a persistent disk, or
- Migrate the database to a managed service (e.g. Render's free PostgreSQL, or
  Neon/Supabase), which is a moderate code change mostly in `db/database.js`.

## Connecting a custom domain

Once deployed, most hosts (including Render) let you add a custom domain (like
`safar.pk`) for free under the service's "Settings" → "Custom Domains" — you'll
just need to buy the domain name itself from a registrar (Namecheap, GoDaddy, a
`.pk` registrar, etc.) and point its DNS at the host as instructed.
