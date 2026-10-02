/** Cycles hero role words in random order, never repeating a recent one. */
export function setupTypewriter(): void {
  const el = document.getElementById("heroRoleCycle");
  if (!el?.dataset.words) return;
  const words: string[] = JSON.parse(el.dataset.words);
  if (words.length < 2) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const history = Math.max(1, Math.min(8, words.length - 1));
  const recent: number[] = [];
  const next = () => {
    let i: number;
    do i = Math.floor(Math.random() * words.length); while (recent.includes(i));
    recent.push(i);
    if (recent.length > history) recent.shift();
    return i;
  };
  if (reduce) { el.textContent = words[next()]; return; }

  let word = next();
  let chars = 0;
  let deleting = false;
  const tick = () => {
    const w = words[word];
    chars += deleting ? -1 : 1;
    el.textContent = w.slice(0, chars);
    let delay = deleting ? 35 : 65;
    if (!deleting && chars === w.length) { delay = 1800; deleting = true; }
    else if (deleting && chars === 0) { deleting = false; word = next(); delay = 400; }
    window.setTimeout(tick, delay);
  };
  el.textContent = "";
  tick();
}
