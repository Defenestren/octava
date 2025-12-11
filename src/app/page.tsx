"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, PlayCircle, Target, Users, BookOpen, Gem, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { placeholderImages } from '@/lib/placeholder-images';
import { useRef, useState } from 'react';

export default function Home() {
  const heroImage = placeholderImages.find(p => p.id === "hero-image");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
        videoRef.current.play();
        setIsPlaying(true);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-contain brightness-100"
          />
        )}
        <div className="relative z-10 p-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-headline font-black uppercase tracking-tighter text-shadow-lg">
            Donde las Leyendas se Forjan en Madera y Alambre
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-200">
            Inspiramos y equipamos a músicos con instrumentos vintage excepcionales que encienden la pasión y elevan el arte.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="font-bold relative overflow-hidden group">
              <Link href="/products">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
                Explora la Colección
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-bold bg-black/20 backdrop-blur-sm relative overflow-hidden group">
              <Link href="/services">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
                Nuestros Servicios
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section id="about" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">QUIÉNES SOMOS</h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              OCTAVA nació de una obsesión compartida: el sonido y el alma atemporales de los instrumentos de rock vintage. Somos más que una tienda; somos curadores de historia, técnicos de tono y un santuario para artistas que creen que el instrumento adecuado es una extensión de su propia voz. Nuestra base se construye sobre un profundo respeto por la artesanía y el deseo de conectar a los músicos con instrumentos que llevan un legado e inspiran nuevos.
            </p>
          </div>
          <div className="relative h-80 rounded-lg overflow-hidden shadow-2xl">
             <Image
                src="/05_Imagen Corporativa Equipo OCTAVA.jpg"
                alt="El equipo de OCTAVA"
                data-ai-hint="music band portrait"
                fill
                className="object-cover"
              />
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section id="philosophy" className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">NUESTRA FILOSOFÍA</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Nuestros principios fundamentales guían todo lo que hacemos, desde la obtención de instrumentos hasta el servicio a nuestra comunidad.
            </p>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <h3 className="text-2xl font-headline font-bold text-primary">Misión</h3>
              <p className="mt-2 text-muted-foreground">Inspirar y equipar a los músicos con instrumentos excepcionales que enciendan su pasión y eleven su arte.</p>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-headline font-bold text-primary">Visión</h3>
              <p className="mt-2 text-muted-foreground">Ser el principal destino para los músicos que buscan instrumentos de calidad y artesanía inigualables, fomentando una vibrante comunidad de artistas.</p>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-headline font-bold text-primary">Valores</h3>
              <p className="mt-2 text-muted-foreground">Pasión, Artesanía, Comunidad, Innovación, Legado.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Value Proposition */}
      <section id="value-proposition" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">LA DIFERENCIA OCTAVA</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Ofrecemos más que solo instrumentos. Ofrecemos una experiencia arraigada en la autenticidad y la experiencia.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Gem className="w-8 h-8 text-primary" />
                <CardTitle>Selección Curada</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Cada instrumento es seleccionado a mano por nuestros expertos por su calidad, historia y carácter único.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <ShieldCheck className="w-8 h-8 text-primary" />
                <CardTitle>Artesanía Experta</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Nuestros luthiers internos proporcionan servicios de reparación, mantenimiento y personalización de clase mundial.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Users className="w-8 h-8 text-primary" />
                <CardTitle>Comunidad Vibrante</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Únete a una red de artistas apasionados a través de nuestros talleres, eventos y foros en línea.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Target Audience & Video */}
      <section id="community" className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-headline font-bold">PARA EL ARTISTA EXIGENTE</h2>
            <div className="mt-6 space-y-4 text-lg text-muted-foreground">
              <div className="flex items-start gap-4">
                <Target className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <p><span className="font-bold text-foreground">Músicos Profesionales:</span> Buscando equipo vintage fiable y listo para giras con un tono inigualable.</p>
              </div>
              <div className="flex items-start gap-4">
                 <Target className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <p><span className="font-bold text-foreground">Aficionados Serios:</span> Apasionados que aprecian la artesanía y la historia de los instrumentos icónicos.</p>
              </div>
              <div className="flex items-start gap-4">
                 <Target className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <p><span className="font-bold text-foreground">Coleccionistas y Aficionados:</span> Inversores y entusiastas que buscan piezas raras y prístinas de la historia de la música.</p>
              </div>
            </div>
          </div>
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl group">
             <video
                ref={videoRef}
                src="/mi-video.mp4"
                playsInline
                controls={isPlaying}
                className="w-full h-full object-cover"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                onClick={() => !isPlaying && handlePlay()}
            />
            {!isPlaying && (
                <div 
                    className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer"
                    onClick={handlePlay}
                >
                    <PlayCircle className="w-20 h-20 text-white/70 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                    <div className="absolute bottom-4 left-4 text-white font-headline text-lg pointer-events-none">Vídeo Corporativo de OCTAVA</div>
                </div>
            )}
          </div>
        </div>
      </section>

      {/* Intranet Link */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <Card className="max-w-2xl mx-auto bg-primary/10 border-primary/30">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-4">
                <BookOpen className="w-10 h-10 text-primary" />
                <h3 className="text-2xl font-headline font-bold">Recursos Internos</h3>
                <p className="text-muted-foreground">
                  Accede a datos operativos detallados y documentos internos a través de la intranet de OCTAVA.
                </p>
                <Button asChild variant="link" className="text-primary text-lg">
                  <Link href="/intranet" className="hover:no-underline">Ir al Panel de Intranet <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final Message */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl font-headline font-bold">Tu Legado te Espera.</h3>
            <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
              Únete a la familia OCTAVA y encuentra el instrumento que definirá tu sonido.
            </p>
             <Button asChild className="mt-6 relative overflow-hidden group" size="lg">
              <Link href="/products">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
                Encuentra Tu Instrumento
              </Link>
            </Button>
        </div>
      </section>
    </div>
  );
}

    

    

