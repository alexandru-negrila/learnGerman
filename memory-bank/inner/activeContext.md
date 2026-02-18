# Active Context - LearnGerman

## Last Updated: 2026-02-18
### Status: V1.1 UI/UX Redesign — "Calm Focus" Design System

## What's Live
The full V1.1 German learning webapp with redesigned UI/UX:
- 9 pages: Home, Verbs, Pronouns, Prepositions, Articles, Sentences, Phrases, Numbers, Practice
- 8 data files with comprehensive A2-level German grammar content
- EN/RO language switch with localStorage persistence
- Multiple-choice quiz with 6 question types and category filtering
- **NEW: "Calm Focus" design system** — warm indigo brand, glassmorphism header, smooth animations
- **NEW: Inter font** — clean, modern, great for UI readability
- **NEW: Micro-interactions** — hover-lift cards, fade-in animations, staggered children, active:scale effects
- **NEW: Unified color system** — brand-* (indigo), surface-* (warm stone), consistent category colors

## Decisions Made
1. **Tech stack**: React 19 + Vite 7 + TailwindCSS v4 + React Router v7
2. **Data format**: JSON files in `/src/data/` directory
3. **No TypeScript**: Keep barrier low for content editing
4. **Color coding**: Blue=Masculine, Red=Feminine, Green=Neuter, Yellow=Plural
5. **Language**: English + Romanian UI with localStorage persistence
6. **Proficiency**: A2 level content
7. **Quiz**: Multiple-choice only (user confirmed), 10 questions per round, 4 options each
8. **Deployment**: Vercel with Vite preset, no env vars needed
9. **Design Philosophy**: "Calm Focus" — warm, inviting, high-contrast, generous whitespace, subtle animations
10. **Brand Color**: Indigo (#4f46e5) — sophisticated, calming, good contrast
11. **Surface Color**: Warm stone tones (#fafaf9) — softer than cold grays
12. **Border Radius**: 2xl (rounded-2xl = 1rem) for cards, xl for inputs/buttons — rounded feel
13. **Category Colors**: Consistent across app:
    - Verbs: indigo, Pronouns: purple, Prepositions: emerald
    - Articles: amber, Sentences: rose, Phrases: cyan
    - Numbers: teal, Practice: orange

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
- Vercel deployment (user to complete)
