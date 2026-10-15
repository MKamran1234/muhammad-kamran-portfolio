import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    const cleanupHandlers: (() => void)[] = [];
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          const onClick = () => handleClick(container);
          container.addEventListener("click", onClick);
          cleanupHandlers.push(() => container.removeEventListener("click", onClick));
        }
      });
    }
    return () => {
      cleanupHandlers.forEach((cleanup) => cleanup());
    };
  }, []);
  return (
    <div className="whatIDO" id="whatido">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="services-character-slot" aria-hidden="true" />
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>DEVELOP</h3>
              <h4>Full Stack &amp; Software Engineering</h4>
              <p>
                Architecting robust, scalable web products—from dynamic front-end
                interfaces to modular back-end APIs, relational &amp; NoSQL databases, and cloud systems.
              </p>
              <h5>Skillset &amp; tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">JavaScript (ES6+)</div>
                <div className="what-tags">TypeScript</div>
                <div className="what-tags">Python</div>
                <div className="what-tags">Java</div>
                <div className="what-tags">React.js</div>
                <div className="what-tags">Node.js</div>
                <div className="what-tags">Express.js</div>
                <div className="what-tags">RESTful APIs</div>
                <div className="what-tags">PostgreSQL</div>
                <div className="what-tags">MongoDB</div>
                <div className="what-tags">MySQL</div>
                <div className="what-tags">Tailwind CSS</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>DEPLOY &amp; AI</h3>
              <h4>Cloud, DevOps &amp; Machine Learning</h4>
              <p>
                Deploying high-availability infrastructure on AWS with Docker &amp; Linux,
                and integrating computer vision models (YOLOv8, CNN, Grad-CAM).
              </p>
              <h5>Skillset &amp; tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">AWS Cloud</div>
                <div className="what-tags">Docker</div>
                <div className="what-tags">Linux</div>
                <div className="what-tags">Git &amp; GitHub</div>
                <div className="what-tags">YOLOv8</div>
                <div className="what-tags">CNN &amp; Grad-CAM</div>
                <div className="what-tags">Image Processing</div>
                <div className="what-tags">Postman</div>
                <div className="what-tags">Agentic AI</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
