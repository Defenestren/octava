// Data derived from clientes_octava_bcn.xlsx
export const clientsData = [
    { month: 'Enero', nuevos: 8, recurrentes: 52 },
    { month: 'Febrero', nuevos: 10, recurrentes: 55 },
    { month: 'Marzo', nuevos: 15, recurrentes: 60 },
    { month: 'Abril', nuevos: 12, recurrentes: 65 },
    { month: 'Mayo', nuevos: 18, recurrentes: 70 },
    { month: 'Junio', nuevos: 20, recurrentes: 75 },
];

export const kpis = {
    totalClients: 95, // recurring (last month) + new (last month)
    loyaltyRate: '79%', // recurring / total
    newClientsThisMonth: 20,
    topSegment: 'Rock Clásico',
    paymentRisk: 'Bajo',
};
