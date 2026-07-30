import React, { useState, useEffect } from 'react';
import { Sparkles, Sliders, Zap, Smartphone, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface BannerSlide {
  id: number;
  badge: string;
  title: string;
  highlightText: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

const BANNERS: BannerSlide[] = [
  {
    id: 0,
    badge: '⚡ Autogestión Total',
    title: 'Páginas Web 100% ',
    highlightText: 'Moldeables por Ti',
    description: 'Cambia avisos, títulos, precios y ofertas en tiempo real sin depender de un programador.',
    image: '/images/banner_photo_1.png',
    icon: <Sliders size={20} style={{ color: '#48e5c2' }} />
  },
  {
    id: 1,
    badge: '🛍️ Tiendas & E-Commerce',
    title: 'Vende Más con Tu ',
    highlightText: 'E-Commerce para Pymes',
    description: 'Catálogo dinámico, carrito de compras veloz y recepción de pedidos directo por WhatsApp.',
    image: '/images/banner_photo_2.png',
    icon: <Sparkles size={20} style={{ color: '#48e5c2' }} />
  },
  {
    id: 2,
    badge: '🚀 Alto Rendimiento',
    title: 'Carga Instantánea & ',
    highlightText: 'SEO en Buscadores',
    description: 'Tu sitio cargará en milisegundos y estará optimizado con estrategias SEO para destacar en Google.',
    image: '/images/banner_photo_3.png',
    icon: <Zap size={20} style={{ color: '#48e5c2' }} />
  },
  {
    id: 3,
    badge: '📱 Mobile-First Native',
    title: 'Diseño Exclusivo ',
    highlightText: 'Optimizado para Celulares',
    description: 'Interfaz fluida y botones táctiles diseñados para convertir visitantes en clientes de inmediato.',
    image: '/images/banner_photo_4.png',
    icon: <Smartphone size={20} style={{ color: '#48e5c2' }} />
  },
  {
    id: 4,
    badge: '💬 Respuesta Inmediata',
    title: 'Soporte Directo & ',
    highlightText: 'Agendamiento por WhatsApp',
    description: 'Contacto constante con la Mesa de Atención Comercial por WhatsApp para impulsar tu proyecto.',
    image: '/images/banner_photo_5.png',
    icon: <MessageCircle size={20} style={{ color: '#48e5c2' }} />
  }
];

export const BannerCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Autoplay de 4.5 segundos (se pausa automáticamente cuando el usuario tiene el mouse encima)
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isHovered]);

  const currentBanner = BANNERS[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
  };

  const getDotClass = (index: number) => {
    if (index === currentIndex) return 'insta-dot active';
    const diff = Math.abs(index - currentIndex);
    if (diff === 1) return 'insta-dot adjacent';
    return 'insta-dot far';
  };

  return (
    <div 
      className="banner-carousel-wrapper" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: 'relative', overflow: 'hidden', height: '360px', boxSizing: 'border-box' }}
    >
      {/* Botón Escondido / Discreto Anterior (<) */}
      <button
        onClick={handlePrev}
        aria-label="Banner anterior"
        className="carousel-nav-btn prev"
        style={{
          position: 'absolute',
          left: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 4,
          background: 'rgba(9, 13, 22, 0.45)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          color: '#ffffff',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          opacity: 0.45,
          transition: 'all 0.25s ease'
        }}
      >
        <ChevronLeft size={20} />
      </button>

      {/* Botón Escondido / Discreto Siguiente (>) */}
      <button
        onClick={handleNext}
        aria-label="Siguiente banner"
        className="carousel-nav-btn next"
        style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 4,
          background: 'rgba(9, 13, 22, 0.45)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          color: '#ffffff',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          opacity: 0.45,
          transition: 'all 0.25s ease'
        }}
      >
        <ChevronRight size={20} />
      </button>

      {/* Imagen Fotográfica Profesional Visible (SIN BLUR) */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `url(${currentBanner.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.82,
        transition: 'background-image 0.5s ease-in-out, opacity 0.5s ease',
        zIndex: 1
      }} />

      {/* Capa Transparente de Texto Legible (Scrim Gradient) */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(180deg, rgba(15, 12, 28, 0.45) 0%, rgba(9, 13, 22, 0.88) 100%)',
        zIndex: 2
      }} />

      {/* Contenido del Banner */}
      <div className="banner-carousel-slide" style={{ position: 'relative', zIndex: 3, textShadow: '0 2px 10px rgba(0,0,0,0.8)', height: 'calc(100% - 48px)', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="badge-glow" style={{ marginBottom: '14px', background: 'rgba(9, 13, 22, 0.85)', backdropFilter: 'blur(10px)', alignSelf: 'center' }}>
          {currentBanner.icon}
          <span>{currentBanner.badge}</span>
        </div>

        <h3 className="banner-title" style={{ color: '#ffffff', fontWeight: 800 }}>
          {currentBanner.title}
          <span className="text-gradient" style={{ display: 'inline-block', marginLeft: '6px' }}>{currentBanner.highlightText}</span>
        </h3>

        <p className="banner-description" style={{ color: '#e2e8f0', textShadow: '0 1px 6px rgba(0,0,0,0.9)', minHeight: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {currentBanner.description}
        </p>
      </div>

      {/* Indicadores de Puntos estilo Instagram */}
      <div className="instagram-dots-container" style={{ position: 'absolute', bottom: '16px', left: 0, right: 0, zIndex: 3, padding: 0 }} aria-label="Navegación de Banners">
        {BANNERS.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentIndex(idx)}
            className={getDotClass(idx)}
            aria-label={`Ir al banner ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
