import { escapeHtml } from './escapeHtml';

/**
 * Shared cleanup for markdown/MDX snippets used in summaries.
 */
function stripSummaryMarkup(body: string): string {
  return (
    body
      .replace(/^import .*$/gm, '')
      .replace(/<Figure[\s\S]*?\/>/g, '')
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .replace(/^>\s*/gm, '')
      .replace(/\*{1,2}([^*]+)\*{1,2}/g, '$1')
      // Underscore emphasis only counts at word boundaries, so this leaves
      // snake_case tokens (e.g. featuredImage_Url) intact.
      .replace(/(?<![A-Za-z0-9])_{1,2}([^_]+)_{1,2}(?![A-Za-z0-9])/g, '$1')
      .replace(/^#{1,6}\s*/gm, '')
      .replace(/\s+/g, ' ')
      .trim()
  );
}

function truncateWords(text: string, wordLimit: number): string {
  const words = text.split(' ').slice(0, wordLimit).join(' ');
  return text.length > words.length ? `${words}…` : words;
}

function balanceCodeTags(text: string): string {
  const opens = (text.match(/<code>/g) || []).length;
  const closes = (text.match(/<\/code>/g) || []).length;
  return opens > closes ? `${text}${'</code>'.repeat(opens - closes)}` : text;
}

// A single build summarizes the same post body many times (home page, /blog,
// every pagination page, each of the post's tag/category pages, RSS). The work
// is pure, so cache it per (mode, wordLimit, body) for the life of the process.
const summaryCache = new Map<string, string>();

function memoizedSummary(mode: string, body: string, wordLimit: number, compute: () => string): string {
  const key = `${mode}:${wordLimit}:${body}`;
  let cached = summaryCache.get(key);
  if (cached === undefined) {
    cached = compute();
    summaryCache.set(key, cached);
  }
  return cached;
}

/**
 * Extracts a plain-text summary from markdown/MDX content.
 * Strips imports, JSX components, markdown syntax, and HTML tags.
 */
export function summarize(body: string, wordLimit = 60): string {
  return memoizedSummary('text', body, wordLimit, () => {
    const clean = stripSummaryMarkup(body)
      .replace(/[`#]/g, '')
      .replace(/<\/?[^>]+>/g, '');

    return truncateWords(clean, wordLimit);
  });
}

/**
 * Extracts an HTML summary that preserves inline <code> formatting.
 * Intended for trusted content rendered with Astro's set:html in post lists.
 */
export function summarizeHtml(body: string, wordLimit = 60): string {
  return memoizedSummary('html', body, wordLimit, () => computeSummarizeHtml(body, wordLimit));
}

function computeSummarizeHtml(body: string, wordLimit: number): string {
  const codeReplaced = body.replace(/```[\s\S]*?```/g, (match) => {
    const code = match.replace(/```/g, '').trim();
    return `<code>${escapeHtml(code)}</code>`;
  });

  const clean = stripSummaryMarkup(codeReplaced)
    .replace(/`([^`]+)`/g, (_m, code) => `<code>${escapeHtml(code)}</code>`)
    .replace(/<(?!\/?code\b)[^>]+>/g, '');

  return balanceCodeTags(truncateWords(clean, wordLimit));
}
