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

  it('handles empty strings', () => {
    expect(slugify('')).toBe('');
    expect(slugify('   ')).toBe('');
  });

  it('handles special characters', () => {
    expect(slugify('Hello@World#2024')).toBe('hello-world-2024');
    expect(slugify('foo & bar')).toBe('foo-bar');
  });

  it('handles numbers', () => {
    expect(slugify('Top 10 Tips')).toBe('top-10-tips');
    expect(slugify('2024 Year Review')).toBe('2024-year-review');
  });

  it('collapses multiple separators', () => {
    expect(slugify('hello   world')).toBe('hello-world');
    expect(slugify('hello---world')).toBe('hello-world');
  });
});

describe('formatTitleMla', () => {
  it('keeps MLA casing while preserving acronyms', () => {
    expect(formatTitleMla('the power of RDD')).toBe('The Power of RDD');
    expect(formatTitleMla('react vs gatsby')).toBe('React vs Gatsby');
  });

  it('capitalizes first and last words regardless of type', () => {
    expect(formatTitleMla('the beginning of the')).toBe('The Beginning of The');
    expect(formatTitleMla('a journey to a')).toBe('A Journey to A');
  });

  it('preserves all-caps words as acronyms', () => {
    // All-caps words are treated as acronyms and preserved
    expect(formatTitleMla('THE MAN IN THE ARENA')).toBe('THE MAN IN THE ARENA');
    expect(formatTitleMla('BEAUTY AND THE BEAST')).toBe('BEAUTY AND THE BEAST');
  });

  it('lowercases mixed-case articles and prepositions mid-title', () => {
    expect(formatTitleMla('The Man In The Arena')).toBe('The Man in the Arena');
    expect(formatTitleMla('Beauty And The Beast')).toBe('Beauty and the Beast');
  });

  it('preserves acronyms', () => {
    expect(formatTitleMla('understanding HTML and CSS')).toBe('Understanding HTML and CSS');
    expect(formatTitleMla('the API for REST services')).toBe('The API for REST Services');
  });

  it('handles hyphenated words', () => {
    expect(formatTitleMla('self-contained applications')).toBe('Self-Contained Applications');
    // Hyphenated parts follow same rules - 'by' is a preposition but part of compound
    expect(formatTitleMla('a step-by-step guide')).toBe('A Step-By-Step Guide');
  });

  it('handles punctuation', () => {
    expect(formatTitleMla('"the quick" brown fox')).toBe('"The Quick" Brown Fox');
    // Colon doesn't reset capitalization rules - 'the' stays lowercase mid-title
    expect(formatTitleMla('hello: the beginning')).toBe('Hello: the Beginning');
  });

  it('handles empty strings', () => {
    expect(formatTitleMla('')).toBe('');
  });

  it('collapses whitespace', () => {
    // split(/\s+/) collapses multiple spaces into single space separator
    expect(formatTitleMla('   ')).toBe(' ');
    expect(formatTitleMla('hello   world')).toBe('Hello World');
  });

  it('handles single words', () => {
    expect(formatTitleMla('hello')).toBe('Hello');
    expect(formatTitleMla('API')).toBe('API');
  });
});
