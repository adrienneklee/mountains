import { WebGLRenderer } from "three";

const renderer = new WebGLRenderer({
  antialias: true,
  powerPreference: "high-performance",
  stencil: false,
});

renderer.setClearColor(0xffffff);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setScissorTest(true);
renderer.info.autoReset = false;

// renderer.setPixelRatio(window.devicePixelRatio);

export default renderer;
