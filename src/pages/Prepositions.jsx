import { useLanguage } from '../hooks/useLanguage';
import { useHighlightSection } from '../hooks/useHighlightSection';
import { slugify } from '../utils/slugify';
import prepositionsData from '../data/prepositions.json';
import PageHeader from '../components/PageHeader';
import SectionCard from '../components/SectionCard';

export default function Prepositions() {
  const { t } = useLanguage();
  const highlightId = useHighlightSection();

  const caseColors = {
    'Akkusativ Prepositions': 'border-l-red-400',
    'Dativ Prepositions': 'border-l-blue-400',
    'Wechselpräpositionen (Two-Way Prepositions)': 'border-l-purple-400',
    'Genitiv Prepositions': 'border-l-green-400',
  };

  return (
    <div>
      <PageHeader
        icon={prepositionsData.meta.icon}
        title={prepositionsData.meta.title}
        description={prepositionsData.meta.description}
      />

      <div className="space-y-4">
        {prepositionsData.sections.map((section, si) => (
          <SectionCard
            key={si}
            id={slugify(section.title)}
            highlighted={highlightId === slugify(section.title)}
            title={section.title}
            description={section.description}
          >
            {/* Mnemonic */}
            {section.mnemonic && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-3 text-sm">
                <span className="font-semibold text-amber-800">💡 {t('mnemonic')}:</span>{' '}
                <span className="text-amber-700">{section.mnemonic}</span>
              </div>
            )}

            {/* Preposition List */}
            <div className="space-y-2">
              {section.items.map((item, ii) => (
                <div
                  key={ii}
                  className={`border-l-4 ${caseColors[section.title] || 'border-l-gray-300'} bg-white rounded-r-lg border border-gray-100 p-3`}
                >
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-bold text-gray-900 text-lg">{item.german}</span>
                    <span className="text-gray-500 text-sm">— {item.english}</span>
                  </div>
                  <div className="mt-1.5 text-sm">
                    <span className="text-gray-700 italic">"{item.example}"</span>
                    <span className="text-gray-400 ml-2">({item.exampleEn})</span>
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
