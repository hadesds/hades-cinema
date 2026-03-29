"use client";

interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  imdbRating: string;
  Plot: string;
  Genre: string;
  Director: string;
  imdbID: string;
}

export default function MovieCard({ movie, rank }: { movie: Movie; rank: number }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        background: "rgba(26,18,9,0.8)",
        border: "1px solid #3a2a1a",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
        animation: `fadeSlideUp 0.5s ease ${rank * 0.12}s both`,
      }}
    >
      {/* Rank number */}
      <div
        style={{
          position: "absolute",
          top: "-10px",
          left: "16px",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "80px",
          color: "rgba(212,160,23,0.08)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        {rank}
      </div>

      {/* Poster */}
      <div style={{ flexShrink: 0, position: "relative" }}>
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"}
          alt={movie.Title}
          style={{
            width: "90px",
            height: "134px",
            objectFit: "cover",
            display: "block",
            filter: "sepia(20%) contrast(1.05)",
            border: "2px solid #3a2a1a",
          }}
        />
        {/* Rating badge */}
        <div
          style={{
            position: "absolute",
            bottom: "-8px",
            right: "-8px",
            background: "#d4a017",
            color: "#1a1209",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "14px",
            padding: "2px 6px",
            letterSpacing: "0.05em",
          }}
        >
          ★ {movie.imdbRating}
        </div>
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "22px",
            color: "#f5edd6",
            letterSpacing: "0.06em",
            lineHeight: 1.1,
            marginBottom: "4px",
          }}
        >
          {movie.Title}
        </div>
        <div
          style={{
            fontFamily: "'Courier Prime', monospace",
            fontSize: "11px",
            color: "#c8a96e",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "10px",
          }}
        >
          {movie.Year} · Dir. {movie.Director?.split(",")[0]}
        </div>
        <div
          style={{
            fontFamily: "'Courier Prime', monospace",
            fontSize: "12px",
            color: "rgba(245,237,214,0.65)",
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical" as const,
            overflow: "hidden",
          }}
        >
          {movie.Plot}
        </div>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            gap: "6px",
            flexWrap: "wrap" as const,
          }}
        >
          {movie.Genre?.split(",").slice(0, 3).map((g) => (
            <span
              key={g}
              style={{
                fontFamily: "'Courier Prime', monospace",
                fontSize: "10px",
                color: "#d4a017",
                border: "1px solid rgba(212,160,23,0.3)",
                padding: "1px 8px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              {g.trim()}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}