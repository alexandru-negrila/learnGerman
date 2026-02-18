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
      <div className="flex flex-wrap items-center gap-3 mb-5">
        {/* Tense Selector */}
        <div className="flex rounded-lg border border-gray-200 overflow-hidden">
          {verbsData.tenses.map(tense => (
            <button
              key={tense}
              onClick={() => setSelectedTense(tense)}
              className={`px-3 py-1.5 text-sm cursor-pointer border-0 transition-colors ${
                selectedTense === tense
                  ? 'bg-blue-600 text-white font-medium'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tense}
            </button>
          ))}
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder={t('search')}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm flex-1 min-w-[200px] outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-100"
        />
      </div>

      {/* Verb Tables */}
      <div className="space-y-4">
        {filteredSections.map((section, si) => (
          <SectionCard
            key={si}
            id={slugify(section.title)}
            highlighted={highlightId === slugify(section.title)}
            title={section.title}
            description={section.description}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left px-3 py-2 font-semibold text-gray-700">Verb</th>
                    <th className="text-left px-3 py-2 font-semibold text-gray-500 text-xs">{t('english')}</th>
                    {verbsData.pronouns.map(p => (
                      <th key={p} className="text-left px-3 py-2 font-semibold text-gray-700 whitespace-nowrap">{p}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.verbs.map((verb, vi) => (
                    <tr key={vi} className={`border-b border-gray-50 ${vi % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} hover:bg-blue-50/30 transition-colors`}>
                      <td className="px-3 py-2 font-bold text-blue-700 whitespace-nowrap">
                        {verb.infinitive}
                        {verb.auxiliary && (
                          <span className={`ml-1.5 text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                            verb.auxiliary === 'sein'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}>
                            {verb.auxiliary}
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-gray-400 text-xs whitespace-nowrap">{verb.english}</td>
                      {verb.conjugations[selectedTense].map((form, fi) => (
                        <td key={fi} className="px-3 py-2 text-gray-800 whitespace-nowrap">{form}</td>
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
