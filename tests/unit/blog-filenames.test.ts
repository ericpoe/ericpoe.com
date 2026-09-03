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
  // Astro's glob loader turns the filename into the post id (and URL) via
  // github-slugger, which lowercases but also silently drops characters — e.g.
  // "atom.io--review" becomes ".../atomio--review". Requiring filenames to already
  // be clean slugs keeps each post's URL obvious from its filename.
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
