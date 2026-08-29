/**
 * ============================================================================
 *  PROJECT DATA — the only file you need to edit to add/update a project.
 * ============================================================================
 *
 * HOW TO ADD A NEW PROJECT
 * ------------------------
 * 1. Copy one of the objects in the PROJECTS array below and paste it at the
 *    top (so it shows up first) or bottom of the array.
 * 2. Fill in the fields (see the reference below).
 * 3. Save. No build step, no restart — just refresh the page.
 *
 * HOW TO ADD MEDIA (VIDEO OR IMAGE) TO A PROJECT
 * ------------------------------------------------
 * Every project has a `media` array. Add one entry per item — it can be a
 * video, a YouTube embed, or a plain image (useful for architecture diagrams
 * or result figures when you don't have a video yet):
 *
 *   YouTube video:
 *     { title: "Live demo", type: "youtube", id: "dQw4w9WgXcQ" }
 *     ^ the `id` is the part after "v=" in the YouTube URL.
 *
 *   Local video file (put the file in assets/videos/):
 *     { title: "Training run", type: "video", src: "assets/videos/my-clip.mp4",
 *       poster: "assets/images/projects/my-poster.jpg" }
 *     ^ `poster` is optional — a still frame shown before the video plays.
 *     ^ `speed` is optional — a playback-rate multiplier (e.g. 2 for 2x) for
 *       footage that's slower-paced than you want visitors to sit through.
 *
 *   Image (local file or a full URL):
 *     { title: "System architecture", type: "image", src: "assets/images/projects/my-diagram.png" }
 *
 * A project can mix any number of these — they show up as tabs in the modal
 * that opens when the project card is clicked. A project with an empty
 * `media: []` array shows a friendly "coming soon" placeholder instead of a
 * broken player, so it's safe to add a project before you have footage.
 *
 * FIELD REFERENCE
 * ----------------
 *   id          string   unique slug, used internally (no spaces)
 *   title       string   project name
 *   tagline     string   one-line hook shown under the title
 *   description string   1-3 sentence summary shown on the card / modal
 *   tags        string[] short skill/topic labels (rendered as pills)
 *   accent      string   CSS gradient (from, to) used for the card artwork
 *                        when no thumbnail image is set — pick any two hex
 *                        colors, or reuse one of the presets below
 *   thumbnail   string?  optional path to a real screenshot/image, e.g.
 *                        "assets/images/projects/my-shot.jpg". If omitted,
 *                        the `accent` gradient + first tag is shown instead.
 *   featured    boolean  true = shown larger / first in the grid
 *   links       object   { github, demo, writeup } — any can be omitted or ""
 *   media       array    see above
 *   pipeline    string[]? optional — short technical steps shown as a
 *                        numbered "How it works" list in the modal, for
 *                        projects worth breaking down stage by stage.
 *                        Omit entirely if the description already covers it.
 */

const PROJECTS = [
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
    accent: ["#ff8a3d", "#ff5d3d"],
    thumbnail: "assets/images/projects/radar-mapping-room-map.png",
    featured: true,
    links: {
      github: "https://github.com/Kartikdangi1/radar-indoor-mapping-uav",
      demo: "",
      writeup: ""
    },
    media: [
      { title: { en: "System architecture", de: "Systemarchitektur" }, type: "image", src: "assets/images/projects/radar-mapping-system-arch.png" },
      { title: { en: "Room map result", de: "Ergebnis: Raumkarte" }, type: "image", src: "assets/images/projects/radar-mapping-room-map.png" },
      { title: { en: "Corridor map result", de: "Ergebnis: Flurkarte" }, type: "image", src: "assets/images/projects/radar-mapping-corridor-map.png" },
      { title: { en: "Occlusion filtering", de: "Verdeckungsfilterung" }, type: "image", src: "assets/images/projects/radar-mapping-occlusion.png" },
      { title: { en: "UAV + radar payload", de: "Drohne mit Radar-Nutzlast" }, type: "image", src: "assets/images/projects/radar-mapping-drone-hw.jpeg" }
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
    accent: ["#22d3ee", "#c026d3"],
    thumbnail: "assets/images/projects/idmp-distance-field.png",
    featured: true,
    links: {
      github: "",
      demo: "",
      writeup: ""
    },
    media: [
      { title: { en: "Pick-and-place demo", de: "Pick-and-Place-Demo" }, type: "video", src: "assets/videos/idmp-pickandplace-demo.mp4", poster: "assets/images/projects/idmp-distance-field.png", speed: 2 },
      { title: { en: "Distance-and-gradient field", de: "Distanz-und-Gradientenfeld" }, type: "image", src: "assets/images/projects/idmp-distance-field.png" },
      { title: { en: "MAiRA 7M cobot at CERI", de: "MAiRA-7M-Cobot am CERI" }, type: "image", src: "assets/images/projects/idmp-hardware-setup.png" }
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
    title: "HIL-SERL Lite",
    tagline: {
      en: "A human-in-the-loop RL research platform, rebuilt from scratch to run on a laptop",
      de: "Eine Human-in-the-Loop-RL-Forschungsplattform, von Grund auf neu gebaut, um auf einem Laptop zu laufen"
    },
    description: {
      en: "I built a full reimplementation of HIL-SERL (human-in-the-loop, sample-efficient robot RL), with hand-written SAC in JAX/Flax, RLPD's dual-buffer replay, and HG-DAgger intervention routing. It runs against a simulated Franka Panda in MuJoCo instead of a real robot fleet, and it grew into a small research platform along the way: YAML-declared manipulation tasks, a one-command pipeline from demos to training to evaluation with a built-in web dashboard, and 20+ swappable RL methods (Q-chunking, flow-matching policies, domain randomization, and more), all benchmarked head-to-head on the same tasks and backed by 112+ tests.",
      de: "Ich habe eine vollständige Neuimplementierung von HIL-SERL (Human-in-the-Loop, sample-effizientes Roboter-RL) gebaut, mit handgeschriebenem SAC in JAX/Flax, RLPD-Dual-Buffer-Replay und HG-DAgger-Interventions-Routing. Sie läuft gegen einen simulierten Franka Panda in MuJoCo statt gegen eine echte Roboterflotte und ist dabei zu einer kleinen Forschungsplattform herangewachsen: YAML-deklarierte Manipulationsaufgaben, eine Ein-Befehl-Pipeline von Demonstrationen über Training bis Evaluation mit einem eingebauten Web-Dashboard sowie über 20 austauschbare RL-Methoden (Q-Chunking, Flow-Matching-Policies, Domain Randomization und mehr), die alle auf denselben Aufgaben direkt gegeneinander verglichen und durch über 112 Tests abgesichert werden."
    },
    tags: ["Reinforcement Learning", "JAX/Flax", "MuJoCo", "Human-in-the-Loop"],
    accent: ["#ff5d3d", "#c2410c"],
    thumbnail: "assets/images/projects/hil-serl-pipeline.svg",
    featured: true,
    links: {
      github: "https://github.com/Kartikdangi1/hil_serl_lite",
      demo: "",
      writeup: ""
    },
    media: [
      { title: { en: "Actor-critic loop", de: "Actor-Critic-Regelkreis" }, type: "image", src: "assets/images/projects/hil-serl-pipeline.svg" }
    ],
    pipeline: [
      { en: "Hand-written SAC actor-critic in JAX/Flax as the base RL algorithm", de: "Handgeschriebener SAC-Actor-Critic in JAX/Flax als RL-Basisalgorithmus" },
      { en: "RLPD's dual-buffer replay mixes offline demonstrations with online experience", de: "RLPD-Dual-Buffer-Replay mischt Offline-Demonstrationen mit Online-Erfahrung" },
      { en: "HG-DAgger intervention routing lets a human take over mid-episode and folds the correction back into training", de: "HG-DAgger-Interventions-Routing lässt einen Menschen mitten in der Episode eingreifen und die Korrektur zurück ins Training einfließen" },
      { en: "20+ swappable extensions (Q-chunking, flow-matching policies, domain randomization) benchmarked head-to-head on the same MuJoCo tasks", de: "Über 20 austauschbare Erweiterungen (Q-Chunking, Flow-Matching-Policies, Domain Randomization), direkt gegeneinander auf denselben MuJoCo-Aufgaben verglichen" }
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
    accent: ["#f97316", "#7c2d12"],
    thumbnail: "assets/images/projects/drone-radar-fusion-overlay.png",
    featured: true,
    links: {
      github: "https://github.com/Kartikdangi1/drone-radar-camera-fusion",
      demo: "",
      writeup: ""
    },
    media: [
      { title: { en: "Radar-camera overlay (corridor test)", de: "Radar-Kamera-Überlagerung (Flurtest)" }, type: "image", src: "assets/images/projects/drone-radar-fusion-overlay.png" }
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
    accent: ["#fbbf24", "#d97706"],
    thumbnail: "assets/images/projects/socket-detector-workflow.png",
    featured: true,
    links: {
      github: "",
      demo: "",
      writeup: ""
    },
    media: [
      { title: { en: "Insertion demo", de: "Einführungs-Demo" }, type: "video", src: "assets/videos/socket-insertion-demo.mp4", poster: "assets/images/projects/socket-detector-workflow.png" },
      { title: { en: "Pipeline overview", de: "Pipeline-Übersicht" }, type: "image", src: "assets/images/projects/socket-detector-workflow.png" },
      { title: { en: "Raw camera view", de: "Rohes Kamerabild" }, type: "image", src: "assets/images/projects/socket-detector-raw.jpg" },
      { title: { en: "Segmentation mask", de: "Segmentierungsmaske" }, type: "image", src: "assets/images/projects/socket-detector-mask.jpg" },
      { title: { en: "IoU across validation set", de: "IoU über den Validierungssatz" }, type: "image", src: "assets/images/projects/socket-detector-iou-results.png" }
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
    accent: ["#94a3b8", "#334155"],
    thumbnail: "assets/images/projects/ros2-explorer-gazebo.png",
    featured: false,
    links: {
      github: "https://github.com/Kartikdangi1/ros2-autonomous-explorer",
      demo: "",
      writeup: ""
    },
    media: [
      { title: { en: "Exploration demo", de: "Explorations-Demo" }, type: "video", src: "assets/videos/ros2-explorer-demo.mp4", poster: "assets/images/projects/ros2-explorer-gazebo.png" }
    ]
  },
  {
    id: "phone-drone",
    title: { en: "Phone-as-Sensor Drone Control", de: "Smartphone-als-Sensor-Drohnensteuerung" },
    tagline: {
      en: "An Android phone as a drone's VIO sensor and gesture controller",
      de: "Ein Android-Smartphone als VIO-Sensor und Gestensteuerung einer Drohne"
    },
    description: {
      en: "A pipeline that turns an ordinary Android phone into a drone's sensor and controller: the phone's IMU and camera stream over WiFi into ROS 2, OpenVINS turns that into visual-inertial odometry fed to PX4 as external vision, and MediaPipe hand-gesture recognition on the same video feed drives arm/takeoff/land and directional flight commands over MAVROS.",
      de: "Eine Pipeline, die ein gewöhnliches Android-Smartphone in Sensor und Steuerung einer Drohne verwandelt: IMU und Kamera des Smartphones streamen per WLAN in ROS 2, OpenVINS macht daraus eine visuell-inertiale Odometrie, die PX4 als externe Vision zugeführt wird, und eine MediaPipe-Handgestenerkennung auf demselben Videostream steuert Arm/Start/Landung sowie Richtungsbefehle über MAVROS."
    },
    tags: ["PX4", "MAVROS", "OpenVINS", "MediaPipe", "ROS2"],
    accent: ["#38bdf8", "#0369a1"],
    thumbnail: "assets/images/projects/phone-drone-pipeline.svg",
    featured: false,
    links: {
      github: "https://github.com/Kartikdangi1/phone-drone",
      demo: "",
      writeup: ""
    },
    media: [
      { title: { en: "Sensor & control pipeline", de: "Sensor- und Steuerungspipeline" }, type: "image", src: "assets/images/projects/phone-drone-pipeline.svg" }
    ]
  },
  {
    id: "hand-tracking-simulation",
    title: { en: "Camera-Driven Robotic Hand Tracking", de: "Kameragestütztes Roboter-Hand-Tracking" },
    tagline: {
      en: "MediaPipe hand tracking driving a simulated DexHand",
      de: "MediaPipe-Hand-Tracking steuert eine simulierte DexHand"
    },
    description: {
      en: "A ROS 2 node that drives a DexHand robotic hand model from MediaPipe hand tracking on a live camera feed. It derives finger flexion and abduction angles directly from landmark geometry instead of relying on noisy quaternion orientation, and uses tuned One-Euro filtering plus hold-last-pose logic to keep the joint-state stream smooth through brief tracking loss.",
      de: "Ein ROS-2-Knoten, der ein DexHand-Robotermodell per MediaPipe-Hand-Tracking aus einem Live-Kamerabild ansteuert. Er leitet Beuge- und Spreizwinkel der Finger direkt aus der Landmark-Geometrie ab, statt sich auf verrauschte Quaternion-Orientierung zu verlassen, und nutzt abgestimmte One-Euro-Filterung plus Hold-Last-Pose-Logik, um den Joint-State-Stream auch bei kurzem Tracking-Verlust ruhig zu halten."
    },
    tags: ["ROS2", "MediaPipe", "Computer Vision", "Robotics"],
    accent: ["#a78bfa", "#5b21b6"],
    thumbnail: "assets/images/projects/hand-tracking-landmarks.svg",
    featured: false,
    links: {
      github: "https://github.com/Kartikdangi1/hand_tracking_simulation",
      demo: "",
      writeup: ""
    },
    media: [
      { title: { en: "Hand landmark tracking", de: "Hand-Landmark-Tracking" }, type: "image", src: "assets/images/projects/hand-tracking-landmarks.svg" }
    ]
  }
];

// Reusable accent-color presets — feel free to use these instead of picking
// your own hex values when adding a project.
const ACCENT_PRESETS = {
  orange: ["#ff8a3d", "#ff5d3d"],
  ember: ["#ff5d3d", "#c2410c"],
  rust: ["#f97316", "#7c2d12"],
  amber: ["#fbbf24", "#d97706"],
  slate: ["#94a3b8", "#334155"],
  sky: ["#38bdf8", "#0369a1"],
  violet: ["#a78bfa", "#5b21b6"],
  cyan: ["#22d3ee", "#c026d3"]
};
