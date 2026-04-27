"use client";

import { Filme } from "@/lib/types";

interface Props {
  filme: Filme;
  onSalvar: (filme: Filme) => void;
}

export function MovieResult({ filme, onSalvar }: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        background: "rgba(212,160,23,0.04)",
        border: "1px solid rgba(212,160,23,0.2)",
        animation: "fadeSlideUp 0.4s ease both",
      }}
    >
      <img
        src={filme.poster}
        alt={filme.title}
        style={{
          width: "80px",
          height: "120px",
          objectFit: "cover",
          flexShrink: 0,
          filter: "sepia(15%)",
          border: "1px solid rgba(200,169,110,0.2)",
        }}
      />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "22px",
            color: "#f5edd6",
            letterSpacing: "0.05em",
            lineHeight: 1.1,
            marginBottom: "4px",
          }}
        >
          {filme.title}
        </div>
        <div
          style={{
            fontFamily: "'Courier Prime', monospace",
            fontSize: "11px",
            color: "#c8a96e",
            letterSpacing: "0.2em",
            marginBottom: "10px",
          }}
        >
          {filme.year} · {filme.genre}
        </div>
        <div
          style={{
            fontFamily: "'Courier Prime', monospace",
            fontSize: "12px",
            color: "rgba(245,237,214,0.55)",
            lineHeight: 1.7,
            marginBottom: "14px",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical" as const,
            overflow: "hidden",
          }}
        >
          {filme.plot}
        </div>
        <button
          onClick={() => onSalvar(filme)}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "13px",
            letterSpacing: "0.2em",
            padding: "9px 22px",
            background: "#d4a017",
            color: "#1a1209",
            border: "none",
            cursor: "pointer",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          + SALVAR NA LISTA
        </button>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}