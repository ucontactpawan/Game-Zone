import { useState, useMemo } from "react";
import GameCard from "../components/GameCard";
import ParticleBackground from "../components/ParticleBackground";
import "./HomePage.css";

/* ── Game catalog ── */
const GAMES = [
  {
    id: "snake",
    title: "Snake",
    description:
      "Eat food, grow longer, dodge walls and your own tail. How long can you last?",
    icon: "🐍",
    tag: "Hot",
    tagColor: "orange",
    category: "arcade",
    comingSoon: false,
    players: "1 Player",
    difficulty: "Medium",
  },
  {
    id: "memory",
    title: "Memory Card",
    description:
      "Flip cards to find matching pairs. Beat your best time and move count!",
    icon: "🃏",
    tag: "New",
    tagColor: "green",
    category: "puzzle",
    comingSoon: false,
    players: "1 Player",
    difficulty: "Easy",
  },
  {
    id: "tetris",
    title: "Tetris",
    description:
      "Stack falling blocks, clear lines, and survive as the speed ramps up.",
    icon: "🟦",
    category: "arcade",
    comingSoon: true,
    players: "1 Player",
    difficulty: "Hard",
  },
  {
    id: "2048",
    title: "2048",
    description:
      "Slide tiles and combine numbers to reach the legendary 2048 tile.",
    icon: "🔢",
    tag: "New",
    tagColor: "green",
    category: "puzzle",
    comingSoon: false,
    players: "1 Player",
    difficulty: "Medium",
  },
  {
    id: "wordle",
    title: "Wordle",
    description:
      "Guess the hidden 5-letter word in six tries. A new puzzle every day.",
    icon: "🔤",
    category: "word",
    comingSoon: true,
    players: "1 Player",
    difficulty: "Easy",
  },
  {
    id: "minesweeper",
    title: "Minesweeper",
    description:
      "Uncover tiles without hitting a mine. Logic, luck, and nerves of steel.",
    icon: "💣",
    category: "puzzle",
    comingSoon: true,
    players: "1 Player",
    difficulty: "Hard",
  },
  {
    id: "pong",
    title: "Pong",
    description:
      "The original arcade classic. Bounce the ball past your opponent.",
    icon: "🏓",
    category: "arcade",
    comingSoon: true,
    players: "2 Players",
    difficulty: "Easy",
  },
  {
    id: "flappy",
    title: "Flappy Bird",
    description:
      "Tap to fly through pipes. Simple to learn, impossible to master.",
    icon: "🐦",
    category: "arcade",
    comingSoon: true,
    players: "1 Player",
    difficulty: "Hard",
  },
  {
    id: "chess",
    title: "Chess",
    description:
      "The timeless strategy game. Outsmart your opponent in 64 squares.",
    icon: "♟️",
    category: "strategy",
    comingSoon: true,
    players: "2 Players",
    difficulty: "Hard",
  },
  {
    id: "sudoku",
    title: "Sudoku",
    description:
      "Fill the 9×9 grid so every row, column, and box has digits 1–9.",
    icon: "🔲",
    category: "puzzle",
    comingSoon: true,
    players: "1 Player",
    difficulty: "Medium",
  },
  {
    id: "breakout",
    title: "Breakout",
    description: "Smash bricks with a bouncing ball. Don't let it fall!",
    icon: "🧱",
    category: "arcade",
    comingSoon: true,
    players: "1 Player",
    difficulty: "Medium",
  },
  {
    id: "trivia",
    title: "Trivia Quiz",
    description:
      "Test your knowledge across science, history, pop culture and more.",
    icon: "🧠",
    category: "word",
    comingSoon: true,
    players: "1 Player",
    difficulty: "Easy",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Games", icon: "🎮" },
  { id: "arcade", label: "Arcade", icon: "🕹️" },
  { id: "puzzle", label: "Puzzle", icon: "🧩" },
  { id: "strategy", label: "Strategy", icon: "♟️" },
  { id: "word", label: "Word", icon: "📝" },
];

const STATS = [
  { value: "12+", label: "Games" },
  { value: "100%", label: "Free" },
  { value: "0", label: "Downloads" },
  { value: "∞", label: "Fun" },
];

/* Featured game shown in the hero banner */
const FEATURED = GAMES[0];

export default function HomePage({ onSelectGame }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [notified, setNotified] = useState(new Set());
  const [toastMsg, setToastMsg] = useState("");

  /* Filtered game list */
  const filtered = useMemo(() => {
    return GAMES.filter((g) => {
      const matchCat =
        activeCategory === "all" || g.category === activeCategory;
      const matchSearch =
        !search ||
        g.title.toLowerCase().includes(search.toLowerCase()) ||
        g.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  function handleNotify(gameId, title) {
    setNotified((prev) => new Set([...prev, gameId]));
    showToast(`🔔 You'll be notified when ${title} launches!`);
  }

  function showToast(msg) {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  }

  return (
    <div className="home-page">
      <ParticleBackground />

      {/* ══ HERO ══ */}
      <section className="home-page__hero">
        <div className="home-page__hero-badge">
          🎮 Browser Games — Free Forever
        </div>
        <h1 className="home-page__title">
          Play Games.
          <br />
          <span className="home-page__title-accent">No Downloads.</span>
        </h1>
        <p className="home-page__subtitle">
          Instant fun in your browser — free, fast, and always growing.
        </p>

        {/* CTA buttons */}
        <div className="home-page__hero-ctas">
          <button
            className="home-page__cta-primary"
            onClick={() => onSelectGame(FEATURED.id)}
          >
            ▶ Play {FEATURED.title} Now
          </button>
          <button
            className="home-page__cta-secondary"
            onClick={() =>
              document
                .getElementById("game-grid")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Browse All Games ↓
          </button>
        </div>

        {/* Stats */}
        <div className="home-page__stats">
          {STATS.map(({ value, label }) => (
            <div key={label} className="home-page__stat">
              <span className="home-page__stat-value">{value}</span>
              <span className="home-page__stat-label">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FEATURED BANNER ══ */}
      <div className="home-page__featured">
        <div className="home-page__featured-label">⭐ Featured Game</div>
        <div className="home-page__featured-content">
          <span className="home-page__featured-icon">{FEATURED.icon}</span>
          <div className="home-page__featured-info">
            <h3 className="home-page__featured-title">{FEATURED.title}</h3>
            <p className="home-page__featured-desc">{FEATURED.description}</p>
            <div className="home-page__featured-meta">
              <span className="home-page__meta-pill">
                🎯 {FEATURED.difficulty}
              </span>
              <span className="home-page__meta-pill">
                👤 {FEATURED.players}
              </span>
            </div>
          </div>
          <button
            className="home-page__featured-btn"
            onClick={() => onSelectGame(FEATURED.id)}
          >
            Play Now →
          </button>
        </div>
      </div>

      {/* ══ SEARCH + FILTERS ══ */}
      <div className="home-page__controls" id="game-grid">
        {/* Search */}
        <div className="home-page__search-wrap">
          <span className="home-page__search-icon">🔍</span>
          <input
            className="home-page__search"
            type="search"
            placeholder="Search games…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search games"
          />
          {search && (
            <button
              className="home-page__search-clear"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category pills */}
        <div
          className="home-page__filters"
          role="group"
          aria-label="Filter by category"
        >
          {CATEGORIES.map(({ id, label, icon }) => (
            <button
              key={id}
              className={`home-page__filter-btn${
                activeCategory === id ? " home-page__filter-btn--active" : ""
              }`}
              onClick={() => setActiveCategory(id)}
              aria-pressed={activeCategory === id}
            >
              {icon} {label}
            </button>
          ))}
        </div>
      </div>

      {/* ══ SECTION HEADING ══ */}
      <div className="home-page__section-head">
        <h2 className="home-page__section-title">
          {activeCategory === "all"
            ? "All Games"
            : CATEGORIES.find((c) => c.id === activeCategory)?.label}
        </h2>
        <span className="home-page__section-count">
          {filtered.length} game{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* ══ GAME GRID ══ */}
      {filtered.length > 0 ? (
        <div className="home-page__grid">
          {filtered.map((game, i) => (
            <div
              key={game.id}
              className="home-page__card-wrap"
              style={{ "--delay": `${i * 50}ms` }}
            >
              <GameCard
                title={game.title}
                description={game.description}
                icon={game.icon}
                tag={game.tag}
                tagColor={game.tagColor}
                comingSoon={game.comingSoon}
                players={game.players}
                difficulty={game.difficulty}
                notified={notified.has(game.id)}
                onPlay={() => onSelectGame(game.id)}
                onNotify={() => handleNotify(game.id, game.title)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="home-page__empty">
          <span className="home-page__empty-icon">🔍</span>
          <p>
            No games found for <strong>"{search}"</strong>
          </p>
          <button
            className="home-page__empty-reset"
            onClick={() => {
              setSearch("");
              setActiveCategory("all");
            }}
          >
            Clear filters
          </button>
        </div>
      )}

      {/* ══ FOOTER NOTE ══ */}
      <p className="home-page__footer-note">
        More games dropping soon — stay tuned 🚀
      </p>

      {/* ══ TOAST ══ */}
      {toastMsg && (
        <div className="home-page__toast" role="status" aria-live="polite">
          {toastMsg}
        </div>
      )}
    </div>
  );
}
