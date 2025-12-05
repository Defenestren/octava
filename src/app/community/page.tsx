import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Rss, Users, MessageSquare } from 'lucide-react';
import BlogStyleChecker from './_components/blog-style-checker';

export const metadata = {
  title: 'Comunidad',
  description: 'Únete a la comunidad de OCTAVA. Participa en nuestro foro, lee nuestro blog y mantente conectado con otros músicos apasionados.',
};

export default function CommunityPage() {
  const pageBanner = placeholderImages.find(p => p.id === 'community-banner');

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
            Nuestra Comunidad
          </h1>
          <p className="mt-2 text-lg md:text-xl max-w-2xl mx-auto text-gray-200">
            Conecta, aprende y comparte tu pasión por la música.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-24 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-headline font-bold text-primary mb-6 text-center">Herramienta de Contenido para la Comunidad</h2>
            <BlogStyleChecker />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-border">
            <Card className="flex flex-col">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2"><MessageSquare className="w-6 h-6 text-primary"/>Foro de Músicos</CardTitle>
                  <CardDescription>Próximamente: Un espacio para debatir sobre gear, técnica y música.</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                  <div className="h-48 flex items-center justify-center bg-muted/50 rounded-md">
                      <p className="text-muted-foreground">El foro está en construcción.</p>
                  </div>
              </CardContent>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Users className="w-6 h-6 text-primary" />Redes Sociales</CardTitle>
                  <CardDescription>Próximamente: Sigue nuestras últimas noticias y eventos.</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                  <div className="h-48 flex items-center justify-center bg-muted/50 rounded-md">
                      <p className="text-muted-foreground">El feed social está en construcción.</p>
                  </div>
              </CardContent>
            </Card>
        </div>
      </section>
    </div>
  );
}
