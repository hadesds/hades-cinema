export interface Filme {
  id: string;
  title: string;
  year: string;
  poster: string;
  genre: string;
  plot: string;
  status: "assistido" | "pendente";
  savedAt: string;
}

export type FiltroStatus = "todos" | "assistido" | "pendente";