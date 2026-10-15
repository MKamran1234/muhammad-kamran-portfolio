import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              MUHAMMAD
              <br />
              <span>KAMRAN</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>A Creative</h3>
            <div className="landing-roles">
              <div className="landing-role-line landing-role-top-line">
                <h2 className="landing-role-item landing-info-h2">Software</h2>
                <h2 className="landing-role-item landing-info-h2">Engineer</h2>
              </div>
              <div className="landing-role-line landing-role-bottom-line">
                <h2 className="landing-role-item landing-role-primary">FullStack</h2>
                <h2 className="landing-role-item landing-role-primary">Developer</h2>
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
