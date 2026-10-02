export function setupTheme(): void {
  const root = document.documentElement;
  const button = document.getElementById("themeToggle");
  if (!button) return;
  const label = () => {
    const light = root.getAttribute("data-theme") === "light";
    button.setAttribute("aria-label", (light ? button.dataset.toDark : button.dataset.toLight) ?? "");
  };
  label();
  button.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch { /* private mode */ }
    label();
  });
}
