import "./Footer.css";

const FOOTER_LINKS = {
  Games: [
    { label: "Snake", id: "snake" },
    { label: "Memory Card", id: "memory" },
    { label: "Tetris", id: null },
    { label: "2048", id: null },
    { label: "Wordle", id: null },
  ],
  Company: [
    { label: "About Us", id: "about" },
    { label: "Blog", id: "blog" },
    { label: "Careers", id: "careers" },
    { label: "Press Kit", id: null },
  ],
  Support: [
    { label: "Help Center", id: "help" },
    { label: "Contact Us", id: "contact" },
    { label: "Report a Bug", id: "contact" },
    { label: "Feedback", id: "contact" },
  ],
  Legal: [
    { label: "Privacy Policy", id: "privacy" },
    { label: "Terms of Service", id: "terms" },
    { label: "Cookie Policy", id: null },
  ],
};

const SOCIALS = [
  {
    label: "Twitter / X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Discord",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function Footer({ onSelectGame }) {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        {/* ── Brand column ── */}
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-icon" aria-hidden="true">
              <svg
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="32" cy="32" r="32" fill="#22c55e" />
                <rect
                  x="13"
                  y="21"
                  width="38"
                  height="24"
                  rx="12"
                  fill="white"
                />
                <rect
                  x="17"
                  y="29"
                  width="11"
                  height="4"
                  rx="2"
                  fill="#22c55e"
                />
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
            <span className="footer__logo-text">
              Game<span className="footer__logo-accent">Zone</span>
            </span>
          </div>
          <p className="footer__tagline">
            Free browser games — no downloads, no sign-ups. Just play.
          </p>

          {/* Social icons */}
          <div className="footer__socials">
            {SOCIALS.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                className="footer__social-btn"
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── Link columns ── */}
        {Object.entries(FOOTER_LINKS).map(([section, links]) => (
          <div key={section} className="footer__col">
            <h3 className="footer__col-title">{section}</h3>
            <ul className="footer__col-links" role="list">
              {links.map(({ label, id }) => (
                <li key={label}>
                  {id ? (
                    <button
                      className="footer__link footer__link--btn"
                      onClick={() => onSelectGame?.(id)}
                    >
                      {label}
                    </button>
                  ) : (
                    <a
                      href="#"
                      className="footer__link"
                      onClick={(e) => e.preventDefault()}
                    >
                      {label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer__bottom">
        <div className="footer__bottom-inner">
          <p className="footer__copy">
            © {year} GameZone. Made with ❤️ for gamers everywhere.
          </p>
          <div className="footer__bottom-links">
            <a
              href="#"
              className="footer__bottom-link"
              onClick={(e) => {
                e.preventDefault();
                onSelectGame?.("privacy");
              }}
            >
              Privacy
            </a>
            <span className="footer__bottom-sep" aria-hidden="true">
              ·
            </span>
            <a
              href="#"
              className="footer__bottom-link"
              onClick={(e) => {
                e.preventDefault();
                onSelectGame?.("terms");
              }}
            >
              Terms
            </a>
            <span className="footer__bottom-sep" aria-hidden="true">
              ·
            </span>
            <a
              href="#"
              className="footer__bottom-link"
              onClick={(e) => {
                e.preventDefault();
                onSelectGame?.("contact");
              }}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
