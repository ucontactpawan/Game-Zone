/**
 * memoryLogic.js — Pure functions for Memory Card game.
 * No side effects, no React dependencies.
 */

const EMOJIS = [
  "🚀", "🌈", "🎸", "🍕", "🐱", "🌵", "🎈", "💎",
  "🔥", "🎁", "🍀", "🌙", "⭐", "🎵", "🏆", "🎨",
];

/**
 * @typedef {Object} Card
 * @property {number} id
 * @property {string} emoji
 * @property {boolean} isFlipped
 * @property {boolean} isMatched
 */

/**
 * Create a shuffled deck of card pairs.
 * @param {number} pairCount — number of pairs (default 8 for 4×4 grid)
 * @returns {Card[]}
 */
export function createDeck(pairCount = 8) {
  const selected = EMOJIS.slice(0, pairCount);
  const cards = selected.flatMap((emoji, idx) => [
    { id: idx * 2, emoji, isFlipped: false, isMatched: false },
    { id: idx * 2 + 1, emoji, isFlipped: false, isMatched: false },
  ]);
  return shuffle(cards);
}

/**
 * Fisher-Yates shuffle.
 * @template T
 * @param {T[]} arr
 * @returns {T[]}
 */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Flip a card if allowed.
 * @param {Card[]} cards
 * @param {number} index
 * @returns {Card[] | null} — new cards array or null if invalid
 */
export function flipCard(cards, index) {
  const card = cards[index];
  if (!card || card.isFlipped || card.isMatched) return null;
  const next = cards.map((c, i) =>
    i === index ? { ...c, isFlipped: true } : c
  );
  return next;
}

/**
 * Check if the two currently flipped cards match.
 * @param {Card[]} cards
 * @returns {{ matched: boolean, indices: number[] }}
 */
export function findFlippedPair(cards) {
  const flipped = cards
    .map((c, i) => ({ ...c, index: i }))
    .filter((c) => c.isFlipped && !c.isMatched);
  if (flipped.length !== 2) return { matched: false, indices: [] };
  const matched = flipped[0].emoji === flipped[1].emoji;
  return { matched, indices: flipped.map((c) => c.index) };
}

/**
 * Mark flipped pair as matched or flip them back.
 * @param {Card[]} cards
 * @param {boolean} matched
 * @param {number[]} indices
 * @returns {Card[]}
 */
export function resolveFlipped(cards, matched, indices) {
  return cards.map((c, i) => {
    if (!indices.includes(i)) return c;
    if (matched) return { ...c, isMatched: true };
    return { ...c, isFlipped: false };
  });
}

/**
 * Check if all pairs are matched.
 * @param {Card[]} cards
 * @returns {boolean}
 */
export function isGameWon(cards) {
  return cards.every((c) => c.isMatched);
}
