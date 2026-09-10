import { describe, expect, it } from 'vitest';
import { isPublishable } from '../../src/utils/blog';
import type { BlogPost } from '../../src/utils/blog';

const NOW = new Date('2026-09-10T00:00:00Z').getTime();

function post(overrides: { draft?: boolean; date: string }): BlogPost {
  return {
    data: {
      draft: overrides.draft ?? false,
      date: new Date(overrides.date),
    },
  } as BlogPost;
}

describe('isPublishable', () => {
  it('publishes a non-draft post dated in the past', () => {
    expect(isPublishable(post({ date: '2026-01-01T00:00:00Z' }), NOW)).toBe(true);
  });

  it('publishes a post dated exactly now', () => {
    expect(isPublishable(post({ date: '2026-09-10T00:00:00Z' }), NOW)).toBe(true);
  });

  it('hides a post flagged draft even when its date has passed', () => {
    expect(isPublishable(post({ draft: true, date: '2026-01-01T00:00:00Z' }), NOW)).toBe(false);
  });

  it('hides a post whose date is still in the future', () => {
    expect(isPublishable(post({ date: '2026-12-25T00:00:00Z' }), NOW)).toBe(false);
  });
});
