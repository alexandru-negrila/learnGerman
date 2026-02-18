# Tech Context - LearnGerman

## Stack
- **Runtime**: Node.js (development only)
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: TailwindCSS v3
- **Routing**: React Router v6
- **Language**: JavaScript (JSX)
- **Data Storage**: JSON files (no database)

## Architecture
- Single Page Application (SPA)
- All data loaded from static JSON imports
- No API calls, no backend, no authentication
- Fully static — can be deployed to any static host

## Data Architecture
All German language content lives in `/src/data/` as JSON files:
- `verbs.json` — Verb conjugation tables
- `pronouns.json` — All pronoun types and declensions
- `prepositions.json` — Prepositions organized by case
- `articles.json` — Articles and case declension tables
- `sentences.json` — Sentence structure rules
- `phrases.json` — Common phrases and expressions
- `numbers.json` — Number system and time expressions

### Data File Format
Each JSON file follows a self-documenting structure with metadata:
```json
{
  "meta": { "title": "...", "description": "..." },
  "sections": [...]
}
```

## Deployment Options
- GitHub Pages
- Vercel
- Netlify
- Any static file server

## Development Constraints
- No TypeScript (keep simple for content contributors)
- No database or external APIs
- All content must be in JSON data files, not hardcoded in components
- Must work offline once loaded
