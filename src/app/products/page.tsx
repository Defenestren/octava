import Image from "next/image";
import { placeholderImages } from "@/lib/placeholder-images";
import ProductCatalog from "./_components/product-catalog";

export const metadata = {
  title: 'Productos',
  description: 'Explora nuestro catálogo curado de instrumentos musicales vintage y premium. Guitarras, bajos, amplificadores y más.',
};

export default function ProductsPage() {
  const pageBanner = placeholderImages.find(p => p.id === "hero-image");

  return (
    <div>
      <section className="relative h-64 w-full flex items-center justify-center text-center text-white bg-secondary">
        {pageBanner && (
          <Image
            src={pageBanner.imageUrl}
            alt={pageBanner.description}
            data-ai-hint={pageBanner.imageHint}
            fill
            className="object-cover brightness-50"
          />
        )}
        <div className="relative z-10 p-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-headline font-black uppercase tracking-tighter">
            Nuestra Colección
          </h1>
          <p className="mt-2 text-lg md:text-xl max-w-2xl mx-auto text-gray-200">
            Instrumentos seleccionados a mano con alma e historia.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <ProductCatalog />
      </section>
    </div>
  );
}
