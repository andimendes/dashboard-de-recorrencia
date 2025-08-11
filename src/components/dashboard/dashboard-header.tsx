"use client";

import { Button } from "@/components/ui/button";
import { CalendarDays, Download } from "lucide-react";

export function DashboardHeader() {
  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="flex items-center justify-between space-y-2">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          {today}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          <CalendarDays className="mr-2 h-4 w-4" />
          Período
        </Button>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      </div>
    </div>
  );
}