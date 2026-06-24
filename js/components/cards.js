export function pageTitle(title, subtitle = "") {
  return `<section class="page-title"><h1>${title}</h1>${subtitle ? `<p class="muted">${subtitle}</p>` : ""}</section>`;
}

export function statGrid(items) {
  return `<div class="stat-grid">${Object.entries(items).map(([label, value]) => `
    <article class="stat card"><span>${label}</span><strong>${value}</strong></article>
  `).join("")}</div>`;
}

export function gallery(images, alt) {
  return `<div class="gallery">${images.map((image, index) => `
    <img src="${image}" alt="${alt} photo ${index + 1}" loading="lazy">
  `).join("")}</div>`;
}

export function recommendationCard(item) {
  return `
    <article class="recommendation card">
      <img src="${item.image}" alt="${item.name}" loading="lazy">
      <h3>${item.name}</h3>
      <p class="muted">${item.description}</p>
      <a class="button ghost" href="${item.mapUrl}" target="_blank" rel="noopener">Open Maps</a>
    </article>
  `;
}
