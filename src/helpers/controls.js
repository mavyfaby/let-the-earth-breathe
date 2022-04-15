import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import store from '../store';

export function createControls(camera, renderer) {
    // Detect if using touchscreen
    if ("ontouchstart" in document.documentElement) {
        return new OrbitControls(camera, renderer.domElement);
    }

    // Create the controls
    const controls = new PointerLockControls(camera, document.body);

    controls.addEventListener("lock", () => {});
    controls.addEventListener("unlock", () => {});

    // if pointer locked
    let isLocked = false;

    // On documnet clock
    document.addEventListener("click", () => {
        // Invert the isLocked flag
        isLocked = !isLocked;

        // If locked, lock the controls
        if (isLocked) {
            controls.lock();
        }

        // else unlock the controls
        else {
            controls.unlock();
        }
    });

    // Keydown events for movement
    document.addEventListener("keydown", e => {
        const { key } = e;

        switch (key) {
            case "W": case "w": case "ArrowUp":
                store.state.moveForward = true;
                break;
            case "S": case "s": case "ArrowDown":
                store.state.moveBackward = true;
                break;
            case "A": case "a": case "ArrowLeft":
                store.state.moveLeft = true;
                break;
            case "D": case "d": case "ArrowRight":
                store.state.moveRight = true;
                break;
            case "Shift":
                store.state.moveDown = true;
                break;
            case " ":
                store.state.moveUp = true;
                break;
        }
    });

    // Keyup events for movement
    document.addEventListener("keyup", e => {
        const { key } = e;
        
        switch (key) {
            case "W": case "w": case "ArrowUp":
                store.state.moveForward = false;
                break;
            case "S": case "s": case "ArrowDown":
                store.state.moveBackward = false;
                break;
            case "A": case "a": case "ArrowLeft":
                store.state.moveLeft = false;
                break;
            case "D": case "d": case "ArrowRight":
                store.state.moveRight = false;
                break;
            case "Shift":
                store.state.moveDown = false;
            case " ":
                store.state.moveUp = false;
        }
    });


    // Lastly return the controls
    return controls;
}

