import { PerspectiveCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import renderer from "./renderer";

export const devCamera = new PerspectiveCamera(
  65,
  window.innerWidth / window.innerHeight
);

export const mainCamera = new PerspectiveCamera(
  65,
  window.innerWidth / window.innerHeight
);

// Add OrbitControls
export const controls = new OrbitControls(devCamera, renderer.domElement);
controls.enableDamping = true;
