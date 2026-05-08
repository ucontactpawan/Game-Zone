/**
 * twenty48Logic.js — Pure functions for 2048 game.
 * No side effects, no React dependencies.
 */

const SIZE = 4;

/**
 * @typedef {number[][]} Board
 */

function emptyBoard() {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}

function cloneBoard(board) {
  return board.map((row) => [...row]);
}

function getEmptyCells(board) {
  const cells = [];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] === 0) cells.push({ row: r, col: c });
    }
  }
  return cells;
}

function spawnTile(board) {
  const empties = getEmptyCells(board);
  if (empties.length === 0) return board;
  const spot = empties[Math.floor(Math.random() * empties.length)];
  const value = Math.random() < 0.9 ? 2 : 4;
  const next = cloneBoard(board);
  next[spot.row][spot.col] = value;
  return next;
}

/**
 * Slide and merge a single row to the left.
 * @param {number[]} row
 * @returns {{ row: number[], gained: number }}
 */
function slideRowLeft(row) {
  const filtered = row.filter((x) => x !== 0);
  const merged = [];
  let gained = 0;
  for (let i = 0; i < filtered.length; i++) {
    if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
      const val = filtered[i] * 2;
      merged.push(val);
      gained += val;
      i++;
    } else {
      merged.push(filtered[i]);
    }
  }
  while (merged.length < SIZE) merged.push(0);
  return { row: merged, gained };
}

/**
 * Move the entire board left.
 * @param {Board} board
 * @returns {{ board: Board, gained: number, moved: boolean }}
 */
function moveLeft(board) {
  let gained = 0;
  let moved = false;
  const next = [];
  for (const row of board) {
    const result = slideRowLeft(row);
    next.push(result.row);
    gained += result.gained;
    if (!moved && !row.every((v, i) => v === result.row[i])) moved = true;
  }
  return { board: next, gained, moved };
}

/**
 * Move the entire board right.
 * @param {Board} board
 * @returns {{ board: Board, gained: number, moved: boolean }}
 */
function moveRight(board) {
  let gained = 0;
  let moved = false;
  const next = [];
  for (const row of board) {
    const reversed = [...row].reverse();
    const result = slideRowLeft(reversed);
    const fixed = result.row.reverse();
    next.push(fixed);
    gained += result.gained;
    if (!moved && !row.every((v, i) => v === fixed[i])) moved = true;
  }
  return { board: next, gained, moved };
}

function transpose(board) {
  const t = emptyBoard();
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      t[c][r] = board[r][c];
    }
  }
  return t;
}

/**
 * Move the entire board up.
 * @param {Board} board
 * @returns {{ board: Board, gained: number, moved: boolean }}
 */
function moveUp(board) {
  const t = transpose(board);
  const result = moveLeft(t);
  return {
    board: transpose(result.board),
    gained: result.gained,
    moved: result.moved,
  };
}

/**
 * Move the entire board down.
 * @param {Board} board
 * @returns {{ board: Board, gained: number, moved: boolean }}
 */
function moveDown(board) {
  const t = transpose(board);
  const result = moveRight(t);
  return {
    board: transpose(result.board),
    gained: result.gained,
    moved: result.moved,
  };
}

const MOVES = {
  UP: moveUp,
  DOWN: moveDown,
  LEFT: moveLeft,
  RIGHT: moveRight,
};

/**
 * Execute a move.
 * @param {Board} board
 * @param {'UP'|'DOWN'|'LEFT'|'RIGHT'} direction
 * @returns {{ board: Board, gained: number, moved: boolean }}
 */
export function move(board, direction) {
  const fn = MOVES[direction];
  if (!fn) return { board: cloneBoard(board), gained: 0, moved: false };
  return fn(board);
}

/**
 * Check if any 2048 tile exists.
 * @param {Board} board
 * @returns {boolean}
 */
export function hasWon(board) {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] === 2048) return true;
    }
  }
  return false;
}

/**
 * Check if any move is possible.
 * @param {Board} board
 * @returns {boolean}
 */
export function canMove(board) {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] === 0) return true;
      if (c + 1 < SIZE && board[r][c] === board[r][c + 1]) return true;
      if (r + 1 < SIZE && board[r][c] === board[r + 1][c]) return true;
    }
  }
  return false;
}

/**
 * Create a fresh game board with 2 random tiles.
 * @returns {Board}
 */
export function createBoard() {
  let board = emptyBoard();
  board = spawnTile(board);
  board = spawnTile(board);
  return board;
}

/**
 * Spawn a tile after a valid move.
 * @param {Board} board
 * @returns {Board}
 */
export function spawnAfterMove(board) {
  return spawnTile(board);
}

/**
 * Get color class suffix for a tile value.
 * @param {number} value
 * @returns {string}
 */
export function tileClass(value) {
  if (value <= 4) return "low";
  if (value <= 16) return "mid";
  if (value <= 64) return "high";
  if (value <= 512) return "very-high";
  return "extreme";
}
