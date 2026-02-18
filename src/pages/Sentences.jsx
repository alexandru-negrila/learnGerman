import { useLanguage } from '../hooks/useLanguage';
import { useHighlightSection } from '../hooks/useHighlightSection';
import { slugify } from '../utils/slugify';
import sentencesData from '../data/sentences.json';
import PageHeader from '../components/PageHeader';
import SectionCard from '../components/SectionCard';

export default function Sentences() {
  const { t } = useLanguage();
  const highlightId = useHighlightSection();

  return (
    <div>
      <PageHeader
        icon={sentencesData.meta.icon}
        title={sentencesData.meta.title}
        description={sentencesData.meta.description}
      />

      <div className="space-y-5">
        {sentencesData.sections.map((section, si) => (
          <SectionCard key={si} id={slugify(section.title)} highlighted={highlightId === slugify(section.title)} title={section.title} description={section.description}>
            {/* Sentence Patterns */}
            {section.patterns && (
              <div className="space-y-3 mb-4">
                {section.patterns.map((pattern, pi) => (
                  <div key={pi} className="bg-stone-50 rounded-xl p-4 border border-stone-100">
                    <p className="font-semibold text-stone-800 text-sm mb-2">{pattern.name}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {pattern.structure.map((part, i) => (
                        <span
                          key={i}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                            part === 'VERB' || part === 'VERB.' || part.includes('VERB')
                              ? 'bg-red-100 text-red-700 border border-red-200'
                              : part === 'Subject'
                              ? 'bg-blue-100 text-blue-700 border border-blue-200'
                              : 'bg-stone-100 text-stone-600 border border-stone-200'
                          }`}
                        >
                          {part}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm">
                      <span className="text-stone-600 italic">"{pattern.example}"</span>
                      <span className="text-xs text-stone-400 ml-2">({pattern.exampleEn})</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Rules */}
            {section.rules && !section.rules[0]?.word && (
              <div className="space-y-1.5 mb-4">
                {section.rules.map((rule, ri) => (
                  <div key={ri} className="flex gap-2.5 text-sm items-start">
                    <span className="text-brand-500 shrink-0 mt-0.5">→</span>
                    <span className="text-stone-600">{rule}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Negation rules */}
            {section.rules && section.rules[0]?.word && (
              <div className="space-y-3 mb-4">
                {section.rules.map((rule, ri) => (
                  <div key={ri} className="bg-stone-50 rounded-xl p-4 border border-stone-100">
                    <span className="font-bold text-red-600 text-lg">{rule.word}</span>
                    <span className="text-stone-500 text-sm ml-2">— {rule.usage}</span>
                    <div className="text-sm mt-2">
                      <span className="text-stone-600 italic">"{rule.example}"</span>
                      <span className="text-xs text-stone-400 ml-2">({rule.exampleEn})</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* nicht position rules */}
            {section.nichtPosition && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm">📍</span>
                  <p className="font-semibold text-amber-800 text-sm">Position of "nicht":</p>
                </div>
                {section.nichtPosition.map((pos, pi) => (
                  <p key={pi} className="text-sm text-amber-700 ml-5 flex items-start gap-1.5">
                    <span className="text-amber-400 shrink-0">•</span>
                    {pos}
                  </p>
                ))}
              </div>
            )}

            {/* Conjunctions table */}
            {section.conjunctions && (
              <div className="overflow-x-auto rounded-xl border border-stone-200 shadow-sm shadow-stone-900/[0.03]">
                <table className="w-full text-sm data-table">
                  <thead>
                    <tr className="bg-stone-50/80 border-b border-stone-200">
                      <th className="text-left px-4 py-2.5 font-semibold text-stone-600 text-xs uppercase tracking-wide">German</th>
                      <th className="text-left px-4 py-2.5 font-semibold text-stone-600 text-xs uppercase tracking-wide">{t('english')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.conjunctions.map((c, ci) => (
                      <tr key={ci} className={`border-b border-stone-100 last:border-b-0 ${ci % 2 === 0 ? 'bg-white' : 'bg-stone-50/40'} hover:bg-brand-50/40 transition-colors`}>
                        <td className="px-4 py-2.5 font-bold text-purple-700">{c.german}</td>
                        <td className="px-4 py-2.5 text-stone-600">{c.english}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Question words */}
            {section.questionWords && (
              <div className="overflow-x-auto rounded-xl border border-stone-200 shadow-sm shadow-stone-900/[0.03] mt-3">
                <table className="w-full text-sm data-table">
                  <thead>
                    <tr className="bg-stone-50/80 border-b border-stone-200">
                      <th className="text-left px-4 py-2.5 font-semibold text-stone-600 text-xs uppercase tracking-wide">German</th>
                      <th className="text-left px-4 py-2.5 font-semibold text-stone-600 text-xs uppercase tracking-wide">{t('english')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.questionWords.map((qw, qi) => (
                      <tr key={qi} className={`border-b border-stone-100 last:border-b-0 ${qi % 2 === 0 ? 'bg-white' : 'bg-stone-50/40'} hover:bg-brand-50/40 transition-colors`}>
                        <td className="px-4 py-2.5 font-bold text-brand-700">{qw.german}</td>
                        <td className="px-4 py-2.5 text-stone-600">{qw.english}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Connectors */}
            {section.connectors && (
              <div className="flex flex-wrap gap-2">
                {section.connectors.map((c, ci) => (
                  <div key={ci} className="bg-stone-50 rounded-xl px-4 py-2.5 border border-stone-100 hover:bg-stone-100 transition-colors">
                    <span className="font-bold text-stone-800">{c.german}</span>
                    <span className="text-stone-400 text-sm ml-1.5">= {c.english}</span>
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
