'use server';

/**
 * @fileOverview A Genkit flow that assists customers in finding the best musical equipment from the OCTAVA product catalog based on their needs.
 * This file is already implemented and should not be changed.
 * - productFilterAssistance - A function that handles the product filtering process.
 * - ProductFilterAssistanceInput - The input type for the productFilterAssistance function.
 * - ProductFilterAssistanceOutput - The return type for the productFilterAssistance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductFilterAssistanceInputSchema = z.object({
  needsDescription: z
    .string()
    .describe("Una descripción de las necesidades del cliente, incluyendo rango de precios, tipo de música que toca y nivel de habilidad."),
  productCatalog: z.string().describe('El catálogo de productos de OCTAVA en formato JSON.'),
});
export type ProductFilterAssistanceInput = z.infer<typeof ProductFilterAssistanceInputSchema>;

const ProductFilterAssistanceOutputSchema = z.object({
  filteredProducts: z.string().describe('Un array JSON de productos del catálogo de OCTAVA que mejor se ajustan a las necesidades del cliente.'),
});
export type ProductFilterAssistanceOutput = z.infer<typeof ProductFilterAssistanceOutputSchema>;

export async function productFilterAssistance(input: ProductFilterAssistanceInput): Promise<ProductFilterAssistanceOutput> {
  return productFilterAssistanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productFilterAssistancePrompt',
  input: {schema: ProductFilterAssistanceInputSchema},
  output: {schema: ProductFilterAssistanceOutputSchema},
  prompt: `Eres un consultor experto en equipamiento musical para OCTAVA. Dada una descripción de las necesidades de un cliente y el catálogo de productos de OCTAVA, filtra el catálogo para encontrar los mejores productos para el cliente.

Necesidades del Cliente: {{{needsDescription}}}

Catálogo de Productos:
{{{productCatalog}}}

Devuelve un array JSON de los productos que mejor se ajustan a las necesidades del cliente.
`,
});

const productFilterAssistanceFlow = ai.defineFlow(
  {
    name: 'productFilterAssistanceFlow',
    inputSchema: ProductFilterAssistanceInputSchema,
    outputSchema: ProductFilterAssistanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
