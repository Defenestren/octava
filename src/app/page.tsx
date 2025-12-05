import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, PlayCircle, Target, Users, BookOpen, Gem, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { placeholderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = placeholderImages.find(p => p.id === "hero-image");

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
            className="object-cover brightness-50"
          />
        )}
        <div className="relative z-10 p-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-headline font-black uppercase tracking-tighter text-shadow-lg">
            Where Legends Are Forged in Wood and Wire
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-200">
            Inspiring and equipping musicians with exceptional vintage instruments that ignite passion and elevate art.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="font-bold">
              <Link href="/products">Explore The Collection</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-bold bg-black/20 backdrop-blur-sm">
              <Link href="/services">Our Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section id="about" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">WHO WE ARE</h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              OCTAVA was born from a shared obsession: the timeless sound and soul of vintage rock instruments. We are more than a store; we are curators of history, technicians of tone, and a sanctuary for artists who believe that the right instrument is an extension of their own voice. Our foundation is built on a deep respect for craftsmanship and a desire to connect musicians with instruments that carry a legacy and inspire new ones.
            </p>
          </div>
          <div className="relative h-80 rounded-lg overflow-hidden shadow-2xl">
             <Image
                src="https://picsum.photos/seed/guitar-workshop/600/400"
                alt="OCTAVA workshop"
                data-ai-hint="guitar workshop"
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
            <h2 className="text-3xl md:text-4xl font-headline font-bold">OUR PHILOSOPHY</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our core principles guide everything we do, from sourcing instruments to serving our community.
            </p>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <h3 className="text-2xl font-headline font-bold text-primary">Mission</h3>
              <p className="mt-2 text-muted-foreground">To inspire and equip musicians with exceptional instruments that ignite their passion and elevate their art.</p>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-headline font-bold text-primary">Vision</h3>
              <p className="mt-2 text-muted-foreground">To be the premier destination for musicians seeking instruments of unparalleled quality and craftsmanship, fostering a vibrant community of artists.</p>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-headline font-bold text-primary">Values</h3>
              <p className="mt-2 text-muted-foreground">Passion, Craftsmanship, Community, Innovation, Legacy.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Value Proposition */}
      <section id="value-proposition" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">THE OCTAVA DIFFERENCE</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We offer more than just instruments. We offer an experience rooted in authenticity and expertise.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Gem className="w-8 h-8 text-primary" />
                <CardTitle>Curated Selection</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Every instrument is hand-picked by our experts for its quality, history, and unique character.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <ShieldCheck className="w-8 h-8 text-primary" />
                <CardTitle>Expert Craftsmanship</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Our in-house luthiers provide world-class repair, maintenance, and customization services.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Users className="w-8 h-8 text-primary" />
                <CardTitle>Vibrant Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Join a network of passionate artists through our workshops, events, and online forums.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Target Audience & Video */}
      <section id="community" className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-headline font-bold">FOR THE DISCERNING ARTIST</h2>
            <div className="mt-6 space-y-4 text-lg text-muted-foreground">
              <div className="flex items-start gap-4">
                <Target className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <p><span className="font-bold text-foreground">Professional Musicians:</span> Seeking reliable, tour-ready vintage gear with unmatched tone.</p>
              </div>
              <div className="flex items-start gap-4">
                 <Target className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <p><span className="font-bold text-foreground">Serious Hobbyists:</span> Passionate players who appreciate the craftsmanship and history of iconic instruments.</p>
              </div>
              <div className="flex items-start gap-4">
                 <Target className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <p><span className="font-bold text-foreground">Collectors & Aficionados:</span> Investors and enthusiasts looking for rare and pristine pieces of music history.</p>
              </div>
            </div>
          </div>
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl group">
            <Image
              src="https://picsum.photos/seed/stage-lights/1280/720"
              alt="Live performance with vintage instruments"
              data-ai-hint="stage lights"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <PlayCircle className="w-20 h-20 text-white/70 group-hover:text-white group-hover:scale-110 transition-all duration-300 cursor-pointer" />
            </div>
            <div className="absolute bottom-4 left-4 text-white font-headline text-lg">OCTAVA Corporate Video</div>
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
                <h3 className="text-2xl font-headline font-bold">Internal Resources</h3>
                <p className="text-muted-foreground">
                  Access detailed operational data and internal documents via the OCTAVA intranet.
                </p>
                <Button asChild variant="link" className="text-primary text-lg">
                  <Link href="/intranet">Go to Intranet Dashboard <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final Message */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl font-headline font-bold">Your Legacy Awaits.</h3>
            <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
              Join the OCTAVA family and find the instrument that will define your sound.
            </p>
             <Button asChild className="mt-6" size="lg">
              <Link href="/products">
                Find Your Instrument
              </Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
