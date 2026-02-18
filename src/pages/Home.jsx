import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';

const topics = [
  { path: '/verbs', key: 'verbs', icon: '📝', color: 'bg-blue-50 border-blue-200 hover:bg-blue-100', desc: '30+ common verbs with conjugation tables' },
  { path: '/pronouns', key: 'pronouns', icon: '👤', color: 'bg-purple-50 border-purple-200 hover:bg-purple-100', desc: 'Personal, possessive, reflexive, relative' },
  { path: '/prepositions', key: 'prepositions', icon: '📍', color: 'bg-green-50 border-green-200 hover:bg-green-100', desc: 'Akkusativ, Dativ, Genitiv, Wechselpräp.' },
  { path: '/articles', key: 'articles', icon: '📋', color: 'bg-amber-50 border-amber-200 hover:bg-amber-100', desc: 'der/die/das, cases, adjective endings' },
  { path: '/sentences', key: 'sentences', icon: '🔤', color: 'bg-rose-50 border-rose-200 hover:bg-rose-100', desc: 'Word order, Nebensatz, questions, negation' },
  { path: '/phrases', key: 'phrases', icon: '💬', color: 'bg-cyan-50 border-cyan-200 hover:bg-cyan-100', desc: 'Greetings, shopping, travel, time' },
  { path: '/numbers', key: 'numbers', icon: '🔢', color: 'bg-teal-50 border-teal-200 hover:bg-teal-100', desc: 'Cardinals, ordinals, days, months' },
  { path: '/practice', key: 'practice', icon: '🎯', color: 'bg-orange-50 border-orange-200 hover:bg-orange-100', desc: 'Test your knowledge with quick quizzes' },
];

export default function Home() {
  const { t } = useLanguage();

  return (
    <div>
      {/* Hero */}
      <div className="text-center mb-8 pt-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          🇩🇪 {t('appTitle')}
        </h1>
        <p className="text-lg text-gray-500 mb-1">{t('homeWelcome')}</p>
        <p className="text-sm text-gray-400">{t('homeDescription')}</p>
      </div>

      {/* Topic Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {topics.map(topic => (
          <Link
            key={topic.path}
            to={topic.path}
            className={`${topic.color} border rounded-xl p-4 no-underline transition-all hover:shadow-md group`}
          >
            <div className="text-2xl mb-2">{topic.icon}</div>
            <h2 className="font-semibold text-gray-900 group-hover:text-gray-800">
              {t(topic.key)}
            </h2>
            <p className="text-xs text-gray-500 mt-1">{topic.desc}</p>
          </Link>
        ))}
      </div>

      {/* Quick Tips */}
      <div className="mt-10 bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="font-semibold text-gray-900 mb-3">💡 Quick Tips for A2 Learners</h2>
        <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-600">
          <div className="flex gap-2">
            <span className="text-blue-500 shrink-0">●</span>
            <span><strong>der</strong> = Masculine — think blue</span>
          </div>
          <div className="flex gap-2">
            <span className="text-red-500 shrink-0">●</span>
            <span><strong>die</strong> = Feminine — think red</span>
          </div>
          <div className="flex gap-2">
            <span className="text-green-500 shrink-0">●</span>
            <span><strong>das</strong> = Neuter — think green</span>
          </div>
          <div className="flex gap-2">
            <span className="text-yellow-500 shrink-0">●</span>
            <span><strong>die</strong> (plural) — think yellow</span>
          </div>
          <div className="flex gap-2 sm:col-span-2">
            <span className="text-gray-400 shrink-0">→</span>
            <span>Verb is <strong>always in position 2</strong> in main clauses, and at the <strong>end</strong> in subordinate clauses</span>
          </div>
          <div className="flex gap-2 sm:col-span-2">
            <span className="text-gray-400 shrink-0">→</span>
            <span>Akkusativ = movement (wohin?), Dativ = location (wo?) with two-way prepositions</span>
          </div>
        </div>
      </div>
    </div>
  );
}
