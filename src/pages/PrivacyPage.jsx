import "./StaticPage.css";

export default function PrivacyPage({ onBack }) {
  return (
    <div className="static-page">
      <div className="static-page__inner">
        <button className="static-page__back" onClick={onBack}>
          ← Back
        </button>
        <div className="static-page__hero">
          <span className="static-page__hero-icon">🔒</span>
          <h1 className="static-page__title">Privacy Policy</h1>
          <p className="static-page__lead">Last updated: April 30, 2026</p>
        </div>
        <div className="static-page__prose">
          <h2>1. Information We Collect</h2>
          <p>
            GameZone does not collect any personal information. We do not
            require you to create an account or provide any personal details to
            use our games.
          </p>
          <p>
            We store the following data <strong>locally in your browser</strong>{" "}
            only:
          </p>
          <ul>
            <li>Your theme preference (dark or light mode)</li>
            <li>Your Snake game high score</li>
          </ul>
          <p>
            This data never leaves your device and is not transmitted to any
            server.
          </p>

          <h2>2. Cookies</h2>
          <p>
            GameZone does not use tracking cookies or third-party analytics. We
            use <code>localStorage</code> (not cookies) to save your preferences
            locally.
          </p>

          <h2>3. Third-Party Services</h2>
          <p>
            We do not integrate any third-party advertising, analytics, or
            tracking services. No data is shared with any third party.
          </p>

          <h2>4. Children's Privacy</h2>
          <p>
            GameZone is safe for all ages. We do not collect any data from users
            of any age.
          </p>

          <h2>5. Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. Changes will be
            reflected on this page with an updated date.
          </p>

          <h2>6. Contact</h2>
          <p>
            If you have any questions about this policy, please contact us via
            the Contact page.
          </p>
        </div>
      </div>
    </div>
  );
}
