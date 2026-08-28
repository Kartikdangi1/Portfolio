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

  /* ---------------- Site info ---------------- */
  function renderSiteInfo() {
    document.title = `${SITE.name}, ${SITE.role}`;
    document.getElementById("heroName").textContent = SITE.name;
    document.getElementById("heroRole").textContent = SITE.role;
    document.getElementById("heroTagline").textContent = SITE.tagline;
    document.getElementById("aboutText").textContent = SITE.about;
    document.getElementById("footerName").textContent = SITE.name;
    document.getElementById("year").textContent = new Date().getFullYear();

    const statsEl = document.getElementById("aboutStats");
    statsEl.innerHTML = SITE.stats
      .map(
        (s) => `
        <div class="about__stat">
          <div class="value">${escapeHtml(s.value)}</div>
          <div class="label">${escapeHtml(s.label)}</div>
        </div>`
      )
      .join("");

    const skillsEl = document.getElementById("skillsCloud");
    skillsEl.innerHTML = SITE.skills
      .map((s) => `<span class="skill-pill">${escapeHtml(s)}</span>`)
      .join("");

    const emailLink = document.getElementById("emailLink");
    if (SITE.email) {
      emailLink.href = `mailto:${SITE.email}`;
    } else {
      emailLink.hidden = true;
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

  /* ---------------- Projects grid ---------------- */
  function cardMediaHtml(project) {
    const [from, to] = project.accent || ["#ff8a3d", "#ff5d3d"];
    const bg = project.thumbnail
      ? `background-image:url('${escapeHtml(project.thumbnail)}')`
      : `background-image:linear-gradient(135deg, ${from}, ${to})`;

    return `
      <div class="project-card__media" style="${bg}">
        <span class="project-card__badge">${escapeHtml(project.tags[0] || "Project")}</span>
        <div class="project-card__play">
          <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </div>
      </div>`;
  }

  // The IDMP project is literally a robot arm doing collision-aware pick and
  // place, so its card gets placed on the page the same way: a small arm
  // swoops in, "grips" the card, and sets it down. See .cobot-card-wrap in
  // style.css for the choreography.
  const COBOT_CARD_ID = "idmp-cobot";
  const COBOT_ARM_SVG = `
    <svg class="cobot-arm__svg" viewBox="0 0 100 70" aria-hidden="true">
      <defs>
        <linearGradient id="cobotArmGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#22d3ee" />
          <stop offset="100%" stop-color="#c026d3" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="4" r="5" fill="#3a3f4d" />
      <line x1="50" y1="4" x2="32" y2="30" stroke="url(#cobotArmGrad)" stroke-width="6" stroke-linecap="round" />
      <line x1="32" y1="30" x2="50" y2="54" stroke="url(#cobotArmGrad)" stroke-width="6" stroke-linecap="round" />
      <circle cx="32" cy="30" r="4.5" fill="#0a0a0d" stroke="#22d3ee" stroke-width="1.5" />
      <line x1="50" y1="54" x2="41" y2="64" stroke="#c026d3" stroke-width="4" stroke-linecap="round" />
      <line x1="50" y1="54" x2="59" y2="64" stroke="#c026d3" stroke-width="4" stroke-linecap="round" />
    </svg>`;

  function projectCardHtml(p, skipReveal) {
    return `
      <article class="project-card ${p.featured ? "project-card--featured" : ""}${skipReveal ? "" : " reveal"}" data-id="${escapeHtml(p.id)}" tabindex="0">
        ${cardMediaHtml(p)}
        <div class="project-card__body">
          <h3 class="project-card__title">${escapeHtml(p.title)}</h3>
          <p class="project-card__tagline">${escapeHtml(p.tagline)}</p>
          <div class="project-card__tags">
            ${p.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
          </div>
        </div>
      </article>`;
  }

  function renderProjects() {
    const grid = document.getElementById("projectsGrid");
    const sorted = [...PROJECTS].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

    grid.innerHTML = sorted
      .map((p) => {
        const isCobot = p.id === COBOT_CARD_ID;
        const card = projectCardHtml(p, isCobot);
        if (!isCobot) return card;
        return `
          <div class="cobot-card-wrap reveal">
            <div class="cobot-arm">${COBOT_ARM_SVG}</div>
            ${card}
          </div>`;
      })
      .join("");

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
  const modalThumbs = document.getElementById("modalThumbs");
  const modalLinks = document.getElementById("modalLinks");

  let lastFocused = null;

  function renderMediaItem(project, index) {
    const item = project.media[index];
    if (!item) {
      modalMedia.innerHTML = `
        <div class="modal__media--empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M8 5v14l11-7z"/>
          </svg>
          <span>Demo video coming soon</span>
        </div>`;
      return;
    }

    if (item.type === "youtube") {
      modalMedia.innerHTML = `<iframe src="${youtubeEmbedUrl(item.id)}"
        title="${escapeHtml(item.title || project.title)}"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen loading="lazy"></iframe>`;
    } else if (item.type === "video") {
      modalMedia.innerHTML = `<video controls autoplay
        ${item.poster ? `poster="${escapeHtml(item.poster)}"` : ""}>
        <source src="${escapeHtml(item.src)}">
        Your browser doesn't support embedded video.
      </video>`;
      if (item.speed) {
        const videoEl = modalMedia.querySelector("video");
        videoEl.defaultPlaybackRate = item.speed;
        videoEl.playbackRate = item.speed;
        videoEl.addEventListener("loadedmetadata", () => {
          videoEl.playbackRate = item.speed;
        });
      }
    } else if (item.type === "image") {
      modalMedia.innerHTML = `<img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.title || project.title)}" loading="lazy" />`;
    }
  }

  function openModal(id) {
    const project = PROJECTS.find((p) => p.id === id);
    if (!project) return;

    lastFocused = document.activeElement;

    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalTags.innerHTML = project.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("");

    renderMediaItem(project, 0);

    modalThumbs.innerHTML = project.media
      .map(
        (item, i) =>
          `<button class="modal__thumb ${i === 0 ? "active" : ""}" data-index="${i}">${escapeHtml(item.title || `Media ${i + 1}`)}</button>`
      )
      .join("");

    modalThumbs.querySelectorAll(".modal__thumb").forEach((btn) => {
      btn.addEventListener("click", () => {
        modalThumbs.querySelectorAll(".modal__thumb").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderMediaItem(project, Number(btn.dataset.index));
      });
    });

    const links = [
      project.links?.github && { label: "View code", href: project.links.github },
      project.links?.demo && { label: "Live demo", href: project.links.demo },
      project.links?.writeup && { label: "Read write-up", href: project.links.writeup }
    ].filter(Boolean);

    modalLinks.innerHTML = links
      .map((l) => `<a class="btn btn--ghost" href="${escapeHtml(l.href)}" target="_blank" rel="noopener">${escapeHtml(l.label)}</a>`)
      .join("");

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
    if (lastFocused) lastFocused.focus();
  }

  document.getElementById("modalClose").addEventListener("click", closeModal);
  document.getElementById("modalBackdrop").addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
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

        drone.style.transform = `translateY(${currentY.toFixed(1)}px) rotate(${currentTilt.toFixed(1)}deg)`;
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

    renderSiteInfo();
    renderProjects();
    setupNav();
    setupReveal();
    setupDroneCompanion();
  });
})();
