'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { salesData, kpis as salesKpis } from '@/lib/data/sales';
import { productsData, kpis as productsKpis } from '@/lib/data/products';
import { marketingData, kpis as marketingKpis } from '@/lib/data/marketing';
import { clientsData, kpis as clientsKpis } from '@/lib/data/clients';
import { employeesData, kpis as employeesKpis } from '@/lib/data/employees';
import { expensesData, kpis as expensesKpis } from '@/lib/data/expenses';
import { suppliersData, kpis as suppliersKpis } from '@/lib/data/suppliers';

const KpiCard = ({ title, value, change, description }) => (
    <Card>
        <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="text-3xl font-bold">{value}</div>
            {change && <p className="text-xs text-muted-foreground">{change}</p>}
        </CardContent>
    </Card>
);

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 text-xs bg-background/90 border border-border rounded-lg shadow-lg">
          <p className="label font-bold text-foreground">{`${label}`}</p>
          {payload.map((entry, index) => (
              <p key={`item-${index}`} style={{ color: entry.color }}>
                  {`${entry.name}: ${entry.value.toLocaleString('es-ES')}`}
              </p>
          ))}
        </div>
      );
    }
  
    return null;
  };

export default function Dashboard() {
    return (
        <Tabs defaultValue="sales" className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <TabsList className="flex-wrap h-auto">
                    <TabsTrigger value="sales">Ventas</TabsTrigger>
                    <TabsTrigger value="products">Productos</TabsTrigger>
                    <TabsTrigger value="marketing">Marketing</TabsTrigger>
                    <TabsTrigger value="clients">Clientes</TabsTrigger>
                    <TabsTrigger value="employees">Empleados</TabsTrigger>
                    <TabsTrigger value="expenses">Gastos</TabsTrigger>
                    <TabsTrigger value="suppliers">Proveedores</TabsTrigger>
                </TabsList>
                <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Cargar Tablas
                </Button>
            </div>
            <TabsContent value="sales">
                <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <KpiCard title="Ingresos Totales" value={salesKpis.totalRevenue} change={salesKpis.revenueChange + " vs mes anterior"} />
                        <KpiCard title="Ventas Totales" value={salesKpis.totalSales} change={salesKpis.salesChange + " vs mes anterior"} />
                        <KpiCard title="Precio Medio Venta" value={salesKpis.avgSalePrice} change={salesKpis.avgSalePriceChange + " vs mes anterior"} />
                        <KpiCard title="Tasa de Descuento" value={`${salesKpis.discountRate}%`} />
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Ventas por Mes</CardTitle>
                            <CardDescription>Resumen de los ingresos generados cada mes.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={salesData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                                    <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(value) => `€${value / 1000}k`} />
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--accent))' }} />
                                    <Bar dataKey="revenue" name="Ingresos" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
            <TabsContent value="products">
                <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <KpiCard title="Valor Total Stock" value={productsKpis.totalStockValue} />
                        <KpiCard title="Items en Stock" value={productsKpis.totalStockItems} />
                        <KpiCard title="Margen Medio" value={`${productsKpis.avgMargin}%`} />
                        <KpiCard title="Proveedor Principal" value={productsKpis.topSupplier} />
                    </div>
                     <Card>
                        <CardHeader>
                            <CardTitle>Top 5 Productos por Stock</CardTitle>
                             <CardDescription>Productos con mayor número de unidades en el inventario.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={productsData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                                    <YAxis type="category" dataKey="name" width={150} stroke="hsl(var(--muted-foreground))" />
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--accent))' }} />
                                    <Bar dataKey="stock" name="Stock" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
            <TabsContent value="marketing">
                <div className="space-y-4">
                     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <KpiCard title="Interacciones Totales" value={marketingKpis.totalInteractions} />
                        <KpiCard title="Coste Total Campañas" value={marketingKpis.totalCost} />
                        <KpiCard title="Coste por Interacción" value={marketingKpis.costPerInteraction} />
                        <KpiCard title="Canal Principal" value={marketingKpis.topChannel} />
                    </div>
                     <Card>
                        <CardHeader>
                            <CardTitle>Interacciones y Coste por Campaña</CardTitle>
                             <CardDescription>Evolución de las interacciones y el coste a lo largo del tiempo.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={marketingData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="campaign" stroke="hsl(var(--muted-foreground))" />
                                    <YAxis yAxisId="left" stroke="hsl(var(--primary))" />
                                    <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" tickFormatter={(value) => `€${value}`}/>
                                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--accent))', strokeWidth: 2 }} />
                                    <Legend />
                                    <Line yAxisId="left" type="monotone" dataKey="interactions" name="Interacciones" stroke="hsl(var(--primary))" strokeWidth={2} />
                                    <Line yAxisId="right" type="monotone" dataKey="cost" name="Coste" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
            <TabsContent value="clients">
                <div className="space-y-4">
                     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <KpiCard title="Clientes Totales (Últ. Mes)" value={clientsKpis.totalClients} />
                        <KpiCard title="Tasa de Fidelización" value={clientsKpis.loyaltyRate} />
                        <KpiCard title="Nuevos Clientes (Mes)" value={clientsKpis.newClientsThisMonth} />
                        <KpiCard title="Segmento Principal" value={clientsKpis.topSegment} />
                    </div>
                     <Card>
                        <CardHeader>
                            <CardTitle>Clientes Nuevos vs. Recurrentes</CardTitle>
                             <CardDescription>Evolución mensual de la base de clientes.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={clientsData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                                    <YAxis stroke="hsl(var(--muted-foreground))" />
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--accent))' }} />
                                    <Legend />
                                    <Bar dataKey="recurrentes" name="Recurrentes" stackId="a" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="nuevos" name="Nuevos" stackId="a" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
            <TabsContent value="employees">
                <div className="space-y-4">
                     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <KpiCard title="Total Empleados" value={employeesKpis.totalEmployees} />
                        <KpiCard title="Salario Medio" value={employeesKpis.avgSalary} />
                        <KpiCard title="Ratio Músicos" value={employeesKpis.musicianRatio} />
                        <KpiCard title="Instrumento Principal" value={employeesKpis.topInstrument} />
                    </div>
                     <Card>
                        <CardHeader>
                            <CardTitle>Empleados por Departamento</CardTitle>
                             <CardDescription>Distribución de los empleados en la empresa.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={employeesData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="department" stroke="hsl(var(--muted-foreground))" />
                                    <YAxis stroke="hsl(var(--muted-foreground))" />
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--accent))' }} />
                                    <Bar dataKey="count" name="Empleados" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
            <TabsContent value="expenses">
                <div className="space-y-4">
                     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <KpiCard title="Gastos Totales (Mes)" value={expensesKpis.totalExpenses} />
                        <KpiCard title="% Gasto Fijo" value={expensesKpis.fixedCostPct} />
                        <KpiCard title="Categoría Principal" value={expensesKpis.topCategory} />
                        <KpiCard title="IVA Medio" value={expensesKpis.avgVat} />
                    </div>
                     <Card>
                        <CardHeader>
                            <CardTitle>Distribución de Gastos</CardTitle>
                             <CardDescription>Desglose de los principales gastos operativos.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={expensesData} layout="vertical">
                                     <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" tickFormatter={(value) => `€${value / 1000}k`} />
                                    <YAxis type="category" dataKey="category" width={100} stroke="hsl(var(--muted-foreground))" />
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--accent))' }} />
                                    <Bar dataKey="amount" name="Importe" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
            <TabsContent value="suppliers">
                <div className="space-y-4">
                     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <KpiCard title="Total Proveedores" value={suppliersKpis.totalSuppliers} />
                        <KpiCard title="Categoría Principal" value={suppliersKpis.topCategory} />
                        <KpiCard title="Riesgo Medio" value={suppliersKpis.avgRisk} />
                        <KpiCard title="País Principal" value={suppliersKpis.topCountry} />
                    </div>
                     <Card>
                        <CardHeader>
                            <CardTitle>Proveedores por País</CardTitle>
                             <CardDescription>Origen geográfico de nuestros proveedores.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={suppliersData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="country" stroke="hsl(var(--muted-foreground))" />
                                    <YAxis stroke="hsl(var(--muted-foreground))" />
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--accent))' }} />
                                    <Bar dataKey="count" name="Proveedores" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
        </Tabs>
    );
}
