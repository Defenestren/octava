import Dashboard from "./_components/dashboard";

export const metadata = {
  title: 'Dashboard',
  description: 'Cuadro de mando interno de OCTAVA.',
};

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 brightness-50 blur-sm"
      >
        <source src="/3345545-hd_1920_1080_25fps.mp4" type="video/mp4" />
        Tu navegador no soporta el tag de vídeo.
      </video>
      <div className="relative z-10 container mx-auto p-4 md:p-8">
        <div className="mb-8 text-white">
          <h1 className="text-3xl md:text-4xl font-headline font-bold text-shadow-lg">Mini Cuadro de Mando</h1>
          <p className="text-gray-200 mt-2">Indicadores clave por departamento.</p>
        </div>
        <Dashboard />
      </div>
    </div>
  );
}
