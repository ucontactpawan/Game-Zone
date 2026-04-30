import { useCallback, useEffect } from "react";
import { buildGrid } from "./snakeLogic";
import useSnake from "./useSnake";
import SnakeBoard from "./SnakeBoard";
import ScoreDisplay from "./ScoreDisplay";
import SnakeControls from "./SnakeControls";
import "./SnakeGame.css";

const ROWS = 20;
const COLS = 20;

const KEY_MAP = {
  ArrowUp: "UP",
  ArrowDown: "DOWN",
  ArrowLeft: "LEFT",
  ArrowRight: "RIGHT",
  w: "UP",
  s: "DOWN",
  a: "LEFT",
  d: "RIGHT",
};

/**
 * SnakeGame — orchestrates the Snake game.
 *
 * @param {Function} onBack - Navigate back to homepage
 */
function SnakeGame({ onBack }) {
  const { state, dispatchDirection, startGame, pauseGame, resetGame } =
    useSnake(ROWS, COLS);

  const { snake, food, score, highScore, status } = state;

  // Keyboard handler
  const handleKeyDown = useCallback(
    (e) => {
      const dir = KEY_MAP[e.key];
      if (dir) {
        e.preventDefault();
        if (status === "idle" || status === "paused") {
          startGame();
        }
        dispatchDirection(dir);
      }
      if (e.key === " " || e.key === "Escape") {
        e.preventDefault();
        if (status === "running") pauseGame();
        else if (status === "paused") startGame();
        else if (status === "idle") startGame();
      }
    },
    [status, startGame, pauseGame, dispatchDirection]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const grid = buildGrid(ROWS, COLS, snake, food);

  const isIdle = status === "idle";
  const isPaused = status === "paused";
  const isGameOver = status === "game_over";
  const showOverlay = isIdle || isPaused || isGameOver;

  return (
    <div className="snake-game">
      {/* Header */}
      <div className="snake-game__header">
        <button className="snake-game__back-btn" onClick={onBack}>
          ← Back
        </button>
        <span className="snake-game__title">🐍 Snake</span>
        <ScoreDisplay score={score} highScore={highScore} />
      </div>

      {/* Board + overlay */}
      <div className="snake-game__board-wrap">
        <SnakeBoard grid={grid} cols={COLS} rows={ROWS} />

        {showOverlay && (
          <div className="snake-game__overlay">
            {isGameOver ? (
              <>
                <div className="snake-game__overlay-title">Game Over</div>
                <div className="snake-game__overlay-score">
                  Score: <strong>{score}</strong>
                </div>
                <div className="snake-game__overlay-actions">
                  <button
                    className="snake-game__btn snake-game__btn--primary"
                    onClick={resetGame}
                  >
                    Play Again
                  </button>
                  <button
                    className="snake-game__btn snake-game__btn--secondary"
                    onClick={onBack}
                  >
                    Home
                  </button>
                </div>
              </>
            ) : isPaused ? (
              <>
                <div className="snake-game__overlay-title">Paused</div>
                <div className="snake-game__overlay-actions">
                  <button
                    className="snake-game__btn snake-game__btn--primary"
                    onClick={startGame}
                  >
                    Resume
                  </button>
                  <button
                    className="snake-game__btn snake-game__btn--secondary"
                    onClick={onBack}
                  >
                    Home
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="snake-game__overlay-title">🐍 Snake</div>
                <div className="snake-game__overlay-actions">
                  <button
                    className="snake-game__btn snake-game__btn--primary"
                    onClick={startGame}
                  >
                    Start Game
                  </button>
                </div>
                <p className="snake-game__hint">
                  Arrow keys or WASD to move · Space to pause
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Mobile D-pad */}
      <div className="snake-game__controls">
        <SnakeControls
          onDirection={(dir) => {
            if (status === "idle" || status === "paused") startGame();
            dispatchDirection(dir);
          }}
        />
      </div>

      {status === "running" && (
        <p className="snake-game__hint">Space / Esc to pause</p>
      )}
    </div>
  );
}

export default SnakeGame;
