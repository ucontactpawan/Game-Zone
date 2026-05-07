import { useState } from "react";
import "./StaticPage.css";

const INITIAL_FORM = {
  name: "",
  email: "",
  subject: "general",
  message: "",
};

export default function ContactPage({ onBack }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setForm(INITIAL_FORM);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="static-page">
        <div className="static-page__inner">
          <button className="static-page__back" onClick={onBack}>
            ← Back
          </button>
          <div className="static-page__hero">
            <span className="static-page__hero-icon">✅</span>
            <h1 className="static-page__title">Message Sent!</h1>
            <p className="static-page__lead">
              Thanks for reaching out. We'll get back to you within 24 hours.
            </p>
          </div>
          <button
            className="static-page__btn static-page__btn--primary"
            onClick={onBack}
          >
            ← Back to GameZone
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="static-page">
      <div className="static-page__inner">
        <button className="static-page__back" onClick={onBack}>
          ← Back
        </button>

        <div className="static-page__hero">
          <span className="static-page__hero-icon">✉️</span>
          <h1 className="static-page__title">Contact Us</h1>
          <p className="static-page__lead">
            Have a question, suggestion, or just want to say hi? We'd love to
            hear from you.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="contact-form__row">
            <div className="contact-form__field">
              <label htmlFor="cf-name">Your Name</label>
              <input
                id="cf-name"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="contact-form__field">
              <label htmlFor="cf-email">Email Address</label>
              <input
                id="cf-email"
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="contact-form__field">
            <label htmlFor="cf-subject">Subject</label>
            <select
              id="cf-subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
            >
              <option value="general">General Question</option>
              <option value="bug">Report a Bug</option>
              <option value="feature">Feature Request</option>
              <option value="partnership">Partnership</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="contact-form__field">
            <label htmlFor="cf-message">Message</label>
            <textarea
              id="cf-message"
              rows={5}
              placeholder="Tell us what's on your mind…"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="static-page__btn static-page__btn--primary contact-form__submit"
          >
            Send Message →
          </button>
        </form>
      </div>
    </div>
  );
}
