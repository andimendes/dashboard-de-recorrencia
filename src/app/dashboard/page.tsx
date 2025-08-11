"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { KPICards } from "@/components/dashboard/kpi-cards";
import { SalesChart } from "@/components/dashboard/sales-chart";
import { ClientsTable } from "@/components/dashboard/clients-table";
import { RecurrenceOverview } from "@/components/dashboard/recurrence-overview";
import { SalesFunnel } from "@/components/dashboard/sales-funnel";

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader />
      
      <KPICards />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="recurrence">Recorrência</TabsTrigger>
          <TabsTrigger value="funnel">Funil de Vendas</TabsTrigger>
          <TabsTrigger value="clients">Clientes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Faturamento</CardTitle>
                <CardDescription>
                  Evolução do faturamento nos últimos 12 meses
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <SalesChart />
              </CardContent>
            </Card>
            
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Top Clientes</CardTitle>
                <CardDescription>
                  Maiores clientes por faturamento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ClientsTable />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recurrence" className="space-y-4">
          <RecurrenceOverview />
        </TabsContent>

        <TabsContent value="funnel" className="space-y-4">
          <SalesFunnel />
        </TabsContent>

        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Base de Clientes</CardTitle>
              <CardDescription>
                Gestão completa da carteira de clientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ClientsTable detailed />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}