# Tech Context - LearnGerman

## Stack
- **Runtime**: Node.js (development only)
- **Framework**: React 19.2
- **Build Tool**: Vite 7.3
- **Styling**: TailwindCSS v4.1
- **Routing**: React Router v7.13
- **Language**: JavaScript (JSX)
- **Data Storage**: JSON files (no database)

## Architecture
- Single Page Application (SPA)
- All data loaded from static JSON imports
- No API calls, no backend, no authentication
- Fully static — can be deployed to any static host

## Data Architecture
All German language content lives in `/src/data/` as JSON files:
- `verbs.json` — 30+ verbs, 4 categories (essential, modal, regular, irregular), 3 tenses
- `pronouns.json` — 6 tables: personal, possessive, reflexive, relative, interrogative, demonstrative
- `prepositions.json` — 4 case groups (Akk, Dat, Wechsel, Gen) with mnemonics and examples
- `articles.json` — Definite/indefinite articles, case rules, 3 adjective ending tables, gender tips
- `sentences.json` — Hauptsatz, Nebensatz, questions, negation, connectors
- `phrases.json` — 7 categories: greetings, introductions, polite, everyday, shopping, directions, time
- `numbers.json` — Cardinals, ordinals, days, months, seasons
- `translations.json` — UI strings in English and Romanian

### Data File Format
Each JSON file follows a self-documenting structure with metadata:
```json
{
  "meta": { "title": "...", "description": "...", "icon": "..." },
  "sections": [...]
}
```

## Component Architecture
- `Layout.jsx` — App shell with sticky header, responsive nav (desktop + mobile hamburger), language toggle, footer
- `DataTable.jsx` — Reusable table component for declension/conjugation data
- `SectionCard.jsx` — Collapsible card with title/description
- `PageHeader.jsx` — Page title with icon

## Page Components (9 routes)
- `Home.jsx` — Topic grid with color-coded cards and quick tips
- `Verbs.jsx` — Tense selector + search + conjugation tables
- `Pronouns.jsx` — Declension tables for all pronoun types
- `Prepositions.jsx` — Color-coded case cards with mnemonics
- `Articles.jsx` — Article tables, case rules, gender tips
- `Sentences.jsx` — Word order patterns, conjunctions, question words
- `Phrases.jsx` — Phrase list with formal/informal tags and search
- `Numbers.jsx` — Number grids, days/months cards
- `Practice.jsx` — Multiple-choice quiz with category filter and score tracking

## Hooks
- `useLanguage.jsx` — React context for EN/RO language switching with localStorage persistence

## Deployment
- **Target**: Vercel (framework preset: Vite)
- **Build**: `npm run build` → `dist/`
- **Env vars**: None required
- Also works on: Netlify, GitHub Pages, any static file server

## Development Constraints
- No TypeScript (keep simple for content contributors)
- No database or external APIs
- All content must be in JSON data files, not hardcoded in components
- Must work offline once loaded
