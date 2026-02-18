import { useState, useCallback } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import PageHeader from '../components/PageHeader';
import verbsData from '../data/verbs.json';
import pronounsData from '../data/pronouns.json';
import prepositionsData from '../data/prepositions.json';
import articlesData from '../data/articles.json';

function generateQuestions() {
  const questions = [];

  // Verb conjugation questions
  const allVerbs = verbsData.sections.flatMap(s => s.verbs);
  const pronounIdx = Math.floor(Math.random() * 6);
  const pronounLabels = verbsData.pronouns;
  for (const verb of allVerbs.slice(0, 15)) {
    const tense = 'Präsens';
    questions.push({
      type: 'fillBlank',
      category: 'Verbs',
      question: `${pronounLabels[pronounIdx]} _____ (${verb.infinitive} — ${tense})`,
      answer: verb.conjugations[tense][pronounIdx],
      hint: verb.english,
    });
  }

  // Personal pronouns — Akkusativ/Dativ
  const personalPronouns = pronounsData.sections[0];
  for (const row of personalPronouns.rows) {
    const caseIdx = Math.floor(Math.random() * 2) + 1; // 1=Akk, 2=Dat
    questions.push({
      type: 'fillBlank',
      category: 'Pronouns',
      question: `${row.label} → ${personalPronouns.headers[caseIdx]}?`,
      answer: row.cells[caseIdx],
      hint: personalPronouns.headers[caseIdx],
    });
  }

  // Prepositions — which case?
  for (const section of prepositionsData.sections) {
    const caseName = section.title.split(' ')[0];
    for (const item of section.items.slice(0, 3)) {
      questions.push({
        type: 'multipleChoice',
        category: 'Prepositions',
        question: `"${item.german}" requires which case?`,
        answer: caseName,
        options: shuffleArray(['Akkusativ', 'Dativ', 'Wechselpräp.', 'Genitiv']),
        hint: item.english,
      });
    }
  }

  // Article gender questions
  const genderTips = articlesData.sections.find(s => s.genderTips);
  if (genderTips) {
    for (const tip of genderTips.genderTips) {
      for (const ending of tip.endings.slice(0, 2)) {
        const word = ending.split('(')[1]?.replace(')', '') || ending;
        questions.push({
          type: 'multipleChoice',
          category: 'Articles',
          question: `What is the gender of "${word}"?`,
          answer: tip.gender.split(' ')[0],
          options: shuffleArray(['Maskulin', 'Feminin', 'Neutrum']),
          hint: tip.gender,
        });
      }
    }
  }

  // Definite article questions
  const defArticles = articlesData.sections[0];
  if (defArticles) {
    for (const row of defArticles.rows) {
      const colIdx = Math.floor(Math.random() * 4);
      questions.push({
        type: 'fillBlank',
        category: 'Articles',
        question: `Definite article: ${row.label} + ${defArticles.headers[colIdx]}?`,
        answer: row.cells[colIdx],
        hint: `${row.label}`,
      });
    }
  }

  return shuffleArray(questions);
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Practice() {
  const { t } = useLanguage();
  const [questions, setQuestions] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(null); // null, 'correct', 'incorrect'
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

  const checkAnswer = () => {
    const q = questions[currentIdx];
    const correct = userAnswer.trim().toLowerCase() === q.answer.toLowerCase();
    setShowResult(correct ? 'correct' : 'incorrect');
    if (correct) setScore(s => s + 1);
  };

  const handleMultipleChoice = (option) => {
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
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-600 mb-4">{t('selectTopic')}</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-sm border cursor-pointer transition-colors ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {cat === 'all' ? t('allTopics') : cat}
                </button>
              ))}
            </div>
            <button
              onClick={startQuiz}
              className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer border-0 text-sm"
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
    return (
      <div>
        <PageHeader icon="🎯" title={t('quizTitle')} />
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-4xl mb-3">{score >= questions.length * 0.7 ? '🎉' : '💪'}</p>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {t('score')}: {score} / {questions.length}
            </p>
            <p className="text-gray-500 mb-5">
              {Math.round((score / questions.length) * 100)}%
            </p>
            <button
              onClick={() => setQuestions(null)}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer border-0 text-sm"
            >
              {t('tryAgain')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[currentIdx];

  return (
    <div>
      <PageHeader icon="🎯" title={t('quizTitle')} />

      <div className="max-w-lg mx-auto">
        {/* Progress */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <span>{currentIdx + 1} {t('questionOf')} {questions.length}</span>
          <span>{t('score')}: {score}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-5">
          <div
            className="bg-blue-600 h-1.5 rounded-full transition-all"
            style={{ width: `${((currentIdx) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <span className="text-xs text-gray-400 uppercase tracking-wide">{q.category}</span>
          <p className="text-lg font-medium text-gray-900 mt-1 mb-4">{q.question}</p>

          {/* Fill in the blank */}
          {q.type === 'fillBlank' && (
            <div>
              <input
                type="text"
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !showResult && checkAnswer()}
                placeholder="Type your answer..."
                disabled={showResult !== null}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-base outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-100 disabled:bg-gray-50"
                autoFocus
              />
              {!showResult && (
                <button
                  onClick={checkAnswer}
                  disabled={!userAnswer.trim()}
                  className="mt-3 w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer border-0 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('checkAnswer')}
                </button>
              )}
            </div>
          )}

          {/* Multiple choice */}
          {q.type === 'multipleChoice' && (
            <div className="space-y-2">
              {q.options.map((option, oi) => (
                <button
                  key={oi}
                  onClick={() => !showResult && handleMultipleChoice(option)}
                  disabled={showResult !== null}
                  className={`w-full text-left px-3 py-2 rounded-lg border text-sm cursor-pointer transition-colors ${
                    showResult && option === q.answer
                      ? 'bg-green-50 border-green-300 text-green-800'
                      : showResult && option === userAnswer && option !== q.answer
                      ? 'bg-red-50 border-red-300 text-red-800'
                      : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'
                  } disabled:cursor-default`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* Result */}
          {showResult && (
            <div className={`mt-3 px-3 py-2 rounded-lg text-sm ${
              showResult === 'correct'
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              <p className="font-medium">
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
              className="mt-3 w-full py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors cursor-pointer border-0 text-sm"
            >
              {t('nextQuestion')} →
            </button>
          )}

          {/* Hint */}
          {q.hint && !showResult && (
            <p className="mt-3 text-xs text-gray-400">💡 Hint: {q.hint}</p>
          )}
        </div>
      </div>
    </div>
  );
}
