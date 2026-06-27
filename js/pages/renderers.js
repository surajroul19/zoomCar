import { accordion } from "../components/accordion.js";
import { gallery, pageTitle, recommendationCard, statGrid } from "../components/cards.js";

export function welcome({ vehicle }) {
  return `
    <section class="hero" style="--hero-image: url('${vehicle.heroImage}')">
      <div class="hero-content">
        <p class="eyebrow">Welcome to your vehicle</p>
        <h1>${vehicle.name}</h1>
        <p>${vehicle.welcomeMessage}</p>
        ${statGrid(vehicle.quickInfo)}
        <div class="hero-actions">
          <a class="button primary" href="#/guide">Vehicle Guide</a>
          <a class="button secondary" href="#/support">Emergency Support</a>
          <a class="button accent" href="#/checklist">Start Journey</a>
        </div>
      </div>
    </section>
  `;
}

export function vehicleInfo({ vehicle }) {
  return `
    ${pageTitle("Vehicle Information", "Specifications, features, and photo gallery for this vehicle.")}
    <section class="section two-column">
      <div>
        <h2>Specifications</h2>
        <ul class="spec-list">${Object.entries(vehicle.specifications).map(([key, value]) => `<li class="card"><strong>${key}</strong><br><span class="muted">${value}</span></li>`).join("")}</ul>
      </div>
      <div>
        <h2>Features</h2>
        <ul class="feature-list">${vehicle.features.map((feature) => `<li class="card"><span aria-hidden="true">✓</span><strong>${feature}</strong></li>`).join("")}</ul>
      </div>
    </section>
    <section class="section"><h2>Photo Gallery</h2>${gallery(vehicle.gallery, vehicle.name)}</section>
  `;
}

export function checklist() {
  const items = ["Take vehicle photos", "Verify existing damages", "Check fuel level", "Verify documents", "Inspect tyres"];
  return `
    ${pageTitle("Pre-trip Checklist", "Complete these checks before you start the journey.")}
    <section class="section">
      <article class="card stat">
        <span>Trip readiness</span>
        <strong data-progress-label>0 of ${items.length} completed</strong>
        <div class="progress-track" aria-hidden="true"><div class="progress-fill" data-progress-fill></div></div>
      </article>
      <div class="checklist" data-checklist>
        ${items.map((item, index) => `<label class="check-item card"><input type="checkbox" data-check="${index}"><span>${item}</span></label>`).join("")}
      </div>
    </section>
  `;
}

export function damages({ damages }) {
  return `
    ${pageTitle("Existing Damages", "Review the recorded vehicle condition and capture your own photos.")}
    <section class="section card-grid">
      ${damages.map((damage) => `
        <article class="damage-card card">
          <img src="${damage.image}" alt="${damage.title}" loading="lazy">
          <h2>${damage.title}</h2>
          <p><strong>Location:</strong> ${damage.location}</p>
          <p class="muted">${damage.description}</p>
        </article>
      `).join("")}
    </section>
  `;
}

export function guide() {
  return `
    ${pageTitle("Vehicle Guide", "Quick operating guidance for a smoother rental experience.")}
    <section class="section">${accordion([
      { title: "Starting Vehicle", body: "Ensure the gear is neutral, press the clutch, turn the key or press start, and wait for dashboard warnings to clear." },
      { title: "Fuel Information", body: "This sample vehicle uses petrol. Refuel at trusted stations and retain receipts for support queries." },
      { title: "Spare Wheel Location", body: "The spare wheel and tool kit are usually under the boot floor panel." },
      { title: "Tyre Change Guide", body: "Park on level ground, turn on hazards, use the jack points, loosen nuts before lifting, and call support if unsure." },
      { title: "Basic Driving Instructions", body: "Drive smoothly, avoid harsh braking, monitor warning lights, and stop safely if the vehicle behaves unusually." }
    ])}</section>
  `;
}

export function connect() {
  return `
    ${pageTitle("Bluetooth & Android Auto", "Pair your phone and use the USB ports safely while parked.")}
    <section class="section card-grid">
      ${["Open phone Bluetooth settings and search for the car system.", "Confirm the pairing code on both screens.", "Connect a data-capable USB cable for Android Auto.", "Use the front console USB port for phone projection."].map((step, index) => `
        <article class="card stat"><span>Step ${index + 1}</span><strong>${step}</strong><div class="placeholder-shot" role="img" aria-label="Setup screenshot placeholder"></div></article>
      `).join("")}
    </section>
  `;
}

export function support({ vehicle }) {
  const host = vehicle.host;
  return `
    ${pageTitle("Emergency Support", "Fast contact options for urgent help.")}
    <section class="section">
      <div class="card-grid">
        <article class="card stat"><span>Host Contact</span><strong>${host.name}</strong><p>${host.phone}</p><a class="button primary" href="tel:${host.phone}">Call Host</a></article>
        <article class="card stat"><span>WhatsApp Support</span><strong>Message host</strong><p>Share booking details and photos.</p><a class="button accent" href="https://wa.me/${host.whatsapp}" target="_blank" rel="noopener">WhatsApp Host</a></article>
        <article class="card stat"><span>Emergency</span><strong>112</strong><p>India emergency helpline.</p><a class="button secondary" href="tel:112">Call Emergency</a></article>
        <article class="card stat"><span>Service Center</span><strong>Nearby help</strong><p>Open map search.</p><a class="button ghost" href="${vehicle.serviceCenterMapUrl}" target="_blank" rel="noopener">Navigate</a></article>
      </div>
    </section>
  `;
}

export function breakdown() {
  return `
    ${pageTitle("Breakdown Guide", "Follow these steps calmly and contact support as soon as possible.")}
    <section class="section timeline">
      ${["Move to a safe location and switch on hazard lights.", "For accidents, check injuries first and call 112 if needed.", "For a flat tyre, avoid driving further and use the spare only if safe.", "For a dead battery, do not push-start in traffic; call support.", "Photograph the issue and share location with the host."].map((text, index) => `
        <article class="timeline-item"><span class="timeline-index">${index + 1}</span><div class="card stat"><strong>${text}</strong></div></article>
      `).join("")}
    </section>
  `;
}

export function nearby({ recommendations }) {
  const groups = [
    ["Tourist Attractions", recommendations.touristAttractions],
    ["Restaurants", recommendations.restaurants],
    ["Cafes", recommendations.cafes],
    ["Fuel Stations", recommendations.fuelStations]
  ];
  return `
    ${pageTitle("Local Recommendations", "Nearby places that are useful during your drive.")}
    ${groups.map(([title, items = []]) => `<section class="section"><h2>${title}</h2><div class="card-grid">${items.map(recommendationCard).join("")}</div></section>`).join("")}
  `;
}

export function faq({ faq }) {
  return `${pageTitle("FAQ", "Common rental questions and quick answers.")}<section class="section">${accordion(faq)}</section>`;
}

export function feedback({ vehicle }) {
  return `
    ${pageTitle("Feedback", "Rate the vehicle and share anything the host should know.")}
    <section class="section">
      <form class="form card stat" data-feedback-form>
        <label class="field">Rating
          <span class="stars" data-stars>${[1, 2, 3, 4, 5].map((star) => `<button class="star" type="button" data-rating="${star}" aria-label="${star} star">★</button>`).join("")}</span>
        </label>
        <input type="hidden" name="ratings" data-rating-value value="">
        <label class="field">Name <input name="name" autocomplete="name" required></label>
        <label class="field">Feedback <textarea name="feedback" rows="5" required placeholder="Share your experience"></textarea></label>
        <div class="button-row">
          <button class="button primary" type="submit">Submit Feedback</button>
          <a class="button accent" href="https://wa.me/${vehicle.host.whatsapp}?text=Feedback%20for%20${encodeURIComponent(vehicle.name)}" target="_blank" rel="noopener">WhatsApp Feedback</a>
          <a class="button ghost" href="${vehicle.feedbackForm?.url || "#"}" target="_blank" rel="noopener">Open Google Form</a>
        </div>
      </form>
    </section>
  `;
}
