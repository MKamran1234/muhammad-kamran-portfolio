import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { smoother } from "../navbarScroll";

export function initialFX() {
  document.body.style.overflowY = "auto";
  if (smoother) {
    smoother.paused(false);
  }
  document.querySelector("main.main-body")?.classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  const landingText = new SplitText(
    [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
    {
      type: "chars,lines",
      linesClass: "split-line",
    }
  );
  gsap.fromTo(
    landingText.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    ".landing-role-line",
    { opacity: 0, y: 40, filter: "blur(8px)" },
    {
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      y: 0,
      filter: "blur(0px)",
      stagger: 0.18,
      delay: 0.75,
    }
  );

  gsap.fromTo(
    ".landing-role-item",
    { opacity: 0, y: 36, filter: "blur(8px)", scale: 0.96 },
    {
      opacity: 1,
      duration: 0.9,
      ease: "power3.out",
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      stagger: 0.2,
      delay: 0.9,
    }
  );
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

}
