export function accordion(items) {
  return `
    <div class="accordion">
      ${items.map((item, index) => `
        <article class="accordion-item card">
          <button type="button" aria-expanded="false" data-accordion="${index}">
            <span>${item.title || item.question}</span><span aria-hidden="true">+</span>
          </button>
          <div class="accordion-panel">${item.body || item.answer}</div>
        </article>
      `).join("")}
    </div>
  `;
}

export function bindAccordions(root = document) {
  root.querySelectorAll("[data-accordion]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".accordion-item");
      const isOpen = item.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
      button.querySelector("span:last-child").textContent = isOpen ? "-" : "+";
    });
  });
}
