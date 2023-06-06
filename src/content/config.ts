import { defineCollection, z } from "astro:content";
import config from '@/config/config.json';

// Post collection schema
const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    date: z.date().optional(),
    image: z.string().optional(),
    author: z.string().default("Admin"),
    categories: z.array(z.string()).default(["others"]),
    tags: z.array(z.string()).default(["others"]),
    draft: z.boolean().optional(),
    redirect_from: z.string().optional(),
  }),
});

// Author collection schema
const authorsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    email: z.string().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    social: z
      .object({
        facebook: z.string().optional(),
        twitter: z.string().optional(),
        instagram: z.string().optional(),
        github: z.string().optional(),
        gitlab: z.string().optional(),
        bitbucket: z.string().optional(),
        foursquare: z.string().optional(),
        keybase: z.string().optional(),
        steam: z.string().optional(),
        slideshare: z.string().optional(),
        twitch: z.string().optional(),
        amazon: z.string().optional(),
        paypal: z.string().optional(),
      })
      .optional(),
    draft: z.boolean().optional(),
  }),
});

// Pages collection schema
const pagesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

// Export collections
export const collections = {
  [config.settings.blog_folder]: blogCollection,
  authors: authorsCollection,
  pages: pagesCollection,
};
