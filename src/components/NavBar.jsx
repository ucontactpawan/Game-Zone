import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import "./NavBar.css";

const NAV_LINKS = [
  { label: "Games", id: "home" },
  { label: "Snake", id: "snake" },
  { label: "Memory", id: "memory" },
  { label: "About", id: "about" },
];

export default function NavBar({ onHome, onSelectGame, activeView = "home" }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLink(id) {
    setMenuOpen(false);
    if (!id) return;
    if (id === "home") onHome();
    else onSelectGame(id);
  }

  return (
    <header className="navbar" role="banner">
      <nav className="navbar__inner" aria-label="Main navigation">
        {/* ── Logo ── */}
        <button
          className="navbar__logo"
          onClick={onHome}
          aria-label="GameZone — go to homepage"
        >
          <span className="navbar__logo-icon" aria-hidden="true">
            <svg
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="32" cy="32" r="32" fill="#22c55e" />
              <rect x="13" y="21" width="38" height="24" rx="12" fill="white" />
              <rect x="17" y="29" width="11" height="4" rx="2" fill="#22c55e" />
              <rect
                x="20.5"
                y="25.5"
                width="4"
                height="11"
                rx="2"
                fill="#22c55e"
              />
              <circle cx="44" cy="28" r="2.8" fill="#22c55e" />
              <circle cx="50" cy="33" r="2.8" fill="#22c55e" />
              <circle cx="44" cy="38" r="2.8" fill="#22c55e" />
              <circle cx="38" cy="33" r="2.8" fill="#22c55e" />
            </svg>
          </span>
          <span className="navbar__logo-text">
            Game<span className="navbar__logo-accent">Zone</span>
          </span>
        </button>

        {/* ── Desktop nav links ── */}
        <ul className="navbar__links" role="list">
          {NAV_LINKS.map(({ label, id }) => (
            <li key={label}>
              <button
                className={`navbar__link${
                  activeView === id ? " navbar__link--active" : ""
                }`}
                onClick={() => handleLink(id)}
                aria-current={activeView === id ? "page" : undefined}
              >
                {label}
                {activeView === id && (
                  <span className="navbar__link-dot" aria-hidden="true" />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* ── Right side ── */}
        <div className="navbar__right">
          <ThemeToggle />
          <button
            className="navbar__cta"
            onClick={() => onSelectGame?.("snake")}
            aria-label="Play Snake now"
          >
            <span className="navbar__cta-icon" aria-hidden="true">
              ▶
            </span>
            Play Now
          </button>

          {/* Hamburger — mobile only */}
          <button
            className={`navbar__hamburger${
              menuOpen ? " navbar__hamburger--open" : ""
            }`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      {menuOpen && (
        <div
          className="navbar__drawer"
          role="dialog"
          aria-label="Mobile navigation"
        >
          <ul role="list">
            {NAV_LINKS.map(({ label, id }) => (
              <li key={label}>
                <button
                  className={`navbar__drawer-link${
                    activeView === id ? " navbar__drawer-link--active" : ""
                  }`}
                  onClick={() => handleLink(id)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
          <button
            className="navbar__drawer-cta"
            onClick={() => {
              onSelectGame?.("snake");
              setMenuOpen(false);
            }}
          >
            ▶ Play Now
          </button>
        </div>
      )}
    </header>
  );
}
