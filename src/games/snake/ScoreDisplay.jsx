import "./ScoreDisplay.css";

/**
 * ScoreDisplay — shows current score and all-time high score.
 *
 * @param {number} score     - Current game score
 * @param {number} highScore - All-time high score
 */
function ScoreDisplay({ score, highScore }) {
  return (
    <div className="score-display" aria-live="polite" aria-atomic="true">
      <div className="score-display__item">
        <span className="score-display__label">Score</span>
        <span className="score-display__value">{score}</span>
      </div>
      <div className="score-display__item score-display__item--high">
        <span className="score-display__label">Best</span>
        <span className="score-display__value">{highScore}</span>
      </div>
    </div>
  );
}

export default ScoreDisplay;
