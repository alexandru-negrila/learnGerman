import { useLanguage } from '../hooks/useLanguage';
import { useHighlightSection } from '../hooks/useHighlightSection';
import { slugify } from '../utils/slugify';
import prepositionsData from '../data/prepositions.json';
import PageHeader from '../components/PageHeader';
import SectionCard from '../components/SectionCard';
import DataTable from '../components/DataTable';

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

            {/* Case Rule (Wo? vs Wohin?) */}
            {section.caseRule && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="font-bold text-red-700 text-lg">{section.caseRule.akkusativ.question}</div>
                  <div className="text-sm text-red-600">{section.caseRule.akkusativ.meaning}</div>
                  <div className="mt-2 text-sm font-medium text-red-800">
                    → {section.caseRule.akkusativ.concept} → Akkusativ
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="font-bold text-blue-700 text-lg">{section.caseRule.dativ.question}</div>
                  <div className="text-sm text-blue-600">{section.caseRule.dativ.meaning}</div>
                  <div className="mt-2 text-sm font-medium text-blue-800">
                    → {section.caseRule.dativ.concept} → Dativ
                  </div>
                </div>
              </div>
            )}

            {/* Article Table */}
            {section.articleTable && (
              <div className="mb-4">
                <DataTable
                  headers={section.articleTable.headers}
                  rows={section.articleTable.rows}
                  highlightFirst
                />
              </div>
            )}

            {/* Paired Examples (Dativ vs Akkusativ) */}
            {section.pairedExamples && (
              <div className="mb-4 rounded-xl border border-stone-200 overflow-hidden shadow-sm shadow-stone-900/[0.03]">
                <div className="grid grid-cols-2">
                  <div className="bg-blue-50 px-4 py-2.5 border-b border-r border-stone-200">
                    <span className="font-semibold text-blue-700 text-sm">{t('location')} (Wo?)</span>
                  </div>
                  <div className="bg-red-50 px-4 py-2.5 border-b border-stone-200">
                    <span className="font-semibold text-red-700 text-sm">{t('movement')} (Wohin?)</span>
                  </div>
                  {section.pairedExamples.map((pair, pi) => (
                    <div key={pi} className="contents">
                      <div className={`px-4 py-2.5 border-r border-stone-100 ${pi % 2 === 0 ? 'bg-white' : 'bg-stone-50/40'} ${pi < section.pairedExamples.length - 1 ? 'border-b border-stone-100' : ''}`}>
                        <span className="font-medium text-blue-800 text-sm">{pair.dativ.example}</span>
                        <span className="text-xs text-stone-400 ml-1.5">({pair.dativ.exampleEn})</span>
                      </div>
                      <div className={`px-4 py-2.5 ${pi % 2 === 0 ? 'bg-white' : 'bg-stone-50/40'} ${pi < section.pairedExamples.length - 1 ? 'border-b border-stone-100' : ''}`}>
                        <span className="font-medium text-red-800 text-sm">{pair.akkusativ.example}</span>
                        <span className="text-xs text-stone-400 ml-1.5">({pair.akkusativ.exampleEn})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contractions Note */}
            {section.contractions && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4 text-sm">
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-amber-500 shrink-0 mt-0.5">⚠️</span>
                  <span className="font-semibold text-amber-800">{t('note')}: Common Contractions</span>
                </div>
                <div className="flex flex-wrap gap-2 ml-6">
                  {section.contractions.map((c, ci) => (
                    <span key={ci} className="bg-white border border-amber-200 rounded-lg px-3 py-1.5 text-amber-800 font-mono text-xs">
                      {c.full} = <strong>{c.contracted}</strong>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Verb Pairs (Wohin/Wo verbs) */}
            {section.verbPairs && (
              <div className="mb-4 space-y-4">
                <h4 className="font-semibold text-stone-700 text-sm">🎯 Verb Pairs — {section.verbPairs.description}</h4>

                {/* Verb pair table */}
                <div className="rounded-xl border border-stone-200 overflow-hidden shadow-sm shadow-stone-900/[0.03]">
                  <div className="grid grid-cols-2">
                    <div className="bg-red-50 px-4 py-2.5 border-b border-r border-stone-200">
                      <span className="font-semibold text-red-700 text-sm">Wohin? (Akk)</span>
                    </div>
                    <div className="bg-blue-50 px-4 py-2.5 border-b border-stone-200">
                      <span className="font-semibold text-blue-700 text-sm">Wo? (Dat)</span>
                    </div>
                    {section.verbPairs.pairs.map((pair, pi) => (
                      <div key={pi} className="contents">
                        <div className={`px-4 py-2.5 border-r border-stone-100 ${pi % 2 === 0 ? 'bg-white' : 'bg-stone-50/40'} ${pi < section.verbPairs.pairs.length - 1 ? 'border-b border-stone-100' : ''}`}>
                          <span className="font-bold text-red-800 text-sm">{pair.wohin}</span>
                          <span className="text-xs text-stone-400 ml-1.5">({pair.wohinEn})</span>
                        </div>
                        <div className={`px-4 py-2.5 ${pi % 2 === 0 ? 'bg-white' : 'bg-stone-50/40'} ${pi < section.verbPairs.pairs.length - 1 ? 'border-b border-stone-100' : ''}`}>
                          <span className="font-bold text-blue-800 text-sm">{pair.wo}</span>
                          <span className="text-xs text-stone-400 ml-1.5">({pair.woEn})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Wo-only verbs */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h5 className="font-semibold text-blue-800 text-sm mb-2">Wo?-only Verbs (static — no Wohin pair!)</h5>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {section.verbPairs.woOnlyVerbs.map((v, vi) => (
                      <span key={vi} className="bg-white border border-blue-200 rounded-lg px-3 py-1.5 text-sm">
                        <span className="font-bold text-blue-800">{v.german}</span>
                        <span className="text-stone-400 ml-1 text-xs">— {v.english}</span>
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-blue-600 flex items-start gap-1.5">
                    <span className="shrink-0">⚠️</span>
                    {section.verbPairs.woOnlyNote}
                  </p>
                </div>
              </div>
            )}

            {/* Dialogues */}
            {section.dialogues && (
              <div className="mb-4 space-y-4">
                <h4 className="font-semibold text-stone-700 text-sm">🎮 Dialogues with Verb Pairs</h4>
                {section.dialogues.map((group, gi) => (
                  <div key={gi} className={`rounded-xl border ${group.isWoOnly ? 'border-blue-200' : 'border-stone-200'} overflow-hidden`}>
                    <div className={`px-4 py-2.5 font-semibold text-sm ${group.isWoOnly ? 'bg-blue-50 text-blue-800' : 'bg-stone-50 text-stone-700'} border-b ${group.isWoOnly ? 'border-blue-200' : 'border-stone-200'}`}>
                      {group.verbPair}
                    </div>
                    <div className="divide-y divide-stone-100">
                      {group.exchanges.map((exchange, ei) => (
                        <div key={ei} className="p-4">
                          <div className="font-medium text-stone-700 text-sm mb-2">
                            {exchange.icon} {exchange.object}
                          </div>
                          <div className="space-y-1">
                            {exchange.lines.map((line, li) => (
                              <div key={li} className="text-sm flex gap-2">
                                <span className={`font-bold shrink-0 ${line.speaker === 'A' ? 'text-brand-600' : 'text-purple-600'}`}>
                                  {line.speaker}:
                                </span>
                                <span className="text-stone-700">{line.text}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
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
