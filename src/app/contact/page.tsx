import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export const metadata = {
  title: 'Contacto',
  description: 'Ponte en contacto con OCTAVA. Visítanos en nuestra tienda, llámanos o envíanos un mensaje. Estamos aquí para ayudarte.',
};

export default function ContactPage() {
  const pageBanner = placeholderImages.find(p => p.id === 'contact-banner');

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
            Contacto
          </h1>
          <p className="mt-2 text-lg md:text-xl max-w-2xl mx-auto text-gray-200">
            Estamos aquí para ayudarte. Hablemos de música.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card>
            <CardHeader>
              <CardTitle>Envíanos un Mensaje</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Tu Nombre" />
              <Input type="email" placeholder="Tu Email" />
              <Input placeholder="Asunto" />
              <Textarea placeholder="Tu mensaje..." rows={5} />
              <Button size="lg" className="w-full relative overflow-hidden group">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
                Enviar Mensaje
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-lg">
                <div className="flex items-center gap-4">
                  <MapPin className="h-6 w-6 text-primary" />
                  <span>Carrer de la Música, 123, 08013 Barcelona</span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-primary" />
                  <span>+34 931 234 567</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="h-6 w-6 text-primary" />
                  <span>contacto@octava.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="h-6 w-6 text-primary" />
                  <span>L-V: 10:00 - 20:00 | S: 10:00 - 14:00</span>
                </div>
              </CardContent>
            </Card>
            <div className="aspect-video w-full rounded-lg overflow-hidden bg-muted">
                <Image src="https://picsum.photos/seed/map/800/450" alt="map location" layout="fill" objectFit="cover" data-ai-hint="map location" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
