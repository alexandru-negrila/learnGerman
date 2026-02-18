import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import phrasesData from '../data/phrases.json';
import PageHeader from '../components/PageHeader';
import SectionCard from '../components/SectionCard';

export default function Phrases() {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');

  const filteredSections = phrasesData.sections.map(section => ({
    ...section,
    items: section.items.filter(item =>
      item.german.toLowerCase().includes(search.toLowerCase()) ||
      item.english.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(section => section.items.length > 0);

  return (
    <div>
      <PageHeader
        icon={phrasesData.meta.icon}
        title={phrasesData.meta.title}
        description={phrasesData.meta.description}
      />

      {/* Search */}
      <div className="mb-5">
        <input
          type="text"
          placeholder={t('search')}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full max-w-md px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-100"
        />
      </div>

      <div className="space-y-4">
        {filteredSections.map((section, si) => (
          <SectionCard key={si} title={section.title}>
            <div className="space-y-1">
              {section.items.map((item, ii) => (
                <div
                  key={ii}
                  className="flex items-start gap-3 py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className={`text-xs px-1.5 py-0.5 rounded shrink-0 mt-0.5 ${
                    item.formal ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {item.formal ? t('formal') : t('informal')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">{item.german}</p>
                    <p className="text-sm text-gray-500">{item.english}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  );
}
