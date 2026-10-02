/**
 * Rendering + interaction logic. Reads from SITE (config.js) and PROJECTS
 * (projects.js) — you should not need to touch this file to update content.
 */
(function () {
  "use strict";

  const escapeHtml = (str) =>
    String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[c]);

  const youtubeEmbedUrl = (id) =>
    `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`;

  // The static HTML default stays English (SEO's canonical language) --
  // this is only the client-side toggle's state, restored from a return
  // visitor's earlier choice.
  let currentLang = localStorage.getItem("lang") || "en";

  /* ---------------- Site info ---------------- */
  function renderSiteInfo() {
    document.title = `${SITE.name}, ${SITE.role}`;
    document.getElementById("heroName").textContent = SITE.name;
    document.getElementById("heroTagline").textContent = pick(SITE.tagline, currentLang);
    const aboutParagraphs = Array.isArray(SITE.about) ? SITE.about : [SITE.about];
    document.getElementById("aboutText").innerHTML = aboutParagraphs
      .map((p) => `<p>${escapeHtml(pick(p, currentLang))}</p>`)
      .join("");
    document.getElementById("footerName").textContent = SITE.name;
    document.getElementById("year").textContent = new Date().getFullYear();

    const statsEl = document.getElementById("aboutStats");
    statsEl.innerHTML = SITE.stats
      .map(
        (s) => `
        <div class="about__stat">
          <div class="value">${escapeHtml(s.value)}</div>
          <div class="label">${escapeHtml(pick(s.label, currentLang))}</div>
        </div>`
      )
      .join("");

    const skillsEl = document.getElementById("skillsCloud");
    skillsEl.innerHTML = SITE.skills
      .map((s, i) => {
        const rot = randomBetween(-8, 8).toFixed(2);
        const delay = (i * 0.045 + randomBetween(-0.02, 0.02)).toFixed(2);
        const style = `--deal-rot:${rot}deg;--deal-delay:${delay}s`;
        return `<span class="skill-pill reveal" style="${style}">${escapeHtml(s)}</span>`;
      })
      .join("");

    const emailLink = document.getElementById("emailLink");
    const contactEmailText = document.getElementById("contactEmailText");
    if (SITE.email) {
      emailLink.href = `mailto:${SITE.email}`;
      contactEmailText.textContent = SITE.email;
    } else {
      emailLink.hidden = true;
      contactEmailText.hidden = true;
    }

    const githubLink = document.getElementById("githubLink");
    if (SITE.social.github) {
      githubLink.href = SITE.social.github;
    } else {
      githubLink.hidden = true;
    }

    const linkedinLink = document.getElementById("linkedinLink");
    if (SITE.social.linkedin) {
      linkedinLink.href = SITE.social.linkedin;
      linkedinLink.hidden = false;
    }
  }

  // Only shows the Resume buttons once the PDF actually exists at
  // SITE.resumeUrl -- so dropping the file into assets/ later is all it
  // takes for them to appear, no code change needed, and there's never a
  // dead link in the meantime.
  function setupResumeLink() {
    const links = document.querySelectorAll(".js-resume-link");
    if (!SITE.resumeUrl || !links.length) return;
    fetch(SITE.resumeUrl, { method: "HEAD" })
      .then((res) => {
        if (!res.ok) return;
        links.forEach((el) => {
          el.href = SITE.resumeUrl;
          el.hidden = false;
        });
      })
      .catch(() => {});
  }

  /* ---------------- Projects grid ---------------- */
  // A card whose project has a video plays it right on the card (muted, looped,
  // inline). `preview` can point at a lighter clip than the full modal video.
  // A project with several videos plays them all on the card, one after the
  // other, looping back to the first; a single-video project loops its
  // (light) preview clip.
  function previewPlaylist(project) {
    const videos = (project.media || []).filter((m) => m.type === "video");
    if (videos.length > 1) return videos.map((v) => v.src);
    if (project.preview) return [project.preview];
    return videos.length ? [videos[0].src] : [];
  }
  const hasVideo = (project) => (project.media || []).some((m) => m.type === "video");

  function cardMediaHtml(project) {
    const [from, to] = project.accent || ["#2f8a94", "#124d54"];
    const bg = project.thumbnail
      ? `background-image:url('${escapeHtml(project.thumbnail)}')`
      : `background-image:linear-gradient(135deg, ${from}, ${to})`;
    const playlist = previewPlaylist(project);
    const src = playlist.length > 0;
    const video = src
      ? `<video class="project-card__video" data-playlist="${escapeHtml(JSON.stringify(playlist))}" ${playlist.length === 1 ? "loop" : ""} muted playsinline preload="none" aria-hidden="true" tabindex="-1"></video>`
      : "";

    return `
      <div class="project-card__media ${src ? "project-card__media--video" : ""}" style="${bg}">
        ${video}
        <span class="project-card__badge">${escapeHtml(project.tags[0] || "Project")}</span>
        <div class="project-card__play">
          <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </div>
      </div>`;
  }

  // Only one video should decode at a time: card previews pause while the
  // modal is open and resume (if still on screen) when it closes.
  function pauseCardVideos(paused) {
    document.querySelectorAll(".project-card__video").forEach((v) => {
      if (paused) v.pause();
      else if (v.src && v.dataset.visible === "1") v.play().catch(() => {});
    });
  }

  // Loads + plays each card video only while it's on screen (saves bandwidth
  // and CPU); reduced-motion visitors just keep the still thumbnail.
  let cardVideoObserver = null;
  function setupCardVideos(grid) {
    if (cardVideoObserver) cardVideoObserver.disconnect();
    const videos = grid.querySelectorAll(".project-card__video");
    if (!videos.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      videos.forEach((v) => v.remove());
      return;
    }
    cardVideoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const v = entry.target;
          v.dataset.visible = entry.isIntersecting ? "1" : "0";
          if (entry.isIntersecting && !modal.classList.contains("open")) {
            if (!v.src) v.src = v.playlist[0];
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { threshold: 0.25 }
    );
    videos.forEach((v) => {
      v.playlist = JSON.parse(v.dataset.playlist);
      v.playlistIndex = 0;
      // Queue: when a clip ends, start the next one (wrapping around).
      v.addEventListener("ended", () => {
        v.playlistIndex = (v.playlistIndex + 1) % v.playlist.length;
        v.src = v.playlist[v.playlistIndex];
        v.play().catch(() => {});
      });
      cardVideoObserver.observe(v);
    });
  }

  function projectCardHtml(p) {
    return `
      <article class="project-card ${p.featured ? "project-card--featured" : ""}" data-id="${escapeHtml(p.id)}" tabindex="0">
        ${cardMediaHtml(p)}
        <div class="project-card__body">
          <h3 class="project-card__title">${escapeHtml(pick(p.title, currentLang))}</h3>
          <p class="project-card__tagline">${escapeHtml(pick(p.tagline, currentLang))}</p>
          <div class="project-card__tags">
            ${p.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
          </div>
        </div>
      </article>`;
  }

  // Every project card is "dealt" into place like a card off a stack --
  // randomized per card (rotation/drift/timing) so the grid settles with
  // natural variation instead of one uniform animation. The small robot
  // arm near the section heading (#projectDealer in index.html) plays the
  // "dealing" motion while this is happening.
  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  function renderProjects() {
    const grid = document.getElementById("projectsGrid");
    // Video projects first, everything else below (array order is kept within each group).
    const sorted = [...PROJECTS].sort((a, b) => (hasVideo(b) ? 1 : 0) - (hasVideo(a) ? 1 : 0));

    grid.innerHTML = sorted
      .map((p, i) => {
        const card = projectCardHtml(p);
        const rot = randomBetween(-6, 6).toFixed(2);
        const x = randomBetween(-36, 36).toFixed(1);
        const delay = (i * 0.09 + randomBetween(-0.03, 0.03)).toFixed(2);
        const style = `--deal-rot:${rot}deg;--deal-x:${x}px;--deal-delay:${delay}s`;
        return `
          <div class="project-deal-wrap reveal" style="${style}">
            ${card}
          </div>`;
      })
      .join("");

    setupCardVideos(grid);

    grid.querySelectorAll(".project-card").forEach((card) => {
      const open = () => openModal(card.dataset.id);
      card.addEventListener("click", open);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });
    });
  }

  /* ---------------- Video modal ---------------- */
  const modal = document.getElementById("videoModal");
  const modalMedia = document.getElementById("modalMedia");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalTags = document.getElementById("modalTags");
  const modalPipeline = document.getElementById("modalPipeline");
  const modalThumbs = document.getElementById("modalThumbs");
  const modalLinks = document.getElementById("modalLinks");

  let lastFocused = null;

  const modalStage = document.getElementById("modalStage");
  const modalCaption = document.getElementById("modalCaption");
  const modalCounter = document.getElementById("modalCounter");
  let currentProject = null;
  let currentIndex = 0;

  function renderMediaItem(project, index) {
    const item = project.media[index];
    if (!item) {
      modalMedia.innerHTML = `
        <div class="modal__media--empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M8 5v14l11-7z"/>
          </svg>
          <span>${escapeHtml(t("modal.videoComingSoon", currentLang))}</span>
        </div>`;
      return;
    }

    const itemTitle = pick(item.title, currentLang) || pick(project.title, currentLang);

    if (item.type === "youtube") {
      modalMedia.innerHTML = `<iframe src="${youtubeEmbedUrl(item.id)}"
        title="${escapeHtml(itemTitle)}"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen loading="lazy"></iframe>`;
    } else if (item.type === "video") {
      const videoCount = project.media.filter((m) => m.type === "video").length;
      modalMedia.innerHTML = `<video controls autoplay muted ${videoCount > 1 ? "" : "loop"} playsinline
        ${item.poster ? `poster="${escapeHtml(item.poster)}"` : ""}>
        <source src="${escapeHtml(item.src)}">
        Your browser doesn't support embedded video.
      </video>`;
      if (videoCount > 1) {
        // Queue the project's videos: when one ends, play the next video slide
        // (skipping images), wrapping back to the first.
        modalMedia.querySelector("video").addEventListener("ended", () => {
          const n = project.media.length;
          for (let step = 1; step <= n; step++) {
            const j = (index + step) % n;
            if (project.media[j].type === "video") return showSlide(j);
          }
        });
      }
      if (item.speed) {
        const videoEl = modalMedia.querySelector("video");
        videoEl.defaultPlaybackRate = item.speed;
        videoEl.playbackRate = item.speed;
        videoEl.addEventListener("loadedmetadata", () => {
          videoEl.playbackRate = item.speed;
        });
      }
    } else if (item.type === "image") {
      modalMedia.innerHTML = `<img src="${escapeHtml(item.src)}" alt="${escapeHtml(itemTitle)}" />`;
    }
  }

  // Shows slide `index` (wrapping around) and syncs caption, counter and the
  // active thumbnail.
  function showSlide(index) {
    const n = currentProject.media.length;
    if (!n) return renderMediaItem(currentProject, 0);
    currentIndex = ((index % n) + n) % n;
    renderMediaItem(currentProject, currentIndex);
    const item = currentProject.media[currentIndex];
    modalCaption.textContent = pick(item.title, currentLang) || "";
    modalCounter.textContent = `${currentIndex + 1} / ${n}`;
    modalThumbs.querySelectorAll(".modal__thumb").forEach((b, i) => {
      const active = i === currentIndex;
      b.classList.toggle("active", active);
      if (active) b.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    });
  }

  function thumbHtml(item, i) {
    const label = escapeHtml(pick(item.title, currentLang) || `Media ${i + 1}`);
    const inner =
      item.type === "image"
        ? `<img src="${escapeHtml(item.src)}" alt="" loading="lazy" />`
        : item.poster
          ? `<img src="${escapeHtml(item.poster)}" alt="" loading="lazy" />`
          : item.type === "video"
            ? `<video src="${escapeHtml(item.src)}#t=0.5" preload="metadata" muted></video>`
            : "";
    return `<button class="modal__thumb ${item.type === "image" ? "" : "modal__thumb--video"}" data-index="${i}" title="${label}" aria-label="${label}">${inner}</button>`;
  }

  function openModal(id) {
    const project = PROJECTS.find((p) => p.id === id);
    if (!project) return;

    lastFocused = document.activeElement;
    currentProject = project;

    modalTitle.textContent = pick(project.title, currentLang);
    modalDescription.textContent = pick(project.description, currentLang);
    modalTags.innerHTML = project.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");

    modalPipeline.innerHTML =
      project.pipeline && project.pipeline.length
        ? `<h4>${escapeHtml(t("modal.howItWorks", currentLang))}</h4><ol>${project.pipeline.map((step) => `<li>${escapeHtml(pick(step, currentLang))}</li>`).join("")}</ol>`
        : "";

    const multi = project.media.length > 1;
    modalStage.classList.toggle("modal__stage--single", !multi);
    modalThumbs.innerHTML = multi ? project.media.map(thumbHtml).join("") : "";
    modalThumbs.scrollLeft = 0;
    modalThumbs.querySelectorAll(".modal__thumb").forEach((btn) => {
      btn.addEventListener("click", () => showSlide(Number(btn.dataset.index)));
    });
    modal.querySelector(".modal__dialog").scrollTop = 0;
    showSlide(0);

    const links = [
      project.links?.github && { label: t("modal.viewCode", currentLang), href: project.links.github },
      project.links?.demo && { label: t("modal.liveDemo", currentLang), href: project.links.demo },
      project.links?.writeup && { label: t("modal.readWriteup", currentLang), href: project.links.writeup }
    ].filter(Boolean);

    modalLinks.innerHTML = links
      .map((l) => `<a class="btn btn--ghost" href="${escapeHtml(l.href)}" target="_blank" rel="noopener">${escapeHtml(l.label)}</a>`)
      .join("");

    pauseCardVideos(true);
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    document.getElementById("modalClose").focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    modalMedia.innerHTML = "";
    pauseCardVideos(false);
    if (lastFocused) lastFocused.focus();
  }

  document.getElementById("modalPrev").addEventListener("click", () => showSlide(currentIndex - 1));
  document.getElementById("modalNext").addEventListener("click", () => showSlide(currentIndex + 1));

  // Swipe left/right on touch screens (ignore taps and vertical scrolls).
  let swipeStartX = null;
  let swipeStartY = null;
  modalStage.addEventListener("touchstart", (e) => {
    swipeStartX = e.touches[0].clientX;
    swipeStartY = e.touches[0].clientY;
  }, { passive: true });
  modalStage.addEventListener("touchend", (e) => {
    if (swipeStartX === null) return;
    const dx = e.changedTouches[0].clientX - swipeStartX;
    const dy = e.changedTouches[0].clientY - swipeStartY;
    swipeStartX = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) showSlide(currentIndex + (dx < 0 ? 1 : -1));
  }, { passive: true });

  document.getElementById("modalClose").addEventListener("click", closeModal);
  document.getElementById("modalBackdrop").addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("open")) return;
    if (e.key === "Escape") closeModal();
    else if (e.key === "ArrowLeft") showSlide(currentIndex - 1);
    else if (e.key === "ArrowRight") showSlide(currentIndex + 1);
  });

  /* ---------------- Nav scroll + mobile menu ---------------- */
  function setupNav() {
    const nav = document.getElementById("nav");
    const toggle = document.getElementById("navToggle");
    const links = document.getElementById("navLinks");

    window.addEventListener(
      "scroll",
      () => nav.classList.toggle("scrolled", window.scrollY > 20),
      { passive: true }
    );

    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("open");
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---------------- Theme toggle ---------------- */
  // The initial theme is already applied by an inline script in <head>
  // (before first paint, to avoid a flash) -- this just wires up the button.
  function setupThemeToggle() {
    const root = document.documentElement;
    const button = document.getElementById("themeToggle");

    function updateLabel() {
      const isLight = root.getAttribute("data-theme") === "light";
      button.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
    }

    updateLabel();

    button.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      updateLabel();
    });
  }

  /* ---------------- Language toggle ---------------- */
  function updateLangToggleUI() {
    document.querySelectorAll(".lang-toggle__btn").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.lang === currentLang);
      btn.setAttribute("aria-pressed", String(btn.dataset.lang === currentLang));
    });
  }

  // Re-renders every language-dependent part of the page in place: the
  // dynamic content (site info, projects grid, typewriter) plus every
  // static-chrome element tagged with data-i18n.
  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;

    renderSiteInfo();
    renderProjects();
    setupHeroTypewriter();
    setupReveal();

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n, lang);
    });

    updateLangToggleUI();
  }

  function setupLangToggle() {
    document.querySelectorAll(".lang-toggle__btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.dataset.lang !== currentLang) applyLanguage(btn.dataset.lang);
      });
    });
  }

  /* ---------------- Hero typewriter ---------------- */
  let typewriterTimeoutId = null;

  function setupHeroTypewriter() {
    const prefixEl = document.getElementById("heroRolePrefix");
    const cycleEl = document.getElementById("heroRoleCycle");
    if (!cycleEl || !SITE.roleCycle || !SITE.roleCycle.length) return;

    // Re-running this on a language switch replaces the word list -- clear
    // any in-flight loop first so two ticks never fight over the same text.
    if (typewriterTimeoutId !== null) {
      window.clearTimeout(typewriterTimeoutId);
      typewriterTimeoutId = null;
    }

    if (prefixEl && SITE.roleCyclePrefix) prefixEl.textContent = pick(SITE.roleCyclePrefix, currentLang);

    const words = SITE.roleCycle.map((w) => pick(w, currentLang));

    // Pick a random next word, excluding whichever ones showed up most
    // recently (a rolling window of 7-10, capped so there's always at
    // least one word left to choose from) so the same phrase can't repeat
    // for a while, not just skip one turn.
    const historySize = Math.max(1, Math.min(8, words.length - 1));
    const recentIndices = [];

    function randomNextIndex() {
      if (words.length <= 1) return 0;
      let next;
      do {
        next = Math.floor(Math.random() * words.length);
      } while (recentIndices.includes(next));
      recentIndices.push(next);
      if (recentIndices.length > historySize) recentIndices.shift();
      return next;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cycleEl.textContent = words[randomNextIndex()];
      return;
    }

    let wordIndex = randomNextIndex();
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const word = words[wordIndex];
      charIndex += deleting ? -1 : 1;
      cycleEl.textContent = word.slice(0, charIndex);

      let delay = deleting ? 35 : 65;

      if (!deleting && charIndex === word.length) {
        delay = 1800;
        deleting = true;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = randomNextIndex();
        delay = 400;
      }

      typewriterTimeoutId = window.setTimeout(tick, delay);
    }

    tick();
  }

  /* ---------------- Scroll reveal ---------------- */
  function setupReveal() {
    const targets = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((t) => t.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    targets.forEach((t) => io.observe(t));
  }

  /* ---------------- Drone companion ---------------- */
  function setupDroneCompanion() {
    const drone = document.getElementById("droneCompanion");
    if (!drone) return;

    drone.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.setTimeout(() => drone.classList.add("is-active"), 400);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const RAIL_MIN_WIDTH = 641; // must match the CSS breakpoint that parks it in a fixed corner

    if (reduceMotion) return; // CSS still shows it; just skip the scroll-linked motion

    let currentY = 0;
    let currentTilt = 0;
    let lastScrollY = window.scrollY;
    let ticking = true;

    // A seeded, non-repeating hover wobble (two sine waves at an irrational-
    // ish frequency ratio) layered on top of the scroll-follow position, so
    // the drone reads as hovering rather than snapping along a dead-straight
    // line even when scroll is idle. Phase is randomized per page load.
    const wobbleSeed = Math.random() * 1000;

    function frame() {
      if (!ticking) return;

      if (window.innerWidth >= RAIL_MIN_WIDTH) {
        const doc = document.documentElement;
        const scrollable = Math.max(doc.scrollHeight - window.innerHeight, 1);
        const progress = Math.min(Math.max(window.scrollY / scrollable, 0), 1);

        const topBound = 96;
        const bottomBound = window.innerHeight - 96;
        const targetY = topBound + progress * (bottomBound - topBound);

        const velocity = window.scrollY - lastScrollY;
        lastScrollY = window.scrollY;
        const tiltTarget = Math.max(Math.min(velocity * 1.4, 20), -20);

        currentY += (targetY - currentY) * 0.07;
        currentTilt += (tiltTarget - currentTilt) * 0.12;

        const t = performance.now() / 1000;
        const wobbleY = Math.sin(t * 0.7 + wobbleSeed) * 3.5 + Math.sin(t * 1.9 + wobbleSeed * 2) * 1.5;
        const wobbleX = Math.sin(t * 0.55 + wobbleSeed * 1.3) * 3;

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

  /* ---------------- Init ---------------- */
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".section").forEach((el) => el.classList.add("reveal"));

    setupNav();
    setupThemeToggle();
    setupLangToggle();
    setupDroneCompanion();
    setupResumeLink();
    // Renders site info + projects, restarts the typewriter, re-arms scroll
    // reveal, and applies the current language to the static chrome -- all
    // in one pass, whether this is the first load or a stored preference.
    applyLanguage(currentLang);
  });
})();
