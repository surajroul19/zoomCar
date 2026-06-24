import { routes } from "../router.js";

const drawerRoutes = routes;
const bottomRoutes = [routes[0], routes[2], routes[6], routes[10]];

function link(route, currentPath) {
  return `<a class="nav-link ${route.path === currentPath ? "active" : ""}" href="#${route.path}">
    <span>${route.label}</span><span aria-hidden="true">${route.icon}</span>
  </a>`;
}

export function renderNavigation(currentPath) {
  const drawer = document.querySelector('[data-component="drawer"]');
  const bottom = document.querySelector('[data-component="bottom-nav"]');
  drawer.innerHTML = drawerRoutes.map((route) => link(route, currentPath)).join("");
  bottom.innerHTML = bottomRoutes.map((route) => `
    <a class="${route.path === currentPath ? "active" : ""}" href="#${route.path}">
      <span aria-hidden="true">${route.icon}</span><span>${route.label}</span>
    </a>
  `).join("");
}

export function bindNavigation() {
  const drawer = document.querySelector('[data-component="drawer"]');
  const menuButton = document.querySelector('[data-action="open-menu"]');
  menuButton.addEventListener("click", () => {
    const isOpen = drawer.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
  drawer.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      drawer.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}
