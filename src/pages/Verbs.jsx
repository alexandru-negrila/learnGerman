import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useHighlightSection } from '../hooks/useHighlightSection';
import { slugify } from '../utils/slugify';
import verbsData from '../data/verbs.json';
import PageHeader from '../components/PageHeader';
import SectionCard from '../components/SectionCard';

export default function Verbs() {
  const { t } = useLanguage();
  const highlightId = useHighlightSection();
  const [selectedTense, setSelectedTense] = useState('Präsens');
  const [search, setSearch] = useState('');

  const filteredSections = verbsData.sections.map(section => ({
    ...section,
    verbs: section.verbs.filter(v =>
      v.infinitive.toLowerCase().includes(search.toLowerCase()) ||
      v.english.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(section => section.verbs.length > 0);

  return (
    <div>
      <PageHeader
        icon={verbsData.meta.icon}
        title={verbsData.meta.title}
        description={verbsData.meta.description}
      />

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Tense Selector */}
        <div className="flex rounded-xl border border-stone-200 overflow-hidden shadow-sm">
          {verbsData.tenses.map(tense => (
            <button
              key={tense}
              onClick={() => setSelectedTense(tense)}
              className={`px-4 py-2 text-sm cursor-pointer border-0 transition-all font-medium ${
                selectedTense === tense
                  ? 'bg-brand-600 text-white shadow-inner'
                  : 'bg-white text-stone-500 hover:bg-stone-50 hover:text-stone-700'
              }`}
            >
              {tense}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder={t('search')}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 bg-white transition-all"
          />
        </div>
      </div>

      {/* Verb Tables */}
      <div className="space-y-5">
        {filteredSections.map((section, si) => (
          <SectionCard
            key={si}
            id={slugify(section.title)}
            highlighted={highlightId === slugify(section.title)}
            title={section.title}
            description={section.description}
          >
            <div className="overflow-x-auto rounded-xl border border-stone-200 shadow-sm shadow-stone-900/[0.03]">
              <table className="w-full text-sm data-table">
                <thead>
                  <tr className="bg-stone-50/80 border-b border-stone-200">
                    <th className="text-left px-4 py-2.5 font-semibold text-stone-600 text-xs uppercase tracking-wide">Verb</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-stone-400 text-xs uppercase tracking-wide">{t('english')}</th>
                    {verbsData.pronouns.map(p => (
                      <th key={p} className="text-left px-4 py-2.5 font-semibold text-stone-600 text-xs uppercase tracking-wide whitespace-nowrap">{p}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.verbs.map((verb, vi) => (
                    <tr key={vi} className={`border-b border-stone-100 last:border-b-0 ${vi % 2 === 0 ? 'bg-white' : 'bg-stone-50/40'} hover:bg-brand-50/40 transition-colors`}>
                      <td className="px-4 py-2.5 font-bold text-brand-700 whitespace-nowrap">
                        {verb.infinitive}
                        {verb.auxiliary && (
                          <span className={`ml-1.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                            verb.auxiliary === 'sein'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}>
                            {verb.auxiliary}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2.5 text-stone-400 text-xs whitespace-nowrap">{verb.english}</td>
                      {verb.conjugations[selectedTense].map((form, fi) => (
                        <td key={fi} className="px-4 py-2.5 text-stone-700 font-medium whitespace-nowrap">{form}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  );
}
