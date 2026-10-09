/**
 * Project data: the only file to edit to add or change a project.
 *
 * Add an object to `projects` (video projects are listed first automatically).
 * Media goes in public/assets/ and is referenced as "assets/...". A project
 * can mix videos, images and YouTube embeds in `media`; several videos play
 * one after another in a loop, on the card and on the project page.
 */
import type { Localized } from "./i18n";

export type MediaItem =
  | { type: "video"; title: Localized; src: string; poster?: string }
  | { type: "image"; title: Localized; src: string }
  | { type: "youtube"; title: Localized; id: string };

export interface Project {
  id: string;
  title: Localized;
  tagline: Localized;
  description: Localized;
  tags: string[];
  thumbnail: string;
  /** Light clip that autoplays on the card; defaults to the first video. */
  preview?: string;
  featured: boolean;
  links: { github?: string; demo?: string; writeup?: string };
  media: MediaItem[];
  pipeline?: Localized[];
}

export const projects: Project[] = [
  {
    id: "radar-indoor-mapping-uav",
    title: { en: "Radar-Based Indoor Mapping for UAVs", de: "Radarbasierte Indoor-Kartierung für Drohnen" },
    tagline: {
      en: "Real-time occupancy mapping from 4D radar alone: no GPS, no camera, no LiDAR map",
      de: "Echtzeit-Belegungskartierung allein aus 4D-Radar: kein GPS, keine Kamera, keine LiDAR-Karte"
    },
    description: {
      en: "My Bachelor's thesis at THWS Schweinfurt: a ROS 2 system that turns a Continental ARS548 4D automotive radar into a real-time indoor occupancy-mapping tool for a UAV, so it keeps working in GPS-denied space and through smoke, dust, or darkness. Fused odometry (Madgwick IMU, RANSAC Doppler ego-velocity, and LiDAR height) feeds a GICP SLAM pipeline with loop closure, while a separate radar path builds a temporal Bayesian occupancy grid with occlusion filtering. The full pipeline runs end to end in roughly 150 ms on an NVIDIA Jetson Orin NX.",
      de: "Meine Bachelorarbeit an der THWS Schweinfurt: ein ROS-2-System, das ein automotives 4D-Radar (Continental ARS548) in ein echtzeitfähiges Indoor-Belegungskartierungswerkzeug für eine Drohne verwandelt, das auch in GPS-freien Räumen sowie durch Rauch, Staub oder Dunkelheit funktioniert. Fusionierte Odometrie (Madgwick-IMU, RANSAC-Doppler-Eigengeschwindigkeit und LiDAR-Höhe) speist eine GICP-SLAM-Pipeline mit Loop-Closure, während ein separater Radarpfad ein zeitliches Bayes'sches Belegungsgitter mit Verdeckungsfilterung aufbaut. Die gesamte Pipeline läuft End-to-End in rund 150 ms auf einem NVIDIA Jetson Orin NX."
    },
    tags: ["ROS2", "SLAM", "Sensor Fusion", "4D Radar", "UAV", "Jetson"],
    thumbnail: "assets/images/projects/radar-mapping-room-map.webp",
    featured: true,
    links: {
      github: "https://github.com/Kartikdangi1/radar-indoor-mapping-uav",
      demo: "",
      writeup: ""
    },
    media: [
      { title: { en: "System architecture", de: "Systemarchitektur" }, type: "image", src: "assets/images/projects/radar-mapping-system-arch.webp" },
      { title: { en: "Room map result", de: "Ergebnis: Raumkarte" }, type: "image", src: "assets/images/projects/radar-mapping-room-map.webp" },
      { title: { en: "Corridor map result", de: "Ergebnis: Flurkarte" }, type: "image", src: "assets/images/projects/radar-mapping-corridor-map.webp" },
      { title: { en: "Occlusion filtering", de: "Verdeckungsfilterung" }, type: "image", src: "assets/images/projects/radar-mapping-occlusion.webp" },
      { title: { en: "UAV + radar payload", de: "Drohne mit Radar-Nutzlast" }, type: "image", src: "assets/images/projects/radar-mapping-drone-hw.webp" }
    ],
    pipeline: [
      { en: "Fuse Madgwick IMU, RANSAC Doppler ego-velocity, and LiDAR height into one odometry estimate", de: "Madgwick-IMU, RANSAC-Doppler-Eigengeschwindigkeit und LiDAR-Höhe zu einer Odometrieschätzung fusionieren" },
      { en: "Feed that into a GICP SLAM pipeline with loop closure for drift-free pose tracking", de: "Diese in eine GICP-SLAM-Pipeline mit Loop-Closure für driftfreies Pose-Tracking einspeisen" },
      { en: "Build a temporal Bayesian occupancy grid from raw radar returns, with occlusion filtering to suppress multipath ghosts", de: "Ein zeitliches Bayes'sches Belegungsgitter aus rohen Radarrückläufen aufbauen, mit Verdeckungsfilterung gegen Mehrwege-Geister" },
      { en: "Run the full stack end to end in roughly 150 ms on a Jetson Orin NX", de: "Den gesamten Stack End-to-End in rund 150 ms auf einem Jetson Orin NX ausführen" }
    ]
  },
  {
    id: "idmp-cobot",
    title: { en: "Interactive Distance Field Mapping and Planning (IDMP)", de: "Interaktive Distanzfeld-Kartierung und -Planung (IDMP)" },
    tagline: {
      en: "Reactive, real-time collision avoidance for a 7-DoF cobot from a live distance-and-gradient field",
      de: "Reaktive Echtzeit-Kollisionsvermeidung für einen 7-DoF-Cobot aus einem Live-Distanz-und-Gradientenfeld"
    },
    description: {
      en: "A university project at CERI (Center for Robotics, THWS Würzburg-Schweinfurt): I migrated an existing IDMP stack from ROS 1 on a 6-DoF UR5e to ROS 2 on a 7-DoF NEURA MAiRA cobot. I rebuilt the collision pipeline around an Azure Kinect depth camera with a TF2 self-filter and 18 virtual collision points, using null-space exploitation to keep the control loop reacting to moving obstacles at a stable 98-100 Hz instead of pausing to re-plan. I also added a MediaPipe-based worker guidance system so an operator can step through an assembly sequence hands-free with hand gestures, backed by a projector overlay for live feedback on the bench.",
      de: "Ein Hochschulprojekt am CERI (Center for Robotics, THWS Würzburg-Schweinfurt): Ich habe einen bestehenden IDMP-Stack von ROS 1 auf einem 6-DoF-UR5e auf ROS 2 für einen 7-DoF-NEURA-MAiRA-Cobot migriert. Ich habe die Kollisionspipeline rund um eine Azure-Kinect-Tiefenkamera mit einem TF2-Selbstfilter und 18 virtuellen Kollisionspunkten neu aufgebaut und nutze Nullraum-Bewegung, damit der Regelkreis stabil mit 98-100 Hz auf bewegte Hindernisse reagiert, statt für eine Neuplanung zu pausieren. Zusätzlich habe ich ein MediaPipe-basiertes Bediener-Führungssystem ergänzt, mit dem eine Person eine Montagesequenz freihändig per Handgeste durchlaufen kann, unterstützt durch eine Projektor-Einblendung für Live-Feedback am Arbeitsplatz."
    },
    tags: ["ROS2", "Distance Fields", "Reactive Planning", "Collision Avoidance", "Cobot", "MediaPipe"],
    thumbnail: "assets/images/projects/idmp-distance-field.webp",
    preview: "assets/videos/previews/idmp.mp4",
    featured: true,
    links: {
      github: "",
      demo: "",
      writeup: ""
    },
    media: [
      { title: { en: "Pick-and-place demo", de: "Pick-and-Place-Demo" }, type: "video", src: "assets/videos/idmp-pickandplace-demo.mp4", poster: "assets/images/projects/posters/idmp-pickandplace-demo.jpg" },
      { title: { en: "Distance-and-gradient field", de: "Distanz-und-Gradientenfeld" }, type: "image", src: "assets/images/projects/idmp-distance-field.webp" },
      { title: { en: "MAiRA 7M cobot at CERI", de: "MAiRA-7M-Cobot am CERI" }, type: "image", src: "assets/images/projects/idmp-hardware-setup.webp" }
    ],
    pipeline: [
      { en: "Stream depth from an Azure Kinect through a TF2 self-filter to remove the arm's own body from the point cloud", de: "Tiefendaten einer Azure Kinect durch einen TF2-Selbstfilter streamen, um den Arm selbst aus der Punktwolke zu entfernen" },
      { en: "Maintain a live distance-and-gradient field around 18 virtual collision points on the arm", de: "Ein Live-Distanz-und-Gradientenfeld um 18 virtuelle Kollisionspunkte am Arm pflegen" },
      { en: "Exploit redundant null-space motion on the 7-DoF MAiRA to dodge obstacles without pausing to re-plan", de: "Redundante Nullraum-Bewegung des 7-DoF-MAiRA nutzen, um Hindernissen auszuweichen, ohne für eine Neuplanung zu pausieren" },
      { en: "Close the reactive control loop at a stable 98-100 Hz", de: "Den reaktiven Regelkreis stabil mit 98-100 Hz schließen" },
      { en: "Drive a MediaPipe hand-gesture interface so an operator can step through the assembly sequence hands-free", de: "Eine MediaPipe-Handgesten-Schnittstelle ansteuern, damit eine Person die Montagesequenz freihändig durchlaufen kann" }
    ]
  },
  {
    id: "hil-serl-lite",
    title: { en: "Xarmony: Human-in-the-Loop Robot RL", de: "Xarmony: Human-in-the-Loop-Roboter-RL" },
    tagline: {
      en: "Human-in-the-loop robot RL rebuilt from scratch, with a flow-matching policy that reaches 84.8% on a LIBERO benchmark task",
      de: "Human-in-the-Loop-Roboter-RL von Grund auf neu gebaut, mit einer Flow-Matching-Policy, die auf einer LIBERO-Benchmark-Aufgabe 84,8 % erreicht"
    },
    description: {
      en: "Xarmony is my from-scratch reimplementation of HIL-SERL (human-in-the-loop, sample-efficient robot RL), written in JAX/Flax and sized for a laptop and MuJoCo instead of a robot fleet. It grew into a research platform: tasks declared in YAML, a one-command demos-to-train-to-eval pipeline with a web dashboard, six robot arms behind one registry, and 20+ switchable methods compared head-to-head, backed by 300+ tests. The recommended recipe is a flow-matching policy over 4-step action chunks in which the critic picks the best of 16 candidates while acting, inside the TD target and at evaluation. On the long-horizon LIBERO put-the-bowl-on-the-plate task SAC scored 0 of 10 in every run, while this recipe reached 84.8% (178/210 episodes, 95% CI 79 to 89%) after 100k steps, and a three-seed ablation shows each piece matters (28.0%, 61.7% and 84.0% at 20k steps). The write-ups keep the negative results too: the earlier agent did its RL at inference time, candidate diversity is still low, and a spiking critic gave no speedup. It was also the subject of my semester report on cross-embodiment generalization and efficient inference.",
      de: "Xarmony ist meine vollständige Neuimplementierung von HIL-SERL (Human-in-the-Loop, sample-effizientes Roboter-RL), geschrieben in JAX/Flax und auf einen Laptop und MuJoCo statt auf eine Roboterflotte zugeschnitten. Daraus wurde eine Forschungsplattform: Aufgaben per YAML deklariert, eine Ein-Befehl-Pipeline von Demos über Training bis Evaluation mit Web-Dashboard, sechs Roboterarme hinter einer Registry und über 20 schaltbare Methoden im direkten Vergleich, abgesichert durch über 300 Tests. Das empfohlene Rezept ist eine Flow-Matching-Policy über 4-Schritt-Aktions-Chunks, bei der der Critic beim Handeln, im TD-Ziel und bei der Evaluation den besten von 16 Kandidaten wählt. Auf der langhorizontigen LIBERO-Aufgabe put-the-bowl-on-the-plate erreichte SAC in jedem Lauf 0 von 10, dieses Rezept dagegen nach 100k Schritten 84,8 % (178/210 Episoden, 95-%-KI 79 bis 89 %), und eine Ablation mit drei Seeds zeigt, dass jeder Baustein zählt (28,0 %, 61,7 % und 84,0 % bei 20k Schritten). Die Dokumentation hält auch die negativen Ergebnisse fest: Der frühere Agent leistete sein RL erst zur Inferenzzeit, die Kandidatenvielfalt ist weiterhin gering, und ein Spiking-Critic brachte keine Beschleunigung. Zudem war es Gegenstand meines Semesterberichts zu Cross-Embodiment-Generalisierung und effizienter Inferenz."
    },
    tags: ["Reinforcement Learning", "JAX/Flax", "MuJoCo", "Flow Matching", "Human-in-the-Loop", "Cross-Embodiment"],
    thumbnail: "assets/images/projects/hil-arm-lineup.webp",
    preview: "assets/videos/hil-panda-pick-place-stack.mp4",
    featured: true,
    links: {
      github: "", // private repository: no "View code" button
      demo: "",
      writeup: "assets/docs/hil-serl-lite-semester1-report.pdf"
    },
    media: [
      { title: { en: "Panda: pick and place (scripted expert)", de: "Panda: Pick and Place (skriptierter Experte)" }, type: "video", src: "assets/videos/hil-panda-pick-place.mp4", poster: "assets/images/projects/posters/hil-panda-pick-place.jpg" },
      { title: { en: "Panda: three-stage pick, place, stack", de: "Panda: dreistufiges Greifen, Ablegen, Stapeln" }, type: "video", src: "assets/videos/hil-panda-pick-place-stack.mp4", poster: "assets/images/projects/posters/hil-panda-pick-place-stack.jpg" },
      { title: { en: "Sawyer: pick and place", de: "Sawyer: Pick and Place" }, type: "video", src: "assets/videos/hil-sawyer-pick-place.mp4", poster: "assets/images/projects/posters/hil-sawyer-pick-place.jpg" },
      { title: { en: "FR3: pick and place", de: "FR3: Pick and Place" }, type: "video", src: "assets/videos/hil-fr3-pick-place.mp4", poster: "assets/images/projects/posters/hil-fr3-pick-place.jpg" },
      { title: { en: "UR5e: lift cube", de: "UR5e: Würfel anheben" }, type: "video", src: "assets/videos/hil-ur5e-lift-cube.mp4", poster: "assets/images/projects/posters/hil-ur5e-lift-cube.jpg" },
      { title: { en: "UR10e: lift cube", de: "UR10e: Würfel anheben" }, type: "video", src: "assets/videos/hil-ur10e-lift-cube.mp4", poster: "assets/images/projects/posters/hil-ur10e-lift-cube.jpg" },
      { title: { en: "xArm7: lift cube", de: "xArm7: Würfel anheben" }, type: "video", src: "assets/videos/hil-xarm7-lift-cube.mp4", poster: "assets/images/projects/posters/hil-xarm7-lift-cube.jpg" },
      { title: { en: "LIBERO-10 benchmark task: bowl into drawer", de: "LIBERO-10-Benchmark-Aufgabe: Schüssel in die Schublade" }, type: "video", src: "assets/videos/hil-libero-bowl-in-drawer.mp4", poster: "assets/images/projects/posters/hil-libero-bowl-in-drawer.jpg" },
      { title: { en: "Results: LIBERO success and ablation", de: "Ergebnisse: LIBERO-Erfolgsrate und Ablation" }, type: "image", src: "assets/images/projects/xarmony-results.webp" },
      { title: { en: "The recommended agent", de: "Der empfohlene Agent" }, type: "image", src: "assets/images/projects/xarmony-final-architecture.webp" },
      { title: { en: "Takeovers go to the demo buffer", de: "Übernahmen landen im Demo-Puffer" }, type: "image", src: "assets/images/projects/xarmony-two-buffer-routing.webp" },
      { title: { en: "Multi-stage tasks: one agent per stage", de: "Mehrstufige Aufgaben: ein Agent pro Stufe" }, type: "image", src: "assets/images/projects/xarmony-multistage-stages.webp" },
      { title: { en: "The collapse no metric showed, and the fix", de: "Der Einbruch, den keine Metrik zeigte, und die Korrektur" }, type: "image", src: "assets/images/projects/xarmony-chaining-regression.webp" },
      { title: { en: "One arm spec format, six arms", de: "Ein Arm-Format, sechs Arme" }, type: "image", src: "assets/images/projects/xarmony-arm-registry.webp" },
      { title: { en: "Six arms, one registry (simulator renders)", de: "Sechs Arme, eine Registry (Simulator-Renderings)" }, type: "image", src: "assets/images/projects/hil-arm-lineup.webp" },
      { title: { en: "Task stages, from reset to success", de: "Aufgabenstufen, vom Reset bis zum Erfolg" }, type: "image", src: "assets/images/projects/hil-task-sequence.webp" },
      { title: { en: "Sawyer grasp fix, before and after", de: "Sawyer-Greifkorrektur, vorher und nachher" }, type: "image", src: "assets/images/projects/hil-sawyer-fix.webp" },
      { title: { en: "Why SAC looks dead, then snaps to success", de: "Warum SAC tot wirkt und dann plötzlich gelingt" }, type: "image", src: "assets/images/projects/xarmony-alpha-gated-plateau.webp" },
      { title: { en: "One-step student collapse and the teacher anchor", de: "Kollaps des Ein-Schritt-Schülers und der Lehrer-Anker" }, type: "image", src: "assets/images/projects/xarmony-distillation-fix.webp" }
    ],
    pipeline: [
      { en: "Hand-written SAC in JAX/Flax with RLPD's 50/50 demo and online replay, and HG-DAgger routing of human takeovers into the demo buffer", de: "Handgeschriebenes SAC in JAX/Flax mit RLPDs 50/50-Replay aus Demos und Online-Daten und HG-DAgger-Routing menschlicher Übernahmen in den Demo-Puffer" },
      { en: "A YAML task compiler builds multi-stage MuJoCo scenes, and a scripted expert makes the whole demos, training and evaluation pipeline runnable with zero human input", de: "Ein YAML-Task-Compiler baut mehrstufige MuJoCo-Szenen, und ein skriptbasierter Experte macht die gesamte Pipeline aus Demos, Training und Evaluation ohne menschliche Eingaben lauffähig" },
      { en: "The recommended agent is a flow-matching policy over 4-step action chunks: the critic picks the best of 16 candidates when acting, in the TD target and at evaluation, with multi-horizon critic targets drawn from the demos", de: "Der empfohlene Agent ist eine Flow-Matching-Policy über 4-Schritt-Aktions-Chunks: Der Critic wählt beim Handeln, im TD-Ziel und bei der Evaluation den besten von 16 Kandidaten, mit Multi-Horizon-Critic-Zielen aus den Demos" },
      { en: "On LIBERO put-the-bowl-on-the-plate, SAC scored 0 of 10 in every run while the recipe reached 84.8% pooled success (178/210 episodes, 95% CI 79 to 89%) at 100k steps", de: "Auf LIBERO put-the-bowl-on-the-plate erreichte SAC in jedem Lauf 0 von 10, während das Rezept nach 100k Schritten 84,8 % gepoolte Erfolgsrate erreichte (178/210 Episoden, 95-%-KI 79 bis 89 %)" },
      { en: "A 3-seed ablation (n=300 episodes per arm, 20k steps) separates the pieces: 28.0% for flow with chunks, 61.7% with best-of-16 acting and targets, 84.0% with multi-horizon critic targets", de: "Eine Ablation mit 3 Seeds (n=300 Episoden pro Variante, 20k Schritte) trennt die Bausteine: 28,0 % für Flow mit Chunks, 61,7 % mit Best-of-16 beim Handeln und in den Zielen, 84,0 % mit Multi-Horizon-Critic-Zielen" },
      { en: "Diagnosed that the earlier flow agent did all of its RL at inference time (86.7% with best-of-16 against 50.0% with the raw sampler, 30 episodes each), which led to best-of-N acting and backups", de: "Festgestellt, dass der frühere Flow-Agent sein gesamtes RL erst zur Inferenzzeit leistete (86,7 % mit Best-of-16 gegenüber 50,0 % mit dem rohen Sampler, je 30 Episoden), woraus Best-of-N beim Handeln und in den Backups wurde" },
      { en: "Per-stage skill chaining fixed a two-stage task that collapsed from 70% to 0% success with nothing visible in the training metrics (20 of 20 chained), and six arms share one registry validated by scripted reachability and grasp probes", de: "Stufenweises Skill-Chaining behob eine zweistufige Aufgabe, die von 70 % auf 0 % Erfolg einbrach, ohne dass die Trainingsmetriken etwas zeigten (20 von 20 gechained), und sechs Arme teilen sich eine Registry, die durch skriptbasierte Reichweiten- und Greif-Tests validiert ist" },
      { en: "Exact hoisted-encoder inference cuts an image-mode training update from 1782 to 604 ms (2.95x), and consistency distillation cuts policy latency 7.74x", de: "Exakte Inferenz mit herausgezogenem Encoder senkt ein Bildmodus-Trainingsupdate von 1782 auf 604 ms (2,95-fach), und Consistency-Distillation senkt die Policy-Latenz um das 7,74-Fache" },
      { en: "Negative results are kept in: a second LIBERO task reaches 46% against a 3% baseline (one seed), candidate diversity is only about 7% of the maximum, and a spiking critic gave no speedup", de: "Negative Ergebnisse bleiben drin: Eine zweite LIBERO-Aufgabe erreicht 46 % gegenüber 3 % beim Baseline (ein Seed), die Kandidatenvielfalt liegt nur bei etwa 7 % des Maximums, und ein Spiking-Critic brachte keine Beschleunigung" }
    ]
  },
  {
    id: "sinew",
    title: { en: "Sinew: Shared ROS 2 Robotics Library", de: "Sinew: Gemeinsame ROS-2-Robotikbibliothek" },
    tagline: {
      en: "The reusable motion-planning, servoing and force-control layer that seven robotics packages build on",
      de: "Die wiederverwendbare Ebene für Bewegungsplanung, Servoing und Kraftregelung, auf der sieben Robotik-Pakete aufbauen"
    },
    description: {
      en: "Seven packages in one robotics workcell each needed to plan a motion, drive a gripper or run a ROS 2 executor, so I maintain the shared library they all depend on, under one rule: code only lands here once two or more projects need it. It wraps MoveIt's services in a roughly 3,000-line motion-planning module (multi-robot requests, partial joint specs), binds MoveIt 2's own C++ time-optimal trajectory generation and Ruckig jerk-limited smoothing into Python through pybind11, manages MoveIt Servo's lifecycle, and implements admittance and compliance force control with one client interface across Franka, OnRobot and Schunk grippers. I re-ported the trajectory bridges against MoveIt 2's real Humble headers, which surfaced and fixed six genuine API mismatches, and made failures raise explicit errors instead of silently falling back to approximate motion. Sixteen runnable examples and enforced docstring and typing checks keep it legible for its consumers.",
      de: "Sieben Pakete einer Robotik-Arbeitszelle müssen jeweils Bewegungen planen, Greifer ansteuern oder einen ROS-2-Executor betreiben, daher pflege ich die gemeinsame Bibliothek, von der alle abhängen, nach einer Regel: Code kommt erst hierher, wenn mindestens zwei Projekte ihn brauchen. Sie kapselt MoveIt-Dienste in einem rund 3.000 Zeilen großen Bewegungsplanungsmodul (Multi-Roboter-Anfragen, partielle Gelenkangaben), bindet MoveIt-2-eigene C++-Algorithmen für zeitoptimale Trajektorien und Ruckig-Glättung mit Ruck-Begrenzung per pybind11 an Python an, verwaltet den MoveIt-Servo-Lebenszyklus und implementiert Admittanz- und Nachgiebigkeitsregelung mit einer einheitlichen Client-Schnittstelle für Franka-, OnRobot- und Schunk-Greifer. Ich habe die Trajektorien-Bindings gegen die echten MoveIt-2-Humble-Header neu portiert, was sechs echte API-Abweichungen aufdeckte und behob, und Fehler lösen nun explizite Exceptions aus, statt still auf ungefähre Bewegungen zurückzufallen. Sechzehn lauffähige Beispiele und erzwungene Docstring- und Typprüfungen halten sie für ihre Nutzer verständlich."
    },
    tags: ["ROS2", "MoveIt 2", "pybind11", "Motion Planning", "Force Control", "Python/C++"],
    thumbnail: "assets/images/projects/sinew-consumers.svg",
    featured: true,
    links: {
      github: "",
      demo: "",
      writeup: ""
    },
    media: [
      { title: { en: "One library, seven consumers", de: "Eine Bibliothek, sieben Nutzer" }, type: "image", src: "assets/images/projects/sinew-consumers.svg" },
      { title: { en: "What Sinew provides", de: "Was Sinew bereitstellt" }, type: "image", src: "assets/images/projects/sinew-modules.svg" }
    ],
    pipeline: [
      { en: "Plan joint and Cartesian motions through one MoveIt wrapper, for one robot or several in a single request", de: "Gelenk- und kartesische Bewegungen über einen MoveIt-Wrapper planen, für einen oder mehrere Roboter in einer Anfrage" },
      { en: "Generate time-optimal trajectories (TOTG) and smooth them under jerk limits (Ruckig) via pybind11 bridges to MoveIt 2's C++ code", de: "Zeitoptimale Trajektorien (TOTG) erzeugen und unter Ruckbegrenzung glätten (Ruckig), über pybind11-Brücken zu MoveIt-2-C++-Code" },
      { en: "Run MoveIt Servo as a managed subprocess with joint-jog, Cartesian-twist and target-pose modes", de: "MoveIt Servo als verwalteten Subprozess betreiben, mit Gelenk-Jog-, kartesischem Twist- und Zielpose-Modus" },
      { en: "Apply admittance and compliance control, and swap grippers by swapping a client class", de: "Admittanz- und Nachgiebigkeitsregelung anwenden und Greifer durch Austausch einer Client-Klasse wechseln" }
    ]
  },
  {
    id: "drone-radar-camera-fusion",
    title: { en: "Radar-Camera Fusion & Tracking for UAVs", de: "Radar-Kamera-Fusion & Tracking für Drohnen" },
    tagline: {
      en: "Fusing 4D radar and camera for multi-object tracking in flight (ongoing Master's thesis)",
      de: "4D-Radar und Kamera für Multi-Objekt-Tracking im Flug fusionieren (laufende Masterarbeit)"
    },
    description: {
      en: "For my Master's thesis I'm building a radar-camera fusion and multi-object tracking stack for a UAV: a Continental ARS548 4D radar and an Intel RealSense D435i feed a Hungarian-matching fusion node, and a ByteTrack-based multi-object tracker uses the radar's Doppler velocity directly in its Kalman update. It runs on an Avular Vertex One drone (Jetson Orin NX) with hardware time-sync (gPTP) between sensors, and it's still very much in progress.",
      de: "Für meine Masterarbeit baue ich einen Radar-Kamera-Fusions- und Multi-Objekt-Tracking-Stack für eine Drohne: Ein 4D-Radar Continental ARS548 und eine Intel-RealSense-D435i-Kamera speisen einen Fusionsknoten mit ungarischem Matching, und ein ByteTrack-basierter Multi-Objekt-Tracker nutzt die Doppler-Geschwindigkeit des Radars direkt in seinem Kalman-Update. Das System läuft auf einer Avular-Vertex-One-Drohne (Jetson Orin NX) mit hardwareseitiger Zeitsynchronisation (gPTP) zwischen den Sensoren und befindet sich noch deutlich in Arbeit."
    },
    tags: ["Sensor Fusion", "Computer Vision", "Multi-Object Tracking", "UAV", "In Progress"],
    thumbnail: "assets/images/projects/drone-radar-fusion-overlay.webp",
    featured: true,
    links: {
      github: "", // private repository: no "View code" button
      demo: "",
      writeup: ""
    },
    media: [
      { title: { en: "Radar-camera overlay (corridor test)", de: "Radar-Kamera-Überlagerung (Flurtest)" }, type: "image", src: "assets/images/projects/drone-radar-fusion-overlay.webp" }
    ]
  },
  {
    id: "vision-guided-socket-insertion",
    title: { en: "Vision-Guided Robotic Socket Insertion", de: "Bildgestützte Roboter-Steckdoseneinführung" },
    tagline: {
      en: "Camera-guided assembly with a live vision-based reward classifier",
      de: "Kamerageführte Montage mit einem live bildbasierten Belohnungsklassifikator"
    },
    description: {
      en: "A robotic assembly cell that performs precision socket insertion guided entirely by vision: a Detectron2 segmentation model locates the part, SIFT feature matching plus RANSAC refines its pose against a reference, and an onscreen HMI runs a vision-based reward classifier to confirm each insertion. Across a validation set of 34 labeled instances, the segmentation model reached a mean mask IoU of 0.964; in a continuous 30-minute robot session, 25 of 27 insertion cycles completed with no manual correction.",
      de: "Eine Roboter-Montagezelle, die eine präzise Steckdoseneinführung vollständig bildgestützt durchführt: Ein Detectron2-Segmentierungsmodell lokalisiert das Bauteil, SIFT-Merkmalsabgleich plus RANSAC verfeinert dessen Pose gegenüber einer Referenz, und eine Bildschirm-HMI führt einen bildbasierten Belohnungsklassifikator aus, um jede Einführung zu bestätigen. Über einen Validierungssatz von 34 gelabelten Instanzen erreichte das Segmentierungsmodell eine mittlere Masken-IoU von 0,964; in einer durchgehenden 30-minütigen Robotersitzung liefen 25 von 27 Einführungszyklen ohne manuelle Korrektur ab."
    },
    tags: ["Computer Vision", "Detectron2", "Robotic Assembly", "HMI"],
    thumbnail: "assets/images/projects/socket-detector-workflow.webp",
    preview: "assets/videos/previews/socket-insertion.mp4",
    featured: true,
    links: {
      github: "",
      demo: "",
      writeup: ""
    },
    media: [
      { title: { en: "Insertion demo", de: "Einführungs-Demo" }, type: "video", src: "assets/videos/socket-insertion-demo.mp4", poster: "assets/images/projects/posters/socket-insertion-demo.jpg" },
      { title: { en: "Pipeline overview", de: "Pipeline-Übersicht" }, type: "image", src: "assets/images/projects/socket-detector-workflow.webp" },
      { title: { en: "Raw camera view", de: "Rohes Kamerabild" }, type: "image", src: "assets/images/projects/socket-detector-raw.webp" },
      { title: { en: "Segmentation mask", de: "Segmentierungsmaske" }, type: "image", src: "assets/images/projects/socket-detector-mask.webp" },
      { title: { en: "IoU across validation set", de: "IoU über den Validierungssatz" }, type: "image", src: "assets/images/projects/socket-detector-iou-results.webp" }
    ],
    pipeline: [
      { en: "Detectron2 segmentation model locates the socket in the camera frame", de: "Ein Detectron2-Segmentierungsmodell lokalisiert die Steckdose im Kamerabild" },
      { en: "SIFT feature matching plus RANSAC refines the detected pose against a reference template", de: "SIFT-Merkmalsabgleich plus RANSAC verfeinert die erkannte Pose gegenüber einer Referenzvorlage" },
      { en: "A vision-based reward classifier confirms successful insertion on an HMI overlay", de: "Ein bildbasierter Belohnungsklassifikator bestätigt die erfolgreiche Einführung auf einer HMI-Einblendung" },
      { en: "Validated at 0.964 mean mask IoU across 34 labeled instances; 25 of 27 insertion cycles with no manual correction in a 30-minute session", de: "Validiert mit 0,964 mittlerer Masken-IoU über 34 gelabelte Instanzen; 25 von 27 Einführungszyklen ohne manuelle Korrektur in einer 30-minütigen Sitzung" }
    ]
  },
  {
    id: "ros2-autonomous-explorer",
    title: { en: "Autonomous Frontier Explorer", de: "Autonomer Frontier-Explorer" },
    tagline: {
      en: "Multi-sensor SLAM and next-best-view exploration in ROS 2",
      de: "Multi-Sensor-SLAM und Next-Best-View-Exploration in ROS 2"
    },
    description: {
      en: "An autonomous exploration robot in ROS 2 that fuses LiDAR, radar, and RGB-D depth into a single scan, builds a 2D occupancy map with SLAM Toolbox and Nav2, and continuously computes the next-best viewpoint to maximize frontier coverage of an unknown environment. On top of that navigation stack sits a Stable Baselines3 PPO policy layer, which I use as a testbed for reinforcement learning.",
      de: "Ein autonomer Explorationsroboter in ROS 2, der LiDAR, Radar und RGB-D-Tiefe zu einem einzigen Scan fusioniert, mit SLAM Toolbox und Nav2 eine 2D-Belegungskarte aufbaut und fortlaufend den nächstbesten Blickpunkt berechnet, um die Frontier-Abdeckung einer unbekannten Umgebung zu maximieren. Auf diesem Navigations-Stack sitzt eine PPO-Policy-Schicht von Stable Baselines3, die ich als Testumgebung für Verstärkungslernen nutze."
    },
    tags: ["ROS2", "SLAM", "Nav2", "Reinforcement Learning", "Gazebo"],
    thumbnail: "assets/images/projects/ros2-explorer-gazebo.webp",
    preview: "assets/videos/previews/ros2-explorer.mp4",
    featured: false,
    links: {
      github: "https://github.com/Kartikdangi1/ros2-autonomous-explorer",
      demo: "",
      writeup: ""
    },
    media: [
      { title: { en: "Exploration demo", de: "Explorations-Demo" }, type: "video", src: "assets/videos/ros2-explorer-demo.mp4", poster: "assets/images/projects/posters/ros2-explorer-demo.jpg" }
    ]
  }
];

export const hasVideo = (p: Project): boolean => p.media.some((m) => m.type === "video");

/** Video projects first, everything else below (array order kept within each group). */
export const sortedProjects = (): Project[] =>
  [...projects].sort((a, b) => Number(hasVideo(b)) - Number(hasVideo(a)));
