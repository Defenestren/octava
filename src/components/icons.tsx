import Image from 'next/image';

export const OctavaLogo = ({ className }: { className?: string }) => (
    <div className={className} style={{ position: 'relative' }}>
      <Image
        src="https://storage.googleapis.com/source-buckets/user-uploads/1719266155554-octava-logo.png"
        alt="Octava Logo"
        layout="fill"
        objectFit="contain"
      />
    </div>
  );