/**
 * ============================================================================
 *  SITE CONFIG — your name, bio, skills, and contact links.
 * ============================================================================
 * Edit the values below. This is plain data, no logic — safe to change
 * anything in quotes.
 */

const SITE = {
  name: "Kartik Dangi",
  role: "Robotics Engineer, Aerial Perception & Learning",
  // Static prefix shown before the typewriter-cycled part in the hero.
  // Bilingual fields use { en, de } and are resolved with pick(field, lang);
  // a plain string also works and is used for every language.
  roleCyclePrefix: { en: "Robotics Engineer,", de: "Robotik-Ingenieur," },
  // Cycled by the typewriter effect in the hero, after the prefix above.
  // Keep entries short (fits one line).
  roleCycle: [
    { en: "Aerial Perception & Learning", de: "Luftgestützte Wahrnehmung & Lernen" },
    { en: "Radar-Based SLAM", de: "Radarbasiertes SLAM" },
    { en: "Human-in-the-Loop RL", de: "Human-in-the-Loop-RL" },
    { en: "Vision-Guided Manipulation", de: "Bildgestützte Manipulation" },
    { en: "UAV Sensor Fusion", de: "UAV-Sensorfusion" }
  ],
  tagline: {
    en: "I turn sparse 4D radar returns into usable maps for GPS-denied flight, and build human-in-the-loop reinforcement learning systems that improve safely on real hardware.",
    de: "Ich verwandle spärliche 4D-Radardaten in nutzbare Karten für GPS-freien Flug und entwickle Human-in-the-Loop-Verstärkungslernsysteme, die sich sicher auf echter Hardware verbessern."
  },
  location: "",
  email: "kartikdangide@gmail.com",
  resumeUrl: "",

  // Array of paragraphs, rendered as separate <p> tags.
  about: [
    {
      en: "I'm a robotics engineer working across two connected areas: perception that holds up on imperfect sensors, and learned policies that keep working once they leave simulation.",
      de: "Ich bin Robotik-Ingenieur und arbeite an zwei miteinander verbundenen Bereichen: Wahrnehmung, die auch mit unvollkommenen Sensoren zuverlässig funktioniert, und gelernten Regelstrategien, die auch außerhalb der Simulation weiterhin funktionieren."
    },
    {
      en: "I hold a B.Eng. in Robotics from THWS Schweinfurt, where my thesis built a real-time, radar-only indoor mapping system for a UAV, with no GPS, no camera, and no clean lab conditions to lean on. I'm now completing an M.Eng. in Elektro- und Informationstechnik at the same university, extending that work into radar-camera sensor fusion for my Master's thesis.",
      de: "Ich habe einen B.Eng. in Robotik von der THWS Schweinfurt, wo meine Abschlussarbeit ein echtzeitfähiges Indoor-Kartierungssystem für eine Drohne war, das ausschließlich auf Radar beruhte, ganz ohne GPS, Kamera oder saubere Laborbedingungen. Derzeit schließe ich einen M.Eng. in Elektro- und Informationstechnik an derselben Hochschule ab und erweitere diese Arbeit für meine Masterarbeit um Radar-Kamera-Sensorfusion."
    },
    {
      en: "Alongside that, I build human-in-the-loop reinforcement learning systems and vision-guided manipulation pipelines, where the hard part usually isn't training a policy, it's getting it to behave safely on real hardware. I previously worked as a working student at TTZ-EMO, building multithreaded FEM simulation tooling.",
      de: "Daneben entwickle ich Human-in-the-Loop-Verstärkungslernsysteme und bildgestützte Manipulationspipelines, bei denen der schwierige Teil selten das Trainieren einer Policy ist, sondern dafür zu sorgen, dass sie sich auf echter Hardware sicher verhält. Zuvor war ich als Werkstudent bei der TTZ-EMO tätig und habe dort multithreaded FEM-Simulationswerkzeuge entwickelt."
    }
  ],

  stats: [
    { label: { en: "Theses (B.Eng. + ongoing M.Eng.)", de: "Abschlussarbeiten (B.Eng. + laufender M.Eng.)" }, value: "2" },
    { label: { en: "RL Methods Benchmarked", de: "Benchmarkte RL-Methoden" }, value: "20+" },
    { label: { en: "Robot / UAV Platforms Built", de: "Gebaute Roboter-/UAV-Plattformen" }, value: "5" }
  ],

  skills: [
    "ROS 2 / ROS",
    "SLAM & Sensor Fusion",
    "4D Radar Perception",
    "Reinforcement Learning",
    "PyTorch",
    "JAX / Flax",
    "Computer Vision",
    "Detectron2",
    "PCL",
    "OpenCV",
    "Gazebo & MoveIt",
    "PX4 & MAVLink",
    "NVIDIA Jetson",
    "Docker",
    "C++",
    "Python"
  ],

  social: {
    github: "https://github.com/Kartikdangi1",
    linkedin: "https://www.linkedin.com/in/kartik-dangi/",
    twitter: ""
  }
};
