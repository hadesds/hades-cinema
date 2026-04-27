"use client";

import { useState, useEffect, useCallback } from "react";
import { Filme } from "@/lib/types";
import { listarFilmes, salvarFilme, removerFilme, toggleStatus } from "@/lib/storage";
import { SearchBar } from "./SearchBar";
import { MovieResult } from "./MovieResult";
import { MovieList } from "./MovieList";
import FilmStrip from "@/components/FilmStrip";

export function GerenciadorSection() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [resultadoBusca, setResultadoBusca] = useState<Filme | null>(null);
  const [mensagem, setMensagem] = useState("");

  const recarregar = useCallback(() => {
    setFilmes(listarFilmes());
  }, []);

  useEffect(() => {
    recarregar();
  }, [recarregar]);

  useEffect(() => {
    if (!mensagem) return;
    const t = setTimeout(() => setMensagem(""), 3000);
    return () => clearTimeout(t);
  }, [mensagem]);

  function handleResult(filme: Filme | null) {
    if (!filme) {
      setMensagem("Filme não encontrado. Tente outro título.");
      setResultadoBusca(null);
      return;
    }
    setResultadoBusca(filme);
    setMensagem("");
  }

  function handleSalvar(filme: Filme) {
    const salvo = salvarFilme(filme);
    if (!salvo) {
      setMensagem("Este filme já está na sua lista!");
      return;
    }
    setResultadoBusca(null);
    setMensagem("");
    recarregar();
  }

  function handleRemove(id: string) {
    removerFilme(id);
    recarregar();
  }

  function handleToggle(id: string) {
    toggleStatus(id);
    recarregar();
  }

  return (
    <>
      <FilmStrip position="bottom" />

      <section
        id="gerenciador"
        style={{
          minHeight: "100vh",
          padding: "60px 24px 80px",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.45) 100%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", maxWidth: "720px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "11px", letterSpacing: "0.4em", color: "#c8a96e", textTransform: "uppercase", marginBottom: "12px" }}>
              ◆ Sua Lista Pessoal ◆
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(44px, 8vw, 72px)", color: "#f5edd6", letterSpacing: "0.06em", lineHeight: 0.95 }}>
              GERENCIADOR<br />
              <span style={{ color: "#d4a017" }}>DE FILMES</span>
            </h2>
            <p style={{ fontFamily: "'Special Elite', cursive", fontSize: "14px", color: "rgba(245,237,214,0.5)", marginTop: "12px", lineHeight: 1.7 }}>
              Busque qualquer filme pelo título, salve na sua lista e marque como assistido quando terminar.
            </p>
          </div>

          <div style={{ marginBottom: "12px", fontFamily: "'Courier Prime', monospace", fontSize: "11px", letterSpacing: "0.3em", color: "#c8a96e", textTransform: "uppercase" }}>
            ◆ Buscar Filme
          </div>

          <SearchBar onResult={handleResult} />

          {mensagem && (
            <div style={{ marginTop: "12px", padding: "12px 16px", background: "rgba(192,57,43,0.1)", border: "1px solid rgba(192,57,43,0.3)", fontFamily: "'Courier Prime', monospace", fontSize: "12px", color: "#e74c3c", letterSpacing: "0.05em" }}>
              {mensagem}
            </div>
          )}

          {resultadoBusca && (
            <div style={{ marginTop: "16px" }}>
              <MovieResult filme={resultadoBusca} onSalvar={handleSalvar} />
            </div>
          )}

          <div style={{ margin: "40px 0 24px", height: "1px", background: "rgba(200,169,110,0.1)" }} />

          <div style={{ marginBottom: "12px", fontFamily: "'Courier Prime', monospace", fontSize: "11px", letterSpacing: "0.3em", color: "#c8a96e", textTransform: "uppercase" }}>
            ◆ Minha Lista
          </div>

          <MovieList filmes={filmes} onRemove={handleRemove} onToggle={handleToggle} />
        </div>
      </section>
    </>
  );
}
