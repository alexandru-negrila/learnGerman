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

      <div className="space-y-4">
        {sentencesData.sections.map((section, si) => (
          <SectionCard key={si} id={slugify(section.title)} highlighted={highlightId === slugify(section.title)} title={section.title} description={section.description}>
            {/* Sentence Patterns */}
            {section.patterns && (
              <div className="space-y-3 mb-3">
                {section.patterns.map((pattern, pi) => (
                  <div key={pi} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <p className="font-medium text-gray-800 text-sm mb-1">{pattern.name}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {pattern.structure.map((part, i) => (
                        <span
                          key={i}
                          className={`px-2 py-0.5 rounded text-xs font-medium ${
                            part === 'VERB' || part === 'VERB.' || part.includes('VERB')
                              ? 'bg-red-100 text-red-700 border border-red-200'
                              : part === 'Subject'
                              ? 'bg-blue-100 text-blue-700 border border-blue-200'
                              : 'bg-gray-100 text-gray-600 border border-gray-200'
                          }`}
                        >
                          {part}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm italic text-gray-700">"{pattern.example}"</p>
                    <p className="text-xs text-gray-400">({pattern.exampleEn})</p>
                  </div>
                ))}
              </div>
            )}

            {/* Rules */}
            {section.rules && !section.rules[0]?.word && (
              <div className="space-y-1 mb-3">
                {section.rules.map((rule, ri) => (
                  <div key={ri} className="flex gap-2 text-sm">
                    <span className="text-blue-500 shrink-0 mt-0.5">→</span>
                    <span className="text-gray-700">{rule}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Negation rules */}
            {section.rules && section.rules[0]?.word && (
              <div className="space-y-2 mb-3">
                {section.rules.map((rule, ri) => (
                  <div key={ri} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <span className="font-bold text-red-600 text-lg">{rule.word}</span>
                    <span className="text-gray-600 text-sm ml-2">— {rule.usage}</span>
                    <p className="text-sm mt-1 italic text-gray-700">"{rule.example}"</p>
                    <p className="text-xs text-gray-400">({rule.exampleEn})</p>
                  </div>
                ))}
              </div>
            )}

            {/* nicht position rules */}
            {section.nichtPosition && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-2">
                <p className="font-medium text-amber-800 text-sm mb-1">📍 Position of "nicht":</p>
                {section.nichtPosition.map((pos, pi) => (
                  <p key={pi} className="text-sm text-amber-700 ml-2">• {pos}</p>
                ))}
              </div>
            )}

            {/* Conjunctions table */}
            {section.conjunctions && (
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-3 py-2 font-semibold text-gray-700">German</th>
                      <th className="text-left px-3 py-2 font-semibold text-gray-700">{t('english')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.conjunctions.map((c, ci) => (
                      <tr key={ci} className={`border-b border-gray-50 ${ci % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                        <td className="px-3 py-2 font-bold text-purple-700">{c.german}</td>
                        <td className="px-3 py-2 text-gray-600">{c.english}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Question words */}
            {section.questionWords && (
              <div className="overflow-x-auto rounded-lg border border-gray-200 mt-3">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-3 py-2 font-semibold text-gray-700">German</th>
                      <th className="text-left px-3 py-2 font-semibold text-gray-700">{t('english')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.questionWords.map((qw, qi) => (
                      <tr key={qi} className={`border-b border-gray-50 ${qi % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                        <td className="px-3 py-2 font-bold text-blue-700">{qw.german}</td>
                        <td className="px-3 py-2 text-gray-600">{qw.english}</td>
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
                  <div key={ci} className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                    <span className="font-bold text-gray-800">{c.german}</span>
                    <span className="text-gray-500 text-sm ml-1">= {c.english}</span>
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
