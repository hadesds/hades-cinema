// Camada de persistência — CRUD no localStorage
// Os componentes nunca acessam localStorage diretamente; chamam estas funções

import { Filme } from "./types";

const STORAGE_KEY = "cinema_filmes";

export function listarFilmes(): Filme[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function salvarFilme(filme: Filme): boolean {
  const lista = listarFilmes();
  const jaExiste = lista.find((f) => f.id === filme.id);
  if (jaExiste) return false;
  const novaLista = [filme, ...lista];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
  return true;
}

export function removerFilme(id: string): void {
  const lista = listarFilmes().filter((f) => f.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}

export function toggleStatus(id: string): void {
  const lista = listarFilmes().map((f) =>
    f.id === id
      ? {
          ...f,
          status: (f.status === "assistido"
            ? "pendente"
            : "assistido") as Filme["status"],
        }
      : f
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}