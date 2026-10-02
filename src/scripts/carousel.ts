/**
 * Media carousel: arrows, thumbnails, arrow keys and swipe. Videos load lazily
 * and autoplay (muted) when their slide is shown; with several videos, each one
 * advances to the next video slide when it ends and wraps around.
 */
export function setupCarousels(): void {
  document.querySelectorAll<HTMLElement>(".carousel").forEach(initCarousel);
}

function initCarousel(root: HTMLElement): void {
  const slides = [...root.querySelectorAll<HTMLElement>(".carousel__slide")];
  const thumbs = [...root.querySelectorAll<HTMLElement>(".carousel__thumb")];
  const stage = root.querySelector<HTMLElement>(".carousel__stage")!;
  const caption = root.querySelector<HTMLElement>(".carousel__caption")!;
  const counter = root.querySelector<HTMLElement>(".carousel__counter")!;
  const multiVideo = root.dataset.multiVideo === "true";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let current = 0;
  let inView = true;

  const media = (i: number) => slides[i].querySelector<HTMLVideoElement | HTMLIFrameElement>("video, iframe");

  function activate(i: number, userInitiated: boolean): void {
    const n = slides.length;
    const prev = media(current);
    if (prev instanceof HTMLVideoElement) prev.pause();
    current = ((i % n) + n) % n;
    slides.forEach((s, k) => s.classList.toggle("is-active", k === current));
    thumbs.forEach((t, k) => {
      t.classList.toggle("is-active", k === current);
      if (k === current) t.scrollIntoView({ block: "nearest", inline: "center", behavior: reduce ? "auto" : "smooth" });
    });
    caption.textContent = slides[current].dataset.title ?? "";
    counter.textContent = `${current + 1} / ${n}`;

    const m = media(current);
    if (m instanceof HTMLIFrameElement) {
      if (!m.src) m.src = m.dataset.src ?? "";
    } else if (m) {
      if (!m.src) m.src = m.dataset.src ?? "";
      if (inView && (userInitiated || !reduce)) void m.play().catch(() => {});
    }
  }

  slides.forEach((s, i) => {
    const v = s.querySelector("video");
    if (v && multiVideo) {
      v.addEventListener("ended", () => {
        for (let step = 1; step <= slides.length; step++) {
          const j = (i + step) % slides.length;
          if (slides[j].dataset.type === "video") return activate(j, false);
        }
      });
    }
  });

  root.querySelector(".carousel__nav--prev")?.addEventListener("click", () => activate(current - 1, true));
  root.querySelector(".carousel__nav--next")?.addEventListener("click", () => activate(current + 1, true));
  thumbs.forEach((t) => t.addEventListener("click", () => activate(Number(t.dataset.index), true)));

  stage.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); activate(current - 1, true); }
    else if (e.key === "ArrowRight") { e.preventDefault(); activate(current + 1, true); }
  });

  let startX: number | null = null;
  let startY = 0;
  stage.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; startY = e.touches[0].clientY; }, { passive: true });
  stage.addEventListener("touchend", (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    startX = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) activate(current + (dx < 0 ? 1 : -1), true);
  }, { passive: true });

  // Pause when scrolled out of view; resume when it comes back.
  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    const m = media(current);
    if (m instanceof HTMLVideoElement) {
      if (inView && !reduce) void m.play().catch(() => {});
      else m.pause();
    }
  }, { threshold: 0.35 }).observe(stage);

  activate(0, false);
}
