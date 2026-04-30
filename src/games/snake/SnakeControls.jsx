import "./SnakeControls.css";

const DIRECTIONS = [
  { dir: "UP", label: "Move up", icon: "▲", area: "up" },
  { dir: "LEFT", label: "Move left", icon: "◀", area: "left" },
  { dir: "RIGHT", label: "Move right", icon: "▶", area: "right" },
  { dir: "DOWN", label: "Move down", icon: "▼", area: "down" },
];

/**
 * SnakeControls — on-screen D-pad for mobile/touch users.
 *
 * @param {Function} onDirection - Callback with Direction string
 */
function SnakeControls({ onDirection }) {
  return (
    <div
      className="snake-controls"
      role="group"
      aria-label="Snake direction controls"
    >
      {DIRECTIONS.map(({ dir, label, icon, area }) => (
        <button
          key={dir}
          className={`snake-controls__btn snake-controls__btn--${area}`}
          aria-label={label}
          onPointerDown={(e) => {
            e.preventDefault(); // prevent focus steal on mobile
            onDirection(dir);
          }}
        >
          {icon}
        </button>
      ))}
    </div>
  );
}

export default SnakeControls;
