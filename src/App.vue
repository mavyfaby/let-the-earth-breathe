<template>
  <kbd id="author">Developed by Maverick G. Fabroa</kbd>
  <kbd id="date">04/15/2022</kbd>
</template>

<script setup>
import init from "./helpers/init";
import runAnimate from "./helpers/animate";
import initRender from "./helpers/render";
import postProcess from "./helpers/post-process";

const { scene, camera, renderer } = init();

initRender(scene, camera, renderer, () => {
  const composer = postProcess(scene, camera, renderer);

  const sun = scene.getObjectByName("sun");

  // sun.position.z = 200;
  // sun.position.y = 100;
  // sun.position.z = 300;

  function animate() {
    runAnimate(scene, camera, renderer, composer);
    requestAnimationFrame(animate);
  }

  animate();

  document.body.appendChild(renderer.domElement);
});
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

canvas {
  position: fixed;
  top: 0;
  left: 0;
}

kbd {
  position: fixed;
  color: #1156A3;
  z-index: 10;
  top: 20px;
}

kbd#author {
  left: 20px;
}

kbd#date {
  right: 20px;
}
</style>
