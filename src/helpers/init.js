import {
    Scene, PerspectiveCamera, WebGLRenderer, Vector3, Mesh, TextureLoader,
    MeshPhongMaterial
} from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import font from "three/examples/fonts/helvetiker_bold.typeface.json";

function init() {
    const scene = new Scene();
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new WebGLRenderer({ antialias: true });
    const textureLoader = new TextureLoader();
    
    camera.position.z = 400;
    camera.position.y = 100;
    camera.lookAt(new Vector3(0, 50, 0))

    renderer.setSize(window.innerWidth, window.innerHeight);

    window.onresize = function() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

    // The text we want to render
    const TEXT = "Let the earth breathe";
    // Initialize the font loader
    const fontLoader = new FontLoader();
    // Load the font
    const textFont = fontLoader.parse(font);

    // Create the text geometry
    const textGeometry = new TextGeometry(TEXT, {
        font: textFont,
        size: 20,
        height: 2,
        curveSegments: 12,
        bevelEnabled: false
    });

    // Compute the bounding box of the text
    textGeometry.computeBoundingBox();

    // Get the center of the bounding box
    const centerOffset = -0.5 * (textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x);
    // Create a mesh for the text
    const textMesh = new Mesh(textGeometry, new MeshPhongMaterial({ color: 0x2196F3 }));

    // Set the position of the text mesh to the center of the bounding box
    textMesh.position.x = centerOffset;
    textMesh.position.y = 120;
    textMesh.position.z = -50;

    scene.add(textMesh);

    return { scene, camera, renderer };
}

export default init;