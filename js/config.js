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
  roleCyclePrefix: "Robotics Engineer,",
  // Cycled by the typewriter effect in the hero, after the prefix above.
  // Keep entries short (fits one line).
  roleCycle: [
    "Aerial Perception & Learning",
    "Radar-Based SLAM",
    "Reinforcement Learning",
    "Robotic Manipulation",
    "UAV Systems"
  ],
  tagline:
    "I turn sparse 4D radar returns into usable maps for GPS-denied flight, and help reinforcement-learning policies improve safely with a person in the loop.",
  location: "",
  email: "kartikdangide@gmail.com",
  resumeUrl: "",

  // Array of paragraphs, rendered as separate <p> tags.
  about: [
    "I'm a robotics engineer working across two connected areas: perception that holds up on imperfect sensors, and learned policies that keep working once they leave simulation.",
    "I hold a B.Eng. in Robotics from THWS Schweinfurt, where my thesis built a real-time, radar-only indoor mapping system for a UAV, with no GPS, no camera, and no clean lab conditions to lean on. I'm now completing an M.Eng. in Elektro- und Informationstechnik at the same university, extending that work into radar-camera sensor fusion for my Master's thesis.",
    "Alongside that, I build human-in-the-loop reinforcement learning systems and vision-guided manipulation pipelines, where the hard part usually isn't training a policy, it's getting it to behave safely on real hardware. I previously worked as a working student at TTZ-EMO, building multithreaded FEM simulation tooling."
  ],

  stats: [
    { label: "Theses (BEng + ongoing MEng)", value: "2" },
    { label: "RL Methods Benchmarked", value: "20+" },
    { label: "Robot / UAV Platforms Built", value: "5" }
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
