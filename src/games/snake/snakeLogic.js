/**
 * snakeLogic.js — Pure functions for Snake game logic.
 * No side effects, no React dependencies — fully testable in isolation.
 */

/** @typedef {'UP'|'DOWN'|'LEFT'|'RIGHT'} Direction */
/** @typedef {{ row: number, col: number }} Position */
/** @typedef {'empty'|'snake_head'|'snake_body'|'food'} CellType */

const OPPOSITES = {
  UP: "DOWN",
  DOWN: "UP",
  LEFT: "RIGHT",
  RIGHT: "LEFT",
};

/**
 * Compute the next head position given current head and direction.
 * @param {Position} head
 * @param {Direction} direction
 * @returns {Position}
 */
export function computeNewHead(head, direction) {
  switch (direction) {
    case "UP":
      return { row: head.row - 1, col: head.col };
    case "DOWN":
      return { row: head.row + 1, col: head.col };
    case "LEFT":
      return { row: head.row, col: head.col - 1 };
    case "RIGHT":
      return { row: head.row, col: head.col + 1 };
    default:
      return head;
  }
}

/**
 * Validate a direction change — prevents 180° reversals.
 * @param {Direction} current - Current direction of travel
 * @param {Direction} next    - Requested next direction
 * @returns {Direction}       - Validated direction (next, or current if reversal)
 */
export function validateDirection(current, next) {
  if (OPPOSITES[current] === next) return current;
  return next;
}

/**
 * Spawn food at a random position not occupied by the snake.
 * @param {Position[]} snake - Current snake segments
 * @param {number}     rows  - Grid row count
 * @param {number}     cols  - Grid column count
 * @returns {Position}
 */
export function spawnFood(snake, rows, cols) {
  // Guard: if board is full, return a fallback (shouldn't happen in practice)
  if (snake.length >= rows * cols) {
    return { row: 0, col: 0 };
  }

  const snakeSet = new Set(snake.map((s) => `${s.row},${s.col}`));
  let candidate;
  do {
    candidate = {
      row: Math.floor(Math.random() * rows),
      col: Math.floor(Math.random() * cols),
    };
  } while (snakeSet.has(`${candidate.row},${candidate.col}`));

  return candidate;
}

/**
 * Execute one game tick — move the snake, check collisions, handle food.
 *
 * Preconditions:
 *   - state.status === 'running'
 *   - state.snake has at least 1 element
 *
 * @param {object} state - Current SnakeState
 * @param {number} rows  - Grid row count
 * @param {number} cols  - Grid column count
 * @returns {object}     - Next SnakeState
 */
export function tick(state, rows, cols) {
  const { snake, food, pendingDirection, score, tickMs } = state;

  const direction = pendingDirection;
  const head = snake[0];
  const newHead = computeNewHead(head, direction);

  // Wall collision
  if (
    newHead.row < 0 ||
    newHead.row >= rows ||
    newHead.col < 0 ||
    newHead.col >= cols
  ) {
    return { ...state, status: "game_over" };
  }

  // Self collision (check against all current segments)
  for (const segment of snake) {
    if (segment.row === newHead.row && segment.col === newHead.col) {
      return { ...state, status: "game_over" };
    }
  }

  // Food collision
  const ateFood = newHead.row === food.row && newHead.col === food.col;

  let newSnake, newFood, newScore, newTickMs;

  if (ateFood) {
    newSnake = [newHead, ...snake]; // grow: keep tail
    newFood = spawnFood(newSnake, rows, cols);
    newScore = score + 10;
    newTickMs = Math.max(60, tickMs - 2); // speed up slightly, floor at 60ms
  } else {
    newSnake = [newHead, ...snake.slice(0, snake.length - 1)]; // move: drop tail
    newFood = food;
    newScore = score;
    newTickMs = tickMs;
  }

  return {
    ...state,
    snake: newSnake,
    food: newFood,
    direction,
    score: newScore,
    tickMs: newTickMs,
    status: "running",
  };
}

/**
 * Build a 2D grid array for rendering.
 *
 * @param {number}     rows
 * @param {number}     cols
 * @param {Position[]} snake - [0] = head
 * @param {Position}   food
 * @returns {CellType[][]}
 */
export function buildGrid(rows, cols, snake, food) {
  // Initialise all cells as empty
  const grid = Array.from({ length: rows }, () => Array(cols).fill("empty"));

  // Mark food
  if (food.row >= 0 && food.row < rows && food.col >= 0 && food.col < cols) {
    grid[food.row][food.col] = "food";
  }

  // Mark snake body (iterate in reverse so head overwrites body if overlap)
  for (let i = snake.length - 1; i >= 0; i--) {
    const { row, col } = snake[i];
    if (row >= 0 && row < rows && col >= 0 && col < cols) {
      grid[row][col] = i === 0 ? "snake_head" : "snake_body";
    }
  }

  return grid;
}
