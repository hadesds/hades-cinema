<div align="center">

```
░█████╗░██╗███╗░░██╗███████╗███╗░░░███╗░█████╗░
██╔══██╗██║████╗░██║██╔════╝████╗░████║██╔══██╗
██║░░╚═╝██║██╔██╗██║█████╗░░██╔████╔██║███████║
██║░░██╗██║██║╚████║██╔══╝░░██║╚██╔╝██║██╔══██║
╚█████╔╝██║██║░╚███║███████╗██║░╚═╝░██║██║░░██║
░╚════╝░╚═╝╚═╝░░╚══╝╚══════╝╚═╝░░░░╚═╝╚═╝░░╚═╝
```

**Quiz cinematográfico retrô que descobre os 5 melhores filmes do seu gosto**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![OMDb API](https://img.shields.io/badge/OMDb-API-gold?style=flat-square)](https://www.omdbapi.com/)
[![UNDB](https://img.shields.io/badge/UNDB-Equipe%20Azular-orange?style=flat-square)](https://undb.edu.br/)

</div>

---

## ✦ Sobre o projeto

O **CINEMA** é uma landing page com visual retrô cinematográfico — inspirada nos cartazes e películas dos anos 30 a 60 — onde o usuário responde um quiz de **5 perguntas** sobre seus gostos e recebe de volta um **Top 5 de filmes personalizados**, buscados em tempo real na [OMDb API](https://www.omdbapi.com/).

Desenvolvido como projeto acadêmico por **Rafael Silva** da UNDB.

![CINEMA-PRINT-1](/img/print-cinema.png)
---

## ✦ Demonstração

```
[ Landing page ] → [ Quiz 5 perguntas ] → [ Loading projetor ] → [ Top 5 filmes ]
```

**Perguntas do quiz:**
1. Qual época te transporta de volta ao cinema? *(filtra por período)*
2. Que sentimento você quer carregar ao sair da sala? *(gênero principal)*
3. Qual universo você prefere habitar? *(subgênero)*
4. Que tipo de protagonista te inspira? *(subgênero secundário)*
5. Qual é a duração ideal? *(short / medium / long / any)*

![CINEMA-PRINT-QUIZ](/img/print-filme2.png)

---

## ✦ Tecnologias

| Tecnologia | Uso |
|---|---|
| **Next.js 15** (App Router) | Framework principal |
| **TypeScript** | Tipagem estática |
| **OMDb API** | Fonte de dados de filmes |
| **CSS-in-JS inline** | Estilização sem dependências externas |
| **Google Fonts** | Bebas Neue · Special Elite · Courier Prime |

---

## ✦ Estrutura do projeto

```
undb-filme/
├── app/
│   ├── globals.css             # Estética retrô global (grain, scanlines, variáveis CSS)
│   ├── layout.tsx              # Layout raiz com metadados SEO
│   ├── page.tsx                # Página principal — orquestra os componentes
│   └── api/
│       └── movies/
│           └── route.ts        # Route Handler — proxy para a OMDb API
├── components/
│   ├── Hero.tsx                # Seção de entrada cinematográfica (100vh)
│   ├── FilmStrip.tsx           # Faixa de película animada (topo e divisor)
│   ├── QuizSection.tsx         # Quiz completo com máquina de 4 estados
│   └── MovieCard.tsx           # Card de resultado com poster, rating e sinopse
├── lib/
│   └── quiz.ts                 # Perguntas, tipos e lógica de mapeamento de gênero
├── .env.local.example
└── next.config.ts              # Domínios autorizados para imagens (media-amazon.com)
```

---

## ✦ Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/hadesds/undb-filme.git
cd undb-filme
```

### 2. Configure a chave da OMDb API

Crie uma chave gratuita em [omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx) (1.000 req/dia no plano free).

```bash
cp .env.local.example .env.local
```

Edite `.env.local`:

```env
OMDB_API_KEY=sua_chave_aqui
```

### 3. Instale e rode

```bash
npm install
npm run dev
```

Acesse em `http://localhost:3000`

---

## ✦ Como funciona a busca de filmes

A OMDb API **não suporta filtro nativo por gênero**. Para contornar isso, a rota `/api/movies` usa uma estratégia de **títulos-semente curados**:

```
Usuário responde quiz
       ↓
buildSearchQuery() → { genre, yearStart, yearEnd }
       ↓
Route Handler seleciona 8 títulos-semente do gênero
       ↓
Para cada título: GET omdbapi.com/?s=titulo (busca por texto)
       ↓
Filtra resultados pelo intervalo de anos
       ↓
Para cada filme que passa: GET omdbapi.com/?i=imdbID (detalhes completos)
       ↓
Ordena por imdbRating DESC → retorna top 5
```

As chamadas usam `{ next: { revalidate: 3600 } }` — cache de 1h no servidor Next.js para economizar a cota diária da API.

---

## ✦ Identidade visual

O visual retrô é construído **sem nenhuma biblioteca de UI**, usando apenas CSS nativo:

- **Grain overlay** — SVG com `feTurbulence` aplicado como camada fixa via `body::before`
- **Scanlines** — gradiente repetido de 4px em `body::after`, simulando monitor CRT
- **Tipografia** — `Bebas Neue` (títulos) + `Special Elite` (texto corrido) + `Courier Prime` (mono/UI)
- **Paleta** — preto-película `#0d0d0d`, dourado `#d4a017`, creme `#f5edd6`, sépia `#c8a96e`
- **FilmStrip** — faixa de película com furos de sprocket e texto rolante em loop CSS

---

## ✦ Variáveis de ambiente

| Variável | Obrigatória | Descrição |
|---|---|---|
| `OMDB_API_KEY` | ✅ sim | Chave da OMDb API |

---

## ✦ Adicionando perguntas ou gêneros

**Nova pergunta** — edite `lib/quiz.ts`:

```ts
{
  id: 6,
  text: "Sua nova pergunta aqui?",
  options: [
    { label: "Opção A", value: "valor-a" },
    { label: "Opção B", value: "valor-b" },
  ],
}
```

**Novo gênero** — edite `app/api/movies/route.ts`:

```ts
const genreSeeds: Record<string, string[]> = {
  // ...
  Western: ["The Good the Bad", "Unforgiven", "True Grit", "Once Upon a Time in the West"],
};
```

---

## ✦ Build para produção

```bash
npm run build
npm start
```

---

## ✦ Créditos

- Dados de filmes via [OMDb API](https://www.omdbapi.com/) — API não oficial do IMDb
- Tipografia via [Google Fonts](https://fonts.google.com/)
- Desenvolvido por **Rafael Silva** — UNDB · 2026

---

<div align="center">

*◆ &nbsp; Cinco perguntas. Cinco filmes. Uma noite transformada. &nbsp; ◆*

</div>