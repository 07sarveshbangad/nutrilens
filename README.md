# NutriLens — Next.js nutrition website starter

A polished Next.js + TypeScript starter for a fibre/protein calculator, with a server-side USDA FoodData Central search endpoint, SEO metadata, sitemap, robots rules, starter guides, and policy-page templates.

## Important before public launch

**This starter is not yet a fully verified nutrition database.** The six local examples in `src/lib/foods.ts` are explicitly marked `verified: false` and the UI warns users about them. Confirm the exact matching source records and values before relying on or publishing these examples. A successful USDA search result is a source record, but users must still choose the correct food and preparation state.

Indian food coverage is not preloaded with copied IFCT data. Build a reviewed dataset from the original ICMR–NIN Indian Food Composition Tables or other trustworthy sources, confirm usage/redistribution rights, and retain source identifiers, units, state, reviewer and review date. Do not scrape or bulk-republish a database without checking its terms.

## 1. Requirements

- Node.js 20.9+ (recommended for current Next.js releases)
- npm
- USDA FoodData Central API key: https://fdc.nal.usda.gov/api-key-signup.html

## 2. Install and run

```bash
npm install
cp .env.example .env.local
```

Edit `.env.local` and add your USDA key:

```env
USDA_FDC_API_KEY=your_real_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CONTACT_EMAIL=your-real-contact@example.com
NEXT_PUBLIC_CONTACT_EMAIL=your-real-contact@example.com
```

Then run:

```bash
npm run dev
```

Open http://localhost:3000.

For production, set `NEXT_PUBLIC_SITE_URL` to the exact HTTPS domain, without a trailing slash. Keep `USDA_FDC_API_KEY` server-side. Never prefix the key with `NEXT_PUBLIC_`, and never commit `.env.local`.

## 3. How the calculator works

The API searches USDA FoodData Central on the server. Nutrient IDs used by the starter are protein `1003` and dietary fibre `1079`. If a result does not contain a nutrient, the UI shows "Not available"; it does not convert missing values to zero.

The calculator scales per-100-gram data:

`portion nutrient = nutrient per 100 g × portion grams ÷ 100`

The API returns the matched record's description and source link. Always select the right record: dry oats are not cooked oatmeal, and raw rice is not cooked rice.

## 4. Adding reviewed Indian food data

1. Review the original source, e.g. ICMR–NIN's Indian Food Composition Tables 2017: https://www.nin.res.in/ebooks/IFCT2017.pdf
2. Check permitted use and redistribution terms.
3. Transcribe only the fields you need and independently verify every entry.
4. Record exact source page/table, nutrient units, edible portion, raw/cooked state, review date and reviewer.
5. Add records to a curated data file and update the search endpoint to combine that curated set with the live API.
6. Mark a record verified only after review. Do not infer missing values.

For mixed dishes, use a trustworthy recipe-specific source or calculate from weighed ingredients and cooked yield; disclose that it is a recipe estimate.

## 5. Before deployment

- Replace `example.com` with your domain.
- Replace the placeholder email on `/contact`.
- Rewrite privacy and terms pages to accurately describe your hosting, analytics, cookies, advertising, retention, contact details and applicable law. These starter pages are not legal advice.
- Expand and fact-check food records and guides. The example content is a foundation, not a guarantee of AdSense approval.
- Test mobile layout, keyboard navigation, API errors, missing nutrient values, very large weights, raw/cooked distinctions and loading states.
- Run `npm run build`.
- Deploy to Vercel or another host that supports Next.js App Router and server route handlers.
- Verify the domain in Google Search Console and submit `/sitemap.xml`.
- Add Google AdSense only after approval. Replace the client placeholder in `.env.local` when appropriate, then implement the current AdSense script and ad units according to Google's latest instructions. Do not create fake ad slots, click your own ads or place ads where they obstruct the calculator.
- Add the ads.txt file only using the exact publisher record supplied by AdSense.

## 6. SEO checklist

- Each page has a descriptive title and meta description.
- Canonical URLs are set on main pages.
- `app/sitemap.ts` and `app/robots.ts` generate the sitemap and robots rules.
- Content pages should be genuinely helpful, reviewed, distinct and maintained.
- Add a specific page for a food only when you have a matching reviewed record and enough useful information to make that page valuable.
- Do not generate thousands of thin pages or use keyword stuffing.
- Use Search Console and real query data to decide which food pages to expand.

## 7. Known next steps

This scaffold has a search calculator and starter pages, but not yet:
- a complete Indian food dataset;
- per-food SEO landing pages generated from reviewed records;
- rate limiting / caching strategy beyond a one-hour API cache;
- a consent management platform;
- production ad components;
- an admin interface for food review.

Build those deliberately before scaling.
