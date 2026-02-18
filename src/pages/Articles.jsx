import { useLanguage } from '../hooks/useLanguage';
import { useHighlightSection } from '../hooks/useHighlightSection';
import { slugify } from '../utils/slugify';
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
  const highlightId = useHighlightSection();

  return (
    <div>
      <PageHeader
        icon={articlesData.meta.icon}
        title={articlesData.meta.title}
        description={articlesData.meta.description}
      />

      <div className="space-y-5">
        {articlesData.sections.map((section, i) => {
          // Table sections (with headers/rows)
          if (section.headers && section.rows) {
            return (
              <SectionCard key={i} id={slugify(section.title)} highlighted={highlightId === slugify(section.title)} title={section.title} description={section.description}>
                <DataTable headers={section.headers} rows={section.rows} highlightFirst />
              </SectionCard>
            );
          }

          // Case rules section
          if (section.rules && section.rules[0]?.case) {
            return (
              <SectionCard key={i} id={slugify(section.title)} highlighted={highlightId === slugify(section.title)} title={section.title} description={section.description}>
                <div className="space-y-3">
                  {section.rules.map((rule, ri) => (
                    <div key={ri} className="bg-stone-50 rounded-xl p-4 border border-stone-100">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="font-bold text-stone-900">{rule.case}</span>
                        <span className="text-sm text-brand-600 font-medium bg-brand-50 px-2 py-0.5 rounded-full">{rule.question}</span>
                      </div>
                      <p className="text-sm text-stone-600 mt-1.5">{rule.usage}</p>
                      <div className="mt-2 text-sm">
                        <span className="text-stone-600 italic">"{rule.example}"</span>
                        <span className="text-xs text-stone-400 ml-2">({rule.exampleEn})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            );
          }

          // Gender tips section
          if (section.genderTips) {
            return (
              <SectionCard key={i} id={slugify(section.title)} highlighted={highlightId === slugify(section.title)} title={section.title} description={section.description}>
                <div className="space-y-3">
                  {section.genderTips.map((tip, ti) => (
                    <div key={ti} className={`rounded-xl border p-4 ${genderColors[tip.color]}`}>
                      <h4 className="font-bold mb-2">{tip.gender}</h4>
                      <div className="text-sm space-y-1.5">
                        <div>
                          <span className="font-medium">Endings: </span>
                          <span className="font-mono text-xs">{tip.endings.join(', ')}</span>
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
