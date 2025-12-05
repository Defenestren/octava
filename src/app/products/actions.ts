"use server";

import { productFilterAssistance } from "@/ai/flows/product-filter-assistance";
import { products, type Product } from "@/lib/products";

export async function getFilteredProducts(needsDescription: string): Promise<{
    success: boolean;
    data?: Product[];
    error?: string;
}> {
    try {
        const productCatalog = JSON.stringify(products);
        const result = await productFilterAssistance({
            needsDescription,
            productCatalog,
        });
        
        const filtered = JSON.parse(result.filteredProducts) as Product[];
        
        // The AI might return products that are not in our catalog, so we need to filter them
        const productIdsInCatalog = new Set(products.map(p => p.id));
        const validatedProducts = filtered.filter(p => productIdsInCatalog.has(p.id));

        return { success: true, data: validatedProducts };
    } catch (e) {
        console.error("Error filtering products with AI:", e);
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
        return { success: false, error: `Nuestro asistente de IA no pudo procesar la solicitud. Por favor, inténtalo de nuevo. (${errorMessage})` };
    }
}
