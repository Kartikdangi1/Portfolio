/** Entry point for all client behaviour; every module no-ops when its elements are absent. */
import { setupTheme } from "./theme";
import { setupNav } from "./nav";
import { setupTypewriter } from "./typewriter";
import { setupReveal } from "./reveal";
import { setupDrone } from "./drone";
import { setupCardVideos } from "./card-videos";
import { setupCarousels } from "./carousel";

setupTheme();
setupNav();
setupTypewriter();
setupReveal();
setupDrone();
setupCardVideos();
setupCarousels();
