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
  // Cycled by the typewriter effect in the hero (randomized order, see
  // setupHeroTypewriter in main.js). Keep entries short (fits one line),
  // grounded in real work, and free of repeated headline words across
  // entries -- checked with a script, not just eyeballed -- so no two
  // phrases read as near-duplicates of each other.
  roleCycle: [
    { en: "Aerial Perception & Learning", de: "Luftgestützte Wahrnehmung & Lernen" },
    { en: "Radar-Only Indoor Mapping", de: "Rein radarbasierte Indoor-Kartierung" },
    { en: "GICP Pose Estimation", de: "GICP-Posenschätzung" },
    { en: "Bayesian Occupancy Grids", de: "Bayes'sche Belegungsgitter" },
    { en: "Multi-Modal Sensor Fusion", de: "Multimodale Sensorfusion" },
    { en: "Doppler-Aided Object Tracking", de: "Doppler-gestütztes Objekt-Tracking" },
    { en: "Human-in-the-Loop RL", de: "Human-in-the-Loop-RL" },
    { en: "SAC Actor-Critic Design", de: "SAC-Actor-Critic-Design" },
    { en: "HG-DAgger Interventions", de: "HG-DAgger-Interventionen" },
    { en: "Dual-Buffer Experience Replay", de: "Dual-Buffer-Experience-Replay" },
    { en: "Vision-Guided Manipulation", de: "Bildgestützte Manipulation" },
    { en: "Live Distance-Field Planning", de: "Live-Distanzfeld-Planung" },
    { en: "Redundant Null-Space Motion", de: "Redundante Nullraum-Bewegung" },
    { en: "MediaPipe Gesture Interfaces", de: "MediaPipe-Gestenschnittstellen" },
    { en: "Precision Socket Assembly", de: "Präzise Steckdosenmontage" },
    { en: "SIFT + RANSAC Alignment", de: "SIFT-plus-RANSAC-Ausrichtung" },
    { en: "HMI Reward Classifiers", de: "HMI-Belohnungsklassifikatoren" },
    { en: "Next-Best-View Exploration", de: "Next-Best-View-Exploration" },
    { en: "Autonomous ROS 2 Navigation", de: "Autonome ROS-2-Navigation" },
    { en: "PPO Policies over Nav2", de: "PPO-Policies über Nav2" },
    { en: "Smartphone Visual Odometry", de: "Smartphone-Odometrie" },
    { en: "PX4 Flight Systems", de: "PX4-Flugsysteme" },
    { en: "DexHand Finger Control", de: "DexHand-Fingersteuerung" },
    { en: "One-Euro Joint Smoothing", de: "One-Euro-Glättung" },
    { en: "Edge Inference on Jetson", de: "Edge-Inferenz auf Jetson" },
    { en: "GPS-Denied Autonomy", de: "GPS-freie Autonomie" },
    { en: "Multithreaded FEM Solvers", de: "Multithreaded-FEM-Solver" },
    { en: "Head-to-Head Policy Benchmarks", de: "Direkte Policy-Vergleiche" },
    { en: "Flow-Matching Action Models", de: "Flow-Matching-Aktionsmodelle" },
    { en: "Sim-to-Real Transfer", de: "Sim-to-Real-Transfer" }
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
