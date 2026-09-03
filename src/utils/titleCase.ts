const lowerWords = new Set([
  'a',
  'an',
  'the',
  'and',
  'but',
  'for',
  'nor',
  'or',
  'so',
  'yet',
  'as',
  'at',
  'by',
  'in',
  'of',
  'on',
  'per',
  'to',
  'via',
  'with',
  'without',
  'about',
  'above',
  'across',
  'after',
  'against',
  'along',
  'amid',
  'among',
  'around',
  'before',
  'behind',
  'below',
  'beneath',
  'beside',
  'besides',
  'between',
  'beyond',
  'concerning',
  'despite',
  'down',
  'during',
  'except',
  'inside',
  'into',
  'near',
  'off',
  'onto',
  'outside',
  'over',
  'past',
  'regarding',
  'since',
  'through',
  'throughout',
  'toward',
  'towards',
  'under',
  'underneath',
  'until',
  'up',
  'upon',
  'within',
  'without',
  'vs',
]);

// Canonical casing for tokens that don't follow simple title-case rules. Keyed by
// the lowercased word; the value is applied verbatim regardless of position.
// Extend as needed.
const canonicalCase = new Map<string, string>([
  ['javascript', 'JavaScript'],
  ['typescript', 'TypeScript'],
  ['node.js', 'Node.js'],
  ['nodejs', 'Node.js'],
  ['ios', 'iOS'],
  ['ipados', 'iPadOS'],
  ['macos', 'macOS'],
  ['iphone', 'iPhone'],
  ['ipad', 'iPad'],
  ['github', 'GitHub'],
  ['gitlab', 'GitLab'],
  ['graphql', 'GraphQL'],
  ['postgresql', 'PostgreSQL'],
  ['mysql', 'MySQL'],
  ['nosql', 'NoSQL'],
  ['wordpress', 'WordPress'],
  ['linkedin', 'LinkedIn'],
  ['devops', 'DevOps'],
  ['openai', 'OpenAI'],
  ['chatgpt', 'ChatGPT'],
]);

const isAcronym = (word: string) => word.length > 1 && word === word.toUpperCase() && /[A-Z]/.test(word);

const capitalize = (word: string) => {
  const canonical = canonicalCase.get(word.toLowerCase());
  if (canonical) return canonical;
  if (isAcronym(word)) return word;
  // Preserve intentional inner capitalization (e.g. "JavaScript") instead of flattening it.
  return word ? word[0].toUpperCase() + word.slice(1) : word;
};

const formatHyphenated = (segment: string, forceCap: boolean) =>
  segment
    .split('-')
    .map((part) => {
      const canonical = canonicalCase.get(part.toLowerCase());
      if (canonical) return canonical;
      if (isAcronym(part)) return part;
      const lower = part.toLowerCase();
      if (!forceCap && lowerWords.has(lower)) {
        return lower;
      }
      return capitalize(part);
    })
    .join('-');

export const formatTitleMla = (title: string) =>
  title
    .split(/\s+/)
    .map((word, index, arr) => {
      const isFirst = index === 0;
      const isLast = index === arr.length - 1;
      const leading = word.match(/^[^A-Za-z0-9]*/)?.[0] ?? '';
      const trailing = word.match(/[^A-Za-z0-9]*$/)?.[0] ?? '';
      const core = word.slice(leading.length, word.length - trailing.length);
      if (!core) return word;

      const lowerCore = core.toLowerCase();
      const shouldCapitalize = isFirst || isLast || !lowerWords.has(lowerCore);
      const formattedCore = formatHyphenated(core, shouldCapitalize);
      return `${leading}${formattedCore}${trailing}`;
    })
    .join(' ');
