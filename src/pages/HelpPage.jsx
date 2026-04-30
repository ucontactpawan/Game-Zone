import { useState } from "react";
import "./StaticPage.css";

const FAQS = [
  {
    q: "Do I need to create an account to play?",
    a: "No! All games on GameZone are completely free and require zero sign-up. Just open the site and start playing.",
  },
  {
    q: "Does GameZone work on mobile?",
    a: "Yes. All games are responsive and work on phones and tablets. Snake includes on-screen D-pad controls for touch devices.",
  },
  {
    q: "How do I control the Snake game?",
    a: "Use Arrow Keys or WASD on desktop. On mobile, use the on-screen D-pad buttons. Press Space or Escape to pause.",
  },
  {
    q: "How do I play Memory Card?",
    a: "Click any face-down card to flip it. Then click a second card. If they match, they stay face-up. If not, they flip back after 1 second. Match all 8 pairs to win!",
  },
  {
    q: "Is my high score saved?",
    a: "Yes — Snake high scores are saved in your browser's localStorage. They persist across sessions on the same device and browser.",
  },
  {
    q: "When are new games coming?",
    a: "We're actively building Tetris, 2048, Wordle, and more. Click 'Notify Me' on any coming-soon card to get notified when it launches.",
  },
  {
    q: "The game isn't loading. What should I do?",
    a: "Try a hard refresh (Ctrl+Shift+R or Cmd+Shift+R). If the issue persists, please report it using the 'Report a Bug' link.",
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? " faq-item--open" : ""}`}>
      <button
        className="faq-item__q"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span>{q}</span>
        <span className="faq-item__chevron" aria-hidden="true">
          {open ? "▲" : "▼"}
        </span>
      </button>
      {open && <p className="faq-item__a">{a}</p>}
    </div>
  );
}

export default function HelpPage({ onBack }) {
  return (
    <div className="static-page">
      <div className="static-page__inner">
        <button className="static-page__back" onClick={onBack}>
          ← Back
        </button>

        <div className="static-page__hero">
          <span className="static-page__hero-icon">🆘</span>
          <h1 className="static-page__title">Help Center</h1>
          <p className="static-page__lead">
            Answers to the most common questions about GameZone.
          </p>
        </div>

        <div className="faq-list">
          {FAQS.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>

        <div className="static-page__cta-section">
          <h2>Still need help?</h2>
          <p>Our team usually responds within 24 hours.</p>
          <button className="static-page__btn static-page__btn--primary">
            📧 Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
