import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BannerCarousel } from './BannerCarousel';
import { MercadoPagoModal } from './MercadoPagoModal';
import { 
  Zap, 
  ShieldCheck, 
  Search, 
  ExternalLink, 
  MessageCircle, 
  Calendar, 
  Smartphone, 
  Layers, 
  Calculator,
  HelpCircle,
  ChevronDown,
  CreditCard,
  MapPin,
  Image,
  ShoppingBag,
  Sliders,
  CheckCircle2,
  Globe
} from 'lucide-react';

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const LandingPage: React.FC = () => {
  const { projectsShowcase } = useApp();

  // Estado para el Cotizador Instantáneo Interactivo
  const [quoteProjectType, setQuoteProjectType] = useState<'express' | 'pro' | 'ecommerce'>('pro');
  const [includeDomain, setIncludeDomain] = useState(false);
  const [includeBooking, setIncludeBooking] = useState(false);
  const [includeAdvancedSeo, setIncludeAdvancedSeo] = useState(false);

  // Estado Modal Mercado Pago
  const [isMpModalOpen, setIsMpModalOpen] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // PRECIOS BASE COMPETITIVOS MERCADO CHILE:
  const calculateTotalEstimate = () => {
    let base = quoteProjectType === 'express' ? 149990 : quoteProjectType === 'pro' ? 249990 : 299990;
    
    // Solo cobrar adicional por dominio si está en plan Express (ya que Pro y E-commerce lo incluyen gratis)
    if (includeDomain && quoteProjectType === 'express') base += 15000;
    if (includeBooking) base += 20000;
    if (includeAdvancedSeo) base += 15000;
    return base;
  };

  const getSelectedExtrasList = () => {
    const selectedExtras: string[] = [];
    if (quoteProjectType !== 'express') {
      selectedExtras.push('🌐 Dominio .CL GRATIS por 1 Año (Incluido en el Plan)');
    } else if (includeDomain) {
      selectedExtras.push('Dominio .CL / .COM e Infraestructura SSL');
    }

    if (quoteProjectType === 'ecommerce') {
      selectedExtras.push('💳 Integración Pasarela Mercado Pago / Webpay (Incluido)');
    }

    if (includeBooking) selectedExtras.push('Agendamiento a 3 Reuniones para mantencion y cambios');
    if (includeAdvancedSeo) selectedExtras.push('Posicionamiento SEO en Buscadores + Marcado JSON-LD');
    return selectedExtras;
  };

  const getProjectTypeLabel = () => {
    if (quoteProjectType === 'express') return 'Landing Básica (Desde $149.990 CLP)';
    if (quoteProjectType === 'pro') return 'Web Pro Pyme (Desde $249.990 CLP)';
    return 'Sitio Ventas / E-Commerce (Desde $299.990 CLP)';
  };

  const handleSendQuoteWhatsapp = () => {
    const total = calculateTotalEstimate();
    const typeLabel = getProjectTypeLabel();
    const selectedExtras = getSelectedExtrasList();
    const extrasFormatted = selectedExtras.length > 0 ? selectedExtras.map(e => `• ${e}`).join('%0A') : '• Ningún adicional';

    const message = `Hola Mesa Comercial Axioma Web, he generado la siguiente cotización en axiomaweb.cl:%0A%0A📌 *Tipo de Proyecto:* ${typeLabel}%0A%0A📋 *Opciones Seleccionadas:*%0A${extrasFormatted}%0A%0A💰 *Presupuesto Estimado Total:* $${total.toLocaleString('es-CL')} CLP%0A%0A¿Podemos coordinar los detalles para iniciar el desarrollo?`;

    window.open(`https://wa.me/56956628609?text=${message}`, '_blank');
  };

  const handleWhatsappDirect = () => {
    window.open('https://wa.me/56956628609?text=Hola%20Axioma%20Web,%20quisiera%20solicitar%20asesoría%20comercial%20para%20un%20proyecto%20web', '_blank');
  };

  const faqs = [
    {
      q: '¿Qué incluye el Dominio .CL Gratis?',
      a: 'En nuestros planes Web Pro Pyme ($249.990) y Sitio Ventas E-Commerce ($299.990), gestionamos el registro oficial de tu dominio .CL por 1 año entero completamente gratis a tu nombre.'
    },
    {
      q: '¿Cómo funciona el Panel de Control Moldeable de Axioma Web?',
      a: 'Te entregamos un acceso corporativo donde puedes actualizar textos, fotos, avisos de ofertas, WhatsApp de contacto y colores institucionales en tiempo real sin necesidad de escribir código.'
    },
    {
      q: '¿Mi plataforma estará optimizada para aparecer en Google?',
      a: 'Absolutamente. Todos nuestros desarrollos incorporan etiquetas meta estructuradas, datos enriquecidos Schema.org JSON-LD y optimización de velocidad mobile-first para lograr un alto posicionamiento SEO en Google.'
    },
    {
      q: '¿Cuáles son los tiempos de entrega para cada proyecto?',
      a: 'Una Landing Básica se entrega en 3 a 5 días hábiles. Un Sitio Web Pro toma entre 7 a 10 días, y una tienda E-Commerce completa entre 10 a 14 días hábiles con pasarela de pago activa.'
    }
  ];

  return (
    <main className="landing-container" role="main">
      {/* Modal Checkout Mercado Pago con Cupón 10% OFF */}
      <MercadoPagoModal 
        isOpen={isMpModalOpen}
        onClose={() => setIsMpModalOpen(false)}
        projectTypeLabel={getProjectTypeLabel()}
        baseAmountCLP={calculateTotalEstimate()}
        selectedExtras={getSelectedExtrasList()}
      />

      {/* 1. HERO SECTION AXIOMA WEB */}
      <section className="hero-section" aria-label="Introducción a Axioma Web">
        <div className="container">
          <div className="badge-glow" style={{ marginBottom: '16px' }}>
            <Zap size={15} style={{ color: '#48e5c2' }} />
            <span>Axioma Web • Certeza, Estrategia & Ingeniería Web Corporativa</span>
          </div>

          <h1 className="hero-title">
            Desarrollo Web Fundamentado en <span className="text-gradient">Certeza, Estrategia</span> & <span className="text-gradient-cyan">Resultados Reales</span>
          </h1>

          <p className="hero-subtitle">
            Cotización transparente en vivo sin costos ocultos. Plataformas mobile-first de alto rendimiento y soluciones autoadministrables desde $149.990 CLP.
          </p>

          <div className="hero-ctas" style={{ maxWidth: '440px', width: '100%', margin: '0 auto' }}>
            <button 
              onClick={handleWhatsappDirect} 
              className="btn-primary btn-whatsapp" 
              style={{ padding: '16px 28px', fontSize: '1.02rem', width: '100%', justifyContent: 'center' }}
              aria-label="Iniciar cotización instantánea por WhatsApp"
            >
              <MessageCircle size={20} />
              <span>Cotización Instantánea por WhatsApp</span>
            </button>
          </div>

          {/* Tarjetas de Garantía Centradas */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginTop: '36px', maxWidth: '640px', margin: '36px auto 0' }}>
            <div className="glass-card" style={{ padding: '16px', textAlign: 'center', fontSize: '0.8rem' }}>
              <ShieldCheck size={22} style={{ color: '#48e5c2', margin: '0 auto 6px' }} />
              <span style={{ display: 'block', fontWeight: 700 }}>Certeza & Transparencia</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Precios Claros Sin Costos Ocultos</span>
            </div>

            <div className="glass-card" style={{ padding: '16px', textAlign: 'center', fontSize: '0.8rem' }}>
              <Search size={22} style={{ color: '#38bdf8', margin: '0 auto 6px' }} />
              <span style={{ display: 'block', fontWeight: 700 }}>SEO en Buscadores</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Posicionamiento Google</span>
            </div>

            <div className="glass-card" style={{ padding: '16px', textAlign: 'center', fontSize: '0.8rem' }}>
              <Smartphone size={22} style={{ color: '#48e5c2', margin: '0 auto 6px' }} />
              <span style={{ display: 'block', fontWeight: 700 }}>Mobile-First Native</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>100% Adaptable</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CARRUSEL DE BANNERS PROMINENTE */}
      <section className="container" style={{ margin: '24px auto 48px' }} aria-label="Destacados Visuales">
        <BannerCarousel />
      </section>

      {/* 3. COTIZADOR INSTANTÁNEO AXIOMA WEB */}
      <section className="container" style={{ margin: '48px auto' }} aria-label="Cotizador Instantáneo">
        <div className="glass-card cotizador-box" style={{ padding: '32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div className="badge-glow badge-emerald" style={{ marginBottom: '8px' }}>
              <Calculator size={15} />
              <span>Cotizador Instantáneo Corporativo</span>
            </div>
            <h2 className="section-title" style={{ fontSize: '1.8rem' }}>Calcula el Presupuesto de tu Proyecto en Segundos</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              Selecciona la solución adecuada para tu empresa y añade requerimientos adicionales:
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
            {/* Opciones de tipo de proyecto */}
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 700, marginBottom: '10px' }}>Tipo de Plataforma Web:</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
                
                {/* PLAN 1: LANDING BÁSICA (Desde $149.990) */}
                <button 
                  type="button"
                  onClick={() => setQuoteProjectType('express')}
                  className={`quote-type-btn ${quoteProjectType === 'express' ? 'active' : ''}`}
                  style={{ textAlign: 'left', padding: '16px' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <strong style={{ fontSize: '1.05rem' }}>Landing Básica</strong>
                    <span style={{ color: 'var(--c-mint-cyan)', fontWeight: 800, fontSize: '0.95rem' }}>Desde $149.990</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: '10px' }}>
                    Página web directa ideal para presentar tu negocio rápidamente.
                  </p>
                  <ul style={{ listStyle: 'none', fontSize: '0.76rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Image size={13} style={{ color: '#38bdf8' }} /> Galería de Imágenes & Fotos HD</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Sliders size={13} style={{ color: '#48e5c2' }} /> Banners Promocionales Dinámicos</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={13} style={{ color: '#f59e0b' }} /> Mapa Interactivo Google Maps</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MessageCircle size={13} style={{ color: '#48e5c2' }} /> Botón Directo a WhatsApp</li>
                  </ul>
                </button>

                {/* PLAN 2: WEB PRO PYME (Desde $249.990) - DESTACADO */}
                <button 
                  type="button"
                  onClick={() => setQuoteProjectType('pro')}
                  className={`quote-type-btn ${quoteProjectType === 'pro' ? 'active' : ''}`}
                  style={{ textAlign: 'left', padding: '16px', position: 'relative', border: quoteProjectType === 'pro' ? '2px solid var(--c-mint-cyan)' : undefined }}
                >
                  <div style={{ position: 'absolute', top: '-10px', right: '12px', background: 'var(--c-mint-cyan)', color: '#090d16', fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: '10px', textTransform: 'uppercase' }}>
                    🔥 Más Popular
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <strong style={{ fontSize: '1.05rem' }}>Web Pro Pyme</strong>
                    <span style={{ color: 'var(--c-mint-cyan)', fontWeight: 800, fontSize: '0.95rem' }}>Desde $249.990</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: '10px' }}>
                    Sitio web completo multi-sección autoadministrable.
                  </p>
                  <ul style={{ listStyle: 'none', fontSize: '0.76rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: 'var(--c-mint-cyan)' }}><Globe size={13} /> 🌐 Dominio .CL GRATIS por 1 Año</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Layers size={13} style={{ color: '#38bdf8' }} /> Multi-Sección (Inicio, Servicios, Nosotros)</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Sliders size={13} style={{ color: '#48e5c2' }} /> Panel de Control 100% Moldeable</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={13} style={{ color: '#48e5c2' }} /> Agendamiento de Citas en Vivo</li>
                  </ul>
                </button>

                {/* PLAN 3: VENTAS / E-COMMERCE (Desde $299.990) */}
                <button 
                  type="button"
                  onClick={() => setQuoteProjectType('ecommerce')}
                  className={`quote-type-btn ${quoteProjectType === 'ecommerce' ? 'active' : ''}`}
                  style={{ textAlign: 'left', padding: '16px' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <strong style={{ fontSize: '1.05rem' }}>Sitio Ventas / E-Commerce</strong>
                    <span style={{ color: 'var(--c-mint-cyan)', fontWeight: 800, fontSize: '0.95rem' }}>Desde $299.990</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: '10px' }}>
                    Tienda online con catálogo dinámico y cobro con tarjeta.
                  </p>
                  <ul style={{ listStyle: 'none', fontSize: '0.76rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: 'var(--c-mint-cyan)' }}><Globe size={13} /> 🌐 Dominio .CL + SSL GRATIS (1 Año)</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#38bdf8' }}><CreditCard size={13} /> 💳 Pasarela Mercado Pago / Webpay</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><ShoppingBag size={13} style={{ color: '#48e5c2' }} /> Catálogo de Productos / TCG</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={13} style={{ color: '#48e5c2' }} /> Todo lo de los planes anteriores</li>
                  </ul>
                </button>

              </div>
            </div>

            {/* Checkboxes de adicionales opcionales */}
            <div className="quote-options-box" style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '18px', borderRadius: '14px' }}>
              {quoteProjectType === 'express' && (
                <label className="quote-checkbox-label">
                  <span>Dominio .CL / .COM e Infraestructura SSL (+ $15.000)</span>
                  <input type="checkbox" checked={includeDomain} onChange={(e) => setIncludeDomain(e.target.checked)} className="custom-checkbox" />
                </label>
              )}

              <label className="quote-checkbox-label">
                <span>Agendamiento a 3 Reuniones para mantencion y cambios (+ $20.000)</span>
                <input type="checkbox" checked={includeBooking} onChange={(e) => setIncludeBooking(e.target.checked)} className="custom-checkbox" />
              </label>

              <label className="quote-checkbox-label">
                <span>Posicionamiento SEO en Buscadores + Marcado JSON-LD (+ $15.000)</span>
                <input type="checkbox" checked={includeAdvancedSeo} onChange={(e) => setIncludeAdvancedSeo(e.target.checked)} className="custom-checkbox" />
              </label>
            </div>

            {/* Total Calculado & Botones Duales */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', paddingTop: '10px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', fontWeight: 600 }}>PRESUPUESTO ESTIMADO TOTAL:</span>
                <strong style={{ fontSize: '2.2rem', color: 'var(--c-mint-cyan)' }}>
                  ${calculateTotalEstimate().toLocaleString('es-CL')} CLP
                </strong>
                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--c-mint-cyan)', fontWeight: 700, marginTop: '2px' }}>
                  🎁 Aplica cupón INAUGURACION10 para 10% OFF en Mercado Pago
                </span>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', flex: 1, justifyContent: 'flex-end' }}>
                <button onClick={handleSendQuoteWhatsapp} className="btn-primary btn-whatsapp" style={{ padding: '14px 20px', fontSize: '0.9rem' }}>
                  <MessageCircle size={18} />
                  <span>Enviar Cotización a WhatsApp</span>
                </button>

                <button onClick={() => setIsMpModalOpen(true)} className="btn-primary" style={{ padding: '14px 20px', fontSize: '0.9rem', background: 'linear-gradient(135deg, #009ee3, #0072bb)' }}>
                  <CreditCard size={18} />
                  <span>Pagar con Tarjeta (Mercado Pago)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECCIÓN PORTAFOLIO AXIOMA WEB */}
      <section className="container" style={{ padding: '24px 0 48px' }} aria-label="Portafolio de Casos de Éxito">
        <div className="section-header">
          <div className="badge-glow" style={{ marginBottom: '10px' }}>
            <Layers size={15} />
            <span>Casos de Éxito & Portafolio</span>
          </div>
          <h2 className="section-title" style={{ fontSize: '1.8rem' }}>Soluciones Desarrolladas por Axioma Web</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Explora las plataformas web reales implementadas para nuestros clientes:
          </p>
        </div>

        <div className="portfolio-grid">
          {projectsShowcase.map((project) => {
            const domainName = project.liveUrl.replace('https://', '').replace('/', '').toUpperCase();

            return (
              <div key={project.id} className="glass-card portfolio-card">
                
                {/* MARCO LAPTOP MOCKUP REALISTA */}
                <div className="laptop-mockup-container">
                  <div className="laptop-frame">
                    <div className="laptop-camera-dot"></div>
                    <div className="laptop-screen">
                      <div style={{ background: '#3b5e78', padding: '6px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'white', fontSize: '0.7rem', position: 'relative', zIndex: 2 }}>
                        <strong style={{ fontSize: '0.75rem' }}>{project.title}</strong>
                        <span style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '4px' }}>{project.statusText}</span>
                      </div>

                      {project.previewImage ? (
                        <div style={{ width: '100%', height: 'calc(100% - 28px)', overflow: 'hidden' }}>
                          <img 
                            src={project.previewImage} 
                            alt={`Preview ${project.title}`}
                            loading="lazy"
                            decoding="async"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                          />
                        </div>
                      ) : (
                        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 'calc(100% - 28px)', textAlign: 'center', background: 'linear-gradient(180deg, #201a35 0%, #151025 100%)' }}>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white', marginBottom: '8px' }}>
                            {project.subtitle}
                          </h4>
                          <span style={{ fontSize: '0.72rem', color: '#a2c4d4', maxWidth: '80%' }}>
                            {project.description}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="laptop-keyboard-base">
                    <div className="laptop-trackpad-notch"></div>
                  </div>

                  <h3 className="laptop-domain-title">{domainName}</h3>
                  <div className="laptop-category-sub">{project.subtitle}</div>
                </div>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '16px' }}>
                  {project.techStack.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'auto' }}>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ width: '100%', maxWidth: '280px', padding: '12px 20px', fontSize: '0.9rem' }}>
                    <ExternalLink size={16} />
                    <span>Ver Demo en Vivo</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. SECCIÓN FAQ */}
      <section className="container" style={{ paddingBottom: '48px' }} aria-label="Preguntas Frecuentes">
        <div className="glass-card" style={{ padding: '28px', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div className="badge-glow" style={{ marginBottom: '8px' }}>
              <HelpCircle size={15} />
              <span>Preguntas Frecuentes</span>
            </div>
            <h2 className="section-title" style={{ fontSize: '1.6rem' }}>Resuelve tus Dudas al Instante</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button 
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="faq-button"
                  aria-expanded={openFaqIndex === index}
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={18} style={{ transform: openFaqIndex === index ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />
                </button>
                {openFaqIndex === index && (
                  <div className="faq-content">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONTACTO CORPORATIVO VÍA WHATSAPP */}
      <section className="container" style={{ paddingBottom: '48px' }} aria-label="Contacto Comercial">
        <div className="glass-card cta-banner-box" style={{ padding: '32px', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'center' }}>
            <a href="https://instagram.com/axiomaweb.cl" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--c-mint-cyan)', fontWeight: 700, textDecoration: 'none' }}>
              <InstagramIcon size={20} />
              <span>@axiomaweb.cl en Instagram</span>
            </a>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800 }}>¿Listo para impulsar el sitio web de tu empresa?</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Contacta a nuestra Mesa de Atención Comercial por WhatsApp para asesorarte en el desarrollo de tu solución digital.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', maxWidth: '340px', margin: '0 auto', width: '100%' }}>
              <button onClick={handleWhatsappDirect} className="btn-primary btn-whatsapp" style={{ padding: '14px 28px', fontSize: '1rem', width: '100%', justifyContent: 'center' }}>
                <MessageCircle size={18} />
                <span>Atención Comercial WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
