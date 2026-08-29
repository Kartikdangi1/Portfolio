/**
 * ============================================================================
 *  I18N — static site chrome translations (EN/DE) + helpers.
 * ============================================================================
 * Bilingual content fields elsewhere (config.js, projects.js) use the shape
 * { en: "...", de: "..." } and are resolved with pick() below. A field left
 * as a plain string works in every language (falls back to that string).
 */

const I18N = {
  en: {
    nav: { about: "About", projects: "Projects", skills: "Skills", contact: "Contact", cta: "Let's talk" },
    hero: { eyebrow: "Hi, I'm", viewProjects: "View Projects", getInTouch: "Get in touch" },
    about: { eyebrow: "About", title: "Perception and learned control that work outside the lab" },
    projects: {
      eyebrow: "Projects",
      title: "Selected work",
      subtitle: "A few projects worth watching, literally. Click any card to see it in action."
    },
    skills: { eyebrow: "Toolbox", title: "Skills & technologies" },
    contact: {
      eyebrow: "Contact",
      title: "Let's build something",
      subtitle: "Open to robotics/ML roles and collaborations. The fastest way to reach me:",
      emailBtn: "Send an email",
      github: "GitHub",
      linkedin: "LinkedIn"
    },
    footer: { builtWith: "Built with plain HTML, CSS & JS." },
    modal: {
      howItWorks: "How it works",
      viewCode: "View code",
      liveDemo: "Live demo",
      readWriteup: "Read write-up",
      videoComingSoon: "Demo video coming soon"
    }
  },
  de: {
    nav: { about: "Über mich", projects: "Projekte", skills: "Skills", contact: "Kontakt", cta: "Kontakt aufnehmen" },
    hero: { eyebrow: "Hallo, ich bin", viewProjects: "Projekte ansehen", getInTouch: "Kontakt aufnehmen" },
    about: { eyebrow: "Über mich", title: "Wahrnehmung und gelernte Regelung, die auch außerhalb des Labors funktionieren" },
    projects: {
      eyebrow: "Projekte",
      title: "Ausgewählte Arbeiten",
      subtitle: "Ein paar Projekte, die sich buchstäblich anzusehen lohnen. Auf eine Karte klicken, um sie in Aktion zu sehen."
    },
    skills: { eyebrow: "Werkzeugkasten", title: "Skills & Technologien" },
    contact: {
      eyebrow: "Kontakt",
      title: "Lass uns etwas bauen",
      subtitle: "Offen für Robotik-/ML-Stellen und Kooperationen. Der schnellste Weg, mich zu erreichen:",
      emailBtn: "E-Mail senden",
      github: "GitHub",
      linkedin: "LinkedIn"
    },
    footer: { builtWith: "Gebaut mit purem HTML, CSS & JS." },
    modal: {
      howItWorks: "So funktioniert es",
      viewCode: "Code ansehen",
      liveDemo: "Live-Demo",
      readWriteup: "Bericht lesen",
      videoComingSoon: "Demo-Video folgt in Kürze"
    }
  }
};

// Resolve a dot-path key ("nav.about") for a language, falling back to English.
function t(key, lang) {
  const lookup = (dict) => key.split(".").reduce((node, part) => (node ? node[part] : undefined), dict);
  return lookup(I18N[lang]) ?? lookup(I18N.en) ?? "";
}

// Resolve a bilingual content field ({ en, de } or a plain string) for a language.
function pick(field, lang) {
  if (field == null) return "";
  if (typeof field === "string") return field;
  return field[lang] || field.en || "";
}
