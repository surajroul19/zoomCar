export const routes = [
  { path: "/", label: "Welcome", icon: "⌂" },
  { path: "/vehicle", label: "Vehicle", icon: "ⓘ" },
  { path: "/checklist", label: "Checklist", icon: "✓" },
  { path: "/damages", label: "Damages", icon: "!" },
  { path: "/guide", label: "Guide", icon: "▤" },
  { path: "/connect", label: "Connect", icon: "⌁" },
  { path: "/support", label: "Support", icon: "☎" },
  { path: "/breakdown", label: "Breakdown", icon: "⚑" },
  { path: "/nearby", label: "Nearby", icon: "⌖" },
  { path: "/faq", label: "FAQ", icon: "?" },
  { path: "/feedback", label: "Feedback", icon: "★" }
];

export function getVehicleId() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("vehicle")) return params.get("vehicle");

  const pathMatch = window.location.pathname.match(/\/car\/([^/]+)/);
  if (pathMatch) return pathMatch[1];

  return "tiago001";
}

export function getRoutePath() {
  const hash = window.location.hash.replace(/^#/, "");
  return routes.some((route) => route.path === hash) ? hash : "/";
}

export function go(path) {
  window.location.hash = path;
}
