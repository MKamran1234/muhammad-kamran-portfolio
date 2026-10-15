import * as THREE from "three";
import gsap from "gsap";

type MaterialMesh = THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>;

const isMaterialMesh = (object: THREE.Object3D): object is MaterialMesh =>
  object instanceof THREE.Mesh && object.material instanceof THREE.MeshStandardMaterial;

export function setCharTimeline(
  character: THREE.Object3D<THREE.Object3DEventMap> | null,
  camera: THREE.PerspectiveCamera
) {
  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".landing-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  const tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".whatIDO",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  let screenLight: MaterialMesh | null = null;
  let monitor: MaterialMesh | null = null;
  character?.children.forEach((object) => {
    if (object.name === "Plane004") {
      object.children.forEach((child) => {
        if (!isMaterialMesh(child)) return;
        child.material.transparent = true;
        child.material.opacity = 0;
        if (child.material.name === "Material.027") {
          monitor = child;
          child.material.color.set("#FFFFFF");
        }
      });
    }
    if (object.name === "screenlight" && isMaterialMesh(object)) {
      object.material.transparent = true;
      object.material.opacity = 0;
      object.material.emissive.set("#C8BFFF");
      gsap.timeline({ repeat: -1, repeatRefresh: true }).to(object.material, {
        emissiveIntensity: () => Math.random() * 8,
        duration: () => Math.random() * 0.6,
        delay: () => Math.random() * 0.1,
      });
      screenLight = object;
    }
  });
  const neckBone = character?.getObjectByName("spine005");
  const monitorMesh = monitor as MaterialMesh | null;
  const screenMesh = screenLight as MaterialMesh | null;
  const monitorMaterial = monitorMesh?.material;
  const monitorPosition = monitorMesh?.position;
  const screenMaterial = screenMesh?.material;
  if (window.innerWidth > 1024) {
    if (character) {
      tl1
        .fromTo(character.rotation, { y: 0 }, { y: 0.7, duration: 1 }, 0)
        .to(camera.position, { z: 22 }, 0)
        .fromTo(".character-model", { x: 0 }, { x: "-25%", duration: 1 }, 0)
        .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
        .to(".landing-container", { y: "40%", duration: 0.8 }, 0)
        .fromTo(".about-me", { y: "-50%", opacity: 0 }, { y: "0%", opacity: 1, duration: 0.8, delay: 0.2 }, 0);

      // These objects are discovered while traversing the loaded model above.
      // TypeScript cannot track assignments made inside that traversal callback.
      if (!neckBone || !monitorMaterial || !monitorPosition || !screenMaterial) return;

      tl2
        .to(
          camera.position,
          { z: 75, y: 8.4, duration: 6, delay: 2, ease: "power3.inOut" },
          0
        )
        .to(".about-section", { y: "12%", duration: 4, delay: 1, ease: "power2.out" }, 0)
        .to(".about-section", { opacity: 0.92, delay: 1.5, duration: 2.2 }, 0)
        .fromTo(
          ".character-model",
          { pointerEvents: "inherit" },
          // A small left shift keeps a comfortable gap from the service desk
          // without changing the original balanced composition.
          { pointerEvents: "none", x: "-16%", delay: 2, duration: 5 },
          0
        )
        .to(character.rotation, { y: 0.92, x: 0.12, delay: 3, duration: 3 }, 0)
        .to(neckBone!.rotation, { x: 0.6, delay: 2, duration: 3 }, 0)
        .to(monitorMaterial, { opacity: 1, duration: 0.8, delay: 3.2 }, 0)
        .to(screenMaterial, { opacity: 1, duration: 0.8, delay: 4.5 }, 0)
        .fromTo(
          monitorPosition,
          { y: -10, z: 2 },
          { y: 0, z: 0, delay: 1.5, duration: 3 },
          0
        )
        .fromTo(
          ".character-rim",
          { opacity: 1, scaleX: 1.4 },
          { opacity: 0, scale: 0, y: "-70%", duration: 5, delay: 2 },
          0.3
        );

      tl3
        .fromTo(
          ".character-model",
          { y: "0%" },
          { y: "-100%", duration: 4, ease: "none", delay: 1 },
          0
        )
        .fromTo(".whatIDO", { y: 0 }, { y: "15%", duration: 2 }, 0)
        .to(character.rotation, { x: -0.04, duration: 2, delay: 1 }, 0);
    }
  }
}

export function createMobileDeskPoseTimeline(
  character: THREE.Object3D,
  camera: THREE.PerspectiveCamera
): gsap.core.Timeline | null {
  const neckBone = character.getObjectByName("spine005");
  let monitor: MaterialMesh | undefined;
  let screenLight: MaterialMesh | undefined;

  for (const object of character.children) {
    if (object.name === "Plane004") {
      monitor = object.children.find(
        (child): child is MaterialMesh =>
          isMaterialMesh(child) && child.material.name === "Material.027"
      );
    }
    if (object.name === "screenlight" && isMaterialMesh(object)) {
      screenLight = object;
    }
  }

  if (!neckBone || !monitor || !screenLight) return null;

  return gsap.timeline({ paused: true })
    .to(camera.position, { z: 55, y: 8.4, duration: 1, ease: "power3.inOut" }, 0)
    .to(character.rotation, { y: 0.92, x: -0.04, duration: 1 }, 0)
    .to(neckBone.rotation, { x: 0.6, duration: 1 }, 0)
    .to(monitor.material, { opacity: 1, duration: 0.5 }, 0.2)
    .to(screenLight.material, { opacity: 1, duration: 0.5 }, 0.3)
    .fromTo(
      monitor.position,
      { y: -10, z: 2 },
      { y: 0, z: 0, duration: 0.8 },
      0.1
    );
}

export function setAllTimeline() {
  const careerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".career-section",
      start: "top 30%",
      end: "100% center",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  careerTimeline
    .fromTo(
      ".career-timeline",
      { maxHeight: "10%" },
      { maxHeight: "100%", duration: 0.5 },
      0
    )

    .fromTo(
      ".career-timeline",
      { opacity: 0 },
      { opacity: 1, duration: 0.1 },
      0
    )
    .fromTo(
      ".career-info-box",
      { opacity: 0 },
      { opacity: 1, stagger: 0.1, duration: 0.5 },
      0
    )
    .fromTo(
      ".career-dot",
      { animationIterationCount: "infinite" },
      {
        animationIterationCount: "1",
        delay: 0.3,
        duration: 0.1,
      },
      0
    );

  if (window.innerWidth > 1024) {
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: "20%", duration: 0.5, delay: 0.2 },
      0
    );
  } else {
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: 0, duration: 0.5, delay: 0.2 },
      0
    );
  }
}
