import { createPlaneMarker } from "./objects/PlaneMarker";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { handleXRHitTest } from "./utils/hitTest";

import {
  AmbientLight,
  BoxBufferGeometry,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  XRFrame,
} from "three";

export function createScene(renderer: WebGLRenderer) {
  const scene = new Scene()

  const camera = new PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.02,
    20,
  )

  /**
   * Add some simple ambient lights to illuminate the model.
   */
  const ambientLight = new AmbientLight(0xffffff, 1.0);
  scene.add(ambientLight);

  // const boxGeometry = new BoxBufferGeometry(1, 1, 1);
  // const boxMaterial = new MeshBasicMaterial({ color: 0xff0000 });
  // const box = new Mesh(boxGeometry, boxMaterial);
  // box.position.z = -3;

  // scene.add(box);

  const gltfLoader = new GLTFLoader();

  let gModel: Object3D;
  

  gltfLoader.load("../assets/models/G.glb", (gltf: GLTF) => {
    gModel = gltf.scene.children[0];
    gModel.position.z = -3;
    gModel.position.y = -1;
    scene.add(gModel);
  });

  const renderLoop = (timestamp: number, frame?: XRFrame) => {
    // Rotate box
    // gModel.rotation.y += 0.01;
    // gModel.rotation.z += 0.01; 

    if (renderer.xr.isPresenting) {
      renderer.render(scene, camera);
    }
  }
  
  renderer.setAnimationLoop(renderLoop);
}
