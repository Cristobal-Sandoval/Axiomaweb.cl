import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { SiteId } from '../types';
import { Lock, UserCheck, ShieldCheck, X, Key, Mail, ArrowRight } from 'lucide-react';
import { APP_CONFIG } from '../config/credentials';
import { sanitizeEmail } from '../utils/sanitize';
import { useFocusTrap } from '../hooks/useFocusTrap';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, loginWithCredentials, sites } = useApp();

  const [activeTab, setActiveTab] = useState<'client' | 'admin'>('client');
  const [selectedSiteId, setSelectedSiteId] = useState<SiteId>('cardpoint');
  const [emailInput, setEmailInput] = useState('contacto@cardpoint.cl');
  const [passwordInput, setPasswordInput] = useState('');
  const [adminEmail, setAdminEmail] = useState(APP_CONFIG.admin.emails[0]);
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const modalRef = useFocusTrap(isLoginModalOpen);

  if (!isLoginModalOpen) return null;

  const handleSelectSiteQuick = (siteId: SiteId) => {
    setSelectedSiteId(siteId);
    setEmailInput(sites[siteId].clientEmail);
    setPasswordInput(APP_CONFIG.clients.defaultPassword);
    setLoginError('');
  };

  const handleClientLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const cleanEmail = sanitizeEmail(emailInput);
    if (!cleanEmail || !passwordInput) {
      setLoginError('Por favor ingresa tu correo y contraseña.');
      return;
    }
    setIsSubmitting(true);
    try {
      await new Promise(r => setTimeout(r, 400));
      loginWithCredentials(cleanEmail, passwordInput, selectedSiteId);
    } catch {
      setLoginError('Error al iniciar sesión. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdminLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const cleanEmail = sanitizeEmail(adminEmail);
    if (!cleanEmail || !adminPassword) {
      setLoginError('Por favor ingresa correo y contraseña de administrador.');
      return;
    }
    setIsSubmitting(true);
    try {
      await new Promise(r => setTimeout(r, 400));
      loginWithCredentials(cleanEmail, adminPassword);
    } catch {
      setLoginError('Error al iniciar sesión. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label="Iniciar sesión en el portal"
      style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(5, 6, 12, 0.88)',
      backdropFilter: 'blur(16px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div className="glass-card" style={{
        width: '100%',
        maxWidth: '480px',
        padding: '28px',
        background: 'linear-gradient(180deg, rgba(20, 24, 48, 0.98) 0%, rgba(10, 12, 26, 0.98) 100%)',
        border: '1px solid var(--border-glow)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-glow)',
        position: 'relative'
      }}>
        {/* Botón Cerrar */}
        <button 
          data-close-modal
          onClick={() => setIsLoginModalOpen(false)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255,255,255,0.06)',
            border: 'none',
            color: '#94a3b8',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Encabezado del Modal */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #6366f1, #ec4899)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            margin: '0 auto 10px'
          }}>
            <Lock size={22} />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Iniciar Sesión en el Portal</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '2px' }}>
            Ingresa con tu correo y contraseña para acceder a tu panel.
          </p>
        </div>

        {/* Tabs de Selección de Cuenta */}
        <div style={{
          display: 'flex',
          background: 'rgba(0,0,0,0.4)',
          padding: '4px',
          borderRadius: '10px',
          marginBottom: '20px',
          border: '1px solid rgba(255,255,255,0.08)'
        }}>
          <button
            type="button"
            onClick={() => { setActiveTab('client'); setLoginError(''); }}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'client' ? '#6366f1' : 'transparent',
              color: 'white',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <UserCheck size={16} />
            <span>Panel de Cliente</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('admin'); setLoginError(''); }}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'admin' ? '#ec4899' : 'transparent',
              color: 'white',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <ShieldCheck size={16} />
            <span>Panel Admin (Axioma Web)</span>
          </button>
        </div>

        {loginError && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#fca5a5', padding: '10px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.82rem', textAlign: 'center' }}>
            {loginError}
          </div>
        )}

        {/* FORMULARIO CLIENTE */}
        {activeTab === 'client' ? (
          <form onSubmit={handleClientLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* Chips de selección rápida de cliente demo */}
            <div style={{ marginBottom: '4px' }}>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Cuentas de Cliente Demo:</span>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <button 
                  type="button" 
                  onClick={() => handleSelectSiteQuick('cardpoint')} 
                  style={{ border: '1px solid #334155', background: selectedSiteId === 'cardpoint' ? '#4f46e5' : 'rgba(0,0,0,0.3)', color: 'white', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' }}
                >
                  💳 CardPoint
                </button>
                <button 
                  type="button" 
                  onClick={() => handleSelectSiteQuick('beast-training')} 
                  style={{ border: '1px solid #334155', background: selectedSiteId === 'beast-training' ? '#10b981' : 'rgba(0,0,0,0.3)', color: 'white', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' }}
                >
                  🏋️‍♂️ Beast Gym
                </button>
                <button 
                  type="button" 
                  onClick={() => handleSelectSiteQuick('studio-vanessa')} 
                  style={{ border: '1px solid #334155', background: selectedSiteId === 'studio-vanessa' ? '#ec4899' : 'rgba(0,0,0,0.3)', color: 'white', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' }}
                >
                  💅 Studio Vanessa
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Correo Electrónico del Cliente:</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="email" 
                  className="form-input" 
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="ejemplo@cliente.cl"
                  style={{ paddingLeft: '38px' }}
                  required
                />
                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: '#64748b' }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Contraseña:</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="password" 
                  className="form-input" 
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  style={{ paddingLeft: '38px' }}
                  required
                />
                <Key size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: '#64748b' }} />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ padding: '12px', marginTop: '6px' }} disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }} />
              ) : (
                <ArrowRight size={18} />
              )}
              <span>{isSubmitting ? 'Ingresando...' : 'Ingresar y Mantener Sesión'}</span>
            </button>
          </form>
        ) : (
          /* FORMULARIO ADMIN MAESTRO */
          <form onSubmit={handleAdminLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">Correo Administrador Maestro:</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="email" 
                  className="form-input" 
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  style={{ paddingLeft: '38px' }}
                  required
                />
                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: '#64748b' }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Contraseña Maestro:</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="password" 
                  className="form-input" 
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ paddingLeft: '38px' }}
                  required
                />
                <Key size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: '#64748b' }} />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ padding: '12px', background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', marginTop: '6px' }} disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }} />
              ) : (
                <ShieldCheck size={18} />
              )}
              <span>{isSubmitting ? 'Ingresando...' : 'Ingresar como Admin Maestro'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
