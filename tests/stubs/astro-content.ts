// Stub for the `astro:content` virtual module so unit tests can import helpers
// from `src/utils/blog.ts` without an Astro build. Aliased in vitest.config.ts.
// Only the runtime values `src/utils/blog.ts` actually calls need to exist here;
// its `type CollectionEntry` import is erased at runtime.
export async function getCollection(): Promise<unknown[]> {
  return [];
}
