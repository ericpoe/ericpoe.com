import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { slugify } from '../../src/utils/slugify';

const blogContentDir = join(process.cwd(), 'src/content/blog');

const blogPostFilenames = (): string[] =>
  readdirSync(blogContentDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.(md|mdx)$/.test(entry.name))
    .map((entry) => entry.name);

describe('blog post filenames', () => {
  // Post URLs derive from a slugified file id (see postSlug in src/utils/blog.ts),
  // so a mixed-case, dotted, or otherwise non-slug filename would produce a URL
  // that no longer matches its own source file. Keep filenames slug-clean.
  it('are lowercase, punctuation-free slugs', () => {
    const offenders = blogPostFilenames()
      .map((name) => {
        const ext = name.slice(name.lastIndexOf('.'));
        const stem = name.slice(0, -ext.length);
        const expected = `${slugify(stem)}${ext}`;
        return name === expected ? null : `${name} -> ${expected}`;
      })
      .filter(Boolean);

    expect(offenders).toEqual([]);
  });

  it('start with a YYYY-MM-DD- date prefix', () => {
    const offenders = blogPostFilenames().filter((name) => !/^\d{4}-\d{2}-\d{2}-/.test(name));

    expect(offenders).toEqual([]);
  });
});
