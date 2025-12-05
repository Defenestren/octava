'use client';

import { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Button } from '@/components/ui/button';
import { Upload, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import { salesData as initialSalesData, kpis as initialSalesKpis } from '@/lib/data/sales';
import { productsData as initialProductsData, kpis as initialProductsKpis } from '@/lib/data/products';
import { marketingData as initialMarketingData, kpis as initialMarketingKpis } from '@/lib/data/marketing';
import { clientsData as initialClientsData, kpis as initialClientsKpis } from '@/lib/data/clients';
import { employeesData as initialEmployeesData, kpis as initialEmployeesKpis } from '@/lib/data/employees';
import { expensesData as initialExpensesData, kpis as initialExpensesKpis } from '@/lib/data/expenses';
import { suppliersData as initialSuppliersData, kpis as initialSuppliersKpis } from '@/lib/data/suppliers';

const KpiCard = ({ title, value, change }) => (
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
                  {`${entry.name}: ${entry.value.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}`}
              </p>
          ))}
        </div>
      );
    }
  
    return null;
  };

const sheetNames = {
    sales: 'Ventas',
    products: 'Productos',
    marketing: 'Marketing',
    clients: 'Clientes',
    employees: 'Empleados',
    expenses: 'Gastos',
    suppliers: 'Proveedores',
};

// No longer need kpiSheetNames as they are calculated
const kpiSheetNames = {
    products: 'KPIs Productos',
    marketing: 'KPIs Marketing',
    clients: 'KPIs Clientes',
    employees: 'KPIs Empleados',
    expenses: 'KPIs Gastos',
    suppliers: 'KPIs Proveedores',
};


export default function Dashboard() {
    const [salesData, setSalesData] = useState(initialSalesData);
    const [salesKpis, setSalesKpis] = useState(initialSalesKpis);
    const [productsData, setProductsData] = useState(initialProductsData);
    const [productsKpis, setProductsKpis] = useState(initialProductsKpis);
    const [marketingData, setMarketingData] = useState(initialMarketingData);
    const [marketingKpis, setMarketingKpis] = useState(initialMarketingKpis);
    const [clientsData, setClientsData] = useState(initialClientsData);
    const [clientsKpis, setClientsKpis] = useState(initialClientsKpis);
    const [employeesData, setEmployeesData] = useState(initialEmployeesData);
    const [employeesKpis, setEmployeesKpis] = useState(initialEmployeesKpis);
    const [expensesData, setExpensesData] = useState(initialExpensesData);
    const [expensesKpis, setExpensesKpis] = useState(initialExpensesKpis);
    const [suppliersData, setSuppliersData] = useState(initialSuppliersData);
    const [suppliersKpis, setSuppliersKpis] = useState(initialSuppliersKpis);

    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const processSalesData = (data) => {
        const monthlySales = {};
        let totalRevenue = 0;
        let totalSales = 0;
        let totalOfficialPrice = 0;
        let totalDiscount = 0;
    
        data.forEach(sale => {
            // Excel dates are numbers. We need to convert them to JS dates.
            // new Date(1900, 0, sale.fecha_venta - 1) is a common way to do it.
            const date = new Date(1900, 0, sale.fecha_venta - 1);
            const monthIndex = date.getMonth();
            const monthName = date.toLocaleString('es-ES', { month: 'long' });
            const monthKey = `${monthName.charAt(0).toUpperCase()}${monthName.slice(1)}`;
    
            const revenue = sale.cantidad * sale.precio_unidad_final;
            const officialRevenue = sale.cantidad * sale.precio_unidad_oficial;

            totalRevenue += revenue;
            totalSales += sale.cantidad;
            totalOfficialPrice += officialRevenue;
            
            if (sale.descuento_aplicado && parseFloat(sale.descuento_aplicado) > 0) {
                 totalDiscount += officialRevenue - revenue;
            }
    
            if (!monthlySales[monthKey]) {
                monthlySales[monthKey] = { month: monthKey, revenue: 0, monthIndex };
            }
            monthlySales[monthKey].revenue += revenue;
        });
    
        const chartData = Object.values(monthlySales).sort((a, b) => a.monthIndex - b.monthIndex);
        setSalesData(chartData);

        const avgSalePrice = totalSales > 0 ? totalRevenue / totalSales : 0;
        const discountRate = totalOfficialPrice > 0 ? (totalDiscount / totalOfficialPrice) * 100 : 0;
    
        setSalesKpis({
            totalRevenue: `€${totalRevenue.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            totalSales: totalSales.toLocaleString('es-ES'),
            avgSalePrice: `€${avgSalePrice.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            discountRate: `${discountRate.toFixed(1)}%`,
            revenueChange: 'N/A',
            salesChange: 'N/A',
            avgSalePriceChange: 'N/A'
        });
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsLoading(true);
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = e.target?.result;
                const workbook = XLSX.read(data, { type: 'binary' });

                // Process Sales sheet
                const salesSheet = workbook.Sheets[sheetNames.sales];
                if (salesSheet) {
                    const salesJson = XLSX.utils.sheet_to_json(salesSheet);
                    processSalesData(salesJson);
                } else {
                     toast({ title: `La hoja "${sheetNames.sales}" no existe`, variant: 'destructive' });
                }

                const parseSheet = (sheetName, setter, kpiSheetName, kpiSetter) => {
                    const worksheet = workbook.Sheets[sheetName];
                    if (worksheet) {
                        const jsonData = XLSX.utils.sheet_to_json(worksheet);
                        setter(jsonData);
                    } else if (sheetName !== sheetNames.sales) { // Avoid double toast for sales
                        toast({ title: `La hoja "${sheetName}" no existe`, variant: 'destructive' });
                    }
                    
                    if (kpiSheetName) {
                        const kpiWorksheet = workbook.Sheets[kpiSheetName];
                        if (kpiWorksheet) {
                             const kpiJson = XLSX.utils.sheet_to_json(kpiWorksheet, { header: 1 });
                             const kpis = Object.fromEntries(kpiJson.slice(1).map(row => [row[0], row[1]]));
                             kpiSetter(kpis);
                        } else {
                            toast({ title: `La hoja "${kpiSheetName}" no existe`, variant: 'destructive' });
                        }
                    }
                };

                parseSheet(sheetNames.products, setProductsData, kpiSheetNames.products, setProductsKpis);
                parseSheet(sheetNames.marketing, setMarketingData, kpiSheetNames.marketing, setMarketingKpis);
                parseSheet(sheetNames.clients, setClientsData, kpiSheetNames.clients, setClientsKpis);
                parseSheet(sheetNames.employees, setEmployeesData, kpiSheetNames.employees, setEmployeesKpis);
                parseSheet(sheetNames.expenses, setExpensesData, kpiSheetNames.expenses, setExpensesKpis);
                parseSheet(sheetNames.suppliers, setSuppliersData, kpiSheetNames.suppliers, setSuppliersKpis);

                toast({ title: 'Datos cargados', description: 'El dashboard ha sido actualizado con el archivo Excel.' });
            } catch (error) {
                console.error("Error processing XLSX file:", error);
                toast({ title: 'Error al procesar el archivo', description: 'El formato del archivo no es válido.', variant: 'destructive' });
            } finally {
                setIsLoading(false);
                if(fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }
        };
        reader.readAsBinaryString(file);
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <Tabs defaultValue="sales" className="w-full">
            <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept=".xlsx, .xls"
            />
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
                <Button onClick={triggerFileInput} disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                    Cargar Tablas
                </Button>
            </div>
            <TabsContent value="sales">
                <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <KpiCard title="Ingresos Totales" value={salesKpis.totalRevenue} change={salesKpis.revenueChange} />
                        <KpiCard title="Ventas Totales" value={salesKpis.totalSales} change={salesKpis.salesChange} />
                        <KpiCard title="Precio Medio Venta" value={salesKpis.avgSalePrice} change={salesKpis.avgSalePriceChange} />
                        <KpiCard title="Tasa de Descuento" value={`${salesKpis.discountRate}`} />
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
                                    <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(value) => `€${typeof value === 'number' ? value / 1000 : 0}k`} />
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
