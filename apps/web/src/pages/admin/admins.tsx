import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';

interface Admin {
  id: string;
  email: string;
  role: 'CEO' | 'ADMIN';
  permissions: AdminPermissions;
  createdAt: string;
  status: 'ACTIVE' | 'PENDING' | 'INACTIVE';
  lastLogin?: string;
}

interface AdminPermissions {
  manageProducts: boolean;
  managePromotion: boolean;
  manageCashback: boolean;
  editContent: boolean;
  manageUploads: boolean;
  viewAnalytics: boolean;
  manageOrders: boolean;
  manageCustomers: boolean;
}

export default function AdminManagement() {
  const [admins, setAdmins] = useState<Admin[]>([
    {
      id: '1',
      email: 'seu_email@onaife3d.com',
      role: 'CEO',
      permissions: {
        manageProducts: true,
        managePromotion: true,
        manageCashback: true,
        editContent: true,
        manageUploads: true,
        viewAnalytics: true,
        manageOrders: true,
        manageCustomers: true,
      },
      createdAt: '2025-01-01',
      status: 'ACTIVE',
      lastLogin: '2025-06-20 14:30',
    },
  ]);

  const [showInviteForm, setShowInviteForm] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<AdminPermissions>({
    manageProducts: true,
    managePromotion: true,
    manageCashback: true,
    editContent: true,
    manageUploads: true,
    viewAnalytics: true,
    manageOrders: true,
    manageCustomers: true,
  });

  const handleInviteAdmin = () => {
    if (!newAdminEmail) {
      alert('Por favor, insira um email válido');
      return;
    }

    const newAdmin: Admin = {
      id: Date.now().toString(),
      email: newAdminEmail,
      role: 'ADMIN',
      permissions: selectedPermissions,
      createdAt: new Date().toLocaleDateString('pt-BR'),
      status: 'PENDING',
    };

    setAdmins([...admins, newAdmin]);
    setNewAdminEmail('');
    setShowInviteForm(false);
    alert(`Convite enviado para ${newAdminEmail}. Aguardando confirmação de email.`);
  };

  const handleRemoveAdmin = (id: string) => {
    if (confirm('Tem certeza que deseja remover este administrador?')) {
      setAdmins(admins.filter(admin => admin.id !== id));
      alert('Administrador removido com sucesso!');
    }
  };

  const handleTogglePermission = (adminId: string, permission: keyof AdminPermissions) => {
    setAdmins(admins.map(admin => 
      admin.id === adminId 
        ? {
            ...admin,
            permissions: {
              ...admin.permissions,
              [permission]: !admin.permissions[permission]
            }
          }
        : admin
    ));
  };

  const permissionLabels: Record<keyof AdminPermissions, string> = {
    manageProducts: '🛍️ Gerenciar Produtos',
    managePromotion: '🎉 Gerenciar Promoções',
    manageCashback: '🎁 Controlar Cashback',
    editContent: '✏️ Editar Conteúdo',
    manageUploads: '📸 Gerenciar Uploads',
    viewAnalytics: '📊 Ver Analytics',
    manageOrders: '📦 Gerenciar Pedidos',
    manageCustomers: '👥 Gerenciar Clientes',
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Gerenciamento de Admins</h1>
          <p className="text-gray-400">Gerencie administradores e suas permissões</p>
        </div>

        {/* Invite Section */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gold/20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Convidar Novo Administrador</h2>
            <button
              onClick={() => setShowInviteForm(!showInviteForm)}
              className="px-6 py-2 bg-gold text-black font-bold rounded-lg hover:bg-gold/90 transition"
            >
              {showInviteForm ? '❌ Cancelar' : '➕ Convidar Admin'}
            </button>
          </div>

          {showInviteForm && (
            <div className="space-y-6 bg-gray-800 p-6 rounded-lg border border-gold/10">
              {/* Email Input */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Email do Administrador *
                </label>
                <input
                  type="email"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  placeholder="admin@onaife3d.com"
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gold/20 focus:border-gold outline-none transition"
                />
                <p className="text-gray-400 text-sm mt-2">
                  💡 Um email de convite será enviado com link para confirmação
                </p>
              </div>

              {/* Permissions */}
              <div>
                <label className="block text-white font-semibold mb-4">
                  Permissões do Administrador
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(permissionLabels).map(([key, label]) => (
                    <div key={key} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedPermissions[key as keyof AdminPermissions]}
                        onChange={() => setSelectedPermissions(prev => ({
                          ...prev,
                          [key]: !prev[key as keyof AdminPermissions]
                        }))}
                        className="w-5 h-5 accent-gold cursor-pointer"
                      />
                      <label className="text-gray-300 cursor-pointer">
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleInviteAdmin}
                className="w-full px-6 py-3 bg-gold text-black font-bold rounded-lg hover:bg-gold/90 transition"
              >
                ✉️ Enviar Convite por Email
              </button>
            </div>
          )}
        </div>

        {/* Admins List */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gold/20">
          <h2 className="text-xl font-bold text-white mb-6">Administradores Cadastrados</h2>
          
          <div className="space-y-6">
            {admins.map((admin) => (
              <div key={admin.id} className="bg-gray-800 rounded-lg p-6 border border-gold/10">
                {/* Admin Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white">{admin.email}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        admin.role === 'CEO' 
                          ? 'bg-gold/20 text-gold' 
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {admin.role === 'CEO' ? '👑 CEO' : '⚙️ Admin'}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        admin.status === 'ACTIVE' 
                          ? 'bg-green-500/20 text-green-400'
                          : admin.status === 'PENDING'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {admin.status === 'ACTIVE' 
                          ? '✅ Ativo' 
                          : admin.status === 'PENDING'
                          ? '⏳ Aguardando Confirmação'
                          : '❌ Inativo'}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Cadastrado em: {admin.createdAt}
                      {admin.lastLogin && ` | Último acesso: ${admin.lastLogin}`}
                    </p>
                  </div>
                  {admin.role !== 'CEO' && (
                    <button
                      onClick={() => handleRemoveAdmin(admin.id)}
                      className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition font-semibold"
                    >
                      🗑️ Remover
                    </button>
                  )}
                </div>

                {/* Permissions */}
                {admin.role !== 'CEO' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(permissionLabels).map(([key, label]) => (
                      <div key={key} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={admin.permissions[key as keyof AdminPermissions]}
                          onChange={() => handleTogglePermission(admin.id, key as keyof AdminPermissions)}
                          className="w-5 h-5 accent-gold cursor-pointer"
                        />
                        <label className="text-gray-300 cursor-pointer">
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gold/5 border border-gold/20 rounded-lg p-4">
                    <p className="text-gold font-semibold mb-3">✨ Acesso CEO - Permissões Completas</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {Object.entries(permissionLabels).map(([key, label]) => (
                        <div key={key} className="flex items-center gap-3 text-gold">
                          <span>✅</span>
                          <label className="cursor-default">
                            {label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
          <p className="text-blue-300">
            <strong>ℹ️ Informação:</strong> Quando um novo administrador for convidado, ele receberá um email com um link para confirmar seu acesso. 
            Ele permanecerá em status "Aguardando Confirmação" até clicar no link do email.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
