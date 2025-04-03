import { defineCollection, z } from "astro:content";

const blog = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		headline: z.string().optional(),
		heroImage: z.object({
			url: z.string(),
			alt: z.string().optional(),
		}),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		place: z.string().optional(),
		// .object({
		//   planet: z.string().optional(),
		//   country: z.string().optional(),
		//   federalState: z.string().optional(),
		//   city: z.string().optional(),
		//   other: z.string().optional(),
		// })
		draft: z.boolean().optional(),
		tags: z.array(z.string()).optional(),
		oldUrl: z.string().optional(),
	}),
});

export const collections = { blog };
