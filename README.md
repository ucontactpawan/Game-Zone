# GameZone

A free, browser-based arcade and puzzle game portal built with React and Vite. No downloads required — pick a game and play instantly in your browser.

## Live Games

| Game        | Status      | Category | Players | Controls          |
| ----------- | ----------- | -------- | ------- | ----------------- |
| Snake       | Live        | Arcade   | 1       | Arrow Keys / WASD |
| Memory Card | Coming Soon | Puzzle   | 1       | —                 |
| Tetris      | Coming Soon | Arcade   | 1       | —                 |
| 2048        | Coming Soon | Puzzle   | 1       | —                 |
| Wordle      | Coming Soon | Word     | 1       | —                 |
| Minesweeper | Coming Soon | Puzzle   | 1       | —                 |
| Pong        | Coming Soon | Arcade   | 2       | —                 |
| Flappy Bird | Coming Soon | Arcade   | 1       | —                 |
| Chess       | Coming Soon | Strategy | 2       | —                 |
| Sudoku      | Coming Soon | Puzzle   | 1       | —                 |
| Breakout    | Coming Soon | Arcade   | 1       | —                 |
| Trivia Quiz | Coming Soon | Word     | 1       | —                 |

## Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite 8
- **Language:** JavaScript (JSX)
- **Styling:** Vanilla CSS with CSS Custom Properties (dark / light theme)
- **Linting:** ESLint with React Hooks and Refresh plugins

## Getting Started

### Prerequisites

- Node.js 18+
- npm (comes with Node.js)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Starts the dev server at `http://localhost:5173` with Hot Module Replacement (HMR).

### Build for Production

```bash
npm run build
```

Outputs static files to the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

Serves the `dist/` folder locally for testing before deployment.

### Lint

```bash
npm run lint
```

Runs ESLint across all source files.

## Game Controls

### Snake

| Key                 | Action         |
| ------------------- | -------------- |
| `Arrow Up` / `W`    | Move up        |
| `Arrow Down` / `S`  | Move down      |
| `Arrow Left` / `A`  | Move left      |
| `Arrow Right` / `D` | Move right     |
| `Space` / `Escape`  | Pause / Resume |

**Goal:** Eat food, grow longer, and avoid crashing into walls or your own tail. Score increases by 10 per food item. The game gradually speeds up as you score higher.

**High Score:** Persisted to `localStorage` under the key `rg-snake-hs`.

## Features

- **Dark / Light Theme** — Toggle between themes; preference is saved to `localStorage`.
- **Responsive Navigation** — Desktop nav links + mobile hamburger drawer.
- **Game Search & Filters** — Search by name or filter by category (Arcade, Puzzle, Strategy, Word).
- **Coming Soon Notifications** — Click "Notify Me" on unreleased games to register interest (UI only).
- **Accessible** — Keyboard-navigable cards, `aria-label`s, focus-visible outlines, and semantic roles throughout.

## Project Structure

```
node-react-project/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable UI (NavBar, Footer, GameCard, ThemeToggle, etc.)
│   ├── context/             # React Context providers (ThemeContext)
│   ├── games/               # Individual game implementations
│   │   ├── snake/           # Snake game logic, board, controls, hook
│   │   └── memory/          # Memory Card game (placeholder)
│   ├── pages/               # Top-level page views (Home, About, Blog, etc.)
│   ├── styles/              # Global CSS and design tokens
│   ├── App.jsx              # Root component with view routing
│   └── main.jsx             # Entry point
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

## Deployment

### Static Hosting (Recommended)

After running `npm run build`, deploy the contents of the `dist/` folder to any static host:

- **Netlify** — Drag & drop the `dist/` folder, or connect via Git.
- **Vercel** — Use `vercel --prod` from the project root.
- **GitHub Pages** — Serve the `dist/` branch using a GitHub Action.

### Environment Notes

- This is a **client-side rendered (CSR)** SPA. Ensure your host is configured to serve `index.html` for all routes (SPA fallback).
- No backend or API is required.

## Roadmap

- [ ] Implement Memory Card game
- [ ] Add React Router for URL-based navigation and deep-linking
- [ ] Add unit tests for game logic (Vitest + React Testing Library)
- [ ] Lazy-load game pages to reduce initial bundle size
- [ ] PWA support for offline play and installable app experience

## License

This project is private and not licensed for public distribution.
