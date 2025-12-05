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
    .describe("A description of the customer's needs, including price range, type of music they play, and skill level."),
  productCatalog: z.string().describe('The OCTAVA product catalog in JSON format.'),
});
export type ProductFilterAssistanceInput = z.infer<typeof ProductFilterAssistanceInputSchema>;

const ProductFilterAssistanceOutputSchema = z.object({
  filteredProducts: z.string().describe('A JSON array of products from the OCTAVA catalog that best match the customer needs.'),
});
export type ProductFilterAssistanceOutput = z.infer<typeof ProductFilterAssistanceOutputSchema>;

export async function productFilterAssistance(input: ProductFilterAssistanceInput): Promise<ProductFilterAssistanceOutput> {
  return productFilterAssistanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productFilterAssistancePrompt',
  input: {schema: ProductFilterAssistanceInputSchema},
  output: {schema: ProductFilterAssistanceOutputSchema},
  prompt: `You are an expert musical equipment consultant for OCTAVA. Given a description of a customer's needs and the OCTAVA product catalog, filter the catalog to find the best products for the customer.

Customer Needs: {{{needsDescription}}}

Product Catalog:
{{{productCatalog}}}

Return a JSON array of the products that best match the customer's needs.
`, // Removed extraneous newline
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
