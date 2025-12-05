import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { placeholderImages } from '@/lib/placeholder-images';
import { Wrench, Beaker, BadgePercent, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Servicios',
  description: 'Servicios expertos para músicos exigentes: reparaciones, customización, tasación y consignación de instrumentos en OCTAVA.',
};

const services = [
  {
    icon: <Wrench className="h-10 w-10 text-primary" />,
    title: 'Reparación y Mantenimiento',
    description: 'Nuestro equipo de luthiers expertos devuelve la vida a tu instrumento. Desde ajustes básicos hasta reparaciones complejas, garantizamos que tu equipo suene y se sienta mejor que nunca.',
  },
  {
    icon: <Beaker className="h-10 w-10 text-primary" />,
    title: 'Customización y Modificaciones',
    description: 'Transforma tu instrumento en una pieza única. Ofrecemos servicios de cambio de pastillas, hardware, acabados personalizados y mucho más para que tu equipo se adapte perfectamente a tu estilo.',
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: 'Tasación Profesional',
    description: '¿Quieres conocer el valor real de tu instrumento vintage? Realizamos tasaciones detalladas y certificadas, basadas en un profundo conocimiento del mercado y el estado de la pieza.',
  },
  {
    icon: <BadgePercent className="h-10 w-10 text-primary" />,
    title: 'Venta en Consignación',
    description: 'Vende tu instrumento a través de nuestra plataforma y accede a nuestra red global de coleccionistas y músicos. Nos encargamos de todo el proceso para que obtengas el mejor precio.',
  },
];

export default function ServicesPage() {
  const pageBanner = placeholderImages.find(p => p.id === 'services-banner');

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
            Servicios de Luthier
          </h1>
          <p className="mt-2 text-lg md:text-xl max-w-2xl mx-auto text-gray-200">
            Artesanía y precisión para tu instrumento.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="hover:border-primary/50 transition-colors">
              <CardHeader className="flex flex-row items-center gap-4">
                {service.icon}
                <CardTitle className="text-2xl font-headline">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
