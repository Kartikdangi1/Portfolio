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
      .map((s, i) => {
        const rot = randomBetween(-8, 8).toFixed(2);
        const delay = (i * 0.045 + randomBetween(-0.02, 0.02)).toFixed(2);
        const style = `--deal-rot:${rot}deg;--deal-delay:${delay}s`;
        return `<span class="skill-pill reveal" style="${style}">${escapeHtml(s)}</span>`;
      })
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

  function projectCardHtml(p) {
    return `
      <article class="project-card ${p.featured ? "project-card--featured" : ""}" data-id="${escapeHtml(p.id)}" tabindex="0">
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
    const sorted = [...PROJECTS].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

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

  /* ---------------- Hero typewriter ---------------- */
  function setupHeroTypewriter() {
    const prefixEl = document.getElementById("heroRolePrefix");
    const cycleEl = document.getElementById("heroRoleCycle");
    if (!cycleEl || !SITE.roleCycle || !SITE.roleCycle.length) return;

    if (prefixEl && SITE.roleCyclePrefix) prefixEl.textContent = SITE.roleCyclePrefix;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cycleEl.textContent = SITE.roleCycle[0];
      return;
    }

    const words = SITE.roleCycle;
    let wordIndex = 0;
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
        wordIndex = (wordIndex + 1) % words.length;
        delay = 400;
      }

      window.setTimeout(tick, delay);
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

    renderSiteInfo();
    renderProjects();
    setupNav();
    setupReveal();
    setupDroneCompanion();
    setupHeroTypewriter();
  });
})();
