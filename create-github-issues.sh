#!/bin/bash
# =============================================================================
# LearnGerman - Exploratory Testing: GitHub Issue Creator
# =============================================================================
# Run this script to create all bugs, enhancements, and feature requests
# found during exploratory testing.
#
# Usage:
#   export GITHUB_TOKEN="your_github_personal_access_token"
#   bash create-github-issues.sh
#
# Requires: curl, a valid GitHub token with 'repo' scope
# =============================================================================

set -euo pipefail

REPO="alexandru-negrila/learnGerman"
API="https://api.github.com/repos/$REPO/issues"

if [ -z "${GITHUB_TOKEN:-}" ]; then
  echo "Error: GITHUB_TOKEN environment variable is not set."
  echo "Usage: export GITHUB_TOKEN='ghp_...' && bash create-github-issues.sh"
  exit 1
fi

create_issue() {
  local title="$1"
  local body="$2"
  local label="$3"

  echo "Creating issue: $title [$label]"

  response=$(curl -s -w "\n%{http_code}" -X POST "$API" \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer $GITHUB_TOKEN" \
    -H "Content-Type: application/json" \
    -d "$(jq -n --arg title "$title" --arg body "$body" --argjson labels "[\"$label\"]" \
      '{title: $title, body: $body, labels: $labels}')")

  http_code=$(echo "$response" | tail -1)
  body_response=$(echo "$response" | head -n -1)

  if [ "$http_code" = "201" ]; then
    issue_url=$(echo "$body_response" | jq -r '.html_url')
    echo "  -> Created: $issue_url"
  else
    echo "  -> FAILED (HTTP $http_code)"
    echo "$body_response" | jq -r '.message // .errors[0].message // "Unknown error"' 2>/dev/null || echo "$body_response"
  fi

  sleep 1  # Rate limiting
}

echo "=========================================="
echo " Creating GitHub Issues for LearnGerman"
echo "=========================================="
echo ""

# =============================================================================
# BUGS (12 issues)
# =============================================================================

echo "--- BUGS ---"
echo ""

create_issue \
  "ESLint errors: unused variable 't' in Articles.jsx and Pronouns.jsx" \
  "## Description
\`npm run lint\` fails with 5 errors. Two of them are unused \`t\` variables:

- \`src/pages/Articles.jsx:16\` — \`t\` is destructured from \`useLanguage()\` but never used
- \`src/pages/Pronouns.jsx:10\` — \`t\` is destructured from \`useLanguage()\` but never used

## Steps to Reproduce
\`\`\`bash
npx eslint src/
\`\`\`

## Expected Behavior
\`npm run lint\` should pass with 0 errors.

## Actual Behavior
ESLint reports \`no-unused-vars\` errors for both files.

## Fix
Either remove the unused \`t\` destructuring or use it for translatable strings in those components (e.g., the \"Endings:\" and \"Categories:\" labels in Articles.jsx are currently hardcoded in English)." \
  "bug"

create_issue \
  "ESLint errors: setState in useEffect in SectionCard.jsx and useHighlightSection.js" \
  "## Description
ESLint reports \`react-hooks/set-state-in-effect\` errors in two files:

1. **\`src/components/SectionCard.jsx:10\`** — \`setOpen(true)\` and \`setShowHighlight(true)\` called synchronously inside \`useEffect\`
2. **\`src/hooks/useHighlightSection.js:11\`** — \`setHighlightId(param)\` called synchronously inside \`useEffect\`

These cause cascading renders and are flagged by the React Hooks ESLint plugin.

## Steps to Reproduce
\`\`\`bash
npx eslint src/
\`\`\`

## Impact
- Potential performance degradation from cascading renders
- Lint pipeline failure

## Suggested Fix
For \`SectionCard.jsx\`: Initialize \`open\` state based on \`highlighted\` prop directly: \`useState(defaultOpen || highlighted)\` (already done, but the effect still synchronously calls setState).
For \`useHighlightSection.js\`: Derive the highlight state from searchParams using \`useMemo\` or compute it during render instead of using a state + effect pattern." \
  "bug"

create_issue \
  "ESLint error: Fast Refresh violation in useLanguage.jsx" \
  "## Description
\`src/hooks/useLanguage.jsx:26\` exports both a component (\`LanguageProvider\`) and a hook (\`useLanguage\`) from the same file. This violates the \`react-refresh/only-export-components\` rule.

## Steps to Reproduce
\`\`\`bash
npx eslint src/
\`\`\`

## Impact
Fast Refresh (Hot Module Replacement) won't work correctly for this file during development, requiring a full page reload when changes are made.

## Suggested Fix
Split into two files:
- \`src/hooks/useLanguage.js\` — exports \`useLanguage\` hook
- \`src/context/LanguageProvider.jsx\` — exports \`LanguageProvider\` component and \`LanguageContext\`" \
  "bug"

create_issue \
  "Numbers.jsx: No-op ternary expression (dead code)" \
  "## Description
In \`src/pages/Numbers.jsx:53\`, the ternary expression returns the same value in both branches:

\`\`\`jsx
{typeof item.number === 'number' ? item.number : item.number}
\`\`\`

Both the truthy and falsy branches evaluate to \`item.number\`, making this a no-op.

## Expected Behavior
The ternary should differentiate between numeric values (like \`0\`, \`1\`, \`100\`) and string values (like \`\"1st\"\`, \`\"2nd\"\`). For example, ordinal number entries use strings like \`\"1st\"\` while cardinal numbers use integers.

## Suggested Fix
Either remove the ternary entirely (just use \`{item.number}\`) or differentiate the display format if needed." \
  "bug"

create_issue \
  "Practice.jsx: Hardcoded English string 'Correct answer:' not translated" \
  "## Description
In \`src/pages/Practice.jsx:283\`, the string \"Correct answer:\" is hardcoded in English:

\`\`\`jsx
<p className=\"mt-0.5\">Correct answer: <strong>{q.answer}</strong></p>
\`\`\`

When the user switches to Romanian (\`RO\`), this string remains in English while the rest of the UI is translated.

## Steps to Reproduce
1. Switch language to Romanian (RO)
2. Start a quiz
3. Answer a question incorrectly
4. Observe \"Correct answer:\" is displayed in English

## Expected Behavior
The string should use the \`t()\` translation function.

## Suggested Fix
1. Add \`correctAnswer\` key to both \`en\` and \`ro\` in \`translations.json\`
2. Replace the hardcoded string with \`{t('correctAnswer')}\`" \
  "bug"

create_issue \
  "Practice.jsx: Start button shows '10 questions' even when fewer are available" \
  "## Description
In \`src/pages/Practice.jsx:193\`, the start quiz button always displays:
\`\`\`
Start Quiz (10 questions)
\`\`\`

However, when a specific category is selected (e.g., \"Pronouns\" which generates ~8 questions), the quiz may have fewer than 10 questions. The button text is misleading.

## Steps to Reproduce
1. Go to Practice page
2. Select \"Pronouns\" category
3. Observe start button says \"10 questions\"
4. Start quiz — only ~8 questions appear

## Expected Behavior
The button should show the actual number of available questions for the selected category, or cap the display at the actual count.

## Suggested Fix
Pre-compute the available question count when category changes and display the actual number." \
  "bug"

create_issue \
  "Home.jsx: Topic card descriptions not translated" \
  "## Description
In \`src/pages/Home.jsx:5-12\`, the \`desc\` field for each topic card is hardcoded in English:

\`\`\`javascript
{ path: '/verbs', key: 'verbs', icon: '📝', desc: '30+ common verbs with conjugation tables' },
{ path: '/pronouns', key: 'pronouns', icon: '👤', desc: 'Personal, possessive, reflexive, relative' },
// ... etc
\`\`\`

When the language is switched to Romanian, these descriptions remain in English.

## Steps to Reproduce
1. Switch language to Romanian (RO)
2. Go to Home page
3. Observe topic card descriptions are still in English

## Expected Behavior
Descriptions should be translated using the \`t()\` function and corresponding keys in \`translations.json\`.

## Affected Strings
- '30+ common verbs with conjugation tables'
- 'Personal, possessive, reflexive, relative'
- 'Akkusativ, Dativ, Genitiv, Wechselpräp.'
- 'der/die/das, cases, adjective endings'
- 'Word order, Nebensatz, questions, negation'
- 'Greetings, shopping, travel, time'
- 'Cardinals, ordinals, days, months'
- 'Test your knowledge with quick quizzes'" \
  "bug"

create_issue \
  "Home.jsx: 'Quick Tips for A2 Learners' section title and content hardcoded in English" \
  "## Description
In \`src/pages/Home.jsx:48\`, the \"Quick Tips\" section has its title and all tip content hardcoded in English:

\`\`\`jsx
<h2>💡 Quick Tips for A2 Learners</h2>
<span><strong>der</strong> = Masculine — think blue</span>
// ...
\`\`\`

These strings don't use the translation system and remain in English when the language is switched to Romanian.

## Steps to Reproduce
1. Switch language to Romanian (RO)
2. Scroll to \"Quick Tips\" section on Home page
3. All content remains in English

## Expected Behavior
The title and tip content should use translated strings." \
  "bug"

create_issue \
  "Layout.jsx: Footer text hardcoded in English" \
  "## Description
In \`src/components/Layout.jsx:111\`, the footer text is hardcoded:

\`\`\`jsx
LearnGerman — A2 Level Grammar Reference
\`\`\`

This string is not wrapped with \`t()\` and doesn't change when the language is switched to Romanian.

## Suggested Fix
Add a translation key (e.g., \`footerText\`) and use \`t('footerText')\`." \
  "bug"

create_issue \
  "No 404 / catch-all route for unknown URLs" \
  "## Description
The app's routing configuration in \`src/App.jsx\` defines routes for 9 specific paths but has no catch-all/wildcard route. When a user navigates to an unknown URL (e.g., \`/foo\`, \`/about\`, \`/settings\`), the Layout renders but the content area is completely blank.

## Steps to Reproduce
1. Navigate to any undefined route (e.g., \`/nonexistent\`)
2. Observe: the header and footer render, but the content area is empty

## Expected Behavior
A friendly 404 page should be shown with a link back to the home page.

## Suggested Fix
Add a catch-all route in \`App.jsx\`:
\`\`\`jsx
<Route path=\"*\" element={<NotFound />} />
\`\`\`" \
  "bug"

create_issue \
  "searchIndex.js: Most subordinate conjunctions show no example in search results" \
  "## Description
In \`src/data/searchIndex.js:41-43\`, the search index tries to match subordinate conjunctions with sentence patterns to display examples:

\`\`\`javascript
const pattern = subordinatePatterns.find(p =>
  p.name.toLowerCase().includes(conj.german.toLowerCase())
);
\`\`\`

Only 3 out of 10 conjunctions match a pattern:
- ✅ \`weil\` → matches \"Because (weil)\"
- ✅ \`dass\` → matches \"That (dass)\"
- ✅ \`wenn\` / \`als\` → matches \"When (wenn / als)\"
- ❌ \`obwohl\`, \`ob\`, \`bevor\`, \`nachdem\`, \`während\`, \`damit\` → no match → no example shown

## Impact
6 of 10 subordinate conjunctions display no example sentence in the SmartSearch dropdown, making search results less useful.

## Suggested Fix
Add example sentences directly to the conjunction entries in \`sentences.json\`, or expand the pattern matching logic." \
  "bug"

create_issue \
  "useHighlightSection.js: highlightId state never resets to null" \
  "## Description
In \`src/hooks/useHighlightSection.js\`, after the URL \`?highlight=...\` parameter is cleaned up (after 3 seconds), the \`highlightId\` state remains set and never resets to \`null\`.

The visual highlight effect works correctly because \`SectionCard\` manages its own \`showHighlight\` state that fades after 2.5 seconds. However, the \`highlighted\` prop remains \`true\` on the SectionCard indefinitely (until navigation), which is a state inconsistency.

## Impact
- Minor: the prop stays stale but doesn't cause visible issues due to SectionCard's internal handling
- Could cause unexpected behavior if components start relying on the \`highlighted\` prop for other purposes

## Suggested Fix
Reset \`highlightId\` to \`null\` after the URL param cleanup:
\`\`\`javascript
const timer = setTimeout(() => {
  setHighlightId(null);  // Add this
  setSearchParams(...);
}, 3000);
\`\`\`" \
  "bug"

# =============================================================================
# ENHANCEMENTS (10 issues)
# =============================================================================

echo ""
echo "--- ENHANCEMENTS ---"
echo ""

create_issue \
  "Add debouncing to SmartSearch input" \
  "## Description
The SmartSearch component (\`src/components/SmartSearch.jsx\`) calls \`filterEntries()\` on every keystroke without any debouncing. For fast typists or slower devices, this creates unnecessary computation.

## Current Behavior
Every character typed immediately triggers a full search across all indexed entries.

## Proposed Improvement
Add a debounce of 150-200ms to the search input using a \`useDebounce\` hook or \`setTimeout\` pattern. This would batch rapid keystrokes and only trigger the search after the user pauses typing.

## Example
\`\`\`javascript
const debouncedQuery = useDebounce(query, 150);
const results = useMemo(() => filterEntries(debouncedQuery), [debouncedQuery]);
\`\`\`" \
  "enhancement"

create_issue \
  "Add keyboard shortcut to focus global search (Ctrl+K or /)" \
  "## Description
Many modern web applications support a keyboard shortcut (typically \`Ctrl+K\` or \`/\`) to quickly focus the search input. This would improve the user experience for keyboard-heavy users.

## Proposed Behavior
- Press \`Ctrl+K\` or \`/\` (when not in an input field) to focus the SmartSearch input
- Press \`Escape\` to close (already implemented)
- Show a visual hint near the search bar (e.g., a small \`Ctrl+K\` badge)" \
  "enhancement"

create_issue \
  "Display verb auxiliary (sein/haben) in conjugation tables" \
  "## Description
The verb data in \`src/data/verbs.json\` includes an \`auxiliary\` field for each verb (either \"sein\" or \"haben\"), but this information is never displayed in the UI.

Knowing whether a verb uses \"sein\" or \"haben\" as its auxiliary is critical for forming the Perfekt tense correctly. This is one of the most common mistakes German learners make.

## Current Data
\`\`\`json
{ \"infinitive\": \"gehen\", \"auxiliary\": \"sein\", ... }
{ \"infinitive\": \"machen\", \"auxiliary\": \"haben\", ... }
\`\`\`

## Proposed Improvement
Show the auxiliary next to the verb infinitive in the table, e.g.:
- **gehen** *(sein)* — to go
- **machen** *(haben)* — to make

Or add a color-coded badge indicating the auxiliary type." \
  "enhancement"

create_issue \
  "Add error boundary to prevent full app crashes" \
  "## Description
The application has no React Error Boundary component. If a runtime error occurs in any component (e.g., data format changes, JSON parsing errors), the entire app crashes with a white screen.

## Proposed Improvement
Add an Error Boundary component that:
1. Catches rendering errors gracefully
2. Shows a user-friendly error message
3. Provides a \"Reload\" button
4. Optionally logs the error for debugging

## Implementation
Wrap the \`<Routes>\` in \`App.jsx\` with an ErrorBoundary:
\`\`\`jsx
<ErrorBoundary fallback={<ErrorPage />}>
  <Routes>...</Routes>
</ErrorBoundary>
\`\`\`" \
  "enhancement"

create_issue \
  "Practice quiz: Include all three tenses, not just Präsens" \
  "## Description
The Practice quiz (\`src/pages/Practice.jsx:31\`) only generates verb conjugation questions for the Präsens tense:

\`\`\`javascript
const tense = 'Präsens';
\`\`\`

The data supports three tenses (Präsens, Präteritum, Perfekt), but Präteritum and Perfekt are never tested in the quiz.

## Proposed Improvement
Randomly select from all three tenses when generating verb conjugation questions:
\`\`\`javascript
const tenses = ['Präsens', 'Präteritum', 'Perfekt'];
const tense = tenses[Math.floor(Math.random() * tenses.length)];
\`\`\`

This would significantly increase the quiz's educational value." \
  "enhancement"

create_issue \
  "Add print-friendly CSS styles" \
  "## Description
Users learning German may want to print cheat sheets for offline reference. Currently, the application has no print-specific styles, which means printed pages include the navigation bar, search input, mobile menu button, and other interactive elements.

## Proposed Improvement
Add a \`@media print\` stylesheet that:
1. Hides the header navigation, search bar, and footer
2. Expands all collapsed SectionCard components
3. Removes interactive hover effects
4. Optimizes font sizes and spacing for paper
5. Ensures tables don't break across pages" \
  "enhancement"

create_issue \
  "Add 'Back to Top' button on long pages" \
  "## Description
Pages like Verbs, Pronouns, and Articles contain substantial content that requires significant scrolling. There's no quick way to return to the top of the page.

## Proposed Improvement
Add a floating \"Back to Top\" button that:
1. Appears after scrolling down 300px+
2. Smoothly scrolls to the top when clicked
3. Is positioned fixed in the bottom-right corner
4. Has a subtle, non-intrusive design" \
  "enhancement"

create_issue \
  "Add search text highlighting in Phrases page results" \
  "## Description
The Phrases page (\`src/pages/Phrases.jsx\`) has a search/filter feature, but the matching text is not highlighted in the filtered results. Users can't easily see why a particular phrase matched their query.

## Proposed Improvement
Highlight the matching substring in search results with a background color, similar to how browsers highlight \`Ctrl+F\` matches." \
  "enhancement"

create_issue \
  "Improve Akkusativ prepositions mnemonic to include bis and entlang" \
  "## Description
In \`src/data/prepositions.json\`, the Akkusativ Prepositions section has the mnemonic:
> \"DOGFU: durch, ohne, gegen, für, um\"

However, the section also lists **bis** and **entlang** as Akkusativ prepositions. The mnemonic is incomplete and may mislead learners into thinking there are only 5 Akkusativ prepositions.

## Proposed Improvement
Either:
1. Update the mnemonic to include all 7 (e.g., \"DOGFU + bis, entlang\")
2. Add a note clarifying that bis and entlang are additional Akkusativ prepositions" \
  "enhancement"

create_issue \
  "Add skip-to-content link for keyboard accessibility" \
  "## Description
The application lacks a \"Skip to Content\" link, which is an important accessibility feature for keyboard and screen reader users. Without it, users must tab through the entire navigation (9+ links) before reaching the page content.

## Proposed Improvement
Add a visually hidden (but focusable) link at the top of the page:
\`\`\`html
<a href=\"#main-content\" class=\"sr-only focus:not-sr-only\">Skip to content</a>
\`\`\`
And add \`id=\"main-content\"\` to the \`<main>\` element in Layout.jsx." \
  "enhancement"

# =============================================================================
# NEW FEATURES (4 issues)
# =============================================================================

echo ""
echo "--- NEW FEATURES ---"
echo ""

create_issue \
  "Feature: Flashcard Mode with Spaced Repetition" \
  "## Description
Add an interactive flashcard system with spaced repetition (SM-2 algorithm) for vocabulary learning.

## Motivation
The current Practice page only offers multiple-choice quizzes. Flashcards are a proven, research-backed method for language learning that complement the existing quiz feature.

## Proposed Feature
### Core Functionality
- **Flashcard decks** generated from existing data (verbs, prepositions, articles, phrases)
- **Flip animation** showing German on front, English + example on back
- **Self-rating** (Easy / Good / Hard / Again) after each card
- **Spaced repetition** using SM-2 algorithm — cards you struggle with appear more frequently

### UI/UX
- New \`/flashcards\` route with deck selection screen
- Cards show: German word/phrase → (flip) → English translation + example sentence + grammar notes
- Progress bar showing cards reviewed vs. remaining
- Session summary with statistics

### Data Storage
- Use localStorage to persist card schedules and learning progress
- Track: last reviewed date, ease factor, interval, repetition count

### Deck Types
1. **Verb Conjugations** — show infinitive + pronoun, answer is conjugated form
2. **Prepositions** — show preposition, answer is case + meaning
3. **Articles** — show noun, answer is correct article (der/die/das)
4. **Phrases** — show German phrase, answer is English translation
5. **Custom deck** — user-selected cards from any category" \
  "new-feature"

create_issue \
  "Feature: Audio Pronunciation with Text-to-Speech" \
  "## Description
Add audio pronunciation for German words and phrases using the Web Speech API (SpeechSynthesis).

## Motivation
Correct pronunciation is a fundamental part of language learning. Currently, the app only provides written content. Hearing words spoken helps learners connect spelling with sound and improves retention.

## Proposed Feature
### Core Functionality
- **Speaker icon** (🔊) next to German words, phrases, and example sentences
- Click to hear pronunciation using the browser's built-in German TTS voice
- **Auto-play option** to hear pronunciation when flipping flashcards or revealing quiz answers

### Implementation
\`\`\`javascript
function speak(text, lang = 'de-DE') {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.85; // Slightly slower for learners
  speechSynthesis.speak(utterance);
}
\`\`\`

### Integration Points
1. **Verb tables** — click verb form to hear it
2. **Phrase lists** — speaker icon next to each phrase
3. **Preposition examples** — hear the full example sentence
4. **Practice quiz** — hear the question read aloud; hear correct answer
5. **Numbers page** — hear number pronunciation (critical for German number system)

### Settings
- Toggle pronunciation on/off in header
- Adjustable speech rate (slow/normal/fast)
- Persist preference in localStorage

### Browser Support
Web Speech API is supported in all modern browsers. Add a graceful fallback (hide speaker icons) for unsupported browsers." \
  "new-feature"

create_issue \
  "Feature: Progress Dashboard with Learning Statistics" \
  "## Description
Add a progress tracking dashboard that shows learning statistics, study streaks, and mastery levels across all topics.

## Motivation
Tracking progress is a key motivator for self-directed learners. Seeing improvement over time encourages consistent study habits and helps identify weak areas.

## Proposed Feature
### Dashboard Page (\`/progress\`)
- **Overall progress** — percentage of content studied across all topics
- **Topic breakdown** — per-topic progress bars (Verbs, Pronouns, Prepositions, etc.)
- **Study streak** — consecutive days with quiz activity
- **Quiz history** — recent scores with trend graph
- **Weak areas** — topics/categories with lowest scores, with links to review

### Tracking Mechanism
- Track which sections the user has visited/expanded
- Record quiz scores per category and timestamp
- Track flashcard review history (if flashcard feature is implemented)
- All data persisted in localStorage

### UI Components
- Progress rings/bars for each topic
- Calendar heatmap showing study activity (similar to GitHub contributions)
- Score trend line chart (last 30 sessions)
- \"Suggested Review\" section highlighting weakest areas

### Gamification Elements
- Daily study goal (e.g., \"Complete 1 quiz per day\")
- Milestone badges (e.g., \"Reviewed all verbs\", \"100% quiz score\", \"7-day streak\")
- Level system based on total practice sessions" \
  "new-feature"

create_issue \
  "Feature: Custom Word Lists / Personal Vocabulary Notebook" \
  "## Description
Add the ability for users to create, manage, and practice custom vocabulary lists — a personal \"word notebook\" integrated into the app.

## Motivation
Every learner encounters words outside of structured lessons (from TV, books, conversations). Having a place to collect and practice these words within the same app eliminates the need for separate flashcard tools like Anki.

## Proposed Feature
### Core Functionality
- **Add Words** — form to add German word, English translation, example sentence, notes, and category
- **Word Lists** — organize words into custom lists (e.g., \"Work vocabulary\", \"Restaurant words\")
- **Quick Add** — button on existing content pages to save any word to a personal list
- **Practice** — quiz mode specifically for custom word lists

### Word Entry Fields
| Field | Required | Description |
|-------|----------|-------------|
| German | Yes | The German word or phrase |
| English | Yes | English translation |
| Example | No | Example sentence |
| Gender | No | der/die/das (for nouns) |
| Category | No | User-defined tag/list |
| Notes | No | Personal notes/mnemonics |

### Features
1. **Import/Export** — export lists as JSON or CSV; import from CSV
2. **Search** — full-text search across all personal words
3. **Sort** — by date added, alphabetical, or practice score
4. **Bulk actions** — select multiple words to move, delete, or practice
5. **Integration** — \"Add to my list\" button appears next to words throughout the app

### Data Storage
- localStorage for offline-first experience
- Optional: export/import for backup and sharing between devices

### New Route
- \`/my-words\` — personal vocabulary management page" \
  "new-feature"

echo ""
echo "=========================================="
echo " Done! All issues created."
echo "=========================================="
