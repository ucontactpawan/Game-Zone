import "./GameCard.css";

/**
 * GameCard — card for the homepage game grid.
 *
 * @param {string}   title        - Game title
 * @param {string}   description  - Short description
 * @param {string}   icon         - Emoji icon
 * @param {string}   tag          - Optional badge text (e.g. "New", "Hot")
 * @param {string}   tagColor     - Badge color: 'green' | 'orange' | 'blue' | 'purple'
 * @param {boolean}  comingSoon   - Renders "Coming Soon" state
 * @param {string}   players      - e.g. "1 Player"
 * @param {string}   difficulty   - e.g. "Easy" | "Medium" | "Hard"
 * @param {boolean}  notified     - Whether user already clicked notify
 * @param {Function} onPlay       - Callback when card is activated
 * @param {Function} onNotify     - Callback for "Notify Me" on coming-soon cards
 */
function GameCard({
  title,
  description,
  icon,
  tag,
  tagColor = "green",
  comingSoon = false,
  players,
  difficulty,
  notified = false,
  onPlay,
  onNotify,
}) {
  const diffClass =
    difficulty === "Easy" ? "easy" : difficulty === "Hard" ? "hard" : "medium";

  function handleKeyDown(e) {
    if (comingSoon) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onPlay();
    }
  }

  return (
    <div
      className={`game-card${comingSoon ? " game-card--soon" : ""}`}
      role={comingSoon ? "article" : "button"}
      tabIndex={comingSoon ? -1 : 0}
      onClick={comingSoon ? undefined : onPlay}
      onKeyDown={handleKeyDown}
      aria-label={comingSoon ? `${title} — Coming Soon` : `Play ${title}`}
    >
      {/* Badge (Hot / New) */}
      {tag && !comingSoon && (
        <span className={`game-card__tag game-card__tag--${tagColor}`}>
          {tag}
        </span>
      )}

      {/* Coming Soon pill */}
      {comingSoon && (
        <div className="game-card__soon-overlay">
          <span className="game-card__soon-text">Coming Soon</span>
        </div>
      )}

      {/* Icon */}
      <span className="game-card__icon" aria-hidden="true">
        {icon}
      </span>

      {/* Title */}
      <h2 className="game-card__title">{title}</h2>

      {/* Description */}
      <p className="game-card__description">{description}</p>

      {/* Meta pills */}
      {(players || difficulty) && (
        <div className="game-card__meta">
          {players && (
            <span className="game-card__meta-pill">👤 {players}</span>
          )}
          {difficulty && (
            <span
              className={`game-card__meta-pill game-card__meta-pill--${diffClass}`}
            >
              {difficulty}
            </span>
          )}
        </div>
      )}

      {/* Action */}
      {comingSoon ? (
        <button
          className={`game-card__notify-btn${
            notified ? " game-card__notify-btn--done" : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            if (!notified) onNotify?.();
          }}
          aria-label={
            notified
              ? "Already subscribed for notifications"
              : `Notify me when ${title} launches`
          }
        >
          {notified ? "✓ Notified" : "🔔 Notify Me"}
        </button>
      ) : (
        <span className="game-card__btn">▶ Play Now</span>
      )}
    </div>
  );
}

export default GameCard;
