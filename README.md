# Mister Ottani Vendas PRO

Sistema completo de CRM e acompanhamento de vendas para a indústria de massas alimentícias.

## 🚀 Deploy na Vercel

### Pré-requisitos
- Conta no GitHub
- Conta na Vercel
- Node.js 18+ instalado

### Passo a Passo para Deploy

#### 1. Preparar o Repositório GitHub
```bash
# Clone o projeto
git clone <seu-repositorio>
cd mister-ottani-vendas-pro

# Instale as dependências
npm install

# Teste localmente
npm run dev
```

#### 2. Conectar GitHub com Vercel

1. **Acesse [vercel.com](https://vercel.com)**
2. **Faça login com sua conta GitHub**
3. **Clique em "New Project"**
4. **Selecione seu repositório GitHub**
5. **Configure as variáveis de ambiente**

#### 3. Configurar Variáveis de Ambiente na Vercel

No painel da Vercel, vá em **Settings > Environment Variables** e adicione:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_supabase
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role
NEXTAUTH_SECRET=seu_secret_nextauth
```

#### 4. Deploy Automático

- Após conectar o repositório, a Vercel fará o deploy automaticamente
- Cada push na branch `main` disparará um novo deploy
- Acesse sua aplicação na URL fornecida pela Vercel

### 🔧 Solução de Problemas

#### Erro: "GitHub-Vercel configuration error"

1. **Desconecte e reconecte as contas:**
   - Vá em GitHub Settings > Applications
   - Revogue o acesso da Vercel
   - Reconecte via Vercel Dashboard

2. **Verifique permissões do repositório:**
   - Certifique-se que a Vercel tem acesso ao repositório
   - O repositório deve ser público ou a Vercel deve ter permissão

3. **Reconfigure o projeto:**
   - Delete o projeto na Vercel
   - Crie um novo projeto
   - Reimporte do GitHub

#### Erro de Build

1. **Verifique as dependências:**
   ```bash
   npm install
   npm run build
   ```

2. **Limpe o cache:**
   ```bash
   npm run clean
   rm -rf .next
   npm install
   ```

3. **Verifique variáveis de ambiente:**
   - Todas as variáveis necessárias estão configuradas?
   - Os valores estão corretos?

### 📁 Estrutura do Projeto

```
src/
├── app/                 # App Router do Next.js
│   ├── dashboard/       # Páginas do dashboard
│   └── page.tsx         # Página inicial
├── components/          # Componentes React
│   ├── ui/             # Componentes base (Shadcn/UI)
│   ├── dashboard/      # Componentes do dashboard
│   ├── clients/        # Componentes de clientes
│   ├── recurrence/     # Componentes de recorrência
│   ├── sales-funnel/   # Componentes do funil
│   ├── prospects/      # Componentes de prospecção
│   ├── reports/        # Componentes de relatórios
│   └── tasks/          # Componentes de tarefas
└── lib/                # Utilitários e configurações
```

### 🛠️ Tecnologias Utilizadas

- **Framework:** Next.js 14 (App Router)
- **UI:** Shadcn/UI + Tailwind CSS
- **Gráficos:** Recharts
- **Ícones:** Lucide React
- **Formulários:** React Hook Form
- **Validação:** Zod
- **Deploy:** Vercel

### 📊 Funcionalidades

- ✅ Dashboard com KPIs em tempo real
- ✅ Gestão completa de clientes (360°)
- ✅ Acompanhamento de recorrência proativo
- ✅ Funil de vendas visual
- ✅ Sistema de prospecção
- ✅ Relatórios avançados
- ✅ Gestão de tarefas e agenda
- ✅ Sistema de scoring automático
- ✅ Integração preparada para Sankhya ERP

### 🔗 Links Úteis

- [Documentação do Next.js](https://nextjs.org/docs)
- [Documentação da Vercel](https://vercel.com/docs)
- [Shadcn/UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

### 📞 Suporte

Para dúvidas ou problemas:
1. Verifique a documentação
2. Consulte os logs de build na Vercel
3. Entre em contato com o suporte técnico