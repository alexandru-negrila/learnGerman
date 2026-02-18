# CLAUDE.md - LearnGerman Project Configuration

## Project Identity
- **Name**: LearnGerman
- **Type**: Web Application (React SPA)
- **Purpose**: Interactive German language learning cheat sheets and practice tool
- **Owner**: Alexandru Negrila

## KRIS v2.4 - Knowledge Rings Information System

### Ring Structure
- **Core Ring** (~15k tokens): `CLAUDE.md` + `memory-bank/core/`
- **Inner Ring** (~30k tokens): `memory-bank/inner/`
- **Middle Ring** (~50k tokens/file): `memory-bank/middle/`
- **Outer Ring** (unlimited): `memory-bank/outer/`

### Token Calculation
words × 1.3 = estimated tokens

## Tech Stack
- **Framework**: React 18 + Vite
- **Styling**: TailwindCSS
- **Routing**: React Router v6
- **Data**: JSON files in `/src/data/` (no database)
- **Language**: JavaScript (JSX)
- **Package Manager**: npm

## Architecture Principles
- All German language data lives in `/src/data/*.json` files
- Data files are human-readable and easily editable
- Components are data-driven — adding new content requires zero code changes
- Mobile-first responsive design
- No backend, no database, fully static SPA

## Key Directories
```
src/
├── data/          # All German language JSON data files
├── components/    # Reusable UI components
├── pages/         # Route-level page components
├── hooks/         # Custom React hooks
└── utils/         # Helper functions
```

## Development Commands
```bash
npm install        # Install dependencies
npm run dev        # Start dev server
npm run build      # Production build
npm run preview    # Preview production build
```

## Non-Negotiable Directives
1. Read complete files before modifying
2. Search for existing implementations before creating new ones
3. State assumptions explicitly before coding
4. Build and test after changes
5. Data changes should NEVER require code changes

## Pre-Commit Checklist
- [ ] All data files are valid JSON
- [ ] No hardcoded German content in components
- [ ] Mobile responsive
- [ ] Navigation works for all routes
- [ ] No console errors
