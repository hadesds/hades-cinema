import { NextRequest, NextResponse } from "next/server";

const OMDB_KEY = process.env.OMDB_API_KEY || "trilogy"; // fallback

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const genre = searchParams.get("genre") || "Drama";
  const yearStart = parseInt(searchParams.get("yearStart") || "2000");
  const yearEnd = parseInt(searchParams.get("yearEnd") || "2024");

  // Títulos selecionados por gênero para melhores resultados
  const genreSeeds: Record<string, string[]> = {
    Action: ["Die Hard", "Mad Max", "John Wick", "The Dark Knight", "Gladiator", "Speed", "Heat", "Terminator"],
    Drama: ["Schindler", "Godfather", "Forrest Gump", "Shawshank", "Amadeus", "Goodfellas", "Casablanca", "Chinatown"],
    Comedy: ["Some Like It Hot", "Ferris Bueller", "Airplane", "Groundhog Day", "The Grand Budapest", "Annie Hall", "Superbad"],
    Thriller: ["Silence of the Lambs", "Vertigo", "Psycho", "Seven", "Zodiac", "Parasite", "No Country for Old Men"],
    "Sci-Fi": ["Blade Runner", "2001 Space", "Alien", "Inception", "Metropolis", "12 Monkeys", "Eternal Sunshine"],
    Crime: ["Goodfellas", "Pulp Fiction", "The Godfather", "L.A. Confidential", "Fargo", "Heat", "City of God"],
    Fantasy: ["Lord of the Rings", "Labyrinth", "Pan Labyrinth", "Princess Bride", "Big Fish", "The NeverEnding Story"],
    Biography: ["Schindler", "Gandhi", "Amadeus", "Lincoln", "The Aviator", "Bohemian Rhapsody", "Ed Wood"],
    Adventure: ["Raiders", "Lawrence of Arabia", "Stand by Me", "The Goonies", "Jurassic Park", "Captain Fantastic"],
    Mystery: ["Chinatown", "The Big Sleep", "Knives Out", "Memento", "Rear Window", "The Name of the Rose"],
    Music: ["Whiplash", "La La Land", "Almost Famous", "Bohemian Rhapsody", "Purple Rain", "Walk the Line"],
    Horror: ["The Shining", "Psycho", "Hereditary", "Get Out", "Midsommar", "Rosemary", "It Follows"],
  };

  const seeds = genreSeeds[genre] || genreSeeds["Drama"];
  const shuffled = seeds.sort(() => Math.random() - 0.5).slice(0, 8);

  const results: any[] = [];
  const seen = new Set<string>();

  await Promise.allSettled(
    shuffled.map(async (title) => {
      try {
        const url = `https://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${encodeURIComponent(title)}&type=movie`;
        const res = await fetch(url, { next: { revalidate: 3600 } });
        const data = await res.json();

        if (data.Search) {
          for (const movie of data.Search) {
            if (seen.has(movie.imdbID)) continue;
            const year = parseInt(movie.Year);
            if (year >= yearStart && year <= yearEnd) {
              // Fetch full details
              const detailUrl = `https://www.omdbapi.com/?apikey=${OMDB_KEY}&i=${movie.imdbID}&plot=short`;
              const detailRes = await fetch(detailUrl, { next: { revalidate: 3600 } });
              const detail = await detailRes.json();
              if (detail.Response === "True" && detail.Poster !== "N/A") {
                seen.add(movie.imdbID);
                results.push(detail);
              }
            }
          }
        }
      } catch (_) {}
    })
  );

  // Ordenar por classificação do IMDB em ordem decrescente, seleciona os 5 melhores
  const sorted = results
    .filter((m) => m.imdbRating && m.imdbRating !== "N/A")
    .sort((a, b) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating))
    .slice(0, 5);

  return NextResponse.json({ movies: sorted, genre });
}