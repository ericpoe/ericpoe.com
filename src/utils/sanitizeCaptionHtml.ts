function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isSafeHref(rawHref: string): boolean {
  const href = rawHref.trim();
  if (!href) return false;

  // Allow common safe URL forms used in captions.
  return /^(https?:|mailto:|\/|#)/i.test(href);
}

function sanitizeAnchorTag(anchorHtml: string): string {
  const hrefMatch = anchorHtml.match(/\bhref\s*=\s*(["'])(.*?)\1/i);
  const textMatch = anchorHtml.match(/>([\s\S]*?)<\/a\s*>/i);

  if (!hrefMatch || !textMatch) {
    return escapeHtml(anchorHtml);
  }

  const href = hrefMatch[2];
  const text = textMatch[1].replace(/<[^>]*>/g, '');

  if (!isSafeHref(href)) {
    return escapeHtml(text);
  }

  return `<a href="${escapeHtml(href)}" rel="noopener noreferrer">${escapeHtml(text)}</a>`;
}

export function sanitizeCaptionHtml(caption: string): string {
  if (!caption) return '';

  const anchors: string[] = [];
  const placeholderPrefix = '__CAPTION_ANCHOR__';

  const withoutUnsafeTags = caption
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
    .replace(/<a\b[\s\S]*?<\/a\s*>/gi, (match) => {
      const placeholder = `${placeholderPrefix}${anchors.length}__`;
      anchors.push(sanitizeAnchorTag(match));
      return placeholder;
    })
    .replace(/<[^>]+>/g, '');

  const escaped = escapeHtml(withoutUnsafeTags);

  return anchors.reduce((result, anchor, index) => result.replace(`${placeholderPrefix}${index}__`, anchor), escaped);
}
