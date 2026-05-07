import "./StaticPage.css";

const ABOUT_CARDS = [
  {
    icon: "⚡",
    title: "Instant Experience",
    text: "Open the site and play in seconds with no installs, no waiting, and no account required.",
  },
  {
    icon: "🎯",
    title: "Gameplay First",
    text: "We focus on smooth controls, clear UI, and lightweight code so every game feels fast.",
  },
  {
    icon: "🛠️",
    title: "Built Modern",
    text: "GameZone is crafted with React and Vite, using scalable components and theme-ready design.",
  },
];

export default function AboutPage({ onBack, onSelectGame }) {
  return (
    <div className="static-page">
      <div className="static-page__inner">
        <button className="static-page__back" onClick={onBack}>
          ← Back
        </button>

        <div className="static-page__hero">
          <span className="static-page__hero-icon">🎮</span>
          <h1 className="static-page__title">About GameZone</h1>
          <p className="static-page__lead">
            A modern browser gaming hub focused on speed, simplicity, and fun.
            Play instantly on any device with a clean, distraction-free
            experience.
          </p>
        </div>

        <div className="static-page__grid">
          {ABOUT_CARDS.map((item) => (
            <div key={item.title} className="static-page__card">
              <span className="static-page__card-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        <div className="static-page__cta-section">
          <h2>Ready to jump in?</h2>
          <p>Choose a game and start playing right away.</p>
          <div className="static-page__cta-btns">
            <button
              className="static-page__btn static-page__btn--primary"
              onClick={() => onSelectGame("snake")}
            >
              🐍 Play Snake
            </button>
            <button
              className="static-page__btn static-page__btn--secondary"
              onClick={() => onSelectGame("memory")}
            >
              🃏 Play Memory Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
