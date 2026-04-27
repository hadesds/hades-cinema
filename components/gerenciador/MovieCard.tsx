"use client";

import { Filme } from "@/lib/types";

interface Props {
  filme: Filme;
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
}

export function MovieCard({ filme, onRemove, onToggle }: Props) {
  const isAssistido = filme.status === "assistido";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "rgba(26,18,9,0.75)",
        border: "1px solid rgba(200,169,110,0.12)",
        overflow: "hidden",
        animation: "cardIn 0.4s ease both",
      }}
    >
      {/* Poster */}
      <div style={{ position: "relative" }}>
        <img
          src={filme.poster}
          alt={filme.title}
          style={{
            width: "100%",
            aspectRatio: "2/3",
            objectFit: "cover",
            display: "block",
            filter: isAssistido ? "sepia(30%) brightness(0.85)" : "sepia(15%)",
            transition: "filter 0.3s ease",
          }}
        />
        {/* Badge de status */}
        <div
          style={{
            position: "absolute",
            top: "8px",
            left: "8px",
            fontFamily: "'Courier Prime', monospace",
            fontSize: "9px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            padding: "3px 8px",
            background: isAssistido ? "#d4a017" : "rgba(26,18,9,0.85)",
            color: isAssistido ? "#1a1209" : "#c8a96e",
            border: isAssistido ? "none" : "1px solid rgba(200,169,110,0.3)",
          }}
        >
          {isAssistido ? "✓ Assistido" : "⊕ Pendente"}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "12px", flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "15px",
            color: "#f5edd6",
            letterSpacing: "0.04em",
            lineHeight: 1.2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {filme.title}
        </div>
        <div
          style={{
            fontFamily: "'Courier Prime', monospace",
            fontSize: "10px",
            color: "rgba(200,169,110,0.5)",
          }}
        >
          {filme.year}
        </div>

        {/* Ações */}
        <div style={{ display: "flex", gap: "6px", marginTop: "auto" }}>
          <button
            onClick={() => onToggle(filme.id)}
            title={isAssistido ? "Marcar como pendente" : "Marcar como assistido"}
            style={{
              flex: 1,
              fontFamily: "'Courier Prime', monospace",
              fontSize: "10px",
              letterSpacing: "0.08em",
              padding: "7px 4px",
              background: isAssistido ? "rgba(212,160,23,0.12)" : "transparent",
              color: isAssistido ? "#d4a017" : "#c8a96e",
              border: `1px solid ${isAssistido ? "#d4a017" : "rgba(200,169,110,0.25)"}`,
              cursor: "pointer",
              transition: "all 0.15s ease",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {isAssistido ? "✓ Assistido" : "Marcar"}
          </button>
          <button
            onClick={() => onRemove(filme.id)}
            title="Remover da lista"
            style={{
              fontFamily: "'Courier Prime', monospace",
              fontSize: "10px",
              padding: "7px 10px",
              background: "transparent",
              color: "#c0392b",
              border: "1px solid rgba(192,57,43,0.3)",
              cursor: "pointer",
              transition: "all 0.15s ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(192,57,43,0.1)";
              e.currentTarget.style.borderColor = "#c0392b";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(192,57,43,0.3)";
            }}
          >
            ✕
          </button>
        </div>
      </div>

      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}