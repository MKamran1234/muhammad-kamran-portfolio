import {
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect, useRef } from "react";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;
    const landing = document.querySelector(".landing-section");
    if (!social || !landing || !sectionRef.current) return;
    const cleanups: (() => void)[] = [];
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      sectionRef.current?.classList.toggle(
        "icons-section--hidden",
        entry.intersectionRatio < 0.15
      );
    }, { threshold: [0, 0.15] });
    visibilityObserver.observe(landing);

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;

      let frameId = 0;
      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        frameId = requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      elem.addEventListener("mousemove", onMouseMove);

      updatePosition();

      cleanups.push(() => {
        cancelAnimationFrame(frameId);
        elem.removeEventListener("mousemove", onMouseMove);
      });
    });
    return () => {
      visibilityObserver.disconnect();
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <div className="icons-section" ref={sectionRef}>
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a href="https://github.com/MKamran1234" target="_blank" rel="noreferrer">
            <FaGithub />
          </a>
        </span>
        <span>
          <a href="https://linkedin.com/in/muhammad-kamran-7367822a4" target="_blank" rel="noreferrer">
            <FaLinkedinIn />
          </a>
        </span>
      </div>
      <a
        className="resume-button"
        href="/Muhammad_Kamran_Resume.pdf"
        target="_blank"
        rel="noreferrer"
        download="Muhammad_Kamran_Resume.pdf"
        title="Download Muhammad Kamran's CV / Resume"
      >
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
