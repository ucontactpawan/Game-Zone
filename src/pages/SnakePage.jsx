import SnakeGame from "../games/snake/SnakeGame";

/**
 * SnakePage — page wrapper for the Snake game.
 *
 * @param {Function} onBack - Navigate back to homepage
 */
function SnakePage({ onBack }) {
  return <SnakeGame onBack={onBack} />;
}

export default SnakePage;
