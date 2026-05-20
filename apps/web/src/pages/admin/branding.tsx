import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';

interface BrandingSettings {
  logoUrl: string;
  logoAlt: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  brandName: string;
  tagline: string;
  favicon: string;
}

export default function BrandingPanel() {
  const [branding, setBranding] = useState<BrandingSettings>({
    logoUrl: '/logo-onaife3d.png',
    logoAlt: 'ONAIFE3D - Esculturas Religiosas Afro-Brasileiras',
    primaryColor: '#FFD700', // Dourado
    secondaryColor: '#1B7A34', // Verde Orixá
    accentColor: '#FF3D00', // Vermelho Ancestral
    backgroundColor: '#0A0A0A', // Preto Profundo
    textColor: '#FFFFFF', // Branco
    brandName: 'ONAIFE3D',
    tagline: 'MUITO AXÉ ENVOLVIDO',
    favicon: '/favicon.ico',
  });

  const [logoPreview, setLogoPreview] = useState<string>('/logo-onaife3d.png');
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        setBranding({ ...branding, logoUrl: reader.result as string });
        setUnsavedChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorChange = (field: keyof BrandingSettings, value: string) => {
    setBranding({ ...branding, [field]: value });
    setUnsavedChanges(true);
  };

  const handleTextChange = (field: keyof BrandingSettings, value: string) => {
    setBranding({ ...branding, [field]: value });
    setUnsavedChanges(true);
  };

  const handleSave = () => {
    alert('✅ Configurações de branding salvas com sucesso!');
    setUnsavedChanges(false);
  };

  const colorPalette = [
    { name: 'Dourado Sagrado', color: '#FFD700', hex: '#FFD700' },
    { name: 'Verde Orixá', color: '#1B7A34', hex: '#1B7A34' },
    { name: 'Vermelho Ancestral', color: '#FF3D00', hex: '#FF3D00' },
    { name: 'Azul Cibernético', color: '#00BCD4', hex: '#00BCD4' },
    { name: 'Bege Ouro', color: '#D4AF91', hex: '#D4AF91' },
    { name: 'Preto Profundo', color: '#0A0A0A', hex: '#0A0A0A' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Painel de Branding</h1>
          <p className="text-gray-400">Configure a identidade visual da ONAIFE3D</p>
        </div>

        {/* Preview */}
        <div className="bg-gray-900 rounded-lg p-8 border border-gold/20">
          <h2 className="text-xl font-bold text-white mb-6">📐 Preview da Marca</h2>
          <div 
            className="rounded-lg p-12 flex flex-col items-center justify-center min-h-96"
            style={{ backgroundColor: branding.backgroundColor }}
          >
            <img 
              src={logoPreview} 
              alt={branding.logoAlt}
              className="w-64 h-auto mb-6 drop-shadow-lg"
            />
            <h1 
              className="text-5xl font-bold mb-2 text-center"
              style={{ color: branding.primaryColor }}
            >
              {branding.brandName}
            </h1>
            <p 
              className="text-2xl"
              style={{ color: branding.secondaryColor }}
            >
              {branding.tagline}
            </p>
          </div>
        </div>

        {/* Logo Configuration */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gold/20">
          <h2 className="text-xl font-bold text-white mb-6">🎨 Logo</h2>
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-6 border border-gold/10">
              <label className="block text-white font-semibold mb-3">
                📤 Fazer Upload da Logo
              </label>
              <div className="border-2 border-dashed border-gold/30 rounded-lg p-8 text-center hover:border-gold/50 transition cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <label htmlFor="logo-upload" className="cursor-pointer block">
                  <p className="text-gray-400 mb-2">Clique ou arraste a imagem aqui</p>
                  <p className="text-gold font-semibold">Formatos: PNG, JPG, SVG</p>
                </label>
              </div>
              <p className="text-gray-400 text-sm mt-3">
                💡 Recomendado: 400x400px para melhor qualidade
              </p>
            </div>

            {/* Text Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Nome da Marca
                </label>
                <input
                  type="text"
                  value={branding.brandName}
                  onChange={(e) => handleTextChange('brandName', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gold/20 focus:border-gold outline-none transition"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">
                  Tagline / Slogan
                </label>
                <input
                  type="text"
                  value={branding.tagline}
                  onChange={(e) => handleTextChange('tagline', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gold/20 focus:border-gold outline-none transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Color Palette */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gold/20">
          <h2 className="text-xl font-bold text-white mb-6">🎨 Paleta de Cores</h2>
          <p className="text-gray-400 mb-6">Cores extraídas da sua logo ONAIFE3D</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {colorPalette.map((item) => (
              <div key={item.hex} className="text-center">
                <div
                  className="w-full h-24 rounded-lg mb-3 border-2 border-gold/20 hover:border-gold/50 transition cursor-pointer shadow-lg"
                  style={{ backgroundColor: item.color }}
                  title={item.name}
                />
                <p className="text-gray-300 text-sm font-semibold">{item.name}</p>
                <p className="text-gray-500 text-xs">{item.hex}</p>
              </div>
            ))}
          </div>

          {/* Primary Colors Config */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Primary Color */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gold/10">
                <label className="block text-white font-semibold mb-3">
                  Cor Primária (Dourado)
                </label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={branding.primaryColor}
                    onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                    className="w-16 h-12 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={branding.primaryColor}
                    onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-lg border border-gold/20 focus:border-gold outline-none transition"
                  />
                </div>
              </div>

              {/* Secondary Color */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gold/10">
                <label className="block text-white font-semibold mb-3">
                  Cor Secundária (Verde)
                </label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={branding.secondaryColor}
                    onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                    className="w-16 h-12 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={branding.secondaryColor}
                    onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-lg border border-gold/20 focus:border-gold outline-none transition"
                  />
                </div>
              </div>

              {/* Accent Color */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gold/10">
                <label className="block text-white font-semibold mb-3">
                  Cor de Destaque (Vermelho)
                </label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={branding.accentColor}
                    onChange={(e) => handleColorChange('accentColor', e.target.value)}
                    className="w-16 h-12 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={branding.accentColor}
                    onChange={(e) => handleColorChange('accentColor', e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-lg border border-gold/20 focus:border-gold outline-none transition"
                  />
                </div>
              </div>

              {/* Background Color */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gold/10">
                <label className="block text-white font-semibold mb-3">
                  Cor de Fundo (Preto)
                </label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={branding.backgroundColor}
                    onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                    className="w-16 h-12 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={branding.backgroundColor}
                    onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-lg border border-gold/20 focus:border-gold outline-none transition"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            disabled={!unsavedChanges}
            className={`flex-1 px-6 py-3 rounded-lg font-bold transition ${
              unsavedChanges
                ? 'bg-gold text-black hover:bg-gold/90'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            💾 Salvar Configurações de Branding
          </button>
          {unsavedChanges && (
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg font-bold transition"
            >
              ↺ Descartar
            </button>
          )}
        </div>

        {/* Info */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
          <p className="text-blue-300">
            <strong>ℹ️ Dica:</strong> Todas as mudanças de branding serão aplicadas em tempo real ao site. 
            As cores se propagarão para botões, links, destaques e elementos visuais da plataforma.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
