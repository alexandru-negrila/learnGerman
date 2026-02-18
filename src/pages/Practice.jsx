import { useState, useCallback } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import PageHeader from '../components/PageHeader';
import verbsData from '../data/verbs.json';
import pronounsData from '../data/pronouns.json';
import prepositionsData from '../data/prepositions.json';
import articlesData from '../data/articles.json';

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeOptions(answer, pool) {
  const wrong = shuffleArray(pool.filter(x => x !== answer)).slice(0, 3);
  return shuffleArray([answer, ...wrong]);
}

function generateQuestions() {
  const questions = [];
  const allVerbs = verbsData.sections.flatMap(s => s.verbs);
  const pronounLabels = verbsData.pronouns;

  // Verb conjugation — "What is the Präsens form of 'gehen' for ich?"
  for (const verb of allVerbs) {
    const pronounIdx = Math.floor(Math.random() * 6);
    const tense = 'Präsens';
    const answer = verb.conjugations[tense][pronounIdx];
    const otherForms = allVerbs
      .map(v => v.conjugations[tense][pronounIdx])
      .filter(f => f !== answer);
    questions.push({
      category: 'Verbs',
      question: `${pronounLabels[pronounIdx]} _____ (${verb.infinitive} — ${tense})`,
      answer,
      options: makeOptions(answer, otherForms),
      hint: verb.english,
    });
  }

  // Personal pronouns — Akkusativ/Dativ
  const personalPronouns = pronounsData.sections[0];
  for (const row of personalPronouns.rows) {
    const caseIdx = Math.floor(Math.random() * 2) + 1; // 1=Akk, 2=Dat
    const answer = row.cells[caseIdx];
    const otherAnswers = personalPronouns.rows
      .map(r => r.cells[caseIdx])
      .filter(c => c !== answer);
    questions.push({
      category: 'Pronouns',
      question: `${row.label} → ${personalPronouns.headers[caseIdx]}?`,
      answer,
      options: makeOptions(answer, otherAnswers),
      hint: personalPronouns.headers[caseIdx],
    });
  }

  // Prepositions — which case?
  for (const section of prepositionsData.sections) {
    const caseName = section.title.split(' ')[0];
    for (const item of section.items.slice(0, 4)) {
      questions.push({
        category: 'Prepositions',
        question: `"${item.german}" (${item.english}) requires which case?`,
        answer: caseName,
        options: shuffleArray(['Akkusativ', 'Dativ', 'Wechselpräpositionen', 'Genitiv']),
        hint: item.english,
      });
    }
  }

  // Article gender questions
  const genderTips = articlesData.sections.find(s => s.genderTips);
  if (genderTips) {
    for (const tip of genderTips.genderTips) {
      for (const ending of tip.endings.slice(0, 3)) {
        const word = ending.split('(')[1]?.replace(')', '') || ending;
        questions.push({
          category: 'Articles',
          question: `What is the gender of "${word}"?`,
          answer: tip.gender.split(' ')[0],
          options: shuffleArray(['Maskulin', 'Feminin', 'Neutrum']),
          hint: `Ending pattern: ${ending.split('(')[0]?.trim()}`,
        });
      }
    }
  }

  // Definite article declension
  const defArticles = articlesData.sections[0];
  if (defArticles) {
    for (const row of defArticles.rows) {
      const colIdx = Math.floor(Math.random() * 4);
      const answer = row.cells[colIdx];
      const otherAnswers = defArticles.rows
        .flatMap(r => r.cells)
        .filter(c => c !== answer);
      questions.push({
        category: 'Articles',
        question: `Definite article: ${row.label} + ${defArticles.headers[colIdx]}?`,
        answer,
        options: makeOptions(answer, otherAnswers),
        hint: row.label,
      });
    }
  }

  // Verb meaning — "What does 'sprechen' mean?"
  for (const verb of shuffleArray(allVerbs).slice(0, 10)) {
    const answer = verb.english;
    const otherMeanings = allVerbs.map(v => v.english).filter(e => e !== answer);
    questions.push({
      category: 'Verbs',
      question: `What does "${verb.infinitive}" mean?`,
      answer,
      options: makeOptions(answer, otherMeanings),
    });
  }

  return shuffleArray(questions);
}

const categoryColors = {
  'all': 'bg-stone-100 text-stone-600 border-stone-200',
  'Verbs': 'bg-indigo-50 text-indigo-600 border-indigo-200',
  'Pronouns': 'bg-purple-50 text-purple-600 border-purple-200',
  'Prepositions': 'bg-emerald-50 text-emerald-600 border-emerald-200',
  'Articles': 'bg-amber-50 text-amber-600 border-amber-200',
};

const categoryActiveColors = {
  'all': 'bg-stone-800 text-white border-stone-800',
  'Verbs': 'bg-indigo-600 text-white border-indigo-600',
  'Pronouns': 'bg-purple-600 text-white border-purple-600',
  'Prepositions': 'bg-emerald-600 text-white border-emerald-600',
  'Articles': 'bg-amber-600 text-white border-amber-600',
};

export default function Practice() {
  const { t } = useLanguage();
  const [questions, setQuestions] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(null);
  const [score, setScore] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const QUIZ_LENGTH = 10;

  const categories = ['all', 'Verbs', 'Pronouns', 'Prepositions', 'Articles'];

  const startQuiz = useCallback(() => {
    let allQ = generateQuestions();
    if (selectedCategory !== 'all') {
      allQ = allQ.filter(q => q.category === selectedCategory);
    }
    setQuestions(allQ.slice(0, QUIZ_LENGTH));
    setCurrentIdx(0);
    setUserAnswer('');
    setShowResult(null);
    setScore(0);
  }, [selectedCategory]);

  const handleChoice = (option) => {
    const q = questions[currentIdx];
    const correct = option === q.answer;
    setUserAnswer(option);
    setShowResult(correct ? 'correct' : 'incorrect');
    if (correct) setScore(s => s + 1);
  };

  const nextQuestion = () => {
    setCurrentIdx(i => i + 1);
    setUserAnswer('');
    setShowResult(null);
  };

  // Start screen
  if (!questions) {
    return (
      <div>
        <PageHeader icon="🎯" title={t('quizTitle')} description={t('quizDescription')} />
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm shadow-stone-900/[0.03]">
            <p className="text-sm text-stone-500 mb-4">{t('selectTopic')}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm border cursor-pointer transition-all font-medium active:scale-95 ${
                    selectedCategory === cat
                      ? categoryActiveColors[cat]
                      : `${categoryColors[cat]} hover:opacity-80`
                  }`}
                >
                  {cat === 'all' ? t('allTopics') : cat}
                </button>
              ))}
            </div>
            <button
              onClick={startQuiz}
              className="w-full py-3 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 active:scale-[0.98] transition-all cursor-pointer border-0 text-sm shadow-lg shadow-brand-600/20"
            >
              {t('startQuiz')} ({QUIZ_LENGTH} questions)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz complete
  if (currentIdx >= questions.length) {
    const percentage = Math.round((score / questions.length) * 100);
    const isGreat = score >= questions.length * 0.7;
    return (
      <div>
        <PageHeader icon="🎯" title={t('quizTitle')} />
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-sm shadow-stone-900/[0.03] animate-scale-in">
            <div className="text-5xl mb-4">{isGreat ? '🎉' : '💪'}</div>
            <p className="text-3xl font-bold text-stone-900 mb-1 tracking-tight">
              {score} / {questions.length}
            </p>
            <div className="w-full bg-stone-100 rounded-full h-3 my-4 overflow-hidden">
              <div
                className={`h-3 rounded-full transition-all duration-1000 ${isGreat ? 'bg-emerald-500' : 'bg-amber-500'}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className={`text-lg font-semibold mb-1 ${isGreat ? 'text-emerald-600' : 'text-amber-600'}`}>
              {percentage}%
            </p>
            <p className="text-sm text-stone-400 mb-6">
              {isGreat ? 'Great job! Keep it up!' : 'Good effort! Practice makes perfect.'}
            </p>
            <button
              onClick={() => setQuestions(null)}
              className="px-6 py-2.5 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 active:scale-95 transition-all cursor-pointer border-0 text-sm shadow-lg shadow-brand-600/20"
            >
              {t('tryAgain')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[currentIdx];
  const progressPercent = (currentIdx / questions.length) * 100;

  return (
    <div>
      <PageHeader icon="🎯" title={t('quizTitle')} />

      <div className="max-w-lg mx-auto">
        {/* Progress */}
        <div className="flex items-center justify-between mb-3 text-sm">
          <span className="text-stone-500 font-medium">{currentIdx + 1} {t('questionOf')} {questions.length}</span>
          <span className="text-stone-400">{t('score')}: <span className="font-semibold text-stone-700">{score}</span></span>
        </div>
        <div className="w-full bg-stone-100 rounded-full h-2 mb-6 overflow-hidden">
          <div
            className="bg-brand-500 h-2 rounded-full progress-bar"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm shadow-stone-900/[0.03] animate-fade-in">
          <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${categoryColors[q.category] || 'bg-stone-100 text-stone-500'}`}>
            {q.category}
          </span>
          <p className="text-lg font-semibold text-stone-900 mt-3 mb-5 tracking-tight">{q.question}</p>

          {/* Multiple choice options */}
          <div className="space-y-2.5">
            {q.options.map((option, oi) => {
              let optionStyle = 'bg-white border-stone-200 hover:bg-brand-50/50 hover:border-brand-200 text-stone-700';
              if (showResult) {
                if (option === q.answer) {
                  optionStyle = 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold';
                } else if (option === userAnswer && option !== q.answer) {
                  optionStyle = 'bg-red-50 border-red-300 text-red-800';
                } else {
                  optionStyle = 'bg-white border-stone-200 text-stone-300';
                }
              }

              return (
                <button
                  key={oi}
                  onClick={() => !showResult && handleChoice(option)}
                  disabled={showResult !== null}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm cursor-pointer transition-all active:scale-[0.98] ${optionStyle} disabled:cursor-default`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 text-xs font-bold ${
                      showResult && option === q.answer ? 'border-emerald-400 bg-emerald-100 text-emerald-700' :
                      showResult && option === userAnswer ? 'border-red-400 bg-red-100 text-red-700' :
                      'border-stone-200 text-stone-400'
                    }`}>
                      {showResult && option === q.answer ? '✓' :
                       showResult && option === userAnswer && option !== q.answer ? '✗' :
                       String.fromCharCode(65 + oi)}
                    </span>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Result */}
          {showResult && (
            <div className={`mt-4 px-4 py-3 rounded-xl text-sm animate-fade-in ${
              showResult === 'correct'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              <p className="font-semibold">
                {showResult === 'correct' ? t('correct') : t('incorrect')}
              </p>
              {showResult === 'incorrect' && (
                <p className="mt-0.5">Correct answer: <strong>{q.answer}</strong></p>
              )}
            </div>
          )}

          {/* Next button */}
          {showResult && (
            <button
              onClick={nextQuestion}
              className="mt-4 w-full py-3 bg-stone-900 text-white rounded-xl font-semibold hover:bg-stone-800 active:scale-[0.98] transition-all cursor-pointer border-0 text-sm"
            >
              {t('nextQuestion')} →
            </button>
          )}

          {/* Hint */}
          {q.hint && !showResult && (
            <p className="mt-4 text-xs text-stone-400 flex items-center gap-1.5">
              <span>💡</span> Hint: {q.hint}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
