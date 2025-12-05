import Dashboard from "./_components/dashboard";

export const metadata = {
  title: 'Dashboard',
  description: 'Cuadro de mando interno de OCTAVA.',
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-headline font-bold">Mini Cuadro de Mando</h1>
        <p className="text-muted-foreground mt-2">Indicadores clave por departamento.</p>
      </div>
      <Dashboard />
    </div>
  );
}
