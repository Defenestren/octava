import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Product } from '@/lib/products';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden h-full transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative aspect-square w-full">
          <Image
            src={product.image.imageUrl}
            alt={product.name}
            data-ai-hint={product.image.imageHint}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start gap-2">
            <Badge variant="secondary" className="mb-2">{product.category}</Badge>
            <Badge variant="outline">{product.brand}</Badge>
        </div>
        <CardTitle className="text-lg font-headline mt-1">{product.name}</CardTitle>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <p className="text-xl font-bold text-primary">
          {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(product.price)}
        </p>
        <Button asChild className="relative overflow-hidden group">
          <Link href="#">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
            Ver Detalles
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
