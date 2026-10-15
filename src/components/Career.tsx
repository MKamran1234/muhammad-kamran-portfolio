import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br />
          education
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Intermediate Pre-Engineering</h4>
                <h5>Govt. Degree College Gulshan-e-Iqbal Block-7, Karachi</h5>
              </div>
              <h3>2022</h3>
            </div>
            <p>
              Completed Intermediate Pre-Engineering with A Grade (74%), establishing
              core mathematical, analytical problem-solving, and scientific fundamentals.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>BE — Software Engineering</h4>
                <h5>Iqra University — EDC Campus, Karachi</h5>
              </div>
              <h3>2022–2026</h3>
            </div>
            <p>
              Earned a Bachelor of Engineering in Software Engineering (CGPA: 3.52 / 4.00).
              Studied OOP, Data Structures, Algorithms, DBMS, Cloud Computing, and Software Architecture,
              spearheading AI and Web projects.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Website Developer Intern</h4>
                <h5>Barkat Meat House · Karachi</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Completed an 8-week corporate development internship during Summer 2026.
              Engineered web features, assisted with production site maintenance, applied full-stack
              standards to real-world business requirements, and maintained strict sprint deadlines.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer &amp; Full Stack</h4>
                <h5>Seeking Entry-Level Roles</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Actively seeking full-time opportunities as an entry-level Software Engineer,
              Full Stack Developer, or Cloud/AI Web Engineer. Ready to deploy robust production software.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
