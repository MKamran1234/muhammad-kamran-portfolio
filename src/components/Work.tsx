import "./styles/Work.css";
import WorkImage from "./WorkImage";

const Work = () => {
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {[
            {
              title: "Barkat Meat House",
              category: "Live Client Project · Full Stack E-Commerce",
              tools: "React.js, Node.js, Express.js, MongoDB, WhatsApp API",
              description: "Production e-commerce platform for Barkat Meat House operating live in Karachi. Features product catalogs (fresh cuts, trotter, brain, bulk orders), smart cart, dynamic pricing, and doorstep delivery logistics.",
              link: "https://barkatmeathouse.com/",
              image: "/images/barkat.png",
            },
            {
              title: "Nike Sneakers Store",
              category: "Frontend E-Commerce",
              tools: "HTML5, CSS3, JavaScript, Responsive UI",
              description: "Modern sneaker e-commerce storefront featuring interactive catalog browsing for Air Force, Jordan, Blazer, Crater, and Hippie editions with responsive design.",
              link: "https://sneakers-website-frontend.vercel.app/",
              image: "/images/sneakers.png",
            },
            {
              title: "PulseDrive",
              category: "UI/UX · Electric Mobility Platform",
              tools: "React.js, Vite, Tailwind CSS, Interactive Catalog",
              description: "High-performance electric mobility platform showcasing electric motorcycles (Pulse Moto Grand, Street, Trek), e-bikes, and hoverboards with live range/speed specs and test-ride booking.",
              link: "https://hci-project-nu.vercel.app/",
              image: "/images/pulsedrive.png",
            },
            {
              title: "Degree Attestation Portal",
              category: "Blockchain & OCR · Academic Verification",
              tools: "React.js, Node.js, Blockchain, OCR, MongoDB",
              description: "Official Iqra University digital academic attestation portal powered by Blockchain and OCR for secure document verification, officer review, credential issuance, and fraud-proof public verification.",
              link: "https://degree-attestation-deploy.vercel.app",
              image: "/images/degree.png",
            },
            {
              title: "Aegis Ledger AI — Fraud Detection",
              category: "AI & Web3 · Autonomous Fraud Intelligence",
              tools: "React.js, Python, WebSockets, Blockchain Risk Engine, Hybrid ML",
              description: "Agentic fraud operations command center with real-time Ethereum blockchain monitoring, hybrid ML risk posture scoring, transaction volume anomaly tracking, and live risk telemetry.",
              link: "https://frontend-lovat-six-47.vercel.app/analytics",
              image: "/images/fraud-detection.png",
            },
            {
              title: "ZK Privacy Mixer Quiz",
              category: "Web3 · Blockchain",
              tools: "React, Web3 API, Solidity",
              description: "Blockchain quiz app covering zero-knowledge proofs and Tornado Cash privacy protocol.",
              link: "https://blockchain-quiz-tornado-cash.vercel.app",
              image: "/images/blockchain.jpg",
            }
          ].map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>
                      <a href={project.link} target="_blank" rel="noreferrer" data-cursor="disable">
                        {project.title}
                      </a>
                    </h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image={project.image} alt={project.title} link={project.link} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
