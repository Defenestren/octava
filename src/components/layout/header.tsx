'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Music } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/products', label: 'Productos' },
  { href: '/services', label: 'Servicios' },
  { href: '/community', label: 'Comunidad' },
  { href: '/contact', label: 'Contacto' },
  { href: '/intranet', label: 'Intranet' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-24 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src="/gemini-2.5-flash-image_El_logo_lo_quiero_sin_fondo_y_vectorizado._Elimina_el_texto_y_la_linea_dorada_so-0 (1).png" alt="Octava Logo" width={320} height={200} className="h-20 w-auto" />
          </Link>
        </div>

        <nav className="hidden md:flex flex-1 items-center space-x-1 text-sm font-medium">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'group relative px-3 py-2 transition-all duration-300 rounded-md group-hover:shadow-lg group-hover:shadow-primary/20',
                pathname === href ? 'text-primary' : 'text-foreground/60 hover:text-foreground'
              )}
            >
              <span className="relative z-10">{label}</span>
              {pathname !== href && (
                <span className="absolute inset-0 z-0 h-full w-full rounded-md bg-primary/20 scale-x-0 transform origin-right transition-transform duration-300 ease-in-out group-hover:scale-x-100 group-hover:origin-left"></span>
              )}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col space-y-4 p-4">
                  <Link href="/" className="mb-4 flex items-center space-x-2">
                    <Image src="/gemini-2.5-flash-image_El_logo_lo_quiero_sin_fondo_y_vectorizado._Elimina_el_texto_y_la_linea_dorada_so-0 (1).png" alt="Octava Logo" width={320} height={200} className="h-20 w-auto" />
                  </Link>
                  {navLinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className={cn(
                        'text-lg transition-colors hover:text-primary',
                        pathname === href ? 'text-primary font-semibold' : 'text-foreground/80'
                      )}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
