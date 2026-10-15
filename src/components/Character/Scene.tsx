import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/loadingContext";
import handleResize from "./utils/resizeUtils";
import { createMobileDeskPoseTimeline } from "../utils/GsapScroll";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../loadingProgress";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    const canvas = canvasDiv.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const container = {
        width: Math.max(1, Math.floor(rect.width || canvas.clientWidth || 1)),
        height: Math.max(1, Math.floor(rect.height || canvas.clientHeight || 1)),
      };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: window.devicePixelRatio < 2,
      });
      rendererRef.current = renderer;
      const setRendererSize = (width: number, height: number) => {
        const safeWidth = Math.max(1, Math.floor(width));
        const safeHeight = Math.max(1, Math.floor(height));
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.setSize(safeWidth, safeHeight, false);
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";
        renderer.domElement.style.display = "block";
      };
      setRendererSize(container.width, container.height);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      canvas.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.z = 10;
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: THREE.Object3D | null = null;
      let loadedCharacter: THREE.Object3D | null = null;
      let mobileDeskTimeline: ReturnType<typeof createMobileDeskPoseTimeline> = null;
      let isMobileDeskPoseActive = false;
      let mixer: THREE.AnimationMixer | undefined;
      let frameId = 0;
      let introTimer: number | undefined;
      let disposed = false;

      const clock = new THREE.Clock();

      const light = setLighting(scene);
      const progress = setProgress((value) => setLoading(value));
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      loadCharacter().then((gltf) => {
        if (gltf) {
          const animations = setAnimations(gltf);
          if (hoverDivRef.current) animations.hover(gltf, hoverDivRef.current);
          mixer = animations.mixer;
          const character = gltf.scene;
          if (disposed) return;
          loadedCharacter = character;
          if (window.innerWidth <= 1024) {
            mobileDeskTimeline = createMobileDeskPoseTimeline(character, camera);
            updateCharacterPlacement();
          }
          scene.add(character);
          headBone = character.getObjectByName("spine006") || null;
          screenLight = character.getObjectByName("screenlight") || null;
          progress.loaded().then(() => {
            introTimer = window.setTimeout(() => {
              light.turnOnLights();
              animations.startIntro();
            }, 350);
          });
        }
      }).catch((error) => {
        console.error("Unable to load the character model:", error);
        setLoading(100);
      });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      const onTouchMove = (event: TouchEvent) => {
        handleTouchMove(event, (x, y) => (mouse = { x, y }));
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", onMouseMove);
      const landingDiv = document.getElementById("landingDiv");
      const servicesSlot = document.querySelector<HTMLElement>(
        ".services-character-slot"
      );
      const touchTargets = [landingDiv, servicesSlot].filter(
        (target): target is HTMLElement => target !== null
      );
      touchTargets.forEach((target) => {
        target.addEventListener("touchmove", onTouchMove, { passive: true });
        target.addEventListener("touchend", onTouchEnd);
        target.addEventListener("touchcancel", onTouchEnd);
      });
      const characterContainer = canvas.closest<HTMLElement>(
        ".character-container"
      );
      const visibleSections = new Map<Element, boolean>();
      const updateCharacterPlacement = () => {
        if (!characterContainer) return;
        if (window.innerWidth > 1024) {
          characterContainer.classList.remove(
            "character-container--landing",
            "character-container--services"
          );
          return;
        }
        const isLandingVisible = visibleSections.get(landingDiv!) ?? false;
        const isServicesVisible = servicesSlot
          ? visibleSections.get(servicesSlot) ?? false
          : false;

        characterContainer.classList.toggle(
          "character-container--landing",
          isLandingVisible && !isServicesVisible
        );
        characterContainer.classList.toggle(
          "character-container--services",
          isServicesVisible
        );

        const shouldShowDeskPose = window.innerWidth <= 1024 && isServicesVisible;
        if (shouldShowDeskPose !== isMobileDeskPoseActive) {
          isMobileDeskPoseActive = shouldShowDeskPose;
          if (shouldShowDeskPose) {
            mobileDeskTimeline?.play();
          } else {
            mobileDeskTimeline?.reverse();
          }
        }

        if (isServicesVisible && servicesSlot) {
          const rect = servicesSlot.getBoundingClientRect();
          const top = `${rect.top}px`;
          const height = `${rect.height}px`;
          if (
            characterContainer.style.getPropertyValue(
              "--services-character-top"
            ) !== top
          ) {
            characterContainer.style.setProperty("--services-character-top", top);
          }
          if (
            characterContainer.style.getPropertyValue(
              "--services-character-height"
            ) !== height
          ) {
            characterContainer.style.setProperty(
              "--services-character-height",
              height
            );
          }
        }
      };
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            visibleSections.set(entry.target, entry.isIntersecting);
          });
          updateCharacterPlacement();
        },
        { threshold: 0.01 }
      );
      if (landingDiv) sectionObserver.observe(landingDiv);
      if (servicesSlot) sectionObserver.observe(servicesSlot);
      const onScroll = () => updateCharacterPlacement();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", updateCharacterPlacement);
      const slotResizeObserver = new ResizeObserver(updateCharacterPlacement);
      if (servicesSlot) slotResizeObserver.observe(servicesSlot);
      // Only render when the canvas is visible in the viewport
      let isVisible = true;
      const observer = new IntersectionObserver(
        (entries) => { isVisible = entries[0].isIntersecting; },
        { threshold: 0.01 }
      );
      observer.observe(canvas);

      const resizeHandler = () => {
        const bounds = canvas.getBoundingClientRect();
        const width = Math.max(1, Math.floor(bounds.width || canvas.clientWidth || 1));
        const height = Math.max(1, Math.floor(bounds.height || canvas.clientHeight || 1));
        if (width > 0 && height > 0) {
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
          renderer.setSize(width, height, false);
          if (loadedCharacter) handleResize(renderer, camera, canvasDiv, loadedCharacter);
        }
      };
      const canvasResizeObserver = new ResizeObserver(resizeHandler);
      canvasResizeObserver.observe(canvas);
      window.addEventListener("resize", resizeHandler);

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        if (
          window.innerWidth <= 1024 &&
          servicesSlot &&
          visibleSections.get(servicesSlot)
        ) {
          updateCharacterPlacement();
        }
        // Skip rendering when scrolled out of view to save GPU/CPU
        if (!isVisible) return;
        if (headBone) {
          if (isMobileDeskPoseActive) {
            headBone.rotation.y = THREE.MathUtils.lerp(
              headBone.rotation.y,
              mouse.x * 0.3,
              interpolation.y
            );
            headBone.rotation.x = THREE.MathUtils.lerp(
              headBone.rotation.x,
              -mouse.y * 0.15,
              interpolation.x
            );
          } else {
            handleHeadRotation(
              headBone,
              mouse.x,
              mouse.y,
              interpolation.x,
              interpolation.y,
              THREE.MathUtils.lerp
            );
          }
          light.setPointLight(screenLight);
        }
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        renderer.render(scene, camera);
      };
      animate();
      return () => {
        disposed = true;
        cancelAnimationFrame(frameId);
        clearTimeout(introTimer);
        progress.clear();
        observer.disconnect();
        sectionObserver.disconnect();
        slotResizeObserver.disconnect();
        canvasResizeObserver.disconnect();
        document.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", updateCharacterPlacement);
        window.removeEventListener("resize", resizeHandler);
        mixer?.stopAllAction();
        scene.clear();
        renderer.dispose();
        if (rendererRef.current === renderer) {
          rendererRef.current = null;
        }
        renderer.domElement.remove();
        touchTargets.forEach((target) => {
          target.removeEventListener("touchmove", onTouchMove);
          target.removeEventListener("touchend", onTouchEnd);
          target.removeEventListener("touchcancel", onTouchEnd);
        });
        characterContainer?.classList.remove(
          "character-container--landing",
          "character-container--services"
        );
      };
    }
  }, [setLoading]);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
