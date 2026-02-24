/**
 * Shared cleanup for markdown/MDX snippets used in summaries.
 */
function stripSummaryMarkup(body: string): string {
  return body
    .replace(/^import .*$/gm, '')
    .replace(/<Figure[\s\S]*?\/>/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/^>\s*/gm, '')
    .replace(/[_*]{1,2}([^*_]+)[*_]{1,2}/g, '$1')
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function truncateWords(text: string, wordLimit: number): string {
  const words = text.split(' ').slice(0, wordLimit).join(' ');
  return text.length > words.length ? `${words}…` : words;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function balanceCodeTags(text: string): string {
  const opens = (text.match(/<code>/g) || []).length;
  const closes = (text.match(/<\/code>/g) || []).length;
  return opens > closes ? `${text}${'</code>'.repeat(opens - closes)}` : text;
}

/**
 * Extracts a plain-text summary from markdown/MDX content.
 * Strips imports, JSX components, markdown syntax, and HTML tags.
 */
export function summarize(body: string, wordLimit = 60): string {
  const clean = stripSummaryMarkup(body)
    .replace(/[`#]/g, '')
    .replace(/<\/?[^>]+>/g, '');

  return truncateWords(clean, wordLimit);
}

/**
 * Extracts an HTML summary that preserves inline <code> formatting.
 * Intended for trusted content rendered with Astro's set:html in post lists.
 */
export function summarizeHtml(body: string, wordLimit = 60): string {
  const codeReplaced = body.replace(/```[\s\S]*?```/g, (match) => {
    const code = match.replace(/```/g, '').trim();
    return `<code>${escapeHtml(code)}</code>`;
  });

  const clean = stripSummaryMarkup(codeReplaced)
    .replace(/`([^`]+)`/g, (_m, code) => `<code>${escapeHtml(code)}</code>`)
    .replace(/<(?!\/?code\b)[^>]+>/g, '');

  return balanceCodeTags(truncateWords(clean, wordLimit));
}
