import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { href: '/#about', label: 'Quiénes somos' },
  { href: '/products', label: 'Productos' },
  { href: '/services', label: 'Servicios' },
  { href: '/community', label: 'Comunidad' },
  { href: '/contact', label: 'Contacto' },
];

const socialLinks = [
  { name: 'Instagram', icon: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c-4.04.053-4.482.2-6.098.87-1.616.67-2.785 1.84-3.455 3.455-.67 1.616-.82 2.058-.87 6.098-.053 4.04.2 4.482.87 6.098.67 1.616 1.84 2.785 3.455 3.455 1.616.67 2.058.82 6.098.87 4.04-.053 4.482-.2 6.098-.87 1.616-.67 2.785-1.84 3.455-3.455.67-1.616.82-2.058.87-6.098.053-4.04-.2-4.482-.87-6.098-.67-1.616-1.84-2.785-3.455-3.455-1.616-.67-2.058-.82-6.098-.87zM12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" clipRule="evenodd" /></svg> },
  { name: 'Facebook', icon: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg> },
  { name: 'YouTube', icon: <svg className="h-6 w-6" fill="currentColor" viewBox="0-0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.506 2.506 0 01-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 01-1.768-1.768C2 15.255 2 12 2 12s0-3.255.418-4.814a2.507 2.507 0 011.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418zM9.999 15.199l5.207-3.199-5.207-3.199v6.398z" clipRule="evenodd" /></svg> },
];

export default function Footer() {
  return (
    <footer className="bg-secondary">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-2 md:mb-0">
            <Image src="/gemini-2.5-flash-image_El_logo_lo_quiero_sin_fondo_y_vectorizado._Elimina_el_texto_y_la_linea_dorada_so-0 (1).png" alt="Octava Logo" width={480} height={300} className="h-20 w-auto" />
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-1 mb-2 md:mb-0">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex space-x-6">
            {socialLinks.map(({ name, icon }) => (
              <a key={name} href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">{name}</span>
                {icon}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} OCTAVA Instruments. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
