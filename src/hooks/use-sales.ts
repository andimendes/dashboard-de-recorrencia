"use client";

import { useState, useEffect } from 'react';
import { supabase, type Sale } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export function useSales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Carregar vendas
  const fetchSales = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('sales')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSales(data || []);
    } catch (error) {
      console.error('Erro ao carregar vendas:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as vendas",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Criar nova venda
  const createSale = async (saleData: Omit<Sale, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('sales')
        .insert([saleData])
        .select()
        .single();

      if (error) throw error;

      setSales(prev => [data, ...prev]);
      toast({
        title: "Sucesso",
        description: "Venda registrada com sucesso!"
      });
      return data;
    } catch (error) {
      console.error('Erro ao criar venda:', error);
      toast({
        title: "Erro",
        description: "Não foi possível registrar a venda",
        variant: "destructive"
      });
      throw error;
    }
  };

  // Atualizar venda
  const updateSale = async (id: string, updates: Partial<Sale>) => {
    try {
      const { data, error } = await supabase
        .from('sales')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setSales(prev => prev.map(sale => sale.id === id ? data : sale));
      toast({
        title: "Sucesso",
        description: "Venda atualizada com sucesso!"
      });
      return data;
    } catch (error) {
      console.error('Erro ao atualizar venda:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a venda",
        variant: "destructive"
      });
      throw error;
    }
  };

  // Deletar venda
  const deleteSale = async (id: string) => {
    try {
      const { error } = await supabase
        .from('sales')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSales(prev => prev.filter(sale => sale.id !== id));
      toast({
        title: "Sucesso",
        description: "Venda excluída com sucesso!"
      });
    } catch (error) {
      console.error('Erro ao deletar venda:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir a venda",
        variant: "destructive"
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return {
    sales,
    loading,
    createSale,
    updateSale,
    deleteSale,
    refetch: fetchSales
  };
}