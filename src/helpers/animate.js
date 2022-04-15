import { Clock, Vector3 } from 'three';
import postProcess from './post-process';
import store from "../store";

const speed = 1;

const clock = new Clock();
const forwardDir = new Vector3();
const backwardDir = new Vector3();

let a = 0;

function runAnimate(scene, camera, renderer, composer) {
    renderer.setClearColor(0x050505);

    // Forward
    if (store.state.moveForward) {
        camera.getWorldDirection(forwardDir);
        camera.position.add(forwardDir.multiplyScalar(speed));
    }

    // Backward
    if (store.state.moveBackward) {
        camera.getWorldDirection(backwardDir);
        camera.position.add(backwardDir.multiplyScalar(-speed));
    }

    // If left is pressed
    if (store.state.moveLeft) {
        camera.translateX(-speed);
    }

    // If right is pressed
    if (store.state.moveRight) {
        camera.translateX(speed);
    }

    // If up is pressed
    if (store.state.moveUp) {
        camera.position.y += speed;
    }

    // If down is pressed
    if (store.state.moveDown) {
        camera.position.y -= speed;
    }

    const earth = scene.getObjectByName('earth');
    const sun = scene.getObjectByName('sun');

    // Rotate the earth
    earth.rotation.y += 0.005;
    sun.rotation.y += 0.01;

    sun.position.y = Math.sin(a) * 500;
    sun.position.x = Math.cos(a) * 500;

    a += 0.005;

    composer.render();
}

export default runAnimate;