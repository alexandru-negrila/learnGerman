import verbsData from './verbs.json';
import prepData from './prepositions.json';
import sentencesData from './sentences.json';
import articlesData from './articles.json';
import pronounsData from './pronouns.json';
import { slugify } from '../utils/slugify';

const verbEntries = verbsData.sections.flatMap(section =>
  section.verbs.map(verb => ({
    id: `verb-${verb.infinitive}`,
    german: verb.infinitive,
    english: verb.english,
    category: 'verb',
    categoryLabel: section.title.split('(')[0].trim(),
    example: `Ich ${verb.conjugations['Präsens'][0]}`,
    exampleEn: null,
    link: '/verbs',
    sectionId: slugify(section.title),
    isVerb: true,
  }))
);

const prepEntries = prepData.sections.flatMap(section =>
  section.items.map(item => ({
    id: `prep-${item.german}`,
    german: item.german,
    english: item.english,
    category: 'preposition',
    categoryLabel: section.title.split('(')[0].trim(),
    example: item.example,
    exampleEn: item.exampleEn,
    link: '/prepositions',
    sectionId: slugify(section.title),
    isVerb: false,
  }))
);

const subordinatePatterns = sentencesData.sections[1].patterns || [];

const conjunctionEntries = sentencesData.sections[1].conjunctions.map(conj => {
  const pattern = subordinatePatterns.find(p =>
    p.name.toLowerCase().includes(conj.german.toLowerCase())
  );
  return {
    id: `conj-${conj.german}`,
    german: conj.german,
    english: conj.english,
    category: 'conjunction',
    categoryLabel: 'Subordinate Conjunction',
    example: pattern?.example || null,
    exampleEn: pattern?.exampleEn || null,
    link: '/sentences',
    sectionId: slugify(sentencesData.sections[1].title),
    isVerb: false,
  };
});

const questionWordEntries = sentencesData.sections[2].questionWords.map(qw => ({
  id: `qw-${qw.german}`,
  german: qw.german,
  english: qw.english,
  category: 'question',
  categoryLabel: 'Question Word',
  example: null,
  exampleEn: null,
  link: '/sentences',
  sectionId: slugify(sentencesData.sections[2].title),
  isVerb: false,
}));

const connectorEntries = sentencesData.sections[4].connectors.map(conn => ({
  id: `conn-${conn.german}`,
  german: conn.german,
  english: conn.english,
  category: 'connector',
  categoryLabel: 'Coordinating Conjunction',
  example: null,
  exampleEn: null,
  link: '/sentences',
  sectionId: slugify(sentencesData.sections[4].title),
  isVerb: false,
}));

const negationEntries = sentencesData.sections[3].rules
  .filter(rule => rule.word)
  .map(rule => ({
    id: `neg-${rule.word}`,
    german: rule.word,
    english: rule.usage,
    category: 'negation',
    categoryLabel: 'Negation',
    example: rule.example,
    exampleEn: rule.exampleEn,
    link: '/sentences',
    sectionId: slugify(sentencesData.sections[3].title),
    isVerb: false,
  }));

const articleEntries = [];

['der', 'die', 'das'].forEach(art => {
  articleEntries.push({
    id: `art-def-${art}`,
    german: art,
    english: `the (${art === 'der' ? 'masculine' : art === 'die' ? 'feminine/plural' : 'neuter'})`,
    category: 'article',
    categoryLabel: 'Definite Article',
    example: null,
    exampleEn: null,
    link: '/articles',
    sectionId: slugify(articlesData.sections[0].title),
    isVerb: false,
  });
});

['ein', 'eine'].forEach(art => {
  articleEntries.push({
    id: `art-indef-${art}`,
    german: art,
    english: `a/an (${art === 'ein' ? 'masculine/neuter' : 'feminine'})`,
    category: 'article',
    categoryLabel: 'Indefinite Article',
    example: null,
    exampleEn: null,
    link: '/articles',
    sectionId: slugify(articlesData.sections[1].title),
    isVerb: false,
  });
});

const seenPossessives = new Set();
articlesData.sections[2].rows.forEach(row => {
  const possessive = row.cells[0];
  const englishMeaning = row.cells[1];
  const key = possessive.toLowerCase();
  if (!seenPossessives.has(key)) {
    seenPossessives.add(key);
    articleEntries.push({
      id: `art-poss-${key}`,
      german: possessive,
      english: englishMeaning,
      category: 'article',
      categoryLabel: 'Possessive Article',
      example: null,
      exampleEn: null,
      link: '/articles',
      sectionId: slugify(articlesData.sections[2].title),
      isVerb: false,
    });
  }
});

// Personal pronouns — all case forms searchable (e.g. searching "ihn" matches "er")
const personalPronounEntries = pronounsData.sections[0].rows.map(row => {
  const english = row.label.match(/\((.+)\)/)?.[1] || row.label;
  const uniqueForms = [...new Set(row.cells)];
  const nominative = row.cells[0].toLowerCase().replace(/\//g, '-');
  return {
    id: `pron-pers-${nominative}`,
    german: uniqueForms.join(' / '),
    english,
    category: 'pronoun',
    categoryLabel: 'Personal Pronoun',
    example: null,
    exampleEn: null,
    link: '/pronouns',
    sectionId: slugify(pronounsData.sections[0].title),
    isVerb: false,
  };
});

// Reflexive pronouns
const reflexivePronounEntries = pronounsData.sections[2].rows.map(row => {
  const uniqueForms = [...new Set(row.cells)];
  return {
    id: `pron-refl-${row.label.toLowerCase().replace(/[^a-z]+/g, '-')}`,
    german: uniqueForms.join(' / '),
    english: `${row.label} — reflexive`,
    category: 'pronoun',
    categoryLabel: 'Reflexive Pronoun',
    example: null,
    exampleEn: null,
    link: '/pronouns',
    sectionId: slugify(pronounsData.sections[2].title),
    isVerb: false,
  };
});

// Interrogative pronouns — wer/wen/wem/wessen, was
const interrogativePronounEntries = pronounsData.sections[4].rows.map(row => {
  const english = row.label.match(/\((.+)\)/)?.[1] || row.label;
  const uniqueForms = [...new Set(row.cells.filter(c => c !== '—'))];
  const base = row.cells[0].toLowerCase();
  return {
    id: `pron-inter-${base}`,
    german: uniqueForms.join(' / '),
    english,
    category: 'pronoun',
    categoryLabel: 'Interrogative Pronoun',
    example: null,
    exampleEn: null,
    link: '/pronouns',
    sectionId: slugify(pronounsData.sections[4].title),
    isVerb: false,
  };
});

const pronounEntries = [
  ...personalPronounEntries,
  ...reflexivePronounEntries,
  ...interrogativePronounEntries,
];

export const searchEntries = [
  ...verbEntries,
  ...prepEntries,
  ...conjunctionEntries,
  ...questionWordEntries,
  ...connectorEntries,
  ...negationEntries,
  ...articleEntries,
  ...pronounEntries,
];

// Normalize umlauts so "koenen"/"konen" matches "können", etc.
function normalize(str) {
  return str
    .toLowerCase()
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/ß/g, 'ss');
}

function normalizeQuery(str) {
  return str
    .toLowerCase()
    .replace(/ae/g, 'a')
    .replace(/oe/g, 'o')
    .replace(/ue/g, 'u')
    .replace(/ss/g, 'ss')
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/ß/g, 'ss');
}

export function filterEntries(query) {
  if (!query || query.trim().length === 0) return [];
  const q = query.toLowerCase().trim();
  const qNorm = normalizeQuery(q);
  return searchEntries.filter(entry => {
    const german = entry.german.toLowerCase();
    const english = entry.english.toLowerCase();
    // Exact substring match first
    if (german.includes(q) || english.includes(q)) return true;
    // Normalized match (umlauts: ö=oe=o, ü=ue=u, ä=ae=a, ß=ss)
    return normalize(german).includes(qNorm) || normalize(english).includes(qNorm);
  });
}
