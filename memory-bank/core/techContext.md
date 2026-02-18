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

## Design System — "Calm Focus"
Defined in `src/index.css` via TailwindCSS v4 `@theme` directive:

### Brand Colors (indigo)
`brand-50` (#eef2ff) through `brand-700` (#4338ca) — used for active nav, buttons, links, focus rings

### Surface Colors (warm stone)
`surface-50` (#fafaf9) through `surface-300` (#d6d3d1) — backgrounds, replacing cold gray-50

### Category Colors (consistent throughout app)
| Topic | Color | Usage |
|-------|-------|-------|
| Verbs | indigo | Cards, verb highlights |
| Pronouns | purple | Cards, category badges |
| Prepositions | emerald | Cards, border accents |
| Articles | amber | Cards, rule callouts |
| Sentences | rose | Cards, structure blocks |
| Phrases | cyan | Cards |
| Numbers | teal | Cards |
| Practice | orange | Cards |

### Typography
- **Font**: Inter (Google Fonts CDN, loaded via index.html `<link>`)
- **Tracking**: `tracking-tight` for headings, `tracking-wide` for table headers
- **Hierarchy**: extrabold > bold > semibold > medium for clear visual weight

### Animation Classes (defined in index.css)
- `.animate-fade-in` — subtle entry (opacity + translateY 6px)
- `.animate-fade-in-up` — stronger entry (opacity + translateY 12px)
- `.animate-scale-in` — scale from 0.95 (used for search dropdown)
- `.animate-slide-down` — max-height animation (mobile menu)
- `.stagger-children` — nth-child delays for grid items (50ms increments)
- `.hover-lift` — translateY(-2px) + shadow on hover
- `.glass` — backdrop-blur glassmorphism effect
- `.gradient-text` — indigo-to-purple gradient text
- `.progress-bar` — smooth width transition (quiz progress)

### Spacing & Radius Conventions
- Cards: `rounded-2xl` (1rem), `p-5`/`p-6`
- Inputs/buttons: `rounded-xl` (0.75rem), `py-2`/`py-3`
- Badges/pills: `rounded-full`
- Section spacing: `space-y-5` between cards
- Page header bottom margin: `mb-8`

### Interactive States
- Buttons: `active:scale-95` or `active:scale-[0.98]`
- Cards: `.hover-lift` (translateY + shadow)
- Focus: `focus:border-brand-400 focus:ring-2 focus:ring-brand-100`
- Links: `transition-all duration-200`

## Component Architecture
- `Layout.jsx` — Glassmorphism header (.glass), responsive nav with active pill indicator, language toggle, animated mobile menu (.mobile-nav-enter), footer
- `DataTable.jsx` — Rounded-xl table with uppercase tracking-wide headers, brand-50 hover rows, soft zebra striping
- `SectionCard.jsx` — Rounded-2xl card with circular chevron button, smooth content animation (.animate-fade-in), highlight ring effect
- `PageHeader.jsx` — Title with icon + gradient accent line (brand-500 → brand-300 → transparent)
- `SmartSearch.jsx` — Search icon prefix, rounded-xl input, category icon badges in results, rounded-2xl dropdown with scale-in animation

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
