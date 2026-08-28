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
    title: "Radar-Based Indoor Mapping for UAVs",
    tagline: "Real-time occupancy mapping from 4D radar alone: no GPS, no camera, no LiDAR map",
    description:
      "My Bachelor's thesis at THWS Schweinfurt: a ROS 2 system that turns a Continental ARS548 4D automotive radar into a real-time indoor occupancy-mapping tool for a UAV, so it keeps working in GPS-denied space and through smoke, dust, or darkness. Fused odometry (Madgwick IMU, RANSAC Doppler ego-velocity, and LiDAR height) feeds a GICP SLAM pipeline with loop closure, while a separate radar path builds a temporal Bayesian occupancy grid with occlusion filtering. The full pipeline runs end to end in roughly 150 ms on an NVIDIA Jetson Orin NX.",
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
      { title: "System architecture", type: "image", src: "assets/images/projects/radar-mapping-system-arch.png" },
      { title: "Room map result", type: "image", src: "assets/images/projects/radar-mapping-room-map.png" },
      { title: "Corridor map result", type: "image", src: "assets/images/projects/radar-mapping-corridor-map.png" },
      { title: "Occlusion filtering", type: "image", src: "assets/images/projects/radar-mapping-occlusion.png" },
      { title: "UAV + radar payload", type: "image", src: "assets/images/projects/radar-mapping-drone-hw.jpeg" }
    ],
    pipeline: [
      "Fuse Madgwick IMU, RANSAC Doppler ego-velocity, and LiDAR height into one odometry estimate",
      "Feed that into a GICP SLAM pipeline with loop closure for drift-free pose tracking",
      "Build a temporal Bayesian occupancy grid from raw radar returns, with occlusion filtering to suppress multipath ghosts",
      "Run the full stack end to end in roughly 150 ms on a Jetson Orin NX"
    ]
  },
  {
    id: "idmp-cobot",
    title: "Interactive Distance Field Mapping and Planning (IDMP)",
    tagline: "Reactive, real-time collision avoidance for a 7-DoF cobot from a live distance-and-gradient field",
    description:
      "A university project at CERI (Center for Robotics, THWS Würzburg-Schweinfurt): I migrated an existing IDMP stack from ROS 1 on a 6-DoF UR5e to ROS 2 on a 7-DoF NEURA MAiRA cobot, rebuilding the collision pipeline around an Azure Kinect depth camera with a TF2 self-filter, 18 virtual collision points, and null-space exploitation for a stable 98-100 Hz control loop that reacts to obstacles as they move instead of pausing to re-plan. I also added a MediaPipe-based worker guidance system so an operator can step through an assembly sequence hands-free with hand gestures, backed by a projector overlay for live feedback on the bench.",
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
      { title: "Pick-and-place demo", type: "video", src: "assets/videos/idmp-pickandplace-demo.mp4", poster: "assets/images/projects/idmp-distance-field.png", speed: 2 },
      { title: "Distance-and-gradient field", type: "image", src: "assets/images/projects/idmp-distance-field.png" },
      { title: "MAiRA 7M cobot at CERI", type: "image", src: "assets/images/projects/idmp-hardware-setup.png" }
    ],
    pipeline: [
      "Stream depth from an Azure Kinect through a TF2 self-filter to remove the arm's own body from the point cloud",
      "Maintain a live distance-and-gradient field around 18 virtual collision points on the arm",
      "Exploit redundant null-space motion on the 7-DoF MAiRA to dodge obstacles without pausing to re-plan",
      "Close the reactive control loop at a stable 98-100 Hz",
      "Drive a MediaPipe hand-gesture interface so an operator can step through the assembly sequence hands-free"
    ]
  },
  {
    id: "hil-serl-lite",
    title: "HIL-SERL Lite",
    tagline: "A human-in-the-loop RL research platform, rebuilt from scratch to run on a laptop",
    description:
      "I built a full reimplementation of HIL-SERL (human-in-the-loop, sample-efficient robot RL), with hand-written SAC in JAX/Flax, RLPD's dual-buffer replay, and HG-DAgger intervention routing. It runs against a simulated Franka Panda in MuJoCo instead of a real robot fleet, and it grew into a small research platform along the way: YAML-declared manipulation tasks, a one-command pipeline from demos to training to evaluation with a built-in web dashboard, and 20+ swappable RL methods (Q-chunking, flow-matching policies, domain randomization, and more), all benchmarked head-to-head on the same tasks and backed by 112+ tests.",
    tags: ["Reinforcement Learning", "JAX/Flax", "MuJoCo", "Human-in-the-Loop"],
    accent: ["#ff5d3d", "#c2410c"],
    thumbnail: "",
    featured: true,
    links: {
      github: "https://github.com/Kartikdangi1/hil_serl_lite",
      demo: "",
      writeup: ""
    },
    media: [],
    pipeline: [
      "Hand-written SAC actor-critic in JAX/Flax as the base RL algorithm",
      "RLPD's dual-buffer replay mixes offline demonstrations with online experience",
      "HG-DAgger intervention routing lets a human take over mid-episode and folds the correction back into training",
      "20+ swappable extensions (Q-chunking, flow-matching policies, domain randomization) benchmarked head-to-head on the same MuJoCo tasks"
    ]
  },
  {
    id: "drone-radar-camera-fusion",
    title: "Radar-Camera Fusion & Tracking for UAVs",
    tagline: "Fusing 4D radar and camera for multi-object tracking in flight (ongoing Master's thesis)",
    description:
      "For my Master's thesis I'm building a radar-camera fusion and multi-object tracking stack for a UAV: a Continental ARS548 4D radar and an Intel RealSense D435i feed a Hungarian-matching fusion node, and a ByteTrack-based multi-object tracker uses the radar's Doppler velocity directly in its Kalman update. It runs on an Avular Vertex One drone (Jetson Orin NX) with hardware time-sync (gPTP) between sensors, and it's still very much in progress.",
    tags: ["Sensor Fusion", "Computer Vision", "Multi-Object Tracking", "UAV", "In Progress"],
    accent: ["#f97316", "#7c2d12"],
    thumbnail: "",
    featured: true,
    links: {
      github: "https://github.com/Kartikdangi1/drone-radar-camera-fusion",
      demo: "",
      writeup: ""
    },
    media: []
  },
  {
    id: "vision-guided-socket-insertion",
    title: "Vision-Guided Robotic Socket Insertion",
    tagline: "Camera-guided assembly with a live vision-based reward classifier",
    description:
      "A robotic assembly cell that performs precision socket insertion guided entirely by vision: a Detectron2 segmentation model locates the part, SIFT feature matching plus RANSAC refines its pose against a reference, and an onscreen HMI runs a vision-based reward classifier to confirm each insertion. Across a validation set of 34 labeled instances, the segmentation model reached a mean mask IoU of 0.964; in a continuous 30-minute robot session, 25 of 27 insertion cycles completed with no manual correction.",
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
      { title: "Insertion demo", type: "video", src: "assets/videos/socket-insertion-demo.mp4", poster: "assets/images/projects/socket-detector-workflow.png" },
      { title: "Pipeline overview", type: "image", src: "assets/images/projects/socket-detector-workflow.png" },
      { title: "Raw camera view", type: "image", src: "assets/images/projects/socket-detector-raw.jpg" },
      { title: "Segmentation mask", type: "image", src: "assets/images/projects/socket-detector-mask.jpg" },
      { title: "IoU across validation set", type: "image", src: "assets/images/projects/socket-detector-iou-results.png" }
    ],
    pipeline: [
      "Detectron2 segmentation model locates the socket in the camera frame",
      "SIFT feature matching plus RANSAC refines the detected pose against a reference template",
      "A vision-based reward classifier confirms successful insertion on an HMI overlay",
      "Validated at 0.964 mean mask IoU across 34 labeled instances; 25 of 27 insertion cycles with no manual correction in a 30-minute session"
    ]
  },
  {
    id: "ros2-autonomous-explorer",
    title: "Autonomous Frontier Explorer",
    tagline: "Multi-sensor SLAM and next-best-view exploration in ROS 2",
    description:
      "An autonomous exploration robot in ROS 2 that fuses LiDAR, radar, and RGB-D depth into a single scan, builds a 2D occupancy map with SLAM Toolbox and Nav2, and continuously computes the next-best viewpoint to maximize frontier coverage of an unknown environment. On top of that navigation stack sits a Stable Baselines3 PPO policy layer, which I use as a testbed for reinforcement learning.",
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
      { title: "Exploration demo", type: "video", src: "assets/videos/ros2-explorer-demo.mp4", poster: "assets/images/projects/ros2-explorer-gazebo.png" }
    ]
  },
  {
    id: "phone-drone",
    title: "Phone-as-Sensor Drone Control",
    tagline: "An Android phone as a drone's VIO sensor and gesture controller",
    description:
      "A pipeline that turns an ordinary Android phone into a drone's sensor and controller: the phone's IMU and camera stream over WiFi into ROS 2, OpenVINS turns that into visual-inertial odometry fed to PX4 as external vision, and MediaPipe hand-gesture recognition on the same video feed drives arm/takeoff/land and directional flight commands over MAVROS.",
    tags: ["PX4", "MAVROS", "OpenVINS", "MediaPipe", "ROS2"],
    accent: ["#38bdf8", "#0369a1"],
    thumbnail: "",
    featured: false,
    links: {
      github: "https://github.com/Kartikdangi1/phone-drone",
      demo: "",
      writeup: ""
    },
    media: []
  },
  {
    id: "hand-tracking-simulation",
    title: "Camera-Driven Robotic Hand Tracking",
    tagline: "MediaPipe hand tracking driving a simulated DexHand",
    description:
      "A ROS 2 node that drives a DexHand robotic hand model from MediaPipe hand tracking on a live camera feed. It derives finger flexion and abduction angles directly from landmark geometry instead of relying on noisy quaternion orientation, and uses tuned One-Euro filtering plus hold-last-pose logic to keep the joint-state stream smooth through brief tracking loss.",
    tags: ["ROS2", "MediaPipe", "Computer Vision", "Robotics"],
    accent: ["#a78bfa", "#5b21b6"],
    thumbnail: "https://github.com/user-attachments/assets/1799c15a-936a-4b31-93a5-759c074c7313",
    featured: false,
    links: {
      github: "https://github.com/Kartikdangi1/hand_tracking_simulation",
      demo: "",
      writeup: ""
    },
    media: [
      { title: "RViz demo", type: "image", src: "https://github.com/user-attachments/assets/1799c15a-936a-4b31-93a5-759c074c7313" }
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
