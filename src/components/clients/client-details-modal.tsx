"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, DollarSign, Calendar, TrendingUp, Package } from "lucide-react";

interface ClientDetailsModalProps {
  client: any;
  open: boolean;
  onClose: () => void;
}

export function ClientDetailsModal({ client, open, onClose }: ClientDetailsModalProps) {
  const getScoreBadgeVariant = (score: string) => {
    switch (score) {
      case "A": return "default";
      case "B": return "secondary";
      case "C": return "outline";
      default: return "outline";
    }
  };

  const purchaseHistory = [
    { date: "2024-01-15", products: ["Massa de Pastel"], value: 2500, vendedor: "João Silva" },
    { date: "2024-01-01", products: ["Massa de Lasanha"], value: 3200, vendedor: "João Silva" },
    { date: "2023-12-15", products: ["Massa de Pizza", "Massa de Pastel"], value: 4100, vendedor: "João Silva" },
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
            Informações detalhadas do cliente
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="contact">Contato</TabsTrigger>
            <TabsTrigger value="purchases">Compras</TabsTrigger>
            <TabsTrigger value="analytics">Análises</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informações Comerciais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Faturamento: R$ {client.faturamento.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Última compra: {new Date(client.ultimaCompra).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Frequência: {client.frequencia}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">PMP: {client.pmp} dias</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Produtos Consumidos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {client.produtos.map((produto: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{produto}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dados de Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium mb-1">CNPJ</p>
                    <p className="text-sm text-muted-foreground">{client.cnpj}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Vendedor Responsável</p>
                    <p className="text-sm text-muted-foreground">{client.vendedor}</p>
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
                  <div className="md:col-span-2">
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

          <TabsContent value="purchases" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Histórico de Compras</CardTitle>
                <CardDescription>Últimas transações do cliente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {purchaseHistory.map((purchase, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">
                            {new Date(purchase.date).toLocaleDateString('pt-BR')}
                          </span>
                          <Badge variant="outline">
                            R$ {purchase.value.toLocaleString('pt-BR')}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Produtos: {purchase.products.join(', ')}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Vendedor: {purchase.vendedor}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Ticket Médio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 3.267</div>
                  <p className="text-xs text-muted-foreground">+12% vs mês anterior</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Frequência de Compra</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{client.pmp} dias</div>
                  <p className="text-xs text-muted-foreground">Prazo médio de pedido</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Produtos Favoritos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm font-bold">Massa de Pastel</div>
                  <p className="text-xs text-muted-foreground">60% das compras</p>
                </CardContent>
              </Card>
            </div>
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