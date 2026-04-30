import "./SnakeBoard.css";

/**
 * SnakeBoard — pure display component that renders the snake grid.
 *
 * @param {string[][]} grid - 2D array of CellType values
 * @param {number}     cols - Number of columns
 * @param {number}     rows - Number of rows
 */
function SnakeBoard({ grid, cols, rows }) {
  return (
    <div
      className="snake-board"
      role="img"
      aria-label="Snake game board"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        "--cols": cols,
        "--rows": rows,
      }}
    >
      {grid.flat().map((cellType, idx) => (
        <div key={idx} className={`snake-cell snake-cell--${cellType}`} />
      ))}
    </div>
  );
}

export default SnakeBoard;
