// src/ai/flows/check-blog-post-style.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for checking blog post content against OCTAVA brand guidelines.
 *
 * - checkBlogPostStyle - A function that takes blog post content as input and returns a style check result.
 * - BlogPostStyleInput - The input type for the checkBlogPostStyle function.
 * - BlogPostStyleOutput - The return type for the checkBlogPostStyle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BlogPostStyleInputSchema = z.object({
  blogPostContent: z
    .string()
    .describe('The content of the blog post to be checked against brand guidelines.'),
});
export type BlogPostStyleInput = z.infer<typeof BlogPostStyleInputSchema>;

const BlogPostStyleOutputSchema = z.object({
  adherenceScore: z
    .number()
    .describe(
      'A score (0-100) indicating how well the blog post adheres to the brand guidelines.'
    ),
  suggestions: z
    .string()
    .describe(
      'Specific suggestions for improving the blog post to better align with the brand guidelines.'
    ),
});
export type BlogPostStyleOutput = z.infer<typeof BlogPostStyleOutputSchema>;

export async function checkBlogPostStyle(
  input: BlogPostStyleInput
): Promise<BlogPostStyleOutput> {
  return checkBlogPostStyleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'checkBlogPostStylePrompt',
  input: {schema: BlogPostStyleInputSchema},
  output: {schema: BlogPostStyleOutputSchema},
  prompt: `You are an expert content style checker for OCTAVA, a premium vintage rock instrument store. Use the provided blog post content to evaluate and score how well it adheres to the brand guidelines.

Brand guidelines:
- Tone: Rock vintage premium, sober, elegant, and authentic.
- Colors: #1F1F1F (carbon black), #B2874D (wood gold), #FFFFFF (white).
- Typography: Rubik (headlines), Roboto (body).

Blog Post Content: {{{blogPostContent}}}

Provide a score (0-100) in the adherenceScore field indicating how well the content adheres to the brand guidelines and suggest concrete improvements.
Here is a summary:
- Mission: To inspire and equip musicians with exceptional instruments that ignite their passion and elevate their art.
- Vision: To be the premier destination for musicians seeking instruments of unparalleled quality and craftsmanship, fostering a vibrant community of artists.
- Values: Passion, Craftsmanship, Community, Innovation, Legacy.

Respond in JSON format.
`,
});

const checkBlogPostStyleFlow = ai.defineFlow(
  {
    name: 'checkBlogPostStyleFlow',
    inputSchema: BlogPostStyleInputSchema,
    outputSchema: BlogPostStyleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
