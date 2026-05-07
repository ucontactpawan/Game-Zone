import { useEffect, useRef, useState } from "react";
import "./MemoryGame.css";

const SYMBOLS = ["🐶", "🐱", "🦊", "🐼", "🐸", "🐵", "🐙", "🦄"];
const BEST_SCORE_KEY = "rg-memory-best-moves";

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function createDeck() {
  const doubled = [...SYMBOLS, ...SYMBOLS];
  return shuffle(doubled).map((symbol, index) => ({
    id: `${symbol}-${index}`,
    symbol,
    isFlipped: false,
    isMatched: false,
  }));
}

function getBestMoves() {
  try {
    return Number(localStorage.getItem(BEST_SCORE_KEY)) || 0;
  } catch {
    return 0;
  }
}

function saveBestMoves(moves) {
  try {
    localStorage.setItem(BEST_SCORE_KEY, String(moves));
  } catch {
    // localStorage unavailable
  }
}

export default function MemoryGame({ onBack }) {
  const [cards, setCards] = useState(() => createDeck());
  const [flippedIds, setFlippedIds] = useState([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | running
  const [hasWon, setHasWon] = useState(false);
  const [bestMoves, setBestMoves] = useState(getBestMoves);
  const [isResolving, setIsResolving] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (status !== "running" || hasWon) return undefined;
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [status, hasWon]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function resetGame() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCards(createDeck());
    setFlippedIds([]);
    setMoves(0);
    setSeconds(0);
    setStatus("idle");
    setHasWon(false);
    setIsResolving(false);
  }

  function handleCardClick(cardId) {
    if (isResolving || hasWon) return;
    if (status === "idle") setStatus("running");

    const clicked = cards.find((card) => card.id === cardId);
    if (!clicked || clicked.isMatched || clicked.isFlipped) return;
    if (flippedIds.length >= 2) return;

    const nextFlippedIds = [...flippedIds, cardId];

    setCards((prev) =>
      prev.map((card) =>
        card.id === cardId ? { ...card, isFlipped: true } : card
      )
    );
    setFlippedIds(nextFlippedIds);

    if (nextFlippedIds.length !== 2) return;

    setMoves((prev) => prev + 1);
    const [firstId, secondId] = nextFlippedIds;
    const firstCard = cards.find((card) => card.id === firstId);
    const secondCard = cards.find((card) => card.id === secondId);
    const isMatch = firstCard && secondCard && firstCard.symbol === secondCard.symbol;

    setIsResolving(true);

    timeoutRef.current = setTimeout(() => {
      setCards((prev) => {
        const nextCards = prev.map((card) => {
          if (card.id !== firstId && card.id !== secondId) return card;
          if (isMatch) return { ...card, isMatched: true, isFlipped: true };
          return { ...card, isFlipped: false };
        });

        const nextMatchedCount = nextCards.filter((card) => card.isMatched).length;
        if (nextMatchedCount === nextCards.length) {
          setHasWon(true);
          setStatus("idle");
          const finalMoves = moves + 1;
          if (bestMoves === 0 || finalMoves < bestMoves) {
            setBestMoves(finalMoves);
            saveBestMoves(finalMoves);
          }
        }

        return nextCards;
      });
      setFlippedIds([]);
      setIsResolving(false);
    }, 700);
  }

  const isWon = hasWon;

  return (
    <div className="memory-game">
      <div className="memory-game__header">
        <button className="memory-game__back-btn" onClick={onBack}>
          ← Back
        </button>
        <span className="memory-game__title">🃏 Memory Card</span>
        <button className="memory-game__new-btn" onClick={resetGame}>
          New Game
        </button>
      </div>

      <div className="memory-game__stats" role="status" aria-live="polite">
        <div className="memory-game__stat">
          <span className="memory-game__stat-label">Moves</span>
          <strong>{moves}</strong>
        </div>
        <div className="memory-game__stat">
          <span className="memory-game__stat-label">Time</span>
          <strong>{seconds}s</strong>
        </div>
        <div className="memory-game__stat">
          <span className="memory-game__stat-label">Best</span>
          <strong>{bestMoves || "-"}</strong>
        </div>
      </div>

      <div className="memory-game__board">
        {cards.map((card) => {
          const open = card.isFlipped || card.isMatched;
          return (
            <button
              key={card.id}
              className={`memory-game__card${open ? " memory-game__card--open" : ""}${
                card.isMatched ? " memory-game__card--matched" : ""
              }`}
              onClick={() => handleCardClick(card.id)}
              aria-label={open ? `Card ${card.symbol}` : "Hidden card"}
              disabled={card.isMatched || isResolving}
            >
              <span className="memory-game__card-face memory-game__card-face--front">
                {card.symbol}
              </span>
              <span className="memory-game__card-face memory-game__card-face--back">
                ?
              </span>
            </button>
          );
        })}
      </div>

      {status === "idle" && (
        <p className="memory-game__hint">
          Flip cards to find all pairs. Game starts on first flip.
        </p>
      )}

      {isWon && (
        <div className="memory-game__win">
          <h2>Great memory!</h2>
          <p>
            You matched all cards in <strong>{moves}</strong> moves and{" "}
            <strong>{seconds}</strong> seconds.
          </p>
          <button className="memory-game__play-again" onClick={resetGame}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
