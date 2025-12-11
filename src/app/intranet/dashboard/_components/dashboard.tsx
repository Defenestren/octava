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
    <Card className="bg-card/80 backdrop-blur-sm">
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
                  {`${entry.name}: ${
                    typeof entry.value === 'number' && entry.name !== 'Stock' && entry.name !== 'Interacciones' && entry.name !== 'Empleados' && entry.name !== 'Proveedores' && entry.name !== 'Nuevos' && entry.name !== 'Recurrentes' && entry.name !== 'count'
                    ? entry.value.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) 
                    : entry.value
                  }`}
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
            const date = new Date(1900, 0, sale.fecha_venta - 1);
            const monthIndex = date.getMonth();
            const monthName = date.toLocaleString('es-ES', { month: 'long' });
            const monthKey = `${String(monthIndex + 1).padStart(2, '0')}-${monthName.charAt(0).toUpperCase()}${monthName.slice(1)}`;
    
            const revenue = sale.cantidad * sale.precio_unidad_final;
            const officialRevenue = sale.cantidad * sale.precio_unidad_oficial;

            totalRevenue += revenue;
            totalSales += sale.cantidad;
            totalOfficialPrice += officialRevenue;
            
            if (sale.descuento_aplicado && parseFloat(sale.descuento_aplicado) > 0) {
                 totalDiscount += officialRevenue - revenue;
            }
    
            if (!monthlySales[monthKey]) {
                monthlySales[monthKey] = { month: `${monthName.charAt(0).toUpperCase()}${monthName.slice(1)}`, revenue: 0, monthIndex };
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

    const processProductsData = (data) => {
        let totalStockValue = 0;
        let totalStockItems = 0;
        let totalMargin = 0;
        let marginCount = 0;
        const supplierCounts = {};

        data.forEach(product => {
            const stock = product.stock_actual || 0;
            const salePrice = product.precio_venta || 0;
            const costPrice = product.precio_coste || 0;

            totalStockValue += stock * salePrice;
            totalStockItems += stock;

            if (salePrice > 0) {
                const margin = ((salePrice - costPrice) / salePrice) * 100;
                totalMargin += margin;
                marginCount++;
            }

            if (product.nombre_proveedor) {
                supplierCounts[product.nombre_proveedor] = (supplierCounts[product.nombre_proveedor] || 0) + 1;
            }
        });

        const avgMargin = marginCount > 0 ? totalMargin / marginCount : 0;

        const topSupplier = Object.keys(supplierCounts).length > 0 
            ? Object.entries(supplierCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0] 
            : 'N/A';

        setProductsKpis({
            totalStockValue: `€${totalStockValue.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            totalStockItems: totalStockItems.toLocaleString('es-ES'),
            avgMargin: `${avgMargin.toFixed(1)}`,
            topSupplier: topSupplier,
        });

        const sortedProducts = [...data].sort((a, b) => (b.stock_actual || 0) - (a.stock_actual || 0));
        const top5Products = sortedProducts.slice(0, 5).map(p => ({
            name: p.nombre_producto,
            stock: p.stock_actual
        }));
        setProductsData(top5Products);
    };

    const processMarketingData = (data) => {
        let totalInteractions = data.length;
        let totalCost = 0;
        const channelCounts = {};
        const campaignData = {};

        data.forEach(item => {
            const cost = item.coste_interaccion || 0;
            totalCost += cost;

            const channel = item.tipo_interaccion;
            if (channel) {
                channelCounts[channel] = (channelCounts[channel] || 0) + 1;
            }
            
            const campaignName = item.campania || 'Sin Campaña';
            if (!campaignData[campaignName]) {
                campaignData[campaignName] = { campaign: campaignName, interactions: 0, cost: 0 };
            }
            campaignData[campaignName].interactions += 1;
            campaignData[campaignName].cost += cost;
        });

        const costPerInteraction = totalInteractions > 0 ? totalCost / totalInteractions : 0;
        const topChannel = Object.keys(channelCounts).length > 0 
            ? Object.entries(channelCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0] 
            : 'N/A';

        setMarketingKpis({
            totalInteractions: totalInteractions.toLocaleString('es-ES'),
            totalCost: `€${totalCost.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            costPerInteraction: `€${costPerInteraction.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            topChannel: topChannel
        });

        setMarketingData(Object.values(campaignData));
    };

    const processClientsData = (data) => {
        const monthlyData = {};
        const segmentCounts = {};
        let totalClients = 0;
    
        const now = new Date();
        const lastMonthDate = new Date(now.getFullYear(), now.getMonth() -1, 1);
    
        data.forEach(client => {
            const signupDate = new Date(1900, 0, client.fecha_alta - 1);
            const monthIndex = signupDate.getMonth();
            const year = signupDate.getFullYear();
            const monthName = signupDate.toLocaleString('es-ES', { month: 'long' });
            const monthKey = `${year}-${String(monthIndex + 1).padStart(2, '0')}`;
            
            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = { month: `${monthName.charAt(0).toUpperCase()}${monthName.slice(1)}`, monthIndex, year, nuevos: 0, recurrentes: 0 };
            }

            monthlyData[monthKey].nuevos += 1;
    
            if (client.estilo_preferido) {
                segmentCounts[client.estilo_preferido] = (segmentCounts[client.estilo_preferido] || 0) + 1;
            }
        });
    
        const sortedMonths = Object.values(monthlyData).sort((a, b) => a.year - b.year || a.monthIndex - b.monthIndex);
        
        let cumulativeClients = 0;
        const chartData = sortedMonths.map(month => {
            month.recurrentes = cumulativeClients;
            cumulativeClients += month.nuevos;
            return month;
        });

        totalClients = cumulativeClients;
        setClientsData(chartData);
    
        const lastMonthData = chartData[chartData.length - 1] || { nuevos: 0, recurrentes: 0 };
        const newClientsThisMonth = lastMonthData.nuevos;
        const totalClientsLastMonth = lastMonthData.nuevos + lastMonthData.recurrentes;
        const loyaltyRate = totalClientsLastMonth > 0 ? (lastMonthData.recurrentes / totalClientsLastMonth) * 100 : 0;
        
        const topSegment = Object.keys(segmentCounts).length > 0
            ? Object.entries(segmentCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0]
            : 'N/A';
    
        setClientsKpis({
            totalClients: totalClientsLastMonth.toLocaleString('es-ES'),
            loyaltyRate: `${loyaltyRate.toFixed(0)}%`,
            newClientsThisMonth: newClientsThisMonth.toLocaleString('es-ES'),
            topSegment: topSegment,
        });
    };

    const processEmployeesData = (data) => {
        const departmentCounts = {};
        const instrumentCounts = {};
        let totalSalary = 0;
        let musicianCount = 0;

        data.forEach(employee => {
            const department = employee.departamento;
            if (department) {
                departmentCounts[department] = (departmentCounts[department] || 0) + 1;
            }

            totalSalary += employee.salario_base_anual || 0;

            if (employee.es_musico && (String(employee.es_musico).toLowerCase() === 'si' || String(employee.es_musico).toLowerCase() === 'sí' || employee.es_musico === true)) {
                musicianCount++;
                const instrument = employee.instrumento_toca;
                if (instrument) {
                    instrumentCounts[instrument] = (instrumentCounts[instrument] || 0) + 1;
                }
            }
        });
        
        const chartData = Object.entries(departmentCounts).map(([department, count]) => ({
            department,
            count
        }));
        setEmployeesData(chartData);

        const totalEmployees = data.length;
        const avgMonthlySalary = totalEmployees > 0 ? (totalSalary / 12) / totalEmployees : 0;
        const musicianRatio = totalEmployees > 0 ? (musicianCount / totalEmployees) * 100 : 0;
        
        const topInstrument = Object.keys(instrumentCounts).length > 0
            ? Object.entries(instrumentCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0]
            : 'N/A';
        
        setEmployeesKpis({
            totalEmployees: totalEmployees.toLocaleString('es-ES'),
            avgSalary: `€${avgMonthlySalary.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
            musicianRatio: `${musicianRatio.toFixed(0)}%`,
            topInstrument: topInstrument
        });
    };

    const processExpensesData = (data) => {
        const categoryAmounts = {};
        let totalExpenses = 0;
        let totalFixedCost = 0;
        let totalVatAmount = 0;
        let vatCount = 0;
        
        data.forEach(expense => {
            const amount = expense.importe || 0;
            totalExpenses += amount;
            
            if (String(expense.periodicidad).toLowerCase() === 'mensual') {
                totalFixedCost += amount;
            }
            
            const category = expense.id_categoria_gasto || 'Sin Categoría';
            categoryAmounts[category] = (categoryAmounts[category] || 0) + amount;
            
            if (expense.tipo_iva && typeof expense.tipo_iva === 'string') {
                 const vatRate = parseFloat(expense.tipo_iva.replace('%', ''));
                 if(!isNaN(vatRate)) {
                    totalVatAmount += vatRate;
                    vatCount++;
                 }
            }
        });
        
        const chartData = Object.entries(categoryAmounts).map(([category, amount]) => ({
            category,
            amount
        })).sort((a,b) => b.amount - a.amount);
        setExpensesData(chartData);

        const fixedCostPct = totalExpenses > 0 ? (totalFixedCost / totalExpenses) * 100 : 0;
        
        const topCategory = Object.keys(categoryAmounts).length > 0
            ? Object.entries(categoryAmounts).reduce((a, b) => a[1] > b[1] ? a : b)[0]
            : 'N/A';
        
        const avgVat = vatCount > 0 ? totalVatAmount / vatCount : 0;

        setExpensesKpis({
            totalExpenses: `€${totalExpenses.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            fixedCostPct: `${fixedCostPct.toFixed(0)}%`,
            topCategory: topCategory,
            avgVat: `${avgVat.toFixed(1)}%`
        });
    };

    const processSuppliersData = (data) => {
        const countryCounts = {};
        const categoryCounts = {};
        const riskLevels = { 'Bajo': 1, 'Bajo-Medio': 2, 'Medio': 3, 'Medio-Alto': 4, 'Alto': 5 };
        let totalRiskScore = 0;
        let riskCount = 0;

        data.forEach(supplier => {
            if (supplier.pais) {
                countryCounts[supplier.pais] = (countryCounts[supplier.pais] || 0) + 1;
            }
            if (supplier.categoria_principal) {
                categoryCounts[supplier.categoria_principal] = (categoryCounts[supplier.categoria_principal] || 0) + 1;
            }
            if (supplier.nivel_riesgo && riskLevels[supplier.nivel_riesgo]) {
                totalRiskScore += riskLevels[supplier.nivel_riesgo];
                riskCount++;
            }
        });

        const chartData = Object.entries(countryCounts).map(([country, count]) => ({ country, count }));
        setSuppliersData(chartData);

        const topCategory = Object.keys(categoryCounts).length > 0
            ? Object.entries(categoryCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0]
            : 'N/A';

        const topCountry = Object.keys(countryCounts).length > 0
            ? Object.entries(countryCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0]
            : 'N/A';

        const avgRiskScore = riskCount > 0 ? totalRiskScore / riskCount : 0;
        const avgRiskLabel = Object.keys(riskLevels).find(key => riskLevels[key] >= avgRiskScore) || 'N/A';

        setSuppliersKpis({
            totalSuppliers: data.length.toLocaleString('es-ES'),
            topCategory: topCategory,
            avgRisk: avgRiskLabel,
            topCountry: topCountry
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

                // Process Products sheet
                const productsSheet = workbook.Sheets[sheetNames.products];
                if (productsSheet) {
                    const productsJson = XLSX.utils.sheet_to_json(productsSheet);
                    processProductsData(productsJson);
                } else {
                    toast({ title: `La hoja "${sheetNames.products}" no existe`, variant: 'destructive' });
                }

                 // Process Marketing sheet
                 const marketingSheet = workbook.Sheets[sheetNames.marketing];
                 if (marketingSheet) {
                     const marketingJson = XLSX.utils.sheet_to_json(marketingSheet);
                     processMarketingData(marketingJson);
                 } else {
                     toast({ title: `La hoja "${sheetNames.marketing}" no existe`, variant: 'destructive' });
                 }

                // Process Clients sheet
                const clientsSheet = workbook.Sheets[sheetNames.clients];
                if (clientsSheet) {
                    const clientsJson = XLSX.utils.sheet_to_json(clientsSheet);
                    processClientsData(clientsJson);
                } else {
                    toast({ title: `La hoja "${sheetNames.clients}" no existe`, variant: 'destructive' });
                }
                 
                // Process Employees sheet
                const employeesSheet = workbook.Sheets[sheetNames.employees];
                if (employeesSheet) {
                    const employeesJson = XLSX.utils.sheet_to_json(employeesSheet);
                    processEmployeesData(employeesJson);
                } else {
                    toast({ title: `La hoja "${sheetNames.employees}" no existe`, variant: 'destructive' });
                }
                
                // Process Expenses sheet
                const expensesSheet = workbook.Sheets[sheetNames.expenses];
                if (expensesSheet) {
                    const expensesJson = XLSX.utils.sheet_to_json(expensesSheet);
                    processExpensesData(expensesJson);
                } else {
                    toast({ title: `La hoja "${sheetNames.expenses}" no existe`, variant: 'destructive' });
                }
                
                // Process Suppliers sheet
                const suppliersSheet = workbook.Sheets[sheetNames.suppliers];
                if (suppliersSheet) {
                    const suppliersJson = XLSX.utils.sheet_to_json(suppliersSheet);
                    processSuppliersData(suppliersJson);
                } else {
                    toast({ title: `La hoja "${sheetNames.suppliers}" no existe`, variant: 'destructive' });
                }


                const parseSheet = (sheetName, setter, kpiSheetName, kpiSetter) => {
                    const worksheet = workbook.Sheets[sheetName];
                    if (worksheet) {
                        const jsonData = XLSX.utils.sheet_to_json(worksheet);
                        if (
                            sheetName !== sheetNames.sales && 
                            sheetName !== sheetNames.products &&
                            sheetName !== sheetNames.marketing &&
                            sheetName !== sheetNames.clients &&
                            sheetName !== sheetNames.employees &&
                            sheetName !== sheetNames.expenses &&
                            sheetName !== sheetNames.suppliers
                        ) {
                            setter(jsonData);
                        }
                    } else if (
                        sheetName !== sheetNames.sales && 
                        sheetName !== sheetNames.products &&
                        sheetName !== sheetNames.marketing &&
                        sheetName !== sheetNames.clients &&
                        sheetName !== sheetNames.employees &&
                        sheetName !== sheetNames.expenses &&
                        sheetName !== sheetNames.suppliers
                        ) {
                        toast({ title: `La hoja "${sheetName}" no existe`, variant: 'destructive' });
                    }
                    
                    if (kpiSheetName) {
                        const kpiWorksheet = workbook.Sheets[kpiSheetName];
                        if (kpiWorksheet) {
                             const kpiJson = XLSX.utils.sheet_to_json(kpiWorksheet, { header: 1 });
                             const kpis = Object.fromEntries(kpiJson.slice(1).map(row => [row[0], row[1]]));
                             kpiSetter(kpis);
                        }
                    }
                };

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
                <TabsList className="flex-wrap h-auto bg-card/80 backdrop-blur-sm">
                    <TabsTrigger value="sales">Ventas</TabsTrigger>
                    <TabsTrigger value="products">Productos</TabsTrigger>
                    <TabsTrigger value="marketing">Marketing</TabsTrigger>
                    <TabsTrigger value="clients">Clientes</TabsTrigger>
                    <TabsTrigger value="employees">Empleados</TabsTrigger>
                    <TabsTrigger value="expenses">Gastos</TabsTrigger>
                    <TabsTrigger value="suppliers">Proveedores</TabsTrigger>
                </TabsList>
                <Button onClick={triggerFileInput} disabled={isLoading} className="relative overflow-hidden group">
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
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
                    <Card className="bg-card/80 backdrop-blur-sm">
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
                     <Card className="bg-card/80 backdrop-blur-sm">
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
                     <Card className="bg-card/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Interacciones y Coste por Campaña</CardTitle>
                             <CardDescription>Análisis del rendimiento y coste de las diferentes campañas de marketing.</CardDescription>
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
                     <Card className="bg-card/80 backdrop-blur-sm">
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
                     <Card className="bg-card/80 backdrop-blur-sm">
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
                     <Card className="bg-card/80 backdrop-blur-sm">
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
                     <Card className="bg-card/80 backdrop-blur-sm">
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

    



    

    



