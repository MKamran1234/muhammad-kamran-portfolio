import { lazy, PropsWithChildren, Suspense, useEffect, useRef, useState } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";

const TechStack = lazy(() => import("./TechStack"));

const TechStackPlaceholder = () => (
  <section className="techstack techstack-loading" id="stack" aria-label="My Tech Stack">
    <h2>My Tech Stack</h2>
    <p role="status">Loading interactive stack</p>
  </section>
);

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );
  const [loadTechStack, setLoadTechStack] = useState(false);
  const techStackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  useEffect(() => {
    const container = techStackRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setLoadTechStack(true);
        observer.disconnect();
      },
      { rootMargin: "800px 0px" }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {/*
        The WebGL character must not live inside GSAP's transformed smooth
        scroll content. A transformed ancestor turns `position: fixed` into
        page-relative positioning on desktop, which places the canvas far
        below the landing viewport. Keeping it at the root preserves the
        viewport-fixed desktop scene while the component still observes the
        landing and services sections for its responsive placement.
      */}
      {children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing />
            <About />
            <WhatIDo />
            <Career />
            <Work />
            <div ref={techStackRef} className="techstack-slot">
              {loadTechStack ? (
                <Suspense fallback={<TechStackPlaceholder />}>
                  <TechStack compact={!isDesktopView} />
                </Suspense>
              ) : (
                <TechStackPlaceholder />
              )}
            </div>
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
