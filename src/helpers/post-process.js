import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

import { Color, Vector2 } from "three";

function postProcess(scene, camera, renderer) {
    // Create a render pass for post processing
    const renderScene = new RenderPass(scene, camera);
    // Set clear color to darkish grey
    renderScene.clearColor = new Color(0x121212);

    // Create a bloom pass with the specified parameters
    const bloomPass = new UnrealBloomPass(new Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    bloomPass.threshold = 0;
    bloomPass.strength = 1;
    bloomPass.radius = 0.75;
    bloomPass.exposure = 1;

    // Create a composer for the post processing
    const composer = new EffectComposer(renderer);
    // Add the render pass to the composer
    composer.addPass(renderScene);
    // Add the bloom pass to the composer
    composer.addPass(bloomPass);

    // Resize composer on window resize
    window.addEventListener("resize", () => {
        composer.setSize(window.innerWidth, window.innerHeight);
    });

    return composer;

}

export default postProcess;