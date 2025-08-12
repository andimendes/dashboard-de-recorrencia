"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSales } from "@/hooks/use-sales";
import { useClients } from "@/hooks/use-clients";

interface AddSaleModalProps {
  open: boolean;
  onClose: () => void;
}

export function AddSaleModal({ open, onClose }: AddSaleModalProps) {
  const { createSale } = useSales();
  const { clients } = useClients();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    client_id: "",
    client_name: "",
    vendedor: "",
    amount: "",
    products: "",
    sale_date: "",
    status: "completed" as "pending" | "completed" | "cancelled"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.client_name || !formData.vendedor || !formData.amount || !formData.sale_date) {
      return;
    }

    try {
      setLoading(true);
      await createSale({
        client_id: formData.client_id || undefined,
        client_name: formData.client_name,
        vendedor: formData.vendedor,
        amount: parseFloat(formData.amount),
        products: formData.products || undefined,
        sale_date: formData.sale_date,
        status: formData.status
      });
      
      onClose();
      setFormData({
        client_id: "",
        client_name: "",
        vendedor: "",
        amount: "",
        products: "",
        sale_date: "",
        status: "completed"
      });
    } catch (error) {
      console.error('Erro ao criar venda:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleClientSelect = (clientName: string) => {
    const selectedClient = clients.find(client => client.name === clientName);
    setFormData(prev => ({
      ...prev,
      client_name: clientName,
      client_id: selectedClient?.id || "",
      vendedor: selectedClient?.vendedor || prev.vendedor
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Venda</DialogTitle>
          <DialogDescription>
            Registre uma nova venda no sistema
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações da Venda</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="client_name">Cliente *</Label>
                  <Select value={formData.client_name} onValueChange={handleClientSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.name}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vendedor">Vendedor *</Label>
                  <Select value={formData.vendedor} onValueChange={(value) => handleChange("vendedor", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar vendedor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="João Silva">João Silva</SelectItem>
                      <SelectItem value="Maria Santos">Maria Santos</SelectItem>
                      <SelectItem value="Carlos Lima">Carlos Lima</SelectItem>
                      <SelectItem value="Ana Costa">Ana Costa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="amount">Valor da Venda *</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.amount}
                    onChange={(e) => handleChange("amount", e.target.value)}
                    placeholder="0,00"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sale_date">Data da Venda *</Label>
                  <Input
                    id="sale_date"
                    type="date"
                    value={formData.sale_date}
                    onChange={(e) => handleChange("sale_date", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="products">Produtos/Serviços</Label>
                <Textarea
                  id="products"
                  value={formData.products}
                  onChange={(e) => handleChange("products", e.target.value)}
                  placeholder="Descreva os produtos ou serviços vendidos..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status da Venda</Label>
                <Select value={formData.status} onValueChange={(value: "pending" | "completed" | "cancelled") => handleChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="completed">Concluída</SelectItem>
                    <SelectItem value="cancelled">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Registrando..." : "Registrar Venda"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}