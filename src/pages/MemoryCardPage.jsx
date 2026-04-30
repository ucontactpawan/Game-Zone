/**
 * MemoryCardPage — stub (full implementation coming in task 8)
 */
function MemoryCardPage({ onBack }) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        padding: "2rem",
      }}
    >
      <div style={{ fontSize: "4rem" }}>🃏</div>
      <h2
        style={{
          color: "var(--text-primary)",
          fontSize: "1.5rem",
          fontWeight: 700,
        }}
      >
        Memory Card
      </h2>
      <p style={{ color: "var(--text-secondary)" }}>Coming soon…</p>
      <button
        onClick={onBack}
        style={{
          padding: "0.6rem 1.4rem",
          borderRadius: "var(--radius-md)",
          background: "var(--accent-primary)",
          color: "#fff",
          border: "none",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        ← Back
      </button>
    </div>
  );
}

export default MemoryCardPage;
