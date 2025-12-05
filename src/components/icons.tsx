import { cn } from "@/lib/utils";

export const OctavaLogo = ({ className }: { className?: string }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 200 50" 
      className={cn("fill-current", className)}
      aria-label="Octava Logo"
    >
      <path d="M25,5 C12.8,5 5,12.8 5,25 C5,37.2 12.8,45 25,45 C37.2,45 45,37.2 45,25 C45,12.8 37.2,5 25,5 Z M25,40 C15.6,40 10,34.4 10,25 C10,15.6 15.6,10 25,10 C34.4,10 40,15.6 40,25 C40,34.4 34.4,40 25,40 Z" />
      <path d="M60,5 L75,5 L75,45 L60,45 Z" />
      <path d="M90,5 L105,5 L105,20 L120,5 L135,5 L115,25 L135,45 L120,45 L105,30 L105,45 L90,45 Z" />
      <path d="M150,5 L165,5 L165,20 C165,12.8 157.2,5 150,5 Z M150,25 L165,25 L165,45 L150,45 Z" />
      <path d="M180,5 L195,5 L187.5,25 L195,45 L180,45 L172.5,25 Z" />
    </svg>
  );
  