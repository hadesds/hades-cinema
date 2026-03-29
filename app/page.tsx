import FilmStrip from "@/components/FilmStrip";
import Hero from "@/components/Hero";
import QuizSection from "@/components/QuizSection";

export default function Home() {
  return (
    <main>
      {/* Top film strip */}
      <FilmStrip position="top" />

      {/* Hero landing section */}
      <Hero />

      {/* Divider strip */}
      <FilmStrip position="bottom" />

      {/* Quiz + Results section */}
      <QuizSection />

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid rgba(200,169,110,0.1)",
          padding: "40px 24px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'Courier Prime', monospace",
            fontSize: "11px",
            letterSpacing: "0.3em",
            color: "rgba(200,169,110,0.35)",
            textTransform: "uppercase",
          }}
        >
          HADES · FILMES · Powered by OMDB API
        </div>
        <div
          style={{
            marginTop: "8px",
            fontFamily: "'Courier Prime', monospace",
            fontSize: "10px",
            color: "rgba(200,169,110,0.2)",
            letterSpacing: "0.2em",
          }}
        >
          © {new Date().getFullYear()} · Todos os dados de filmes via OMDb API
        </div>
      </footer>
    </main>
  );
}