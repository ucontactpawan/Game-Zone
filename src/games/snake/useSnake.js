import { useCallback, useEffect, useRef, useState } from "react";
import { spawnFood, tick, validateDirection } from "./snakeLogic";

const INITIAL_TICK_MS = 150;

function getHighScore() {
  try {
    return parseInt(localStorage.getItem("rg-snake-hs") || "0", 10);
  } catch {
    return 0;
  }
}

function saveHighScore(score) {
  try {
    localStorage.setItem("rg-snake-hs", String(score));
  } catch {
    // localStorage unavailable
  }
}

function createInitialState(rows, cols) {
  const midRow = Math.floor(rows / 2);
  const midCol = Math.floor(cols / 2);
  const snake = [{ row: midRow, col: midCol }];
  return {
    snake,
    food: spawnFood(snake, rows, cols),
    direction: "RIGHT",
    pendingDirection: "RIGHT",
    score: 0,
    highScore: getHighScore(),
    status: "idle", // 'idle' | 'running' | 'paused' | 'game_over'
    tickMs: INITIAL_TICK_MS,
  };
}

/**
 * useSnake — manages all Snake game state and the setInterval game loop.
 *
 * @param {number} rows - Grid row count (>= 10)
 * @param {number} cols - Grid column count (>= 10)
 */
export default function useSnake(rows, cols) {
  const [state, setState] = useState(() => createInitialState(rows, cols));
  const intervalRef = useRef(null);
  // Keep a ref to the latest state so the interval callback always sees fresh state
  const stateRef = useRef(state);
  stateRef.current = state;

  // Clear the interval helper
  const clearLoop = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Start the game loop at the given tick speed
  const startLoop = useCallback(
    (tickMs) => {
      clearLoop();
      intervalRef.current = setInterval(() => {
        setState((prev) => {
          if (prev.status !== "running") return prev;
          const next = tick(prev, rows, cols);
          // Persist high score if beaten
          if (next.score > next.highScore) {
            const newHigh = next.score;
            saveHighScore(newHigh);
            return { ...next, highScore: newHigh };
          }
          // On game over, persist high score
          if (next.status === "game_over" && prev.score > prev.highScore) {
            saveHighScore(prev.score);
            return { ...next, highScore: prev.score };
          }
          return next;
        });
      }, tickMs);
    },
    [clearLoop, rows, cols]
  );

  // Restart loop when tickMs changes (speed up)
  useEffect(() => {
    if (state.status === "running") {
      startLoop(state.tickMs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.tickMs]);

  // Stop loop when game ends
  useEffect(() => {
    if (
      state.status === "game_over" ||
      state.status === "paused" ||
      state.status === "idle"
    ) {
      clearLoop();
    }
  }, [state.status, clearLoop]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearLoop();
  }, [clearLoop]);

  const startGame = useCallback(() => {
    setState((prev) => ({ ...prev, status: "running" }));
    startLoop(stateRef.current.tickMs);
  }, [startLoop]);

  const pauseGame = useCallback(() => {
    setState((prev) =>
      prev.status === "running" ? { ...prev, status: "paused" } : prev
    );
    clearLoop();
  }, [clearLoop]);

  const resetGame = useCallback(() => {
    clearLoop();
    setState(createInitialState(rows, cols));
  }, [clearLoop, rows, cols]);

  const dispatchDirection = useCallback((dir) => {
    setState((prev) => {
      if (prev.status !== "running") return prev;
      const validated = validateDirection(prev.direction, dir);
      return { ...prev, pendingDirection: validated };
    });
  }, []);

  return { state, dispatchDirection, startGame, pauseGame, resetGame };
}
