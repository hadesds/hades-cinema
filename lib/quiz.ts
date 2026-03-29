export interface Question {
  id: number;
  text: string;
  options: { label: string; value: string }[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: "Qual época te transporta de volta ao cinema?",
    options: [
      { label: "Anos 20–50 — O Classicismo", value: "1920,1959" },
      { label: "Anos 60–70 — A Nova Hollywood", value: "1960,1979" },
      { label: "Anos 80–90 — O Blockbuster", value: "1980,1999" },
      { label: "Anos 2000+ — O Cinema Moderno", value: "2000,2024" },
    ],
  },
  {
    id: 2,
    text: "Que sentimento você quer carregar ao sair da sala?",
    options: [
      { label: "Adrenalina pura", value: "Action" },
      { label: "Choros inevitáveis", value: "Drama" },
      { label: "Gargalhadas soltas", value: "Comedy" },
      { label: "Calafrios na espinha", value: "Thriller" },
    ],
  },
  {
    id: 3,
    text: "Qual universo você prefere habitar?",
    options: [
      { label: "Galáxias distantes e mundos impossíveis", value: "Sci-Fi" },
      { label: "Mistérios e crimes urbanos", value: "Crime" },
      { label: "Terras fantásticas e magia", value: "Fantasy" },
      { label: "A realidade crua e verdadeira", value: "Biography" },
    ],
  },
  {
    id: 4,
    text: "Que tipo de protagonista te inspira?",
    options: [
      { label: "O herói improvávelque muda o mundo", value: "Adventure" },
      { label: "O detetive que nunca desiste", value: "Mystery" },
      { label: "O artista à beira do colapso", value: "Music" },
      { label: "O vilão com razões perturbadoras", value: "Horror" },
    ],
  },
  {
    id: 5,
    text: "Qual é a duração ideal de uma boa experiência?",
    options: [
      { label: "Rápido e certeiro — até 90 min", value: "short" },
      { label: "O padrão clássico — até 2h", value: "medium" },
      { label: "Uma jornada épica — mais de 2h", value: "long" },
      { label: "Tanto faz, desde que valha", value: "any" },
    ],
  },
];

export interface Answers {
  era: string;
  genre: string;
  universe: string;
  protagonist: string;
  duration: string;
}

export function buildSearchQuery(answers: Record<number, string>): {
  genre: string;
  yearStart: string;
  yearEnd: string;
} {
  const era = answers[1] || "2000,2024";
  const [yearStart, yearEnd] = era.split(",");

  // Combine genre votes
  const genres = [answers[2], answers[3], answers[4]].filter(Boolean);
  const genre = genres[0] || "Drama";

  return { genre, yearStart, yearEnd };
}