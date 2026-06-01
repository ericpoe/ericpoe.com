import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const blogContentDir = join(process.cwd(), 'src/content/blog');

const standardHtmlTags = new Set([
  'a',
  'abbr',
  'address',
  'area',
  'article',
  'aside',
  'audio',
  'b',
  'base',
  'bdi',
  'bdo',
  'blockquote',
  'body',
  'br',
  'button',
  'canvas',
  'caption',
  'cite',
  'code',
  'col',
  'colgroup',
  'data',
  'datalist',
  'dd',
  'del',
  'details',
  'dfn',
  'dialog',
  'div',
  'dl',
  'dt',
  'em',
  'embed',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hgroup',
  'hr',
  'html',
  'i',
  'iframe',
  'img',
  'input',
  'ins',
  'kbd',
  'label',
  'legend',
  'li',
  'link',
  'main',
  'map',
  'mark',
  'menu',
  'meta',
  'meter',
  'nav',
  'noscript',
  'object',
  'ol',
  'optgroup',
  'option',
  'output',
  'p',
  'picture',
  'pre',
  'progress',
  'q',
  'rp',
  'rt',
  'ruby',
  's',
  'samp',
  'script',
  'search',
  'section',
  'select',
  'slot',
  'small',
  'source',
  'span',
  'strong',
  'style',
  'sub',
  'summary',
  'sup',
  'table',
  'tbody',
  'td',
  'template',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'title',
  'tr',
  'track',
  'u',
  'ul',
  'var',
  'video',
  'wbr',
]);

function blogPostFiles(dir = blogContentDir): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);

    if (entry.isDirectory()) {
      return blogPostFiles(path);
    }

    return /\.(md|mdx)$/.test(entry.name) ? [path] : [];
  });
}

function maskExceptNewlines(value: string): string {
  return value.replace(/[^\n]/g, ' ');
}

function maskMarkdownExamples(source: string): string {
  return source
    .replace(/(^|\n)(```|~~~)[\s\S]*?\n\2(?=\n|$)/g, (match) => maskExceptNewlines(match))
    .replace(/`[^`\n]+`/g, (match) => maskExceptNewlines(match))
    .replace(/<https?:\/\/[^>\s]+>/g, (match) => maskExceptNewlines(match));
}

function isAllowedTag(tagName: string): boolean {
  return standardHtmlTags.has(tagName.toLowerCase()) || /^[A-Z]/.test(tagName) || tagName.includes('-');
}

function lineNumberForIndex(source: string, index: number): number {
  return source.slice(0, index).split('\n').length;
}

describe('blog post HTML tags', () => {
  it('uses standard HTML, custom elements, or MDX/Astro component tags', () => {
    const invalidTags = blogPostFiles()
      .flatMap((file) => {
        const source = readFileSync(file, 'utf8');
        const searchableSource = maskMarkdownExamples(source);
        const matches = searchableSource.matchAll(/<\/?\s*([A-Za-z][A-Za-z0-9:-]*)\b/g);

        return [...matches]
          .filter((match) => !isAllowedTag(match[1]))
          .map(
            (match) =>
              `${file.replace(`${process.cwd()}/`, '')}:${lineNumberForIndex(source, match.index ?? 0)} <${match[1]}>`,
          );
      })
      .sort();

    expect(invalidTags).toEqual([]);
  });
});
