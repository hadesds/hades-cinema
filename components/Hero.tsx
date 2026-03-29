"use client";

export default function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Large background text */}
      <div
        style={{
          position: "absolute",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(120px, 25vw, 280px)",
          color: "rgba(212,160,23,0.04)",
          letterSpacing: "-0.02em",
          userSelect: "none",
          pointerEvents: "none",
          lineHeight: 1,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          whiteSpace: "nowrap",
        }}
      >
        HADES CINE
      </div>

      {/* Center content */}
      <div
        style={{
          position: "relative",
          textAlign: "center",
          maxWidth: "800px",
        }}
      >
        {/* Studio badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <div style={{ height: "1px", width: "40px", background: "#c8a96e" }} />
          <span
            style={{
              fontFamily: "'Courier Prime', monospace",
              fontSize: "10px",
              letterSpacing: "0.5em",
              color: "#c8a96e",
              textTransform: "uppercase",
            }}
          >
            HADES · Apresenta
          </span>
          <div style={{ height: "1px", width: "40px", background: "#c8a96e" }} />
        </div>

        {/* Titulo central */}
        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(64px, 14vw, 160px)",
            color: "#f5edd6",
            letterSpacing: "0.06em",
            lineHeight: 0.88,
            marginBottom: "8px",
            textShadow: "0 0 80px rgba(212,160,23,0.1)",
            animation: "heroReveal 1s cubic-bezier(0.16,1,0.3,1) both",
          }}
        >
          CINEMA
        </h1>

        {/* Subtitulo dourado */}
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(18px, 4vw, 32px)",
            color: "#d4a017",
            letterSpacing: "0.35em",
            marginBottom: "32px",
            animation: "heroReveal 1s cubic-bezier(0.16,1,0.3,1) 0.15s both",
          }}
        >
          DESCUBRA SEU PRÓXIMO FILME
        </div>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "'Special Elite', cursive",
            fontSize: "clamp(14px, 2vw, 18px)",
            color: "rgba(245,237,214,0.55)",
            lineHeight: 1.8,
            maxWidth: "520px",
            margin: "0 auto 56px",
            animation: "heroReveal 1s cubic-bezier(0.16,1,0.3,1) 0.3s both",
          }}
        >
          Um quiz que desvenda seu gosto cinematográfico e seleciona,
          os 5 filmes que vão mudar sua noite!!
        </p>

        {/* CTA arrow */}
        <a
          href="#quiz"
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
            animation: "heroReveal 1s cubic-bezier(0.16,1,0.3,1) 0.45s both",
          }}
        >
          <span
            style={{
              fontFamily: "'Courier Prime', monospace",
              fontSize: "11px",
              letterSpacing: "0.4em",
              color: "#c8a96e",
              textTransform: "uppercase",
            }}
          >
            Começar Quiz
          </span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#d4a017"
            strokeWidth="1.5"
            style={{ animation: "bounce 2s ease infinite" }}
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </a>
      </div>

      {/* Bottom decorative strip */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "16px",
          alignItems: "center",
        }}
      >
        {["★ QUIZ", "·", "5 PERGUNTAS", "·", "TOP 5 FILMES", "·", "OMDB"].map(
          (item, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'Courier Prime', monospace",
                fontSize: "10px",
                letterSpacing: "0.3em",
                color:
                  item === "·"
                    ? "rgba(200,169,110,0.25)"
                    : "rgba(200,169,110,0.45)",
                textTransform: "uppercase",
              }}
            >
              {item}
            </span>
          )
        )}
      </div>

      <style>{`
        @keyframes heroReveal {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>
    </section>
  );
}