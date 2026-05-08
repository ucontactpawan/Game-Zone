import { useCallback, useEffect, useState } from "react";
import {
  createBoard,
  move,
  spawnAfterMove,
  hasWon,
  canMove,
  tileClass,
} from "./twenty48Logic";
import "./Twenty48Game.css";

const BEST_KEY = "rg-2048-best";

function loadBest() {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}

function saveBest(score) {
  try {
    localStorage.setItem(BEST_KEY, String(score));
  } catch {
    // localStorage unavailable
  }
}

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

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function Twenty48Game({ onBack }) {
  const [board, setBoard] = useState(() => createBoard());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(loadBest);
  const [won, setWon] = useState(false);
  const [wonDismissed, setWonDismissed] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(false);

  /* Timer */
  useEffect(() => {
    if (!started || gameOver) return undefined;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [started, gameOver]);

  const resetGame = useCallback(() => {
    setBoard(createBoard());
    setScore(0);
    setWon(false);
    setWonDismissed(false);
    setGameOver(false);
    setSeconds(0);
    setStarted(false);
  }, []);

  const handleMove = useCallback(
    (direction) => {
      if (gameOver) return;
      if (!started) setStarted(true);

      const result = move(board, direction);
      if (!result.moved) return;

      let nextBoard = spawnAfterMove(result.board);
      const nextScore = score + result.gained;

      if (!won && hasWon(nextBoard)) setWon(true);
      if (!canMove(nextBoard)) setGameOver(true);

      if (nextScore > bestScore) {
        setBestScore(nextScore);
        saveBest(nextScore);
      }

      setBoard(nextBoard);
      setScore(nextScore);
    },
    [board, score, bestScore, won, gameOver, started],
  );

  useEffect(() => {
    function onKey(e) {
      const dir = KEY_MAP[e.key];
      if (dir) {
        e.preventDefault();
        handleMove(dir);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleMove]);

  const showOverlay = !started || (won && !wonDismissed) || gameOver;

  return (
    <div className="twenty48-game">
      {/* Header */}
      <div className="twenty48-game__header">
        <button className="twenty48-game__back-btn" onClick={onBack}>
          <span>←</span> Back
        </button>
        <span className="twenty48-game__title">🔢 2048</span>
        <button className="twenty48-game__new-btn" onClick={resetGame}>
          New Game
        </button>
      </div>

      {/* Stats */}
      <div className="twenty48-game__stats">
        <div className="twenty48-game__stat">
          <span className="twenty48-game__stat-label">Score</span>
          <strong>{score}</strong>
        </div>
        <div className="twenty48-game__stat">
          <span className="twenty48-game__stat-label">Best</span>
          <strong>{bestScore}</strong>
        </div>
        <div className="twenty48-game__stat">
          <span className="twenty48-game__stat-label">Time</span>
          <strong>{formatTime(seconds)}</strong>
        </div>
      </div>

      {/* Board */}
      <div className="twenty48-game__board-wrap">
        <div className="twenty48-game__board">
          {board.map((row, r) =>
            row.map((value, c) => (
              <div
                key={`${r}-${c}`}
                className={`twenty48-game__tile twenty48-game__tile--${tileClass(value)}${
                  value !== 0 ? " twenty48-game__tile--filled" : ""
                }`}
              >
                {value !== 0 && (
                  <span className="twenty48-game__tile-value">{value}</span>
                )}
              </div>
            )),
          )}
        </div>

        {/* Overlay */}
        {showOverlay && (
          <div className="twenty48-game__overlay">
            {gameOver ? (
              <>
                <div className="twenty48-game__overlay-icon">💀</div>
                <div className="twenty48-game__overlay-title">Game Over</div>
                <div className="twenty48-game__overlay-score">
                  Final Score: <strong>{score}</strong>
                </div>
                <div className="twenty48-game__overlay-actions">
                  <button
                    className="twenty48-game__btn twenty48-game__btn--primary"
                    onClick={resetGame}
                  >
                    Try Again
                  </button>
                  <button
                    className="twenty48-game__btn twenty48-game__btn--secondary"
                    onClick={onBack}
                  >
                    Home
                  </button>
                </div>
              </>
            ) : won ? (
              <>
                <div className="twenty48-game__overlay-icon">🏆</div>
                <div className="twenty48-game__overlay-title">You Won!</div>
                <div className="twenty48-game__overlay-subtitle">
                  You reached 2048. Keep going!
                </div>
                <div className="twenty48-game__overlay-actions">
                  <button
                    className="twenty48-game__btn twenty48-game__btn--primary"
                    onClick={() => setWonDismissed(true)}
                  >
                    Continue
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="twenty48-game__overlay-icon">🔢</div>
                <div className="twenty48-game__overlay-title">2048</div>
                <div className="twenty48-game__overlay-subtitle">
                  Join the numbers to get to the <strong>2048</strong> tile!
                </div>
                <div className="twenty48-game__overlay-actions">
                  <button
                    className="twenty48-game__btn twenty48-game__btn--primary"
                    onClick={() => setStarted(true)}
                  >
                    Start Game
                  </button>
                </div>
                <p className="twenty48-game__hint">
                  Use arrow keys or WASD to slide tiles
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Touch controls */}
      <div className="twenty48-game__touch-controls">
        <TouchControls onMove={handleMove} />
      </div>

      {started && !gameOver && (
        <p className="twenty48-game__hint">Arrow keys / WASD to move</p>
      )}
    </div>
  );
}

/* ── Touch swipe controls ── */
function TouchControls({ onMove }) {
  const touchStart = useCallback((e) => {
    const t = e.touches[0];
    return { x: t.clientX, y: t.clientY };
  }, []);

  const elRef = useCallback(
    (node) => {
      if (!node) return;
      let start = null;
      const onStart = (e) => {
        start = touchStart(e);
      };
      const onEnd = (e) => {
        if (!start) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - start.x;
        const dy = t.clientY - start.y;
        const minSwipe = 40;
        if (Math.abs(dx) < minSwipe && Math.abs(dy) < minSwipe) return;
        if (Math.abs(dx) > Math.abs(dy)) {
          onMove(dx > 0 ? "RIGHT" : "LEFT");
        } else {
          onMove(dy > 0 ? "DOWN" : "UP");
        }
        start = null;
      };
      node.addEventListener("touchstart", onStart, { passive: true });
      node.addEventListener("touchend", onEnd, { passive: true });
      return () => {
        node.removeEventListener("touchstart", onStart);
        node.removeEventListener("touchend", onEnd);
      };
    },
    [onMove, touchStart],
  );

  return (
    <div
      ref={elRef}
      className="twenty48-game__touch-zone"
      aria-label="Swipe to move tiles"
    >
      <span>Swipe to move</span>
    </div>
  );
}
