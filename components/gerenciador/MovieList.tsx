"use client";

import { useState, useMemo } from "react";
import { Filme, FiltroStatus } from "@/lib/types";
import { MovieCard } from "./MovieCard";

interface Props {
  filmes: Filme[];
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
}

const FILTROS: { label: string; value: FiltroStatus }[] = [
  { label: "Todos", value: "todos" },
  { label: "Assistidos", value: "assistido" },
  { label: "Pendentes", value: "pendente" },
];

export function MovieList({ filmes, onRemove, onToggle }: Props) {
  const [filtro, setFiltro] = useState<FiltroStatus>("todos");

  const filtrados = useMemo(
    () =>
      filtro === "todos"
        ? filmes
        : filmes.filter((f) => f.status === filtro),
    [filmes, filtro]
  );

  const assistidos = filmes.filter((f) => f.status === "assistido").length;

  if (filmes.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "48px 0",
          fontFamily: "'Special Elite', cursive",
          fontSize: "15px",
          color: "rgba(245,237,214,0.25)",
        }}
      >
        Nenhum filme salvo ainda. Busque um filme acima e adicione à sua lista!
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Cabeçalho com contador e filtros */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div
          style={{
            fontFamily: "'Courier Prime', monospace",
            fontSize: "11px",
            color: "rgba(200,169,110,0.5)",
            letterSpacing: "0.15em",
          }}
        >
          {filmes.length} {filmes.length === 1 ? "filme" : "filmes"} &nbsp;·&nbsp;{" "}
          {assistidos} assistido{assistidos !== 1 ? "s" : ""}
        </div>

        <div style={{ display: "flex", gap: "6px" }}>
          {FILTROS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFiltro(f.value)}
              style={{
                fontFamily: "'Courier Prime', monospace",
                fontSize: "10px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "6px 14px",
                background:
                  filtro === f.value
                    ? "#d4a017"
                    : "transparent",
                color:
                  filtro === f.value ? "#1a1209" : "rgba(200,169,110,0.5)",
                border:
                  filtro === f.value
                    ? "1px solid #d4a017"
                    : "1px solid rgba(200,169,110,0.2)",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid responsivo */}
      {filtrados.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "32px 0",
            fontFamily: "'Courier Prime', monospace",
            fontSize: "12px",
            color: "rgba(200,169,110,0.3)",
          }}
        >
          Nenhum filme {filtro === "assistido" ? "assistido" : "pendente"} na lista.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(148px, 1fr))",
            gap: "14px",
          }}
        >
          {filtrados.map((f, i) => (
            <div
              key={f.id}
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <MovieCard
                filme={f}
                onRemove={onRemove}
                onToggle={onToggle}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}