# LearnGerman - German Grammar Cheat Sheets

A fast, user-friendly web app for learning German grammar at the A2 level. All content is stored in easily editable JSON data files — no database needed.

## Features

- **Verbs & Conjugations** — 30+ common verbs with Prasens, Prateritum, and Perfekt tables
- **Pronouns** — Personal, possessive, reflexive, relative, interrogative, demonstrative
- **Prepositions** — Akkusativ, Dativ, Genitiv, and two-way prepositions with examples
- **Articles & Cases** — Definite/indefinite articles, case rules, adjective endings, gender tips
- **Sentence Structure** — Word order, Nebensatz, questions, negation, connectors
- **Common Phrases** — Greetings, introductions, shopping, travel, time expressions
- **Numbers & Time** — Cardinals, ordinals, days, months, seasons
- **Practice Quiz** — Random questions from all topics with score tracking
- **Language Switch** — English / Romanian UI
- **Mobile-first** — Responsive design that works on all devices

## Tech Stack

- React 18 + Vite
- TailwindCSS
- React Router v6
- JSON data files (no database)

## Getting Started

```bash
npm install
npm run dev
```

## Editing Content

All German language content is in `src/data/`. Each file is a self-contained JSON file:

| File | Content |
|------|---------|
| `verbs.json` | Verb conjugation tables |
| `pronouns.json` | Pronoun declension tables |
| `prepositions.json` | Prepositions with cases and examples |
| `articles.json` | Articles, cases, adjective endings |
| `sentences.json` | Word order rules and patterns |
| `phrases.json` | Common everyday phrases |
| `numbers.json` | Numbers, days, months, seasons |
| `translations.json` | UI text in English and Romanian |

Edit any JSON file and the app updates automatically — no code changes needed.

## Deployment

```bash
npm run build    # Creates dist/ folder
npm run preview  # Preview production build locally
```

Deploy the `dist/` folder to Vercel, Netlify, or any static host.

## Project Structure

```
src/
├── data/          # All German language JSON data files
├── components/    # Reusable UI components (Layout, DataTable, SectionCard)
├── pages/         # Route-level page components
├── hooks/         # Custom React hooks (useLanguage)
└── utils/         # Helper functions
memory-bank/       # KRIS documentation system
```

## KRIS Documentation

This project uses the [KRIS](https://github.com/ai-focused/kris-base) (Knowledge Rings Information System) methodology for persistent AI-assisted documentation. See `memory-bank/` for project context and progress tracking.
