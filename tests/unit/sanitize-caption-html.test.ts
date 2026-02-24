import { describe, expect, it } from 'vitest';
import { sanitizeCaptionHtml } from '../../src/utils/sanitizeCaptionHtml';

describe('sanitizeCaptionHtml', () => {
  it('preserves safe links and text', () => {
    expect(sanitizeCaptionHtml('Source: <a href="https://example.com">Example</a>')).toBe(
      'Source: <a href="https://example.com" rel="noopener noreferrer">Example</a>',
    );
  });

  it('removes unsafe protocols and tags', () => {
    expect(
      sanitizeCaptionHtml(
        'Hi <img src=x onerror=alert(1)> <a href="javascript:alert(1)" onclick="alert(1)">click</a>',
      ),
    ).toBe('Hi  click');
  });

  it('escapes non-anchor markup', () => {
    expect(sanitizeCaptionHtml('Use <em>italics</em> & text')).toBe('Use italics &amp; text');
  });
});
