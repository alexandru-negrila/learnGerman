# Active Context - LearnGerman

## Last Updated: 2026-02-26
### Status: V1.2 — Wechselpräpositionen Deep Dive + UX Fixes

## What's Live
The full V1.2 German learning webapp with enriched grammar content:
- 9 pages: Home, Verbs, Pronouns, Prepositions, Articles, Sentences, Phrases, Numbers, Practice
- 8 data files with comprehensive A2-level German grammar content
- EN/RO language switch with localStorage persistence
- Multiple-choice quiz with 6 question types and category filtering
- "Calm Focus" design system — warm indigo brand, glassmorphism header, smooth animations
- **NEW: Rich Wechselpräpositionen section** — case rules (Wo?/Wohin?), article declension table, paired Dativ/Akkusativ examples, contraction rules, verb pair tables, Wo?-only verbs, dialogue exercises
- **NEW: 7 Wechselpräpositionen verbs** — legen, liegen, stellen, stehen, hängen, sitzen, bleiben (new verb section)
- **NEW: Sticky verb controls** — tense selector and search bar float below header on scroll
- **NEW: SPA routing fix** — vercel.json catch-all rewrite prevents 404 on page refresh/direct navigation

## Decisions Made
1. **Tech stack**: React 19 + Vite 7 + TailwindCSS v4 + React Router v7
2. **Data format**: JSON files in `/src/data/` directory
3. **No TypeScript**: Keep barrier low for content editing
4. **Color coding**: Blue=Masculine/Dativ, Red=Feminine/Akkusativ, Green=Neuter, Yellow=Plural
5. **Language**: English + Romanian UI with localStorage persistence
6. **Proficiency**: A2 level content
7. **Quiz**: Multiple-choice only (user confirmed), 10 questions per round, 4 options each
8. **Deployment**: Vercel with Vite preset, vercel.json for SPA routing, no env vars needed
9. **Design Philosophy**: "Calm Focus" — warm, inviting, high-contrast, generous whitespace, subtle animations
10. **Brand Color**: Indigo (#4f46e5) — sophisticated, calming, good contrast
11. **Surface Color**: Warm stone tones (#fafaf9) — softer than cold grays
12. **Border Radius**: 2xl (rounded-2xl = 1rem) for cards, xl for inputs/buttons — rounded feel
13. **Category Colors**: Consistent across app:
    - Verbs: indigo, Pronouns: purple, Prepositions: emerald
    - Articles: amber, Sentences: rose, Phrases: cyan
    - Numbers: teal, Practice: orange
14. **Polymorphic sections**: JSON data keys determine rendering behavior (same pattern as Articles.jsx) — new content types in prepositions.json (caseRule, articleTable, pairedExamples, contractions, verbPairs, dialogues) trigger conditional rendering blocks
15. **Git workflow**: Feature branches with PRs, using Git Credential Manager for auth

## User Preferences (confirmed)
- English + Romanian with language switch
- A2 proficiency level
- All grammar topics included
- Vercel + local deployment
- Multiple-choice only for quizzes (will evolve later)

## Backlog (future iterations)
- Flashcard mode
- Spaced repetition
- Dark mode
- More quiz question types
- Additional verbs/phrases content
