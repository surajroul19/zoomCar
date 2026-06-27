# Smart Vehicle Companion Portal

A production-ready, mobile-first static web application for QR-code access inside a rental or self-drive vehicle. It gives customers vehicle information, pre-trip guidance, existing damage records, emergency support, local recommendations, FAQ, and feedback.

## Stack

- HTML5
- CSS3
- Vanilla JavaScript ES modules
- JSON-backed vehicle data
- Static hosting compatible with Cloudflare Pages, Netlify, and GitHub Pages

No React, Vue, Angular, jQuery, backend, or build step is required.

## Project Structure

```text
project/
  index.html
  assets/
    images/
    icons/
  css/
    variables.css
    components.css
    pages.css
    main.css
  js/
    app.js
    router.js
    data-service.js
    ui/
    components/
    pages/
  data/
    vehicle.json
    damages.json
    faq.json
    recommendations.json
  _redirects
  README.md
```

## Local Preview

Because the app loads JSON with `fetch`, run it through a local static server instead of opening `index.html` directly.

```bash
python -m http.server 4173
```

Then open:

```text
http://localhost:4173/?vehicle=tiago001
```

Routes use hash navigation for static hosting reliability:

```text
/#/guide
/#/support
/#/feedback
```

The router also detects `/car/tiago001` when your host rewrites unknown paths to `index.html`.

## Data Model

Add future vehicles in `data/vehicle.json` under `vehicles`:

```json
{
  "vehicles": {
    "xuv3xo001": {
      "id": "xuv3xo001",
      "name": "XUV 3XO"
    }
  }
}
```

Then add matching vehicle IDs in:

- `data/damages.json`
- `data/recommendations.json`

FAQ is global in `data/faq.json`, but it can be converted to per-vehicle data later if operating rules differ by host or city.

## Architecture Notes

- `app.js` controls bootstrapping, route rendering, and page-level interaction binding.
- `router.js` isolates route and vehicle-ID parsing.
- `data-service.js` caches JSON requests and resolves fallback vehicle data.
- `js/components/` contains reusable UI fragments such as accordions and cards.
- `js/pages/renderers.js` keeps page rendering functions separate from app lifecycle code.
- CSS is split into variables, reusable components, and page-specific layout.

The app is intentionally static and modular so it can scale to more vehicles without changing the hosting model.

## Cloudflare Pages Deployment

1. Push this folder to a GitHub repository.
2. In Cloudflare Pages, create a project from the repository.
3. Set build command to empty.
4. Set output directory to `/`.
5. Deploy.

The included `_redirects` file supports single-page app rewrites on Cloudflare Pages and Netlify:

```text
/* /index.html 200
```

For GitHub Pages, prefer query/hash URLs such as `/?vehicle=tiago001#/support`.

## QR Code Generation Guide

Create a QR code for each vehicle-specific URL:

```text
https://your-domain.example/?vehicle=tiago001
```

Recommended process:

1. Deploy the portal.
2. Open the vehicle URL and verify the correct data loads.
3. Generate the QR code with any trusted QR generator.
4. Print and place the QR code inside the vehicle.
5. Test the QR code on iOS and Android before the vehicle goes live.

## Future Scalability Guide

- Add vehicles by extending JSON, not page code.
- Store real damage photos in `assets/images/{vehicle-id}/`.
- Move recommendations to city-specific JSON if the fleet expands across cities.
- Add analytics through a privacy-conscious static script only after consent requirements are reviewed.
- Replace placeholder Google Form link with a real form endpoint or static form provider.
- Add service-worker caching when the asset set stabilizes.

## Google Form Feedback Setup

The feedback page submits directly to Google Forms with the customer-selected rating, name, and feedback message.

1. Create a Google Form with these fields:
   - Ratings
   - Name
   - Feedback
2. In Google Forms, use **Get pre-filled link**, type sample values into each field, and copy the generated URL.
3. In that URL, copy each `entry.xxxxxxxxxx` parameter name and place it in `data/vehicle.json` under `feedbackForm.fields`.
4. Replace `feedbackForm.url` with your form's `/viewform` URL.
5. In Google Forms, enable email notifications from the **Responses** tab so each submission reaches your inbox.

After those values are replaced, the portal's feedback submit button sends a background POST request to the Google Forms `/formResponse` endpoint. The customer stays on the feedback page and sees a confirmation message.

## Performance and Accessibility

- Mobile-first layout supports 320px, 375px, 768px, 1024px, and 1440px widths.
- Images use lazy loading outside the hero.
- Navigation includes skip link, semantic landmarks, and keyboard-accessible controls.
- Touch targets are at least 44px.
- The app avoids runtime dependencies for fast loading on static hosts.
