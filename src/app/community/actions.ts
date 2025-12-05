"use server";

import { checkBlogPostStyle, type BlogPostStyleOutput } from "@/ai/flows/check-blog-post-style";

export async function checkPostStyle(blogPostContent: string): Promise<{
    success: boolean;
    data?: BlogPostStyleOutput;
    error?: string;
}> {
    try {
        const result = await checkBlogPostStyle({ blogPostContent });
        return { success: true, data: result };
    } catch (e) {
        console.error("Error checking blog post style with AI:", e);
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
        return { success: false, error: `Nuestro asistente de IA no pudo procesar la solicitud. Por favor, inténtalo de nuevo. (${errorMessage})` };
    }
}
