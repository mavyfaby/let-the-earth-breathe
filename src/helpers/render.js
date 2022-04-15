import {
    GridHelper, PointLight, MeshLambertMaterial, MeshBasicMaterial,
    Mesh, SphereGeometry, TextureLoader
} from "three";
import { createControls } from "./controls";

import EarthTexture from "../assets/img/3d-earth-texture.jpg";
import SunTexture from "../assets/img/3d-sun-texture.jpg";

function createSphere(texture, name, isSource, cb) {
    const textureLoader = new TextureLoader();

    textureLoader.load(texture, texture => {
        const lightSphere = new SphereGeometry(isSource ? 25 : 50, 100, 100);
        const material = isSource ?
            new MeshBasicMaterial({ map: texture, color: 0xffffff }) :
            new MeshLambertMaterial({ map: texture, color: 0xffffff });

        const mesh = new Mesh(lightSphere, material);

        let mainMesh = mesh;

        if (isSource) {
            mainMesh = new PointLight(0xffffff, 1, 0);
            mainMesh.add(mesh);
        }
    
        mainMesh.rotateX(0.4101524);
        mainMesh.position.y = 50;
        mainMesh.name = name;

        if (typeof cb === "function") {
            cb(mainMesh);
        }
    });
}

function initRender(scene, camera, renderer, cb) {
    const grid = new GridHelper(800, 100, 0x121212, 0x020202);
    const controls = createControls(camera, renderer);
    
    // Add scene only if using PointerLockControls
    if (controls.constructor.name === "PointerLockControls") {
        scene.add(controls.getObject());
    }

    createSphere(EarthTexture, "earth", false, earth => {
        scene.add(earth);
        // scene.add(grid);

        createSphere(SunTexture, "sun", true, sun => {
            scene.add(sun);
            
            if (typeof cb === "function") {
                cb(sun, earth);
            }
        });
    });
}

export default initRender;