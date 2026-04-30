import "./StaticPage.css";

export default function TermsPage({ onBack }) {
  return (
    <div className="static-page">
      <div className="static-page__inner">
        <button className="static-page__back" onClick={onBack}>
          ← Back
        </button>
        <div className="static-page__hero">
          <span className="static-page__hero-icon">📄</span>
          <h1 className="static-page__title">Terms of Service</h1>
          <p className="static-page__lead">Last updated: April 30, 2026</p>
        </div>
        <div className="static-page__prose">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using GameZone, you accept and agree to be bound by
            these Terms of Service. If you do not agree, please do not use the
            site.
          </p>

          <h2>2. Use of Service</h2>
          <p>
            GameZone provides free browser-based games for personal,
            non-commercial use. You may not:
          </p>
          <ul>
            <li>
              Attempt to reverse-engineer, copy, or redistribute our games
            </li>
            <li>Use automated tools to interact with the site</li>
            <li>Attempt to disrupt or damage the service</li>
          </ul>

          <h2>3. Intellectual Property</h2>
          <p>
            All game code, designs, and assets on GameZone are the property of
            GameZone and its creators. All rights reserved.
          </p>

          <h2>4. Disclaimer of Warranties</h2>
          <p>
            GameZone is provided "as is" without any warranties. We do not
            guarantee uninterrupted or error-free service.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            GameZone shall not be liable for any indirect, incidental, or
            consequential damages arising from your use of the service.
          </p>

          <h2>6. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued
            use of the service constitutes acceptance of the updated terms.
          </p>

          <h2>7. Contact</h2>
          <p>For questions about these terms, please use our Contact page.</p>
        </div>
      </div>
    </div>
  );
}
