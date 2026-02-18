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
    'Genitiv Prepositions': 'border-l-emerald-400',
  };

  return (
    <div>
      <PageHeader
        icon={prepositionsData.meta.icon}
        title={prepositionsData.meta.title}
        description={prepositionsData.meta.description}
      />

      <div className="space-y-5">
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
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4 text-sm flex items-start gap-2">
                <span className="text-amber-500 shrink-0 mt-0.5">💡</span>
                <div>
                  <span className="font-semibold text-amber-800">{t('mnemonic')}:</span>{' '}
                  <span className="text-amber-700">{section.mnemonic}</span>
                </div>
              </div>
            )}

            {/* Preposition List */}
            <div className="space-y-2.5">
              {section.items.map((item, ii) => (
                <div
                  key={ii}
                  className={`border-l-4 ${caseColors[section.title] || 'border-l-stone-300'} bg-white rounded-r-xl border border-stone-100 p-4 hover:bg-stone-50/50 transition-colors`}
                >
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-bold text-stone-900 text-lg">{item.german}</span>
                    <span className="text-stone-400 text-sm">— {item.english}</span>
                  </div>
                  <div className="mt-2 text-sm flex items-start gap-1.5">
                    <span className="text-stone-300 shrink-0">"</span>
                    <span className="text-stone-600 italic">{item.example}</span>
                    <span className="text-stone-300 shrink-0">"</span>
                  </div>
                  <p className="text-xs text-stone-400 mt-0.5 ml-3">({item.exampleEn})</p>
                </div>
              ))}
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  );
}
