import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      lastEdited: z.coerce.date().optional(),
      categories: z.array(z.string()).optional(),
      tags: z
        .array(z.string())
        .optional()
        .refine((tags) => !tags || tags.every((tag) => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(tag)), {
          message: 'Tags must be lowercase kebab-case.',
        })
        .refine((tags) => !tags || tags.every((tag, index, arr) => index === 0 || arr[index - 1] <= tag), {
          message: 'Tags must be alphabetized in frontmatter.',
        }),
      featuredImage_Url: image().optional(),
      featuredImage_Alt: z.string().optional(),
    }),
});

export const collections = { blog };
