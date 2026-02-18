import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';

const topics = [
  { path: '/verbs', key: 'verbs', icon: '📝', gradient: 'from-indigo-500 to-blue-500', bg: 'bg-indigo-50 hover:bg-indigo-100', accent: 'text-indigo-600', desc: '30+ common verbs with conjugation tables' },
  { path: '/pronouns', key: 'pronouns', icon: '👤', gradient: 'from-purple-500 to-fuchsia-500', bg: 'bg-purple-50 hover:bg-purple-100', accent: 'text-purple-600', desc: 'Personal, possessive, reflexive, relative' },
  { path: '/prepositions', key: 'prepositions', icon: '📍', gradient: 'from-emerald-500 to-green-500', bg: 'bg-emerald-50 hover:bg-emerald-100', accent: 'text-emerald-600', desc: 'Akkusativ, Dativ, Genitiv, Wechselpräp.' },
  { path: '/articles', key: 'articles', icon: '📋', gradient: 'from-amber-500 to-yellow-500', bg: 'bg-amber-50 hover:bg-amber-100', accent: 'text-amber-600', desc: 'der/die/das, cases, adjective endings' },
  { path: '/sentences', key: 'sentences', icon: '🔤', gradient: 'from-rose-500 to-pink-500', bg: 'bg-rose-50 hover:bg-rose-100', accent: 'text-rose-600', desc: 'Word order, Nebensatz, questions, negation' },
  { path: '/phrases', key: 'phrases', icon: '💬', gradient: 'from-cyan-500 to-sky-500', bg: 'bg-cyan-50 hover:bg-cyan-100', accent: 'text-cyan-600', desc: 'Greetings, shopping, travel, time' },
  { path: '/numbers', key: 'numbers', icon: '🔢', gradient: 'from-teal-500 to-emerald-500', bg: 'bg-teal-50 hover:bg-teal-100', accent: 'text-teal-600', desc: 'Cardinals, ordinals, days, months' },
  { path: '/practice', key: 'practice', icon: '🎯', gradient: 'from-orange-500 to-red-500', bg: 'bg-orange-50 hover:bg-orange-100', accent: 'text-orange-600', desc: 'Test your knowledge with quick quizzes' },
];

export default function Home() {
  const { t } = useLanguage();

  return (
    <div>
      {/* Hero */}
      <div className="text-center mb-10 pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-medium mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
          A2 Level Grammar Reference
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight mb-3">
          <span className="mr-2">🇩🇪</span>
          <span className="gradient-text">{t('appTitle')}</span>
        </h1>
        <p className="text-lg text-stone-500 mb-1 max-w-xl mx-auto">{t('homeWelcome')}</p>
        <p className="text-sm text-stone-400 max-w-lg mx-auto">{t('homeDescription')}</p>
      </div>

      {/* Topic Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
        {topics.map(topic => (
          <Link
            key={topic.path}
            to={topic.path}
            className={`${topic.bg} rounded-2xl p-5 no-underline transition-all hover-lift group border border-transparent`}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{topic.icon}</span>
              <svg className="w-4 h-4 text-stone-300 group-hover:text-stone-400 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h2 className={`font-bold text-stone-800 text-base mb-1 ${topic.accent}`}>
              {t(topic.key)}
            </h2>
            <p className="text-xs text-stone-500 leading-relaxed">{topic.desc}</p>
          </Link>
        ))}
      </div>

      {/* Quick Tips */}
      <div className="mt-12 bg-white rounded-2xl border border-stone-200 p-6 shadow-sm shadow-stone-900/[0.03]">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">💡</span>
          <h2 className="font-bold text-stone-800 text-base">Quick Tips for A2 Learners</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="flex gap-3 items-start p-3 rounded-xl bg-blue-50/50">
            <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5" />
            <span className="text-sm text-stone-600"><strong className="text-blue-700">der</strong> = Masculine — think blue</span>
          </div>
          <div className="flex gap-3 items-start p-3 rounded-xl bg-red-50/50">
            <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-1.5" />
            <span className="text-sm text-stone-600"><strong className="text-red-700">die</strong> = Feminine — think red</span>
          </div>
          <div className="flex gap-3 items-start p-3 rounded-xl bg-green-50/50">
            <span className="w-2 h-2 rounded-full bg-green-500 shrink-0 mt-1.5" />
            <span className="text-sm text-stone-600"><strong className="text-green-700">das</strong> = Neuter — think green</span>
          </div>
          <div className="flex gap-3 items-start p-3 rounded-xl bg-yellow-50/50">
            <span className="w-2 h-2 rounded-full bg-yellow-500 shrink-0 mt-1.5" />
            <span className="text-sm text-stone-600"><strong className="text-yellow-700">die</strong> (plural) — think yellow</span>
          </div>
          <div className="flex gap-3 items-start p-3 rounded-xl bg-stone-50 sm:col-span-2">
            <span className="text-stone-400 shrink-0 mt-0.5">→</span>
            <span className="text-sm text-stone-600">Verb is <strong>always in position 2</strong> in main clauses, and at the <strong>end</strong> in subordinate clauses</span>
          </div>
          <div className="flex gap-3 items-start p-3 rounded-xl bg-stone-50 sm:col-span-2">
            <span className="text-stone-400 shrink-0 mt-0.5">→</span>
            <span className="text-sm text-stone-600">Akkusativ = movement (wohin?), Dativ = location (wo?) with two-way prepositions</span>
          </div>
        </div>
      </div>
    </div>
  );
}
