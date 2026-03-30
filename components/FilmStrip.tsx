"use client";

export default function FilmStrip({ position = "top" }: { position?: "top" | "bottom" }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "40px",
        background: "#0d0d0d",
        borderTop: position === "bottom" ? "2px solid #2c1810" : "none",
        borderBottom: position === "top" ? "2px solid #2c1810" : "none",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Furos da engrenagem à esquerda */}
      <div style={{ display: "flex", gap: "24px", padding: "0 12px", flexShrink: 0 }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: "14px",
              height: "20px",
              borderRadius: "3px",
              background: "#1a1209",
              border: "1px solid #3a2a1a",
            }}
          />
        ))}
      </div>

      {/* Rolagem de fita de titulo */}
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          position: "relative",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "48px",
            whiteSpace: "nowrap",
            animation: "scroll-tape 20s linear infinite",
            color: "#c8a96e",
            fontSize: "11px",
            letterSpacing: "0.3em",
            fontFamily: "'Courier Prime', monospace",
            textTransform: "uppercase",
          }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i}>
              ★ HADES FILMES &nbsp;·&nbsp; QUIZ CINEMATOGRÁFICO &nbsp;·&nbsp; TOP 5 RECOMENDAÇÕES &nbsp;·&nbsp; DESCUBRA SEU FILME &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Furos da engrenagem à direita */}
      <div style={{ display: "flex", gap: "24px", padding: "0 12px", flexShrink: 0 }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: "14px",
              height: "20px",
              borderRadius: "3px",
              background: "#1a1209",
              border: "1px solid #3a2a1a",
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes scroll-tape {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}