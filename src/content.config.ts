import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const taxonomyList = z.array(z.string().trim().min(1));

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        date: z.coerce.date(),
        lastEdited: z.coerce.date().optional(),
        categories: taxonomyList.optional(),
        tags: taxonomyList
          .optional()
          .refine((tags) => !tags || tags.every((tag) => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(tag)), {
            message: 'Tags must be lowercase kebab-case.',
          })
          .refine((tags) => !tags || tags.every((tag, index, arr) => index === 0 || arr[index - 1] <= tag), {
            message: 'Tags must be alphabetized in frontmatter.',
          }),
        featuredImage_Url: image().optional(),
        featuredImage_Alt: z.string().trim().min(1).optional(),
      })
      .superRefine(({ featuredImage_Url, featuredImage_Alt }, ctx) => {
        if (featuredImage_Url && !featuredImage_Alt) {
          ctx.addIssue({
            code: 'custom',
            path: ['featuredImage_Alt'],
            message: 'Featured images must include alt text.',
          });
        }
      }),
});

export const collections = { blog };
