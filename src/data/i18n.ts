/** UI strings (EN/DE) and helpers. Content fields use { en, de } or a plain string. */
export type Lang = "en" | "de";
export type Localized = string | { en: string; de?: string };

export const languages: Lang[] = ["en", "de"];

export const ui = {
  en: {
    nav: { about: "About", projects: "Projects", skills: "Skills", contact: "Contact", cta: "Let's talk" },
    hero: { eyebrow: "Hi, I'm", viewProjects: "View Projects", getInTouch: "Get in touch", resume: "Resume" },
    about: { eyebrow: "About", title: "Perception and learned control that work outside the lab" },
    projects: {
      eyebrow: "Projects",
      title: "Selected work",
      subtitle: "A few projects worth watching, literally. Open any card for the full story, with videos and figures."
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
    footer: { builtWith: "Built with Astro." },
    project: {
      back: "All projects",
      howItWorks: "How it works",
      viewCode: "View code",
      liveDemo: "Live demo",
      readWriteup: "Read write-up",
      media: "Videos and figures",
      prev: "Previous",
      next: "Next",
      slide: "Slide",
      of: "of",
      nextProject: "Next project",
      skip: "Skip to content"
    },
    lang: { switchTo: "Deutsch", label: "Sprache" },
    theme: { toLight: "Switch to light theme", toDark: "Switch to dark theme" }
  },
  de: {
    nav: { about: "Über mich", projects: "Projekte", skills: "Skills", contact: "Kontakt", cta: "Kontakt aufnehmen" },
    hero: { eyebrow: "Hallo, ich bin", viewProjects: "Projekte ansehen", getInTouch: "Kontakt aufnehmen", resume: "Lebenslauf" },
    about: { eyebrow: "Über mich", title: "Wahrnehmung und gelernte Regelung, die auch außerhalb des Labors funktionieren" },
    projects: {
      eyebrow: "Projekte",
      title: "Ausgewählte Arbeiten",
      subtitle: "Ein paar Projekte, die sich buchstäblich anzusehen lohnen. Jede Karte öffnet die ganze Geschichte mit Videos und Abbildungen."
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
    footer: { builtWith: "Gebaut mit Astro." },
    project: {
      back: "Alle Projekte",
      howItWorks: "So funktioniert es",
      viewCode: "Code ansehen",
      liveDemo: "Live-Demo",
      readWriteup: "Bericht lesen",
      media: "Videos und Abbildungen",
      prev: "Zurück",
      next: "Weiter",
      slide: "Folie",
      of: "von",
      nextProject: "Nächstes Projekt",
      skip: "Zum Inhalt springen"
    },
    lang: { switchTo: "English", label: "Language" },
    theme: { toLight: "Zum hellen Design wechseln", toDark: "Zum dunklen Design wechseln" }
  }
} as const;

export type UI = (typeof ui)["en"];

/** Resolve a bilingual field ({ en, de } or plain string) for a language. */
export function pick(field: Localized | undefined, lang: Lang): string {
  if (field == null) return "";
  if (typeof field === "string") return field;
  return field[lang] || field.en;
}

/** Prefix a path with the site base ("/Portfolio/") so it works on GitHub Pages. */
export function url(path = ""): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}/${path.replace(/^\//, "")}`;
}

/** Route for a page in a language: "/Portfolio/" or "/Portfolio/de/". */
export function route(lang: Lang, path = ""): string {
  return url(lang === "de" ? `de/${path}` : path);
}
