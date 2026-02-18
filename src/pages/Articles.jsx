import { useLanguage } from '../hooks/useLanguage';
import articlesData from '../data/articles.json';
import PageHeader from '../components/PageHeader';
import SectionCard from '../components/SectionCard';
import DataTable from '../components/DataTable';

const genderColors = {
  blue: 'bg-blue-50 border-blue-200 text-blue-800',
  red: 'bg-red-50 border-red-200 text-red-800',
  green: 'bg-green-50 border-green-200 text-green-800',
};

export default function Articles() {
  const { t } = useLanguage();

  return (
    <div>
      <PageHeader
        icon={articlesData.meta.icon}
        title={articlesData.meta.title}
        description={articlesData.meta.description}
      />

      <div className="space-y-4">
        {articlesData.sections.map((section, i) => {
          // Table sections (with headers/rows)
          if (section.headers && section.rows) {
            return (
              <SectionCard key={i} title={section.title} description={section.description}>
                <DataTable headers={section.headers} rows={section.rows} highlightFirst />
              </SectionCard>
            );
          }

          // Case rules section
          if (section.rules && section.rules[0]?.case) {
            return (
              <SectionCard key={i} title={section.title} description={section.description}>
                <div className="space-y-2">
                  {section.rules.map((rule, ri) => (
                    <div key={ri} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="font-bold text-gray-900">{rule.case}</span>
                        <span className="text-sm text-blue-600 font-medium">{rule.question}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{rule.usage}</p>
                      <p className="text-sm mt-1.5 italic text-gray-700">"{rule.example}"</p>
                      <p className="text-xs text-gray-400">({rule.exampleEn})</p>
                    </div>
                  ))}
                </div>
              </SectionCard>
            );
          }

          // Gender tips section
          if (section.genderTips) {
            return (
              <SectionCard key={i} title={section.title} description={section.description}>
                <div className="space-y-3">
                  {section.genderTips.map((tip, ti) => (
                    <div key={ti} className={`rounded-lg border p-3 ${genderColors[tip.color]}`}>
                      <h4 className="font-bold mb-2">{tip.gender}</h4>
                      <div className="text-sm space-y-1">
                        <div>
                          <span className="font-medium">Endings: </span>
                          {tip.endings.join(', ')}
                        </div>
                        <div>
                          <span className="font-medium">Categories: </span>
                          {tip.categories.join(', ')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
