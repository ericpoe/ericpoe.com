import { describe, expect, it } from 'vitest';
import { slugify } from '../../src/utils/slugify';
import { formatTitleMla } from '../../src/utils/titleCase';

describe('slugify', () => {
  it('converts to lowercase kebab-case', () => {
    expect(slugify('Hello World')).toBe('hello-world');
    expect(slugify(' Hello—World! ')).toBe('hello-world');
  });

  it('strips leading and trailing separators', () => {
    expect(slugify('--trim--this--')).toBe('trim-this');
  });
});

describe('formatTitleMla', () => {
  it('keeps MLA casing while preserving acronyms', () => {
    expect(formatTitleMla('the power of RDD')).toBe('The Power of RDD');
    expect(formatTitleMla('react vs gatsby')).toBe('React vs Gatsby');
  });
});
