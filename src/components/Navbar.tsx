import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, MessageCircle, Globe, LogIn, LogOut, Sliders, Sun, Moon, Tag, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { viewMode, setViewMode, userSession, setIsLoginModalOpen, logout, themeMode, toggleThemeMode } = useApp();
  const [showPromoBanner, setShowPromoBanner] = useState(true);

  const handleWhatsappClick = () => {
    window.open('https://wa.me/56956628609?text=Hola%20Axioma%20Web,%20quiero%20cotizar%20mi%20sitio%20web%20con%20el%2010%25%20de%20descuento%20por%20inauguración', '_blank');
  };

  return (
    <>
      {/* Banner Flotante de Promoción por Inauguración (Axioma Web) */}
      {showPromoBanner && (
        <div className="promo-top-banner">
          <div className="container promo-banner-inner">
            
            {/* VISTA DESKTOP */}
            <div className="promo-desktop-content">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="promo-tag-badge">
                  <Tag size={12} />
                  <span>10% OFF INAUGURACIÓN</span>
                </span>
                <span className="promo-banner-text">
                  🎉 ¡10% de descuento por inauguración en todos los proyectos de Axioma Web!
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={handleWhatsappClick} className="promo-banner-cta">
                  <MessageCircle size={13} />
                  <span>Obtener 10% OFF</span>
                </button>
                <button 
                  onClick={() => setShowPromoBanner(false)} 
                  className="promo-banner-close"
                  title="Cerrar aviso"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* VISTA MOBILE COMPACTA (1 Sola Línea) */}
            <div className="promo-mobile-content">
              <div onClick={handleWhatsappClick} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', flex: 1, overflow: 'hidden' }}>
                <span className="promo-tag-badge" style={{ padding: '2px 6px', fontSize: '0.68rem', whiteSpace: 'nowrap' }}>
                  10% OFF
                </span>
                <span style={{ fontWeight: 700, fontSize: '0.74rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  🎉 Inauguración Axioma Web
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button onClick={handleWhatsappClick} className="promo-banner-cta" style={{ padding: '3px 8px', fontSize: '0.7rem' }}>
                  <span>Ver Oferta</span>
                </button>
                <button 
                  onClick={() => setShowPromoBanner(false)} 
                  className="promo-banner-close"
                  style={{ padding: '1px' }}
                  title="Cerrar aviso"
                >
                  <X size={13} />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Navbar Superior Sticky Centrado */}
      <header className="navbar">
        <div className="container navbar-inner" style={{ margin: '0 auto', maxWidth: '1200px' }}>
          <a href="#" onClick={(e) => { e.preventDefault(); setViewMode('landing'); }} className="brand-logo">
            <div className="logo-icon" style={{ padding: '2px', background: 'transparent' }}>
              <img src="/images/axiomaweb_icon.png" alt="Axioma Web Icon" style={{ width: '100%', height: '100%', borderRadius: '8px', objectFit: 'cover' }} />
            </div>
            <div>
              <span className="text-gradient" style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.03em' }}>Axioma Web</span>
              <span style={{ display: 'block', fontSize: '0.65rem', color: themeMode === 'light' ? '#2d4a60' : '#a2c4d4', fontWeight: 700, letterSpacing: '0.06em' }}>
                DESARROLLO WEB & SOFTWARE
              </span>
            </div>
          </a>

          {/* Botón Único de Acceso & Botón Tema Claro/Oscuro */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Toggle Tema Claro/Oscuro */}
            <button 
              onClick={toggleThemeMode} 
              className="btn-secondary" 
              style={{ padding: '8px 12px', fontSize: '0.85rem' }}
              title={themeMode === 'dark' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
            >
              {themeMode === 'dark' ? <Sun size={16} style={{ color: '#fbbf24' }} /> : <Moon size={16} style={{ color: 'var(--c-mint-cyan)' }} />}
            </button>

            {userSession.role === 'guest' ? (
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="btn-primary"
                style={{ padding: '8px 16px', fontSize: '0.88rem' }}
              >
                <LogIn size={16} />
                <span>Acceso a Portal</span>
              </button>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button 
                  onClick={() => setViewMode(userSession.role === 'client' ? 'client-panel' : 'admin-panel')}
                  className="btn-primary"
                  style={{ 
                    padding: '8px 16px', 
                    fontSize: '0.85rem',
                    background: userSession.role === 'admin' ? 'linear-gradient(135deg, #ec4899, #8b5cf6)' : undefined 
                  }}
                >
                  {userSession.role === 'admin' ? <ShieldCheck size={16} /> : <Sliders size={16} />}
                  <span>{userSession.role === 'admin' ? 'Panel Admin Maestro' : `Mi Panel (${userSession.clientName})`}</span>
                </button>

                <button 
                  onClick={logout}
                  className="btn-secondary"
                  style={{ padding: '8px 12px', fontSize: '0.8rem' }}
                  title="Cerrar Sesión"
                >
                  <LogOut size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Barra de Navegación Inferior Fija para Celulares */}
      <nav className="mobile-bottom-bar" aria-label="Navegación Móvil Principal">
        <button 
          className={`mobile-bottom-btn ${viewMode === 'landing' ? 'active' : ''}`}
          onClick={() => setViewMode('landing')}
        >
          <Globe size={18} />
          <span>Inicio</span>
        </button>

        <button 
          className="mobile-bottom-btn"
          onClick={toggleThemeMode}
        >
          {themeMode === 'dark' ? <Sun size={18} style={{ color: '#fbbf24' }} /> : <Moon size={18} style={{ color: 'var(--c-mint-cyan)' }} />}
          <span>{themeMode === 'dark' ? 'Claro' : 'Oscuro'}</span>
        </button>

        {userSession.role === 'guest' ? (
          <button 
            className="mobile-bottom-btn"
            onClick={() => setIsLoginModalOpen(true)}
          >
            <LogIn size={18} style={{ color: 'var(--c-mint-cyan)' }} />
            <span>Acceso a Portal</span>
          </button>
        ) : (
          <button 
            className={`mobile-bottom-btn ${viewMode !== 'landing' ? 'active' : ''}`}
            onClick={() => setViewMode(userSession.role === 'client' ? 'client-panel' : 'admin-panel')}
          >
            {userSession.role === 'admin' ? <ShieldCheck size={18} /> : <Sliders size={18} />}
            <span>{userSession.role === 'admin' ? 'Admin' : 'Mi Panel'}</span>
          </button>
        )}

        <button 
          className="mobile-bottom-btn"
          style={{ color: 'var(--c-mint-cyan)' }}
          onClick={handleWhatsappClick}
        >
          <MessageCircle size={18} />
          <span>WhatsApp</span>
        </button>
      </nav>
    </>
  );
};
