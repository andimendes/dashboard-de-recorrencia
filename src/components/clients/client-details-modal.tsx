"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Calendar, DollarSign, Package, Clock } from "lucide-react";

interface Client {
  id: string;
  name: string;
  cnpj: string;
  score: "A" | "B" | "C";
  faturamento: number;
  ultimaCompra: string;
  frequencia: string;
  vendedor: string;
  telefone: string;
  email: string;
  endereco: string;
  pmp: number;
  produtos: string[];
}

interface ClientDetailsModalProps {
  client: Client;
  open: boolean;
  onClose: () => void;
}

export function ClientDetailsModal({ client, open, onClose }: ClientDetailsModalProps) {
  const getScoreBadgeVariant = (score: "A" | "B" | "C") => {
    switch (score) {
      case "A": return "default";
      case "B": return "secondary";
      case "C": return "outline";
      default: return "outline";
    }
  };

  // Dados simulados de histórico
  const recentOrders = [
    { date: "2024-01-15", value: 3500, products: "Massa de Pastel, Massa de Pizza" },
    { date: "2024-01-08", value: 4200, products: "Massa de Lasanha, Massa de Pizza" },
    { date: "2024-01-01", value: 2800, products: "Massa de Pastel" },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {client.name}
            <Badge variant={getScoreBadgeVariant(client.score)}>
              Score {client.score}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Informações completas do cliente
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="contact">Contato</TabsTrigger>
            <TabsTrigger value="sales">Vendas</TabsTrigger>
            <TabsTrigger value="products">Produtos</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Dados Comerciais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Faturamento: R$ {client.faturamento.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Frequência: {client.frequencia}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">PMP: {client.pmp} dias</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Vendedor: {client.vendedor}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Última Atividade</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Última Compra</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(client.ultimaCompra).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      Em dia
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informações de Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium mb-1">CNPJ</p>
                    <p className="text-sm text-muted-foreground">{client.cnpj}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Telefone</p>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{client.telefone}</span>
                      <Button size="sm" variant="outline">Ligar</Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">E-mail</p>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{client.email}</span>
                      <Button size="sm" variant="outline">Enviar</Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Endereço</p>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{client.endereco}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sales" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Histórico de Vendas</CardTitle>
                <CardDescription>Últimos pedidos realizados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentOrders.map((order, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">
                          {new Date(order.date).toLocaleDateString('pt-BR')}
                        </p>
                        <p className="text-xs text-muted-foreground">{order.products}</p>
                      </div>
                      <Badge variant="outline">
                        R$ {order.value.toLocaleString('pt-BR')}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mix de Produtos</CardTitle>
                <CardDescription>Produtos comprados regularmente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {client.produtos.map((produto, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 border rounded">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{produto}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
          <Button>
            Editar Cliente
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}