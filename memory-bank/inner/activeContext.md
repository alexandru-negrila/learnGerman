# Active Context - LearnGerman

## Last Updated: 2026-02-18
### Status: V1 Merged to Main — Stable

## What's Live
The full V1 German learning webapp is merged to `main` and ready for deployment:
- 9 pages: Home, Verbs, Pronouns, Prepositions, Articles, Sentences, Phrases, Numbers, Practice
- 8 data files with comprehensive A2-level German grammar content
- EN/RO language switch with localStorage persistence
- Multiple-choice quiz with 6 question types and category filtering
- Mobile-first responsive design

## Decisions Made
1. **Tech stack**: React 19 + Vite 7 + TailwindCSS v4 + React Router v7
2. **Data format**: JSON files in `/src/data/` directory
3. **No TypeScript**: Keep barrier low for content editing
4. **Color coding**: Blue=Masculine, Red=Feminine, Green=Neuter, Yellow=Plural
5. **Language**: English + Romanian UI with localStorage persistence
6. **Proficiency**: A2 level content
7. **Quiz**: Multiple-choice only (user confirmed), 10 questions per round, 4 options each
8. **Deployment**: Vercel with Vite preset, no env vars needed

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
- Global search across all pages
- More quiz question types
- Additional verbs/phrases content
- Vercel deployment (user to complete)
