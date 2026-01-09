/**
 * Extracts a plain-text summary from markdown/MDX content.
 * Strips imports, JSX components, markdown syntax, and HTML tags.
 */
export function summarize(body: string, wordLimit = 60): string {
  const clean = body
    .replace(/^import .*$/gm, '')
    .replace(/<Figure[\s\S]*?\/>/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/[`#*>_-]/g, '')
    .replace(/<\/?[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const words = clean.split(' ').slice(0, wordLimit).join(' ');
  return clean.length > words.length ? `${words}…` : words;
}
