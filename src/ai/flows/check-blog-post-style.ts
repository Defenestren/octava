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
    .describe('El contenido del post del blog para ser verificado con las directrices de la marca.'),
});
export type BlogPostStyleInput = z.infer<typeof BlogPostStyleInputSchema>;

const BlogPostStyleOutputSchema = z.object({
  adherenceScore: z
    .number()
    .describe(
      'Una puntuación (0-100) que indica cómo de bien se adhiere el post a las directrices de la marca.'
    ),
  suggestions: z
    .string()
    .describe(
      'Sugerencias específicas para mejorar la publicación del blog y alinearla mejor con las directrices de la marca.'
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
  prompt: `Eres un experto corrector de estilo de contenido para OCTAVA, una tienda premium de instrumentos de rock vintage. Utiliza el contenido del post proporcionado para evaluar y puntuar cómo de bien se adhiere a las directrices de la marca.

Directrices de la marca:
- Tono: Rock vintage premium, sobrio, elegante y auténtico.
- Colores: #1F1F1F (negro carbón), #B2874D (oro madera), #FFFFFF (blanco).
- Tipografía: Rubik (titulares), Roboto (cuerpo).

Contenido del Post: {{{blogPostContent}}}

Proporciona una puntuación (0-100) en el campo adherenceScore que indique cómo de bien se adhiere el contenido a las directrices de la marca y sugiere mejoras concretas.
Aquí tienes un resumen:
- Misión: Inspirar y equipar a los músicos con instrumentos excepcionales que enciendan su pasión y eleven su arte.
- Visión: Ser el principal destino para los músicos que buscan instrumentos de calidad y artesanía inigualables, fomentando una vibrante comunidad de artistas.
- Valores: Pasión, Artesanía, Comunidad, Innovación, Legado.

Responde en formato JSON.
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
