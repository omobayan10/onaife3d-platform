import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import StatCard from '@/components/admin/StatCard';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DashboardData {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  cashbackSpent: number;
  conversionRate: number;
  topProducts: Array<{ name: string; sales: number }>;
  monthlyRevenue: Array<{ month: string; revenue: number }>;
}

export default function AdminDashboard() {
  const [dashboardData] = useState<DashboardData>({
    totalSales: 125450.50,
    totalOrders: 342,
    totalCustomers: 1205,
    cashbackSpent: 6272.50,
    conversionRate: 3.8,
    topProducts: [
      { name: 'Orixá Xangô', sales: 45 },
      { name: 'Orixá Iemanjá', sales: 38 },
      { name: 'Orixá Oxalá', sales: 35 },
      { name: 'Orixá Yemanjá Grande', sales: 28 },
    ],
    monthlyRevenue: [
      { month: 'Jan', revenue: 15000 },
      { month: 'Fev', revenue: 18000 },
      { month: 'Mar', revenue: 22000 },
      { month: 'Abr', revenue: 25000 },
      { month: 'Mai', revenue: 28000 },
      { month: 'Jun', revenue: 27000 },
    ],
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Bem-vindo ao painel de controle ONAIFE3D</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total de Vendas"
            value={`R$ ${dashboardData.totalSales.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            change="+12.5%"
            trend="up"
            icon="💰"
          />
          <StatCard
            title="Pedidos"
            value={dashboardData.totalOrders.toString()}
            change="+8.2%"
            trend="up"
            icon="📦"
          />
          <StatCard
            title="Clientes"
            value={dashboardData.totalCustomers.toString()}
            change="+15.3%"
            trend="up"
            icon="👥"
          />
          <StatCard
            title="Cashback Gasto"
            value={`R$ ${dashboardData.cashbackSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            change="+5.1%"
            trend="up"
            icon="🎁"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gold/20">
            <h2 className="text-xl font-bold text-white mb-6">Receita Mensal</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData.monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #d4af37' }}
                  cursor={{ stroke: '#d4af37' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#d4af37" 
                  strokeWidth={3}
                  name="Receita"
                  dot={{ fill: '#d4af37' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top Products Chart */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gold/20">
            <h2 className="text-xl font-bold text-white mb-6">Produtos Mais Vendidos</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData.topProducts}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis stroke="#666" dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #d4af37' }}
                />
                <Legend />
                <Bar 
                  dataKey="sales" 
                  fill="#d4af37" 
                  name="Vendas"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gold/20">
          <h2 className="text-xl font-bold text-white mb-6">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="p-4 bg-gold/10 border border-gold/30 rounded-lg hover:bg-gold/20 transition text-white font-semibold">
              ➕ Novo Produto
            </button>
            <button className="p-4 bg-gold/10 border border-gold/30 rounded-lg hover:bg-gold/20 transition text-white font-semibold">
              🎉 Nova Promoção
            </button>
            <button className="p-4 bg-gold/10 border border-gold/30 rounded-lg hover:bg-gold/20 transition text-white font-semibold">
              💬 Mensagens
            </button>
            <button className="p-4 bg-gold/10 border border-gold/30 rounded-lg hover:bg-gold/20 transition text-white font-semibold">
              📊 Relatórios
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
