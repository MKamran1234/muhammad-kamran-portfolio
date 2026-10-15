import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = async () => {
    const encryptedBlob = await decryptFile("/models/character.enc", "Character3D#@");
    const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));
    return new Promise<GLTF>((resolve, reject) => {
      loader.load(
        blobUrl,
        async (gltf) => {
          try {
            const character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                const mesh = child;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          } catch (error) {
            reject(error);
          }
        },
        undefined,
        reject
      );
    });
  };

  return { loadCharacter };
};

export default setCharacter;
