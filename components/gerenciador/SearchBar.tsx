"use client";

import { useState } from "react";
import { buscarFilme } from "@/lib/omdb";
import { Filme } from "@/lib/types";

interface Props {
  onResult: (filme: Filme | null) => void;
}

export function SearchBar({ onResult }: Props) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const resultado = await buscarFilme(query);
    onResult(resultado);
    setLoading(false);
    if (resultado) setQuery("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          disabled={loading}
          placeholder="Ex: The Dark Knight, Inception, Parasite..."
          style={{
            flex: 1,
            padding: "13px 18px",
            background: "rgba(26,18,9,0.7)",
            border: "1px solid rgba(200,169,110,0.2)",
            color: "#f5edd6",
            fontFamily: "'Courier Prime', monospace",
            fontSize: "14px",
            outline: "none",
          }}
          onFocus={(e) =>
            (e.target.style.borderColor = "rgba(212,160,23,0.5)")
          }
          onBlur={(e) =>
            (e.target.style.borderColor = "rgba(200,169,110,0.2)")
          }
        />
        <button
          onClick={handleSearch}
          disabled={loading || !query.trim()}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "15px",
            letterSpacing: "0.2em",
            padding: "13px 28px",
            background: loading || !query.trim() ? "rgba(212,160,23,0.4)" : "#d4a017",
            color: "#1a1209",
            border: "none",
            cursor: loading || !query.trim() ? "not-allowed" : "pointer",
            transition: "background 0.2s",
          }}
        >
          {loading ? "BUSCANDO..." : "BUSCAR"}
        </button>
      </div>

      {/* Skeleton de loading */}
      {loading && (
        <div
          style={{
            display: "flex",
            gap: "16px",
            padding: "16px",
            background: "rgba(26,18,9,0.5)",
            border: "1px solid rgba(200,169,110,0.1)",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "120px",
              background: "rgba(200,169,110,0.08)",
              animation: "skeleton-pulse 1.4s ease infinite",
              flexShrink: 0,
            }}
          />
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              justifyContent: "center",
            }}
          >
            {[80, 50, 100, 100, 70].map((w, i) => (
              <div
                key={i}
                style={{
                  height: "10px",
                  width: `${w}%`,
                  background: "rgba(200,169,110,0.08)",
                  animation: `skeleton-pulse 1.4s ease ${i * 0.1}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes skeleton-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}