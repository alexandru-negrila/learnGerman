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

      <div className="space-y-4">
        {numbersData.sections.map((section, si) => (
          <SectionCard key={si} title={section.title} description={section.description}>
            {/* Rule callout */}
            {section.rule && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-3 text-sm">
                <span className="font-semibold text-amber-800">💡 {t('rule')}:</span>{' '}
                <span className="text-amber-700">{section.rule}</span>
              </div>
            )}

            {/* Usage note */}
            {section.usage && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 mb-3 text-sm">
                <span className="font-semibold text-blue-800">📝 {t('tip')}:</span>{' '}
                <span className="text-blue-700">{section.usage}</span>
              </div>
            )}

            {/* Items grid/table */}
            {section.items && section.items[0]?.number !== undefined && (
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-3 py-2 font-semibold text-gray-700 w-20">#</th>
                      <th className="text-left px-3 py-2 font-semibold text-gray-700">German</th>
                      {section.items[0]?.note !== undefined && (
                        <th className="text-left px-3 py-2 font-semibold text-gray-700">{t('note')}</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {section.items.map((item, ii) => (
                      <tr key={ii} className={`border-b border-gray-50 ${ii % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                        <td className="px-3 py-1.5 text-gray-500 font-mono text-xs">
                          {typeof item.number === 'number' ? item.number : item.number}
                        </td>
                        <td className="px-3 py-1.5 font-medium text-gray-800">{item.german}</td>
                        {section.items[0]?.note !== undefined && (
                          <td className="px-3 py-1.5 text-gray-400 text-xs">{item.note || ''}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Days/Months/Seasons (items with english) */}
            {section.items && section.items[0]?.english && !section.items[0]?.number && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {section.items.map((item, ii) => (
                  <div key={ii} className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                    <p className="font-medium text-gray-900">{item.german}</p>
                    <p className="text-xs text-gray-500">{item.english}</p>
                    {item.short && (
                      <span className="text-xs text-gray-400">({item.short})</span>
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
