import "./StaticPage.css";

const OPENINGS = [
  {
    role: "Frontend Engineer",
    type: "Full-time · Remote",
    dept: "Engineering",
  },
  { role: "Game Designer", type: "Full-time · Remote", dept: "Design" },
  { role: "UI/UX Designer", type: "Contract · Remote", dept: "Design" },
  { role: "Community Manager", type: "Part-time · Remote", dept: "Marketing" },
];

export default function CareersPage({ onBack }) {
  return (
    <div className="static-page">
      <div className="static-page__inner">
        <button className="static-page__back" onClick={onBack}>
          ← Back
        </button>

        <div className="static-page__hero">
          <span className="static-page__hero-icon">💼</span>
          <h1 className="static-page__title">Careers</h1>
          <p className="static-page__lead">
            Join a small, passionate team building the best free browser games
            on the web. We're fully remote and always looking for great people.
          </p>
        </div>

        <div className="static-page__grid">
          <div className="static-page__card">
            <span className="static-page__card-icon">🌍</span>
            <h3>100% Remote</h3>
            <p>
              Work from anywhere in the world. We care about results, not where
              you sit.
            </p>
          </div>
          <div className="static-page__card">
            <span className="static-page__card-icon">🎮</span>
            <h3>Play What You Build</h3>
            <p>
              Every team member plays the games we ship. Your feedback shapes
              the product.
            </p>
          </div>
          <div className="static-page__card">
            <span className="static-page__card-icon">📈</span>
            <h3>Grow Fast</h3>
            <p>
              Small team means big impact. Your work ships to real users
              immediately.
            </p>
          </div>
        </div>

        <h2 className="static-page__section-title">Open Positions</h2>
        <div className="careers-list">
          {OPENINGS.map((job) => (
            <div key={job.role} className="careers-item">
              <div className="careers-item__info">
                <span className="careers-item__dept">{job.dept}</span>
                <h3 className="careers-item__role">{job.role}</h3>
                <span className="careers-item__type">{job.type}</span>
              </div>
              <button className="static-page__btn static-page__btn--primary careers-item__btn">
                Apply Now →
              </button>
            </div>
          ))}
        </div>

        <div className="static-page__cta-section">
          <h2>Don't see your role?</h2>
          <p>
            Send us your CV anyway — we're always open to exceptional people.
          </p>
          <button className="static-page__btn static-page__btn--secondary">
            📧 Send Open Application
          </button>
        </div>
      </div>
    </div>
  );
}
