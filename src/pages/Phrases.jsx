import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import phrasesData from '../data/phrases.json';
import PageHeader from '../components/PageHeader';
import SectionCard from '../components/SectionCard';

export default function Phrases() {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');

  const query = search.toLowerCase();
  const filteredSections = phrasesData.sections.map(section => {
    if (section.situationPhrases) {
      return {
        ...section,
        situationPhrases: section.situationPhrases.filter(item =>
          item.phrase.toLowerCase().includes(query) ||
          item.translation.toLowerCase().includes(query) ||
          item.example.toLowerCase().includes(query)
        ),
      };
    }
    return {
      ...section,
      items: section.items.filter(item =>
        item.german.toLowerCase().includes(query) ||
        item.english.toLowerCase().includes(query)
      ),
    };
  }).filter(section => (section.items?.length > 0) || (section.situationPhrases?.length > 0));

  return (
    <div>
      <PageHeader
        icon={phrasesData.meta.icon}
        title={phrasesData.meta.title}
        description={phrasesData.meta.description}
      />

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
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

      <div className="space-y-5">
        {filteredSections.map((section, si) => (
          <SectionCard key={si} title={section.title} description={section.description}>
            {/* Standard phrase items */}
            {section.items && (
              <div className="space-y-1">
                {section.items.map((item, ii) => (
                  <div
                    key={ii}
                    className="flex items-start gap-3 py-2.5 px-3 rounded-xl hover:bg-stone-50 transition-colors"
                  >
                    <span className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 mt-1 font-medium ${
                      item.formal ? 'bg-brand-50 text-brand-600' : 'bg-stone-100 text-stone-500'
                    }`}>
                      {item.formal ? t('formal') : t('informal')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-stone-900">{item.german}</p>
                      <p className="text-sm text-stone-500">{item.english}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Speaking situation phrases */}
            {section.situationPhrases && (
              <div className="overflow-x-auto rounded-xl border border-stone-200 shadow-sm shadow-stone-900/[0.03]">
                <table className="w-full text-sm data-table">
                  <thead>
                    <tr className="bg-stone-50/80 border-b border-stone-200">
                      <th className="text-left px-4 py-2.5 font-semibold text-stone-600 text-xs uppercase tracking-wide">Phrase</th>
                      <th className="text-left px-4 py-2.5 font-semibold text-stone-600 text-xs uppercase tracking-wide">Translation</th>
                      <th className="text-left px-4 py-2.5 font-semibold text-stone-600 text-xs uppercase tracking-wide">{t('example')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.situationPhrases.map((item, ii) => (
                      <tr key={ii} className={`border-b border-stone-100 last:border-b-0 ${ii % 2 === 0 ? 'bg-white' : 'bg-stone-50/40'} hover:bg-brand-50/40 transition-colors`}>
                        <td className="px-4 py-2.5 font-medium text-stone-900">{item.phrase}</td>
                        <td className="px-4 py-2.5 text-stone-600">{item.translation}</td>
                        <td className="px-4 py-2.5 text-stone-400 italic">{item.example}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </SectionCard>
        ))}
      </div>
    </div>
  );
}
