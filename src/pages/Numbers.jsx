import { useLanguage } from '../hooks/useLanguage';
import numbersData from '../data/numbers.json';
import PageHeader from '../components/PageHeader';
import SectionCard from '../components/SectionCard';

export default function Numbers() {
  const { t } = useLanguage();

  return (
    <div>
      <PageHeader
        icon={numbersData.meta.icon}
        title={numbersData.meta.title}
        description={numbersData.meta.description}
      />

      <div className="space-y-5">
        {numbersData.sections.map((section, si) => (
          <SectionCard key={si} title={section.title} description={section.description}>
            {/* Rule callout */}
            {section.rule && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4 text-sm flex items-start gap-2">
                <span className="text-amber-500 shrink-0 mt-0.5">💡</span>
                <div>
                  <span className="font-semibold text-amber-800">{t('rule')}:</span>{' '}
                  <span className="text-amber-700">{section.rule}</span>
                </div>
              </div>
            )}

            {/* Usage note */}
            {section.usage && (
              <div className="bg-brand-50 border border-brand-200 rounded-xl px-4 py-3 mb-4 text-sm flex items-start gap-2">
                <span className="text-brand-500 shrink-0 mt-0.5">📝</span>
                <div>
                  <span className="font-semibold text-brand-800">{t('tip')}:</span>{' '}
                  <span className="text-brand-700">{section.usage}</span>
                </div>
              </div>
            )}

            {/* Items grid/table */}
            {section.items && section.items[0]?.number !== undefined && (
              <div className="overflow-x-auto rounded-xl border border-stone-200 shadow-sm shadow-stone-900/[0.03]">
                <table className="w-full text-sm data-table">
                  <thead>
                    <tr className="bg-stone-50/80 border-b border-stone-200">
                      <th className="text-left px-4 py-2.5 font-semibold text-stone-600 text-xs uppercase tracking-wide w-20">#</th>
                      <th className="text-left px-4 py-2.5 font-semibold text-stone-600 text-xs uppercase tracking-wide">German</th>
                      {section.items[0]?.note !== undefined && (
                        <th className="text-left px-4 py-2.5 font-semibold text-stone-600 text-xs uppercase tracking-wide">{t('note')}</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {section.items.map((item, ii) => (
                      <tr key={ii} className={`border-b border-stone-100 last:border-b-0 ${ii % 2 === 0 ? 'bg-white' : 'bg-stone-50/40'} hover:bg-brand-50/40 transition-colors`}>
                        <td className="px-4 py-2 text-stone-400 font-mono text-xs">
                          {typeof item.number === 'number' ? item.number : item.number}
                        </td>
                        <td className="px-4 py-2 font-medium text-stone-800">{item.german}</td>
                        {section.items[0]?.note !== undefined && (
                          <td className="px-4 py-2 text-stone-400 text-xs">{item.note || ''}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Days/Months/Seasons (items with english) */}
            {section.items && section.items[0]?.english && !section.items[0]?.number && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {section.items.map((item, ii) => (
                  <div key={ii} className="bg-stone-50 rounded-xl px-4 py-3 border border-stone-100 hover:bg-stone-100 transition-colors">
                    <p className="font-semibold text-stone-800">{item.german}</p>
                    <p className="text-xs text-stone-500 mt-0.5">{item.english}</p>
                    {item.short && (
                      <span className="text-[10px] text-stone-400">({item.short})</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        ))}
      </div>
    </div>
  );
}
