import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  buildFrontmatter,
  getExistingTaxonomy,
  normalizeTagValue,
  parseMultiSelectOrTyped,
  toUtcDatePrefix,
  toUtcIsoNoMs,
  yamlSingleQuote,
} from '../../scripts/new-post.mjs';

describe('new-post wizard helpers', () => {
  it('formats UTC timestamp without milliseconds', () => {
    const date = new Date('2026-02-23T05:03:59.456Z');
    expect(toUtcIsoNoMs(date)).toBe('2026-02-23T05:03:59Z');
    expect(toUtcDatePrefix(date)).toBe('2026-02-23');
  });

  it('quotes YAML strings safely', () => {
    expect(yamlSingleQuote('Wizard: Test')).toBe("'Wizard: Test'");
    expect(yamlSingleQuote("Eric's Post")).toBe("'Eric''s Post'");
  });

  it('normalizes typed tags to lowercase kebab-case', () => {
    expect(normalizeTagValue('New Tag!')).toBe('new-tag');
    expect(normalizeTagValue('  AI / LLM  ')).toBe('ai-llm');
    expect(normalizeTagValue('already-kebab')).toBe('already-kebab');
  });

  it('parses mixed numeric selections and typed values', () => {
    const options = ['programming', 'tech', 'words'];

    expect(parseMultiSelectOrTyped('2, personal-notes', options)).toEqual(['tech', 'personal-notes']);
    expect(parseMultiSelectOrTyped('2,2, custom', options)).toEqual(['tech', 'custom']);
    expect(parseMultiSelectOrTyped('', options)).toEqual([]);
  });

  it('normalizes typed tag values during mixed parsing', () => {
    const options = ['ai', 'writing'];

    expect(parseMultiSelectOrTyped('1, New Tag!, zeta-tag', options, { normalizeTyped: normalizeTagValue })).toEqual([
      'ai',
      'new-tag',
      'zeta-tag',
    ]);
  });

  it('throws on out-of-range numeric selections', () => {
    expect(() => parseMultiSelectOrTyped('99', ['a', 'b'])).toThrow(/out of range/);
  });

  it('builds frontmatter in required order without featured image fields', () => {
    const output = buildFrontmatter({
      title: "Wizard: Eric's Test",
      dateIso: '2026-02-23T05:03:59Z',
      categories: ['tech', 'words'],
      tags: ['ai', 'writing'],
      featuredImage: null,
    });

    expect(output).toContain("title: 'Wizard: Eric''s Test'");
    expect(output).toContain("date: '2026-02-23T05:03:59Z'");
    expect(output).toContain('categories:\n  - tech\n  - words');
    expect(output).toContain('tags:\n  - ai\n  - writing');

    const titleIndex = output.indexOf('title:');
    const dateIndex = output.indexOf('date:');
    const categoriesIndex = output.indexOf('categories:');
    const tagsIndex = output.indexOf('tags:');
    expect(titleIndex).toBeLessThan(dateIndex);
    expect(dateIndex).toBeLessThan(categoriesIndex);
    expect(categoriesIndex).toBeLessThan(tagsIndex);
  });

  it('builds frontmatter with featured image fields after tags', () => {
    const output = buildFrontmatter({
      title: 'Featured Post',
      dateIso: '2026-02-23T05:03:59Z',
      categories: [],
      tags: [],
      featuredImage: {
        featuredImage_Url: './images/example.png',
        featuredImage_Alt: "Hero image for Eric's post",
      },
    });

    expect(output).toContain('categories: []');
    expect(output).toContain('tags: []');
    expect(output).toContain('featuredImage_Url: ./images/example.png');
    expect(output).toContain("featuredImage_Alt: 'Hero image for Eric''s post'");

    const tagsIndex = output.indexOf('tags:');
    const imageUrlIndex = output.indexOf('featuredImage_Url:');
    const imageAltIndex = output.indexOf('featuredImage_Alt:');
    expect(tagsIndex).toBeLessThan(imageUrlIndex);
    expect(imageUrlIndex).toBeLessThan(imageAltIndex);
  });

  it('harvests categories and tags from fixture posts with sorting, dedupe, and exclusions', async () => {
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'new-post-wizard-'));

    try {
      await fs.writeFile(
        path.join(tempDir, '2026-02-01-first-post.mdx'),
        `---
title: 'First'
date: '2026-02-01T00:00:00Z'
categories:
  - words
  - tech
tags:
  - writing
  - ai
---

One
`,
      );

      await fs.writeFile(
        path.join(tempDir, '2026-02-02-second-post.md'),
        `---
title: 'Second'
date: '2026-02-02T00:00:00Z'
categories:
  - tech
  - programming
tags:
  - ai
  - testing
---

Two
`,
      );

      await fs.writeFile(
        path.join(tempDir, '2026-02-03-excluded-post.mdx'),
        `---
title: 'Excluded'
date: '2026-02-03T00:00:00Z'
categories:
  - should-not-appear
tags:
  - should-not-appear
---
`,
      );

      await fs.writeFile(path.join(tempDir, 'notes.txt'), 'not a blog post');

      const result = await getExistingTaxonomy({
        blogDir: tempDir,
        excludedFiles: new Set(['2026-02-03-excluded-post.mdx']),
      });

      expect(result.categories).toEqual(['programming', 'tech', 'words']);
      expect(result.tags).toEqual(['ai', 'testing', 'writing']);
    } finally {
      await fs.rm(tempDir, { recursive: true, force: true });
    }
  });
});
