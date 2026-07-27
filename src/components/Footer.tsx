import React from 'react';
import { Sparkles, MessageCircle, Mail, MapPin, Search } from 'lucide-react';

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', justifyContent: 'center' }}>
              <div className="logo-icon">
                <Sparkles size={20} />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>Cristóbal Sandoval</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, textAlign: 'center' }}>
              Desarrollo de páginas web profesionales, rápidas, seguras y 100% autoadministrables vía panel de control. Posicionamiento SEO en buscadores.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '16px' }}>Contacto Directo</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: 'var(--text-muted)', alignItems: 'center' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageCircle size={16} style={{ color: 'var(--c-mint-cyan)' }} />
                <a href="https://wa.me/56956628609" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>+569 5662 8609 (Cristóbal)</a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} style={{ color: 'var(--accent-secondary)' }} />
                <span>cristobal.sandoval.balboa@gmail.com</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} style={{ color: 'var(--c-mint-cyan)' }} />
                <span>Concepción, Chile</span>
              </li>
            </ul>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '16px' }}>Garantía & Redes Sociales</h4>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', justifyContent: 'center' }}>
              <a href="https://linkedin.com/in/cristobalsandovaldev" target="_blank" rel="noopener noreferrer" className="btn-secondary btn-sm" title="LinkedIn" style={{ width: '40px', height: '40px', padding: 0, borderRadius: '50%' }}>
                <LinkedinIcon size={16} />
              </a>
              <a href="#" className="btn-secondary btn-sm" title="Instagram @cristobal.webstudio" style={{ width: '40px', height: '40px', padding: 0, borderRadius: '50%' }}>
                <InstagramIcon size={16} />
              </a>
            </div>
            <div className="badge-glow badge-emerald" style={{ fontSize: '0.78rem' }}>
              <Search size={14} />
              <span>Optimizado para Búsquedas en Línea</span>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '24px', textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-dim)' }}>
          © {new Date().getFullYear()} Cristóbal Sandoval Balboa — Web Studio & Software Development. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};
