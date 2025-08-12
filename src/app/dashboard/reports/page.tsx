"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/reports/date-picker-range";
import { SalesReport } from "@/components/reports/sales-report";
import { ClientsReport } from "@/components/reports/clients-report";
import { PerformanceReport } from "@/components/reports/performance-report";
import { RecurrenceReport } from "@/components/reports/recurrence-report";
import { Download, FileText, BarChart3, TrendingUp, Users, Target } from "lucide-react";
import { DateRange } from "react-day-picker";

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(2024, 0, 1),
    to: new Date()
  });
  const [selectedVendedor, setSelectedVendedor] = useState("all");
  const [reportType, setReportType] = useState("sales");

  const vendedores = [
    { value: "all", label: "Todos os Vendedores" },
    { value: "joao", label: "João Silva" },
    { value: "maria", label: "Maria Santos" },
    { value: "carlos", label: "Carlos Lima" },
    { value: "ana", label: "Ana Costa" }
  ];

  const handleExport = (format: "pdf" | "excel") => {
    console.log(`Exportando relatório em ${format}`, {
      type: reportType,
      dateRange,
      vendedor: selectedVendedor
    });
    // Aqui seria implementada a lógica de exportação
  };

  const handleDateChange = (date: DateRange | undefined) => {
    if (date) {
      setDateRange(date);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Relatórios</h2>
          <p className="text-muted-foreground">
            Análises detalhadas e relatórios de performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => handleExport("excel")}>
            <Download className="mr-2 h-4 w-4" />
            Excel
          </Button>
          <Button variant="outline" onClick={() => handleExport("pdf")}>
            <FileText className="mr-2 h-4 w-4" />
            PDF
          </Button>
        </div>
      </div>

      {/* Filtros Globais */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>
            Configure os filtros para personalizar os relatórios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <DatePickerWithRange
                date={dateRange}
                onDateChange={handleDateChange}
              />
            </div>
            <Select value={selectedVendedor} onValueChange={setSelectedVendedor}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Selecionar vendedor" />
              </SelectTrigger>
              <SelectContent>
                {vendedores.map((vendedor) => (
                  <SelectItem key={vendedor.value} value={vendedor.value}>
                    {vendedor.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs value={reportType} onValueChange={setReportType} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sales" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Vendas
          </TabsTrigger>
          <TabsTrigger value="clients" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Clientes
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="recurrence" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Recorrência
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          <SalesReport dateRange={dateRange} vendedor={selectedVendedor} />
        </TabsContent>

        <TabsContent value="clients" className="space-y-4">
          <ClientsReport dateRange={dateRange} vendedor={selectedVendedor} />
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <PerformanceReport dateRange={dateRange} vendedor={selectedVendedor} />
        </TabsContent>

        <TabsContent value="recurrence" className="space-y-4">
          <RecurrenceReport dateRange={dateRange} vendedor={selectedVendedor} />
        </TabsContent>
      </Tabs>
    </div>
  );
}