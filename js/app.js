import { bindAccordions } from "./components/accordion.js";
import { loadPortalData } from "./data-service.js";
import { getRoutePath, getVehicleId } from "./router.js";
import { bindNavigation, renderNavigation } from "./ui/navigation.js";
import * as pages from "./pages/renderers.js";

const app = document.querySelector("#app");
let portalData;

const pageMap = {
  "/": pages.welcome,
  "/vehicle": pages.vehicleInfo,
  "/checklist": pages.checklist,
  "/damages": pages.damages,
  "/guide": pages.guide,
  "/connect": pages.connect,
  "/support": pages.support,
  "/breakdown": pages.breakdown,
  "/nearby": pages.nearby,
  "/faq": pages.faq,
  "/feedback": pages.feedback
};

function bindChecklist() {
  const checkboxes = [...document.querySelectorAll("[data-check]")];
  const label = document.querySelector("[data-progress-label]");
  const fill = document.querySelector("[data-progress-fill]");
  if (!checkboxes.length) return;

  const update = () => {
    const done = checkboxes.filter((item) => item.checked).length;
    label.textContent = `${done} of ${checkboxes.length} completed`;
    fill.style.setProperty("--progress", `${(done / checkboxes.length) * 100}%`);
  };
  checkboxes.forEach((checkbox) => checkbox.addEventListener("change", update));
  update();
}

function bindFeedback() {
  const form = document.querySelector("[data-feedback-form]");
  if (!form) return;
  let rating = 0;
  form.querySelectorAll("[data-rating]").forEach((button) => {
    button.addEventListener("click", () => {
      rating = Number(button.dataset.rating);
      form.querySelectorAll("[data-rating]").forEach((star) => {
        star.classList.toggle("active", Number(star.dataset.rating) <= rating);
      });
    });
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    window.dispatchEvent(new CustomEvent("portal:toast", { detail: `Thanks for rating ${rating || "the trip"}.` }));
    form.reset();
  });
}

function renderFloatingAction() {
  document.querySelector('[data-component="floating-action"]').innerHTML = `
    <a class="floating-whatsapp" href="https://wa.me/${portalData.vehicle.host.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp support">WA</a>
  `;
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "modal-backdrop";
  toast.innerHTML = `<div class="modal card"><h2>Feedback saved</h2><p>${message}</p><button class="button primary" type="button">Close</button></div>`;
  toast.querySelector("button").addEventListener("click", () => toast.remove());
  document.body.append(toast);
}

async function render() {
  const path = getRoutePath();
  const renderer = pageMap[path] || pageMap["/"];
  renderNavigation(path);
  app.innerHTML = renderer(portalData);
  bindAccordions(app);
  bindChecklist();
  bindFeedback();
  app.focus({ preventScroll: true });
}

async function init() {
  app.innerHTML = `<section class="section"><article class="card stat"><strong>Loading vehicle companion...</strong></article></section>`;
  portalData = await loadPortalData(getVehicleId());
  bindNavigation();
  renderFloatingAction();
  await render();
  window.addEventListener("hashchange", render);
  window.addEventListener("portal:toast", (event) => showToast(event.detail));
}

init().catch((error) => {
  app.innerHTML = `<section class="section"><article class="card stat"><strong>Unable to load vehicle data</strong><p class="muted">${error.message}</p></article></section>`;
});
