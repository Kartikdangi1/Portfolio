/**
 * Project cards autoplay their video(s) muted, only while on screen. A card
 * with several videos queues them one after another and loops back to the first.
 */
export function setupCardVideos(): void {
  const videos = document.querySelectorAll<HTMLVideoElement>(".project-card__video");
  if (!videos.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    videos.forEach((v) => v.remove());
    return;
  }
  const visible = new WeakSet<HTMLVideoElement>();
  const io = new IntersectionObserver(
    (entries) => {
      for (const { target, isIntersecting } of entries) {
        const v = target as HTMLVideoElement;
        if (isIntersecting) {
          visible.add(v);
          if (!v.src) v.src = (JSON.parse(v.dataset.playlist ?? "[]") as string[])[0];
          void v.play().catch(() => {});
        } else {
          visible.delete(v);
          v.pause();
        }
      }
    },
    { threshold: 0.25 }
  );
  videos.forEach((v) => {
    const playlist: string[] = JSON.parse(v.dataset.playlist ?? "[]");
    let index = 0;
    v.addEventListener("ended", () => {
      index = (index + 1) % playlist.length;
      v.src = playlist[index];
      void v.play().catch(() => {});
    });
    io.observe(v);
  });
  document.addEventListener("visibilitychange", () => {
    videos.forEach((v) => {
      if (document.hidden) v.pause();
      else if (visible.has(v)) void v.play().catch(() => {});
    });
  });
}
