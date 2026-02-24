import { describe, expect, it } from 'vitest';
import { summarize, summarizeHtml } from '../../src/utils/summarize';

describe('summarize', () => {
  it('returns plain text and strips markdown, HTML, and MDX imports', () => {
    const body = `import Figure from '../components/Figure.astro'

# Hello *world*

This is [a link](https://example.com) and <strong>HTML</strong>.

<Figure src="/img.png" alt="Example" />`;

    expect(summarize(body, 20)).toBe('Hello world This is a link and HTML.');
  });

  it('truncates by word count with an ellipsis', () => {
    expect(summarize('one two three four', 3)).toBe('one two three…');
  });
});

describe('summarizeHtml', () => {
  it('preserves inline code and escapes code content', () => {
    const body = 'Use `<script>alert(1)</script>` in code and [docs](https://example.com).';

    expect(summarizeHtml(body, 20)).toBe('Use <code>&lt;script&gt;alert(1)&lt;/script&gt;</code> in code and docs.');
  });

  it('converts fenced code blocks to code tags and escapes HTML', () => {
    const body = 'Before ```html\n<div class="x">Hi</div>\n``` after';

    expect(summarizeHtml(body, 20)).toBe(
      'Before <code>html &lt;div class=&quot;x&quot;&gt;Hi&lt;/div&gt;</code> after',
    );
  });

  it('balances code tags when truncation cuts off a code snippet', () => {
    const body = 'alpha `beta gamma` delta';

    expect(summarizeHtml(body, 2)).toBe('alpha <code>beta…</code>');
  });
});
