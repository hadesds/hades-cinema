"use client";

import { useState } from "react";
import { questions, buildSearchQuery } from "@/lib/quiz";
import MovieCard from "./MovieCard";

type Phase = "idle" | "quiz" | "loading" | "results";

export default function QuizSection() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [movies, setMovies] = useState<any[]>([]);
  const [resultGenre, setResultGenre] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const question = questions[currentQ];
  const progress = ((currentQ) / questions.length) * 100;

  function startQuiz() {
    setPhase("quiz");
    setCurrentQ(0);
    setAnswers({});
    setSelected(null);
  }

  async function handleAnswer(value: string) {
    setSelected(value);
    const newAnswers = { ...answers, [question.id]: value };

    setTimeout(async () => {
      setSelected(null);
      if (currentQ < questions.length - 1) {
        setAnswers(newAnswers);
        setCurrentQ((q) => q + 1);
      } else {
        // Last question — fetch movies
        setPhase("loading");
        const { genre, yearStart, yearEnd } = buildSearchQuery(newAnswers);
        try {
          const res = await fetch(
            `/api/movies?genre=${encodeURIComponent(genre)}&yearStart=${yearStart}&yearEnd=${yearEnd}`
          );
          const data = await res.json();
          setMovies(data.movies || []);
          setResultGenre(data.genre || genre);
        } catch (_) {
          setMovies([]);
        }
        setPhase("results");
      }
    }, 300);
  }

  function restart() {
    setPhase("idle");
    setCurrentQ(0);
    setAnswers({});
    setMovies([]);
    setSelected(null);
  }

  return (
    <section
      id="quiz"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px",
        position: "relative",
      }}
    >
      {/* Decorative vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", width: "100%", maxWidth: "680px" }}>
        {/* ─── IDLE STATE ─── */}
        {phase === "idle" && (
          <div style={{ textAlign: "center", animation: "fadeIn 0.8s ease both" }}>
            <div
              style={{
                fontFamily: "'Courier Prime', monospace",
                fontSize: "11px",
                letterSpacing: "0.4em",
                color: "#c8a96e",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              ◆ Projeção Especial ◆
            </div>

            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(52px, 10vw, 90px)",
                color: "#f5edd6",
                letterSpacing: "0.08em",
                lineHeight: 0.9,
                marginBottom: "12px",
                textShadow: "4px 4px 0 rgba(212,160,23,0.15)",
              }}
            >
              QUAL É O SEU<br />
              <span style={{ color: "#d4a017" }}>FILME?</span>
            </h2>

            <p
              style={{
                fontFamily: "'Special Elite', cursive",
                fontSize: "16px",
                color: "rgba(245,237,214,0.6)",
                marginBottom: "48px",
                lineHeight: 1.7,
                maxWidth: "460px",
                margin: "0 auto 48px",
              }}
            >
              Cinco perguntas. Cinco respostas. E o cinema te revela
              os filmes que você nasceu para assistir.
            </p>

            <button
              onClick={startQuiz}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "20px",
                letterSpacing: "0.25em",
                color: "#1a1209",
                background: "#d4a017",
                border: "none",
                padding: "16px 52px",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
                boxShadow: "4px 4px 0 rgba(212,160,23,0.3)",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.transform = "translate(-2px, -2px)";
                (e.target as HTMLElement).style.boxShadow = "6px 6px 0 rgba(212,160,23,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.transform = "translate(0,0)";
                (e.target as HTMLElement).style.boxShadow = "4px 4px 0 rgba(212,160,23,0.3)";
              }}
            >
              INICIAR PROJEÇÃO
            </button>

            {/* Decorative film frame corners */}
            <FrameCorners />
          </div>
        )}

        {/* ─── QUIZ STATE ─── */}
        {phase === "quiz" && question && (
          <div style={{ animation: "fadeIn 0.4s ease both" }}>
            {/* Progress bar */}
            <div
              style={{
                width: "100%",
                height: "2px",
                background: "rgba(200,169,110,0.15)",
                marginBottom: "40px",
                position: "relative",
              }}
            >
              <div
                style={{
                  height: "100%",
                  background: "#d4a017",
                  width: `${((currentQ + 1) / questions.length) * 100}%`,
                  transition: "width 0.4s ease",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "-20px",
                  fontFamily: "'Courier Prime', monospace",
                  fontSize: "11px",
                  color: "#c8a96e",
                  letterSpacing: "0.2em",
                }}
              >
                {currentQ + 1} / {questions.length}
              </div>
            </div>

            {/* Question */}
            <div
              style={{
                fontFamily: "'Courier Prime', monospace",
                fontSize: "11px",
                letterSpacing: "0.4em",
                color: "#c8a96e",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Pergunta {currentQ + 1}
            </div>
            <h3
              style={{
                fontFamily: "'Special Elite', cursive",
                fontSize: "clamp(22px, 4vw, 32px)",
                color: "#f5edd6",
                marginBottom: "36px",
                lineHeight: 1.3,
              }}
            >
              {question.text}
            </h3>

            {/* Options */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {question.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(opt.value)}
                  disabled={selected !== null}
                  style={{
                    background:
                      selected === opt.value
                        ? "rgba(212,160,23,0.15)"
                        : "rgba(26,18,9,0.5)",
                    border:
                      selected === opt.value
                        ? "1px solid #d4a017"
                        : "1px solid rgba(200,169,110,0.2)",
                    color: selected === opt.value ? "#d4a017" : "#f5edd6",
                    fontFamily: "'Courier Prime', monospace",
                    fontSize: "14px",
                    letterSpacing: "0.04em",
                    padding: "18px 24px",
                    textAlign: "left",
                    cursor: selected !== null ? "default" : "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                  onMouseEnter={(e) => {
                    if (selected !== null) return;
                    const el = e.currentTarget;
                    el.style.borderColor = "rgba(212,160,23,0.5)";
                    el.style.background = "rgba(212,160,23,0.07)";
                  }}
                  onMouseLeave={(e) => {
                    if (selected !== null) return;
                    const el = e.currentTarget;
                    el.style.borderColor = "rgba(200,169,110,0.2)";
                    el.style.background = "rgba(26,18,9,0.5)";
                  }}
                >
                  <span
                    style={{
                      width: "24px",
                      height: "24px",
                      border: "1px solid rgba(200,169,110,0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      color: "#c8a96e",
                      flexShrink: 0,
                    }}
                  >
                    {["A", "B", "C", "D"][question.options.indexOf(opt)]}
                  </span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ─── LOADING STATE ─── */}
        {phase === "loading" && (
          <div
            style={{
              textAlign: "center",
              animation: "fadeIn 0.5s ease both",
              padding: "60px 0",
            }}
          >
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "14px",
                letterSpacing: "0.4em",
                color: "#c8a96e",
                marginBottom: "40px",
              }}
            >
              CONSULTANDO OS ARQUIVOS DO CINEMA...
            </div>
            <ProjectorLoader />
          </div>
        )}

        {/* ─── RESULTS STATE ─── */}
        {phase === "results" && (
          <div style={{ animation: "fadeIn 0.6s ease both" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <div
                style={{
                  fontFamily: "'Courier Prime', monospace",
                  fontSize: "11px",
                  letterSpacing: "0.4em",
                  color: "#c8a96e",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                ◆ Sua Sessão Especial ◆
              </div>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(36px, 7vw, 64px)",
                  color: "#f5edd6",
                  letterSpacing: "0.06em",
                  lineHeight: 0.95,
                }}
              >
                TOP 5 FILMES<br />
                <span style={{ color: "#d4a017" }}>
                  {resultGenre.toUpperCase()}
                </span>
              </h2>
            </div>

            {movies.length === 0 ? (
              <p
                style={{
                  textAlign: "center",
                  color: "rgba(245,237,214,0.5)",
                  fontFamily: "'Special Elite', cursive",
                  fontSize: "16px",
                }}
              >
                Não encontramos filmes com essas combinações.{" "}
                <br />Tente novamente!
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {movies.map((movie, i) => (
                  <MovieCard key={movie.imdbID} movie={movie} rank={i + 1} />
                ))}
              </div>
            )}

            <div style={{ textAlign: "center", marginTop: "48px" }}>
              <button
                onClick={restart}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "16px",
                  letterSpacing: "0.3em",
                  color: "#c8a96e",
                  background: "transparent",
                  border: "1px solid rgba(200,169,110,0.3)",
                  padding: "14px 40px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "#d4a017";
                  el.style.color = "#d4a017";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(200,169,110,0.3)";
                  el.style.color = "#c8a96e";
                }}
              >
                ↺ NOVA SESSÃO
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

function FrameCorners() {
  const corner = (pos: string) => (
    <div
      style={{
        position: "absolute",
        width: "24px",
        height: "24px",
        borderColor: "rgba(212,160,23,0.3)",
        borderStyle: "solid",
        borderWidth:
          pos === "tl"
            ? "1px 0 0 1px"
            : pos === "tr"
            ? "1px 1px 0 0"
            : pos === "bl"
            ? "0 0 1px 1px"
            : "0 1px 1px 0",
        top: pos.startsWith("t") ? "0" : "auto",
        bottom: pos.startsWith("b") ? "0" : "auto",
        left: pos.endsWith("l") ? "0" : "auto",
        right: pos.endsWith("r") ? "0" : "auto",
        margin: "-40px",
      }}
    />
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        marginTop: "32px",
      }}
    >
      {corner("tl")}
      {corner("tr")}
      {corner("bl")}
      {corner("br")}
    </div>
  );
}

function ProjectorLoader() {
  return (
    <div style={{ display: "inline-flex", gap: "8px", alignItems: "center" }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            width: "8px",
            height: "32px",
            background: "#d4a017",
            animation: `projector-pulse 1s ease-in-out ${i * 0.15}s infinite`,
            opacity: 0.3,
          }}
        />
      ))}
      <style>{`
        @keyframes projector-pulse {
          0%, 100% { opacity: 0.15; transform: scaleY(0.6); }
          50% { opacity: 1; transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}