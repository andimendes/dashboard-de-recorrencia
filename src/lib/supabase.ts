import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o banco de dados
export interface Task {
  id: string
  title: string
  description?: string
  type: 'call' | 'email' | 'visit' | 'meeting'
  priority: 'urgent' | 'high' | 'medium' | 'low'
  status: 'pending' | 'completed' | 'cancelled'
  due_date: string
  due_time?: string
  client_name?: string
  vendedor: string
  created_at?: string
  updated_at?: string
}

export interface Client {
  id: string
  name: string
  email?: string
  phone?: string
  address?: string
  score: 'A' | 'B' | 'C'
  status: 'active' | 'inactive' | 'risk'
  last_purchase?: string
  total_purchases?: number
  vendedor: string
  purchase_frequency?: string
  created_at?: string
  updated_at?: string
}

export interface Sale {
  id: string
  client_id?: string
  client_name: string
  vendedor: string
  amount: number
  products?: string
  sale_date: string
  status: 'pending' | 'completed' | 'cancelled'
  created_at?: string
}