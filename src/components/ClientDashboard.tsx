import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { SiteId } from '../types';
import { 
  Sliders, 
  Send, 
  Calendar, 
  MessageSquare, 
  CheckCircle, 
  ExternalLink, 
  Eye, 
  FileText,
  RefreshCw,
  Plus
} from 'lucide-react';

export const ClientDashboard: React.FC = () => {
  const { 
    activeSiteId, 
    setActiveSiteId, 
    sites, 
    updateSiteConfig,
    changeRequests,
    addChangeRequest,
    bookMeeting,
    messages,
    sendMessage
  } = useApp();

  const currentSite = sites[activeSiteId];

  // Estado local para edición de formulario del sitio
  const [formData, setFormData] = useState({
    bannerText: currentSite.bannerText,
    bannerActive: currentSite.bannerActive,
    bannerBgColor: currentSite.bannerBgColor,
    heroTitle: currentSite.heroTitle,
    heroSubtitle: currentSite.heroSubtitle,
    whatsappPhone: currentSite.whatsappPhone,
    businessHours: currentSite.businessHours,
    themeStyle: currentSite.themeStyle,
    promoText: currentSite.promoText,
    promoDiscountActive: currentSite.promoDiscountActive
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Estado para formulario de propuesta de cambios
  const [reqTitle, setReqTitle] = useState('');
  const [reqDesc, setReqDesc] = useState('');
  const [reqPriority, setReqPriority] = useState<'Baja' | 'Media' | 'Alta' | 'Urgente'>('Media');
  const [reqSuccess, setReqSuccess] = useState(false);

  // Estado para agendamiento de reunión
  const [meetDate, setMeetDate] = useState('');
  const [meetTime, setMeetTime] = useState('15:00');
  const [meetTopic, setMeetTopic] = useState('Revisión de avances y nuevas funciones');
  const [meetSuccess, setMeetSuccess] = useState(false);

  // Estado para mensaje directo
  const [chatInput, setChatInput] = useState('');

  // Actualizar formData cuando cambia de sitio
  const handleSiteTabChange = (siteId: SiteId) => {
    setActiveSiteId(siteId);
    const target = sites[siteId];
    setFormData({
      bannerText: target.bannerText,
      bannerActive: target.bannerActive,
      bannerBgColor: target.bannerBgColor,
      heroTitle: target.heroTitle,
      heroSubtitle: target.heroSubtitle,
      whatsappPhone: target.whatsappPhone,
      businessHours: target.businessHours,
      themeStyle: target.themeStyle,
      promoText: target.promoText,
      promoDiscountActive: target.promoDiscountActive
    });
    setSavedSuccess(false);
  };

  const handleSaveSiteChanges = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteConfig(activeSiteId, formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handleCreateChangeRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqTitle || !reqDesc) return;
    addChangeRequest({
      siteId: activeSiteId,
      clientName: currentSite.clientName,
      title: reqTitle,
      description: reqDesc,
      priority: reqPriority
    });
    setReqTitle('');
    setReqDesc('');
    setReqSuccess(true);
    setTimeout(() => setReqSuccess(false), 3500);
  };

  const handleBookMeetingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetDate) return;
    bookMeeting({
      clientName: currentSite.clientName,
      clientEmail: currentSite.clientEmail,
      siteId: activeSiteId,
      date: meetDate,
      time: meetTime,
      topic: meetTopic
    });
    setMeetSuccess(true);
    setTimeout(() => setMeetSuccess(false), 3500);
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendMessage(activeSiteId, 'cliente', chatInput);
    setChatInput('');
  };

  const siteMessages = messages.filter(m => m.siteId === activeSiteId);
  const siteRequests = changeRequests.filter(r => r.siteId === activeSiteId);

  return (
    <div className="container" style={{ padding: '40px 24px 80px' }}>
      {/* Cabecera del Panel de Cliente */}
      <div className="dashboard-header">
        <div>
          <div className="badge-glow badge-emerald" style={{ marginBottom: '8px' }}>
            <CheckCircle size={14} />
            <span>Cliente Verificado • AxiomaWeb Studio</span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
            Portal del Cliente — AxiomaWeb: <span className="text-gradient">{currentSite.name}</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Cliente: <strong>{currentSite.clientName}</strong> ({currentSite.clientEmail}) | Último cambio: {currentSite.lastUpdated}
          </p>
        </div>

        {/* Pestañas de Selección de Sitio Web para Simular Distintos Clientes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
          <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>CAMBIAR SITIO CLIENTE DEMO:</span>
          <div className="site-selector-tabs">
            <button 
              className={`tab-btn ${activeSiteId === 'cardpoint' ? 'active' : ''}`}
              onClick={() => handleSiteTabChange('cardpoint')}
            >
              <span>💳 CardPoint TCG</span>
            </button>

            <button 
              className={`tab-btn ${activeSiteId === 'beast-training' ? 'active' : ''}`}
              onClick={() => handleSiteTabChange('beast-training')}
            >
              <span>🏋️‍♂️ Beast Gym</span>
            </button>

            <button 
              className={`tab-btn ${activeSiteId === 'studio-vanessa' ? 'active' : ''}`}
              onClick={() => handleSiteTabChange('studio-vanessa')}
            >
              <span>💅 Studio Vanessa</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid Principal del Panel */}
      <div className="dashboard-grid">
        
        {/* COLUMNA IZQUIERDA: Editor Moldeable del Sitio */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* SECCIÓN 1: EDITOR DE CONTENIDO WEB */}
          <div className="glass-card" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#818cf8' }}>
                  <Sliders size={20} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Personalizar Contenidos y Banners</h2>
                  <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Modifica lo que ven tus visitantes en tiempo real sin programar.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setShowPreviewModal(true)} className="btn-secondary btn-sm">
                  <Eye size={16} />
                  <span>Ver Previsualización</span>
                </button>
                
                <a href={currentSite.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary btn-sm btn-whatsapp">
                  <ExternalLink size={16} />
                  <span>Visitar Web Real</span>
                </a>
              </div>
            </div>

            {savedSuccess && (
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#6ee7b7', padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle size={18} />
                <span>¡Excelente! Tu página web ha sido actualizada en tiempo real con los nuevos cambios.</span>
              </div>
            )}

            <form onSubmit={handleSaveSiteChanges} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* Activar / Desactivar y Editar Banner */}
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <label className="form-label" style={{ fontWeight: 700, color: '#a5b4fc' }}>Barra de Anuncio Superior (Banner Noticia)</label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                    <input 
                      type="checkbox"
                      checked={formData.bannerActive}
                      onChange={(e) => setFormData({ ...formData, bannerActive: e.target.checked })}
                      style={{ width: '18px', height: '18px', accentColor: '#6366f1' }}
                    />
                    <span>Activar Banner</span>
                  </label>
                </div>
                <input 
                  type="text"
                  className="form-input"
                  value={formData.bannerText}
                  onChange={(e) => setFormData({ ...formData, bannerText: e.target.value })}
                  placeholder="Ej: 🔥 20% de Descuento este fin de semana..."
                  disabled={!formData.bannerActive}
                />
              </div>

              {/* Título Principal y Subtítulo */}
              <div className="form-group">
                <label className="form-label">Título Principal (Hero Header):</label>
                <input 
                  type="text"
                  className="form-input"
                  value={formData.heroTitle}
                  onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mensaje o Subtítulo descriptivo:</label>
                <textarea 
                  className="form-textarea"
                  rows={2}
                  value={formData.heroSubtitle}
                  onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                />
              </div>

              {/* Teléfono y Horarios */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">WhatsApp / Teléfono de Contacto:</label>
                  <input 
                    type="text"
                    className="form-input"
                    value={formData.whatsappPhone}
                    onChange={(e) => setFormData({ ...formData, whatsappPhone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Horarios de Atención:</label>
                  <input 
                    type="text"
                    className="form-input"
                    value={formData.businessHours}
                    onChange={(e) => setFormData({ ...formData, businessHours: e.target.value })}
                  />
                </div>
              </div>

              {/* Tema Visual */}
              <div className="form-group">
                <label className="form-label">Esquema de Colores Predominante:</label>
                <select 
                  className="form-select"
                  value={formData.themeStyle}
                  onChange={(e) => setFormData({ ...formData, themeStyle: e.target.value as any })}
                >
                  <option value="dark-neon">🔮 Violeta Neón (Estilo CardPoint / Cyberpunk)</option>
                  <option value="fitness-emerald">⚡ Verde Esmeralda (Estilo Beast Gym / Fitness)</option>
                  <option value="aesthetic-rose">🌸 Rosa & Estético (Estilo Studio Vanessa / Belleza)</option>
                  <option value="minimal-cyan">💎 Azul Minimalista (Estilo Corporativo / Tech)</option>
                </select>
              </div>

              <button type="submit" className="btn-primary" style={{ padding: '14px', marginTop: '8px' }}>
                <RefreshCw size={18} />
                <span>Guardar y Publicar Cambios en Vivo</span>
              </button>
            </form>
          </div>

          {/* SECCIÓN 2: PROPUESTA DE CAMBIOS VÍA CORREO/TICKET */}
          <div className="glass-card" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(236, 72, 153, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f472b6' }}>
                <FileText size={20} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Proponer Nuevos Cambios o Secciones</h2>
                <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Envía requerimientos al desarrollador (Cristóbal) para modificar estructura o código.</p>
              </div>
            </div>

            {reqSuccess && (
              <div style={{ background: 'rgba(99, 102, 241, 0.15)', border: '1px solid #6366f1', color: '#a5b4fc', padding: '12px', borderRadius: '10px', marginBottom: '16px', fontSize: '0.88rem' }}>
                ¡Solicitud enviada a Cristóbal con éxito! Recibirás actualización en este panel y por correo.
              </div>
            )}

            <form onSubmit={handleCreateChangeRequest} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Título del Requerimiento:</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Ej: Agregar nueva sección de testimonios de clientes"
                  value={reqTitle}
                  onChange={(e) => setReqTitle(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Detalles del Cambio Solicitado:</label>
                  <textarea 
                    className="form-textarea" 
                    rows={3} 
                    placeholder="Describe qué deseas modificar o agregar..."
                    value={reqDesc}
                    onChange={(e) => setReqDesc(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Prioridad / Urgencia:</label>
                  <select 
                    className="form-select"
                    value={reqPriority}
                    onChange={(e) => setReqPriority(e.target.value as any)}
                  >
                    <option value="Baja">Baja (Sin apuro)</option>
                    <option value="Media">Media (Esta semana)</option>
                    <option value="Alta">Alta (Próximas 24h)</option>
                    <option value="Urgente">🚨 Urgente (Sitio/Campana)</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn-secondary" style={{ width: 'fit-content' }}>
                <Plus size={16} />
                <span>Enviar Solicitud de Cambio</span>
              </button>
            </form>

            {/* Lista de solicitudes realizadas */}
            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 style={{ fontSize: '0.95rem', color: '#cbd5e1', marginBottom: '12px' }}>Historial de Solicitudes para este Sitio:</h4>
              {siteRequests.length === 0 ? (
                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>No hay solicitudes de cambios pendientes.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {siteRequests.map((req) => (
                    <div key={req.id} style={{ background: 'rgba(0,0,0,0.3)', padding: '12px 16px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong style={{ fontSize: '0.9rem', display: 'block' }}>{req.title}</strong>
                        <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{req.description} • {req.createdAt}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="tech-tag" style={{ background: req.priority === 'Urgente' ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.05)' }}>
                          {req.priority}
                        </span>
                        <span className="badge-glow" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>
                          {req.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: Agendamiento, Chat Directo & Estado de Salud */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* ESTADO DEL SITIO Y SALUD */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#a5b4fc' }}>
              <CheckCircle size={18} style={{ color: '#10b981' }} />
              <span>Salud & Indexación SEO</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Estado del Servidor:</span>
                <span style={{ color: '#10b981', fontWeight: 600 }}>🟢 Online (99.99%)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Certificado SSL:</span>
                <span style={{ color: '#6366f1', fontWeight: 600 }}>🔒 Activo (256-bit)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Google Indexing:</span>
                <span style={{ color: '#06b6d4', fontWeight: 600 }}>🔍 Indexado en SEO</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Velocidad de Carga:</span>
                <span style={{ color: '#f59e0b', fontWeight: 600 }}>⚡ 140 ms</span>
              </div>
            </div>
          </div>

          {/* AGENDAR REUNIÓN CON CRISTÓBAL */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: '#f472b6' }}>
              <Calendar size={18} />
              <span>Agendar Reunión (Google Meet)</span>
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '16px' }}>
              Coordinemos una sesión para revisar métricas, ideas de contenido o mejoras.
            </p>

            {meetSuccess && (
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#6ee7b7', padding: '10px', borderRadius: '8px', marginBottom: '12px', fontSize: '0.85rem' }}>
                ¡Reunión agendada! Recibirás la invitación por correo.
              </div>
            )}

            <form onSubmit={handleBookMeetingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Fecha deseada:</label>
                <input 
                  type="date" 
                  className="form-input" 
                  required 
                  value={meetDate}
                  onChange={(e) => setMeetDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Hora (Chile):</label>
                <select 
                  className="form-select"
                  value={meetTime}
                  onChange={(e) => setMeetTime(e.target.value)}
                >
                  <option value="10:00">10:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="15:00">03:00 PM</option>
                  <option value="18:00">06:00 PM</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Tema principal de la sesión:</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={meetTopic}
                  onChange={(e) => setMeetTopic(e.target.value)}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ padding: '10px', fontSize: '0.88rem' }}>
                <Calendar size={16} />
                <span>Confirmar Agendamiento</span>
              </button>
            </form>
          </div>

          {/* MENSAJERÍA DIRECTA CON EL CREADOR DEL SITIO */}
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '380px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: '#60a5fa' }}>
              <MessageSquare size={18} />
              <span>Mensaje Directo a Cristóbal</span>
            </h3>

            {/* Chat Box History */}
            <div style={{ flexGrow: 1, overflowY: 'auto', background: 'rgba(0,0,0,0.4)', borderRadius: '10px', padding: '12px', marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {siteMessages.length === 0 ? (
                <span style={{ fontSize: '0.8rem', color: '#64748b', textAlign: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
                  Inicia una conversación directa con Cristóbal Sandoval.
                </span>
              ) : (
                siteMessages.map(msg => (
                  <div key={msg.id} style={{ 
                    alignSelf: msg.sender === 'cliente' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    background: msg.sender === 'cliente' ? 'linear-gradient(135deg, #4f46e5, #6366f1)' : 'rgba(255,255,255,0.08)',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    fontSize: '0.85rem'
                  }}>
                    <span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.7, marginBottom: '2px' }}>
                      {msg.sender === 'cliente' ? 'Tú' : 'Cristóbal (Admin)'} • {msg.timestamp}
                    </span>
                    <span>{msg.text}</span>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleSendChatMessage} style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Escribe un mensaje rápido..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                style={{ flexGrow: 1, padding: '8px 12px', fontSize: '0.85rem' }}
              />
              <button type="submit" className="btn-primary" style={{ padding: '8px 14px' }}>
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* MODAL DE PREVISUALIZACIÓN VIRTUAL */}
      {showPreviewModal && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          background: 'rgba(0,0,0,0.85)', 
          backdropFilter: 'blur(10px)',
          zIndex: 1000, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div className="glass-card" style={{ width: '100%', maxWidth: '800px', padding: '24px', background: '#090a14' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem' }}>Previsualización de {currentSite.name}</h3>
              <button onClick={() => setShowPreviewModal(false)} className="btn-secondary btn-sm">Cerrar</button>
            </div>

            <div className="live-preview-window">
              <div className="preview-bar">
                <div className="dot red"></div>
                <div className="dot yellow"></div>
                <div className="dot green"></div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginLeft: '12px' }}>{currentSite.liveUrl}</span>
              </div>

              {formData.bannerActive && (
                <div style={{ background: formData.bannerBgColor, padding: '8px', color: 'white', textAlign: 'center', fontSize: '0.85rem', fontWeight: 600 }}>
                  {formData.bannerText}
                </div>
              )}

              <div style={{ padding: '24px' }}>
                <h2 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>{formData.heroTitle}</h2>
                <p style={{ color: '#94a3b8', marginBottom: '16px' }}>{formData.heroSubtitle}</p>
                <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                  <p>💬 WhatsApp: {formData.whatsappPhone}</p>
                  <p>🕒 Horarios: {formData.businessHours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
