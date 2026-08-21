# HIP — Modern Menswear

A premium, editorial-style website for **HIP**, a men's suits brand built
around power, confidence and modern masculinity. Built as static
HTML/CSS/JS — no build step, deploys straight to Vercel.

## Pages

- **Home** (`index.html`) — cinematic full-screen hero, featured collection,
  suit categories, brand story, "Why HIP" features, editorial banner, social
  CTA, contact form
- **About** (`about.html`) — brand story, mission, values, approach to
  menswear
- **Suits** (`suits.html`) — filterable product collection (All / Business /
  Wedding / Lifestyle)
- **Product detail pages** (`suits/*.html`) — Classic Black Suit, Midnight
  Navy Suit, Signature Grey Suit, Modern Charcoal Suit
- **Contact** (`contact.html`) — contact form, contact details, FAQ
- **Privacy Policy** (`privacy.html`)

## Stack

Plain HTML, CSS, and vanilla JS — no framework, no build step.

- Fonts: Bodoni Moda (serif display) + Manrope (sans body), via Google Fonts
- Shared design system in `styles.css` (CSS variables for color/type/spacing)
- Shared behavior in `script.js` — full-screen nav overlay, scroll reveals,
  hero load-in animation, parallax, FAQ accordion, product filters, contact
  form handling
- SEO: semantic HTML, one H1 per page, Open Graph + Twitter meta, canonical
  URLs, structured data (Organization, Product, BreadcrumbList, ItemList),
  `sitemap.xml`, `robots.txt`
- Accessibility: skip link, visible focus states, labeled form fields,
  `prefers-reduced-motion` support

## Project structure

```
├── index.html
├── about.html
├── suits.html
├── suits/
│   ├── classic-black-suit.html
│   ├── midnight-navy-suit.html
│   ├── signature-grey-suit.html
│   └── modern-charcoal-suit.html
├── contact.html
├── privacy.html
├── styles.css
├── script.js
├── sitemap.xml
└── robots.txt
```

## Deployment

Deployed on [Vercel](https://vercel.com) as a static site — no build
command needed (framework preset: "Other").

Before going live on a custom domain, update the placeholder domain
(`https://www.hipmenswear.com/`) in:

- `sitemap.xml`
- `robots.txt` (the `Sitemap:` line)
- the `<link rel="canonical">`, Open Graph, and structured data tags in
  every HTML file

Then submit `sitemap.xml` to Google Search Console.

## Images

Product and editorial photography currently uses placeholder stock images
(Unsplash, with a fallback if a URL fails to load). Swap these out for real
HIP product photography when available.

---

© 2026 HIP. All rights reserved.
