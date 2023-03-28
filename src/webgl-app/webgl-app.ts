import {
  AxesHelper,
  GridHelper,
  Group,
  PerspectiveCamera,
  Vector3,
  Vector4,
} from "three";
import renderer from "./renderer";
import { scene } from "./scene";
import { mainCamera, controls, devCamera } from "./camera";
import gui from "./gui";
import settings from "./settings";
import Stats, { RenderStatsPosition } from "./stats";

export default class WebGLApp {
  viewport = { debug: new Vector4(), main: new Vector4() };
  stats: Stats;

  constructor(parent: HTMLElement) {
    parent.append(renderer.domElement);

    const statsWrapper = document.createElement("div");
    statsWrapper.classList.add("stats");
    document.body.appendChild(statsWrapper);
    this.stats = new Stats({
      parent: statsWrapper,
      position: {
        alignment: RenderStatsPosition.TopLeft,
        x: 1,
        y: 1,
        unit: "rem",
      },
    });

    // Add helpers

    devCamera.position.set(10, 10, 10);
    devCamera.lookAt(new Vector3());

    mainCamera.position.set(10, 10, 10);
    mainCamera.lookAt(new Vector3());

    const helpers = new Group();
    helpers.add(new AxesHelper(1), new GridHelper(10, 10));
    scene.add(helpers);

    gui.add(settings, "debugCamera");
    gui.add(helpers, "visible").name("helpers");

    window.addEventListener("resize", this.resize);

    // Start update
    this.resize();
    this.update();
  }

  resize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Resize renderer
    devCamera.aspect = width / height;
    devCamera.updateProjectionMatrix();
    mainCamera.aspect = width / height;
    mainCamera.updateProjectionMatrix();

    renderer.setSize(width, height);

    this.viewport.debug.set(0, 0, width * 0.25, height * 0.25);
    this.viewport.main.set(0, 0, width, height);
  };

  renderScene = (camera: PerspectiveCamera, viewport: Vector4) => {
    renderer.setViewport(viewport);
    renderer.setScissor(viewport);
    renderer.render(scene, camera);
  };

  update = () => {
    // Render scene
    requestAnimationFrame(this.update);

    controls.update();

    if (settings.debugCamera) {
      this.renderScene(devCamera, this.viewport.main);
      this.renderScene(mainCamera, this.viewport.debug);
    } else {
      this.renderScene(mainCamera, this.viewport.main);
    }

    this.stats.update(renderer);
    renderer.info.reset();
  };
}
