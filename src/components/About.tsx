import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          Software Engineering graduate (CGPA: 3.52 / 4.00) and full-stack developer
          with hands-on experience in cloud computing, RESTful APIs, database design,
          and production AI/machine learning integrations.
        </p>
        <div className="about-details">
          <div className="about-detail-item">
            <span className="about-label">Name</span>
            <span className="about-value">Muhammad Kamran</span>
          </div>
          <div className="about-detail-item">
            <span className="about-label">Role</span>
            <span className="about-value">Software Engineer / Full Stack Developer</span>
          </div>
          <div className="about-detail-item">
            <span className="about-label">Education</span>
            <span className="about-value">
              BE (Software Engineering) — Iqra University (EDC Campus)
              <br />
              <small style={{ color: "var(--accentColor)", opacity: 0.9 }}>
                CGPA: 3.52 / 4.00 (2022 – 2026)
              </small>
            </span>
          </div>
          <div className="about-detail-item">
            <span className="about-label">College</span>
            <span className="about-value">
              Intermediate Pre-Engineering — Gulshan-e-Iqbal College (A Grade 74%)
            </span>
          </div>
          <div className="about-detail-item">
            <span className="about-label">Location</span>
            <span className="about-value">Karachi, Sindh, Pakistan</span>
          </div>
          <div className="about-detail-item">
            <span className="about-label">Email</span>
            <span className="about-value">
              <a href="mailto:mkamranhussain09@gmail.com" data-cursor="disable">
                mkamranhussain09@gmail.com
              </a>
            </span>
          </div>
          <div className="about-detail-item">
            <span className="about-label">Phone</span>
            <span className="about-value">
              <a href="tel:+923148861356" data-cursor="disable">
                +92 3148861356
              </a>
            </span>
          </div>
          <div className="about-detail-item">
            <span className="about-label">Experience</span>
            <span className="about-value">
              Website Developer Intern at Barkat Meat House (Summer 2026)
            </span>
          </div>
          <div className="about-detail-item">
            <span className="about-label">Availability</span>
            <span className="about-value">
              Open to entry-level Software Engineer, Full Stack &amp; AI Developer roles
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
