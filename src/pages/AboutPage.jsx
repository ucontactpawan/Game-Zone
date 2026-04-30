import { useEffect, useState } from "react";
import "./StaticPage.css";

function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (target === "∞") {
      setCount("∞");
      return;
    }

    const numericTarget = parseInt(target.replace(/[^\d]/g, "")) || 0;
    const increment = numericTarget / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericTarget) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current) + suffix);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, suffix, duration]);

  return <span className="static-page__stat-value">{count}</span>;
}

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
            We believe great games should be free, instant, and accessible to
            everyone — no downloads, no accounts, no paywalls.
          </p>
        </div>

        <div className="static-page__grid">
          <div className="static-page__card">
            <span className="static-page__card-icon">🚀</span>
            <h3>Our Mission</h3>
            <p>
              Build a growing library of high-quality browser games that anyone
              can enjoy on any device, anywhere in the world.
            </p>
          </div>
          <div className="static-page__card">
            <span className="static-page__card-icon">💡</span>
            <h3>Our Story</h3>
            <p>
              GameZone started as a side project by a small team of developers
              who wanted to bring classic arcade fun back to the browser — built
              with modern React and zero dependencies.
            </p>
          </div>
          <div className="static-page__card">
            <span className="static-page__card-icon">🌍</span>
            <h3>Open to All</h3>
            <p>
              Every game on GameZone is completely free. No sign-up required.
              Works on desktop, tablet, and mobile. Just click and play.
            </p>
          </div>
          <div className="static-page__card">
            <span className="static-page__card-icon">🛠️</span>
            <h3>Built With</h3>
            <p>
              React 19, Vite, and pure CSS. No game engines, no heavy libraries
              — just clean, fast, hand-crafted code.
            </p>
          </div>
        </div>

        <div className="static-page__stats-row">
          {[
            { value: "12+", label: "Games" },
            { value: "100%", label: "Free" },
            { value: "0", label: "Downloads needed" },
            { value: "∞", label: "Fun guaranteed" },
          ].map(({ value, label }) => (
            <div key={label} className="static-page__stat">
              <AnimatedCounter target={value} />
              <span className="static-page__stat-label">{label}</span>
            </div>
          ))}
        </div>

        <div className="static-page__cta-section">
          <h2>Ready to play?</h2>
          <p>Jump into one of our games right now — no setup needed.</p>
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
