import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      lastEdited: z.coerce.date().optional(),
      categories: z.array(z.string()).optional(),
      tags: z.array(z.string()).optional(),
      featuredImage_Url: image().optional(),
      featuredImage_Alt: z.string().optional(),
    }),
});

export const collections = { blog };
