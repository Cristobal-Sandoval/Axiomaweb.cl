import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { SiteId, ClientSiteConfig } from '../types';
import { 
  ShieldCheck, 
  Sliders, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Save, 
  Globe, 
  Sparkles, 
  Send,
  Eye,
  User,
  Phone,
  Tag,
  Palette
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    sites, 
    updateSiteConfig, 
    changeRequests, 
    updateRequestStatus, 
    messages, 
    sendMessage, 
    activeSiteId, 
    setActiveSiteId 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'moduler' | 'requests' | 'messages'>('moduler');
  const [selectedSiteKey, setSelectedSiteKey] = useState<SiteId>(activeSiteId);
  const [adminMessageInput, setAdminMessageInput] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const currentSite = sites[selectedSiteKey];

  // Estado local editable para moldear la web seleccionada
  const [siteForm, setSiteForm] = useState<ClientSiteConfig>(currentSite);

  // Sincronizar estado cuando se selecciona otro sitio
  const handleSelectSite = (siteId: SiteId) => {
    setSelectedSiteKey(siteId);
    setActiveSiteId(siteId);
    setSiteForm(sites[siteId]);
    setSaveSuccess(false);
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteConfig(selectedSiteKey, siteForm);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSendAdminMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminMessageInput.trim()) return;
    sendMessage(selectedSiteKey, 'admin', adminMessageInput);
    setAdminMessageInput('');
  };

  const currentMessages = messages.filter(m => m.siteId === selectedSiteKey);

  return (
    <div className="container" style={{ padding: '32px 16px 64px' }}>
      {/* Encabezado Maestro de Administración */}
      <div className="glass-card" style={{ padding: '24px', marginBottom: '24px', background: 'linear-gradient(135deg, rgba(236,72,153,0.12) 0%, rgba(99,102,241,0.12) 100%)', border: '1px solid var(--border-glow)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div className="badge-glow" style={{ marginBottom: '8px', background: 'rgba(236,72,153,0.15)', borderColor: '#ec4899', color: '#f472b6' }}>
              <ShieldCheck size={16} />
              <span>Panel Maestro AxiomaWeb Studio</span>
            </div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Gestor Full Modulable de Sitios Web (axiomaweb.cl)</h1>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>
              Modifica en tiempo real cualquier parámetro de tus clientes, banners, textos y promociones.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => setActiveTab('moduler')} 
              className={`btn-secondary ${activeTab === 'moduler' ? 'btn-primary' : ''}`}
              style={{ fontSize: '0.85rem' }}
            >
              <Sliders size={16} />
              <span>Personalizador Total</span>
            </button>
            <button 
              onClick={() => setActiveTab('requests')} 
              className={`btn-secondary ${activeTab === 'requests' ? 'btn-primary' : ''}`}
              style={{ fontSize: '0.85rem' }}
            >
              <Clock size={16} />
              <span>Solicitudes ({changeRequests.filter(r => r.status === 'Pendiente').length})</span>
            </button>
            <button 
              onClick={() => setActiveTab('messages')} 
              className={`btn-secondary ${activeTab === 'messages' ? 'btn-primary' : ''}`}
              style={{ fontSize: '0.85rem' }}
            >
              <MessageSquare size={16} />
              <span>Mensajería</span>
            </button>
          </div>
        </div>

        {/* Pestañas de Selección de Sitio Cliente */}
        <div className="site-selector-tabs" style={{ marginTop: '20px' }}>
          {Object.values(sites).map((s) => (
            <button 
              key={s.id} 
              onClick={() => handleSelectSite(s.id)}
              className={`tab-btn ${selectedSiteKey === s.id ? 'active' : ''}`}
              style={{
                background: selectedSiteKey === s.id ? 'linear-gradient(135deg, #ec4899, #8b5cf6)' : undefined
              }}
            >
              <span>{s.name}</span>
            </button>
          ))}
        </div>
      </div>

      {saveSuccess && (
        <div style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid #10b981', color: '#6ee7b7', padding: '12px 18px', borderRadius: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
          <CheckCircle2 size={18} />
          <span>¡Cambios aplicados y guardados exitosamente en la web de <strong>{siteForm.name}</strong>!</span>
        </div>
      )}

      {/* VISTA 1: PERSONALIZADOR FULL MODULABLE */}
      {activeTab === 'moduler' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {/* Formulario Editor Modulable */}
          <form onSubmit={handleSaveChanges} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ec4899', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Palette size={18} />
              <span>Configuración de {siteForm.name}</span>
            </h2>

            {/* 1. Banners y Anuncios */}
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h4 style={{ fontSize: '0.9rem', color: '#a5b4fc', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={15} /> Banners & Avisos en Vivo
              </h4>

              <div className="form-group" style={{ marginBottom: '10px' }}>
                <label className="form-label">Texto del Banner Superior:</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={siteForm.bannerText} 
                  onChange={(e) => setSiteForm({ ...siteForm, bannerText: e.target.value })} 
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="form-label">Mostrar Banner en Vivo:</span>
                <input 
                  type="checkbox" 
                  checked={siteForm.bannerActive} 
                  onChange={(e) => setSiteForm({ ...siteForm, bannerActive: e.target.checked })}
                  style={{ width: '20px', height: '20px', accentColor: '#ec4899', cursor: 'pointer' }}
                />
              </div>
            </div>

            {/* 2. Textos Hero */}
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h4 style={{ fontSize: '0.9rem', color: '#a5b4fc', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Globe size={15} /> Encabezados & Títulos Hero
              </h4>

              <div className="form-group" style={{ marginBottom: '10px' }}>
                <label className="form-label">Título Principal:</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={siteForm.heroTitle} 
                  onChange={(e) => setSiteForm({ ...siteForm, heroTitle: e.target.value })} 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subtítulo Descriptivo:</label>
                <textarea 
                  className="form-textarea" 
                  rows={2} 
                  value={siteForm.heroSubtitle} 
                  onChange={(e) => setSiteForm({ ...siteForm, heroSubtitle: e.target.value })} 
                />
              </div>
            </div>

            {/* 3. Datos del Cliente & Contacto */}
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h4 style={{ fontSize: '0.9rem', color: '#a5b4fc', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={15} /> Datos del Cliente & WhatsApp
              </h4>

              <div className="form-group" style={{ marginBottom: '10px' }}>
                <label className="form-label">Teléfono WhatsApp Contacto:</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={siteForm.whatsappPhone} 
                    onChange={(e) => setSiteForm({ ...siteForm, whatsappPhone: e.target.value })} 
                    style={{ paddingLeft: '36px' }}
                  />
                  <Phone size={16} style={{ position: 'absolute', left: '10px', top: '14px', color: '#10b981' }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Texto Promocional Adicional:</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={siteForm.promoText} 
                    onChange={(e) => setSiteForm({ ...siteForm, promoText: e.target.value })} 
                    style={{ paddingLeft: '36px' }}
                  />
                  <Tag size={16} style={{ position: 'absolute', left: '10px', top: '14px', color: '#ec4899' }} />
                </div>
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ padding: '14px', background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', marginTop: '8px' }}>
              <Save size={18} />
              <span>Guardar Todos los Cambios Modulables</span>
            </button>
          </form>

          {/* Simulador Vista Previa Maestro en Vivo */}
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px', color: '#6ee7b7' }}>
              <Eye size={18} />
              <span>Vista Previa Maestro en Vivo ({siteForm.name})</span>
            </h3>

            <div className="live-preview-window" style={{ flex: 1 }}>
              <div className="preview-bar">
                <div className="dot red"></div>
                <div className="dot yellow"></div>
                <div className="dot green"></div>
                <span style={{ fontSize: '0.72rem', color: '#64748b', marginLeft: '8px' }}>
                  https://{selectedSiteKey}.cl
                </span>
              </div>

              {siteForm.bannerActive && (
                <div style={{ background: siteForm.bannerBgColor || '#6366f1', padding: '8px 12px', color: 'white', fontSize: '0.78rem', fontWeight: 700, textAlign: 'center' }}>
                  {siteForm.bannerText}
                </div>
              )}

              <div className="preview-body" style={{ background: '#090a14', color: 'white', minHeight: '260px' }}>
                <span style={{ fontSize: '0.72rem', color: '#10b981', display: 'block', fontWeight: 600, marginBottom: '6px' }}>
                  ● {siteForm.status}
                </span>

                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>
                  {siteForm.heroTitle}
                </h2>

                <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '16px' }}>
                  {siteForm.heroSubtitle}
                </p>

                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px', marginBottom: '14px', fontSize: '0.78rem' }}>
                  <strong>Oferta Activa:</strong> {siteForm.promoText}
                </div>

                <a href={`https://wa.me/${siteForm.whatsappPhone.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="btn-primary btn-whatsapp" style={{ padding: '8px', fontSize: '0.8rem' }}>
                  <span>WhatsApp: {siteForm.whatsappPhone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VISTA 2: GESTIÓN DE SOLICITUDES DE CLIENTES */}
      {activeTab === 'requests' && (
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px' }}>Solicitudes de Cambios Recibidas</h3>

          {changeRequests.length === 0 ? (
            <p style={{ color: '#94a3b8' }}>No hay solicitudes registadas.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {changeRequests.map((req) => (
                <div key={req.id} style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#a5b4fc', fontWeight: 600 }}>{req.clientName} • {req.createdAt}</span>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '2px 0' }}>{req.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{req.description}</p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button onClick={() => updateRequestStatus(req.id, 'Completada')} className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.78rem', background: '#10b981' }}>
                      <CheckCircle2 size={14} /> Aprobar
                    </button>
                    <button onClick={() => updateRequestStatus(req.id, 'Rechazada')} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
                      <XCircle size={14} /> Rechazar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VISTA 3: MENSAJERÍA DIRECTA CON EL CLIENTE */}
      {activeTab === 'messages' && (
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px' }}>Chat Directo con {currentSite.clientName}</h3>

          <div style={{ background: 'rgba(0,0,0,0.4)', padding: '16px', borderRadius: '12px', minHeight: '220px', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
            {currentMessages.length === 0 ? (
              <p style={{ color: '#64748b', fontSize: '0.85rem', textAlign: 'center', margin: 'auto' }}>Sin mensajes en el historial.</p>
            ) : (
              currentMessages.map((msg) => (
                <div key={msg.id} style={{ 
                  alignSelf: msg.sender === 'admin' ? 'flex-end' : 'flex-start',
                  background: msg.sender === 'admin' ? '#ec4899' : '#334155',
                  color: 'white',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  maxWidth: '80%',
                  fontSize: '0.88rem'
                }}>
                  <span>{msg.text}</span>
                  <span style={{ display: 'block', fontSize: '0.68rem', color: 'rgba(255,255,255,0.7)', marginTop: '4px', textAlign: 'right' }}>{msg.timestamp}</span>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleSendAdminMessage} style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Escribe un mensaje directo al panel del cliente..." 
              value={adminMessageInput} 
              onChange={(e) => setAdminMessageInput(e.target.value)} 
            />
            <button type="submit" className="btn-primary" style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #ec4899, #8b5cf6)' }}>
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
