/** Decorative drone that follows scroll progress and doubles as back-to-top. */
export function setupDrone(): void {
  const drone = document.getElementById("droneCompanion");
  if (!drone) return;
  drone.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  window.setTimeout(() => drone.classList.add("is-active"), 400);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const RAIL_MIN_WIDTH = 641; // must match the CSS breakpoint that parks it in a fixed corner
  let currentY = 0;
  let currentTilt = 0;
  let lastScrollY = window.scrollY;
  let ticking = true;
  const seed = Math.random() * 1000;

  function frame(): void {
    if (!ticking || !drone) return;
    if (window.innerWidth >= RAIL_MIN_WIDTH) {
      const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(window.scrollY / scrollable, 0), 1);
      const targetY = 96 + progress * (window.innerHeight - 96 - 96);
      const velocity = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      const tiltTarget = Math.max(Math.min(velocity * 1.4, 20), -20);
      currentY += (targetY - currentY) * 0.07;
      currentTilt += (tiltTarget - currentTilt) * 0.12;
      const t = performance.now() / 1000;
      const wobbleY = Math.sin(t * 0.7 + seed) * 3.5 + Math.sin(t * 1.9 + seed * 2) * 1.5;
      const wobbleX = Math.sin(t * 0.55 + seed * 1.3) * 3;
      drone.style.transform = `translate(${wobbleX.toFixed(1)}px, ${(currentY + wobbleY).toFixed(1)}px) rotate(${currentTilt.toFixed(1)}deg)`;
    } else {
      drone.style.transform = "";
    }
    requestAnimationFrame(frame);
  }

  document.addEventListener("visibilitychange", () => {
    ticking = document.visibilityState === "visible";
    if (ticking) requestAnimationFrame(frame);
  });
  requestAnimationFrame(frame);
}
