// Camada de serviço — comunicação com a API OMDB
// Não conhece UI nem localStorage; apenas busca dados e retorna o tipo Filme

import { Filme } from "./types";

const OMDB_KEY = process.env.NEXT_PUBLIC_OMDB_KEY;

export async function buscarFilme(titulo: string): Promise<Filme | null> {
  if (!titulo.trim()) return null;

  try {
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(titulo)}&apikey=${OMDB_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();

    // Erro de negócio: OMDB retorna Response === "False" quando não encontra
    if (data.Response === "False") return null;

    return {
      id: data.imdbID,
      title: data.Title,
      year: data.Year,
      poster: data.Poster !== "N/A" ? data.Poster : "/no-poster.png",
      genre: data.Genre || "—",
      plot: data.Plot || "Sem sinopse disponível.",
      status: "pendente",
      savedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Erro ao buscar filme:", error);
    return null;
  }
}