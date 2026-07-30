import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  ViewMode, 
  SiteId, 
  UserSession,
  ClientSiteConfig, 
  ChangeRequest, 
  MeetingBooking, 
  DirectMessage,
  ProjectShowcase,
  ThemeMode
} from '../types';

interface AppContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  activeSiteId: SiteId;
  setActiveSiteId: (siteId: SiteId) => void;
  themeMode: ThemeMode;
  toggleThemeMode: () => void;
  userSession: UserSession;
  loginWithCredentials: (email: string, _pass: string, targetSiteId?: SiteId) => boolean;
  logout: () => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  sites: Record<SiteId, ClientSiteConfig>;
  updateSiteConfig: (siteId: SiteId, newConfig: Partial<ClientSiteConfig>) => void;
  changeRequests: ChangeRequest[];
  addChangeRequest: (req: Omit<ChangeRequest, 'id' | 'createdAt' | 'status'>) => void;
  updateRequestStatus: (id: string, status: ChangeRequest['status']) => void;
  meetings: MeetingBooking[];
  bookMeeting: (meeting: Omit<MeetingBooking, 'id' | 'status'>) => void;
  messages: DirectMessage[];
  sendMessage: (siteId: SiteId, sender: 'cliente' | 'admin', text: string) => void;
  projectsShowcase: ProjectShowcase[];
}

const INITIAL_SITES: Record<SiteId, ClientSiteConfig> = {
  'cardpoint': {
    id: 'cardpoint',
    name: 'CardPoint E-Commerce Platform',
    category: 'E-Commerce & Ventas Pyme',
    clientName: 'CardPoint Chile',
    clientEmail: 'contacto@cardpoint.cl',
    bannerText: '🔥 ¡Nuevos productos disponibles con 15% OFF!',
    bannerActive: true,
    bannerBgColor: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
    heroTitle: 'Tu Tienda Especializada en Catálogo Dinámico & Ventas Pyme',
    heroSubtitle: 'Vende y gestiona tus productos en línea con la mayor rapidez del mercado.',
    whatsappPhone: '+56956628609',
    businessHours: 'Lun a Sáb: 10:00 - 20:00 hrs',
    themeStyle: 'dark-neon',
    promoDiscountActive: true,
    promoText: 'Envío gratis por compras sobre $35.000',
    liveUrl: 'https://cardpoint.cl',
    githubUrl: 'https://github.com/Cristobal-Sandoval/CardPoint',
    status: 'Activo / Producción',
    lastUpdated: 'Hace 10 min'
  },
  'beast-training': {
    id: 'beast-training',
    name: 'Beast Training Gym',
    category: 'Gimnasio & Fitness High Performance',
    clientName: 'Beast Training Team',
    clientEmail: 'contacto@beasttraining.cl',
    bannerText: '⚡ ¡Matrícula gratis ingresando este mes! Cupos limitados.',
    bannerActive: true,
    bannerBgColor: 'linear-gradient(90deg, #10b981, #059669)',
    heroTitle: 'Transforma tu Cuerpo y Mente con Entrenamiento de Alto Rendimiento',
    heroSubtitle: 'Clases personalizadas, entrenadores certificados y seguimiento de metas.',
    whatsappPhone: '+56956628609',
    businessHours: 'Lun a Vie: 06:30 - 22:30 hrs',
    themeStyle: 'fitness-emerald',
    promoDiscountActive: true,
    promoText: '2x1 en Plan Semestral',
    liveUrl: 'https://beast-training.vercel.app/',
    githubUrl: 'https://github.com/Cristobal-Sandoval/beast-gym',
    status: 'Activo / Producción',
    lastUpdated: 'Hace 1 hora'
  },
  'studio-vanessa': {
    id: 'studio-vanessa',
    name: 'Studio Vanessa Aravena',
    category: 'Estética, Belleza & Cuidados Faciales',
    clientName: 'Vanessa Aravena',
    clientEmail: 'vanessa@studioaravena.cl',
    bannerText: '🌸 Reserva tu Limpieza Facial Profunda con 20% de Descuento',
    bannerActive: true,
    bannerBgColor: 'linear-gradient(90deg, #ec4899, #8b5cf6)',
    heroTitle: 'Realza tu Belleza Natural con Tratamientos Estéticos Exclusivos',
    heroSubtitle: 'Atención personalizada en un ambiente acogedor con tecnología de vanguardia.',
    whatsappPhone: '+56956628609',
    businessHours: 'Mar a Sáb: 10:00 - 19:00 hrs',
    themeStyle: 'aesthetic-rose',
    promoDiscountActive: true,
    promoText: 'Packs Especiales de Tratamientos Corporales',
    liveUrl: 'https://studio-vanessa-aravena.vercel.app/',
    githubUrl: 'https://github.com/Cristobal-Sandoval/studio-vanessa-aravena',
    status: 'En Implementación',
    lastUpdated: 'Ayer'
  }
};

const PROJECTS_SHOWCASE: ProjectShowcase[] = [
  {
    id: 'cardpoint',
    title: 'CardPoint E-Commerce',
    subtitle: 'Plataforma E-Commerce para Pymes',
    description: 'Catálogo de productos en tiempo real, carrito de compras optimizado y pedidos vía WhatsApp.',
    badge: 'Carga Ultra Rápida',
    techStack: ['React', 'TypeScript', 'E-Commerce', 'Vercel', 'Custom UI'],
    liveUrl: 'https://cardpoint.cl',
    githubUrl: 'https://github.com/Cristobal-Sandoval/CardPoint',
    statusText: '🟢 En Vivo (Producción)',
    highlightStats: '99.9% Uptime | +150ms Tiempo de Respuesta',
    colorGradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    previewBanner: '🔥 15% OFF en Catálogo Seleccionado',
    previewImage: '/images/cardpoint_preview.png'
  },
  {
    id: 'beast-training',
    title: 'Beast Training Gym',
    subtitle: 'Sitio Web de Gimnasio & Sistema de Reservas',
    description: 'Planes de entrenamiento, reserva de horarios en vivo, catálogo de disciplinas y testimonios.',
    badge: 'UX Centrado en Cliente',
    techStack: ['React', 'Vite', 'Reservas', 'CSS Grid', 'Responsivo'],
    liveUrl: 'https://beast-training.vercel.app/',
    githubUrl: 'https://github.com/Cristobal-Sandoval/beast-gym',
    statusText: '🟢 En Vivo (Producción)',
    highlightStats: 'Conversión +45% en Reservas',
    colorGradient: 'linear-gradient(135deg, #10b981, #059669)',
    previewBanner: '⚡ Matrícula Gratis Cupos Limitados',
    previewImage: '/images/beast_preview.png'
  },
  {
    id: 'studio-vanessa',
    title: 'Studio Vanessa Aravena',
    subtitle: 'Portal de Belleza & Agenda de Servicios',
    description: 'Catálogo estético, agenda de evaluaciones faciales/corporales y atención directa por WhatsApp.',
    badge: 'Diseño Premium Estético',
    techStack: ['React', 'UX/UI', 'Agenda Web', 'WhatsApp API'],
    liveUrl: 'https://studio-vanessa-aravena.vercel.app/',
    githubUrl: 'https://github.com/Cristobal-Sandoval/studio-vanessa-aravena',
    statusText: '🟡 En Implementación Final',
    highlightStats: 'Indexado en SEO',
    colorGradient: 'linear-gradient(135deg, #ec4899, #f43f5e)',
    previewBanner: '🌸 20% OFF Limpieza Facial Profunda',
    previewImage: '/images/vanessa_preview.png'
  }
];

const INITIAL_REQUESTS: ChangeRequest[] = [
  {
    id: 'req-1',
    siteId: 'cardpoint',
    clientName: 'CardPoint Chile',
    title: 'Actualizar Banner de Promoción a 20% OFF',
    description: 'Queremos cambiar el banner principal para la campaña del fin de semana.',
    priority: 'Alta',
    status: 'En Proceso',
    createdAt: '2026-07-27 14:30'
  },
  {
    id: 'req-2',
    siteId: 'beast-training',
    clientName: 'Beast Training Team',
    title: 'Agregar nuevo horario de Crossfit 20:00 hrs',
    description: 'Muchos clientes solicitaron abrir cupo nocturno.',
    priority: 'Media',
    status: 'Pendiente',
    createdAt: '2026-07-27 16:15'
  }
];

const INITIAL_MESSAGES: DirectMessage[] = [
  {
    id: 'msg-1',
    siteId: 'cardpoint',
    sender: 'admin',
    text: '¡Hola! He optimizado la velocidad del carrito de compras a 120ms.',
    timestamp: '14:00',
    read: true
  },
  {
    id: 'msg-2',
    siteId: 'cardpoint',
    sender: 'cliente',
    text: '¡Excelente! Se nota súper fluido en celulares.',
    timestamp: '14:05',
    read: true
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('landing');
  const [activeSiteId, setActiveSiteId] = useState<SiteId>('cardpoint');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('agencia_theme_mode');
    return (saved as ThemeMode) || 'dark';
  });

  const [userSession, setUserSession] = useState<UserSession>(() => {
    const saved = localStorage.getItem('agencia_user_session');
    return saved ? JSON.parse(saved) : { role: 'guest' };
  });

  const [sites, setSites] = useState<Record<SiteId, ClientSiteConfig>>(() => {
    const saved = localStorage.getItem('agencia_sites_config');
    return saved ? JSON.parse(saved) : INITIAL_SITES;
  });

  const [changeRequests, setChangeRequests] = useState<ChangeRequest[]>(() => {
    const saved = localStorage.getItem('agencia_change_requests');
    return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
  });

  const [meetings, setMeetings] = useState<MeetingBooking[]>([]);

  const [messages, setMessages] = useState<DirectMessage[]>(() => {
    const saved = localStorage.getItem('agencia_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  useEffect(() => {
    localStorage.setItem('agencia_theme_mode', themeMode);
    if (themeMode === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem('agencia_user_session', JSON.stringify(userSession));
  }, [userSession]);

  useEffect(() => {
    localStorage.setItem('agencia_sites_config', JSON.stringify(sites));
  }, [sites]);

  useEffect(() => {
    localStorage.setItem('agencia_change_requests', JSON.stringify(changeRequests));
  }, [changeRequests]);

  useEffect(() => {
    localStorage.setItem('agencia_messages', JSON.stringify(messages));
  }, [messages]);

  const toggleThemeMode = () => {
    setThemeMode(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const loginWithCredentials = (email: string, _pass: string, targetSiteId?: SiteId): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    
    // Si es login de Admin
    if (cleanEmail === 'cristobal.sandoval.balboa@gmail.com' || cleanEmail === 'admin@cristobal.cl') {
      const sessionData: UserSession = {
        role: 'admin',
        email: 'cristobal.sandoval.balboa@gmail.com',
        clientName: 'Equipo Admin Axioma Web'
      };
      setUserSession(sessionData);
      setViewMode('admin-panel');
      setIsLoginModalOpen(false);
      return true;
    }

    // Determinar sitio cliente
    let siteKey: SiteId = targetSiteId || 'cardpoint';
    if (cleanEmail.includes('vanessa')) siteKey = 'studio-vanessa';
    else if (cleanEmail.includes('beast')) siteKey = 'beast-training';
    else if (cleanEmail.includes('cardpoint')) siteKey = 'cardpoint';

    const targetSite = sites[siteKey];

    const sessionData: UserSession = {
      role: 'client',
      siteId: siteKey,
      email: targetSite.clientEmail,
      clientName: targetSite.clientName
    };

    setActiveSiteId(siteKey);
    setUserSession(sessionData);
    setViewMode('client-panel');
    setIsLoginModalOpen(false);
    return true;
  };

  const logout = () => {
    setUserSession({ role: 'guest' });
    setViewMode('landing');
    localStorage.removeItem('agencia_user_session');
  };

  const updateSiteConfig = (siteId: SiteId, newConfig: Partial<ClientSiteConfig>) => {
    setSites(prev => ({
      ...prev,
      [siteId]: {
        ...prev[siteId],
        ...newConfig,
        lastUpdated: 'Recién actualizado'
      }
    }));
  };

  const addChangeRequest = (req: Omit<ChangeRequest, 'id' | 'createdAt' | 'status'>) => {
    const newReq: ChangeRequest = {
      ...req,
      id: `req-${Date.now()}`,
      createdAt: new Date().toLocaleString('es-CL', { dateStyle: 'short', timeStyle: 'short' }),
      status: 'Pendiente'
    };
    setChangeRequests(prev => [newReq, ...prev]);
  };

  const updateRequestStatus = (id: string, status: ChangeRequest['status']) => {
    setChangeRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const bookMeeting = (meeting: Omit<MeetingBooking, 'id' | 'status'>) => {
    const newMeeting: MeetingBooking = {
      ...meeting,
      id: `meet-${Date.now()}`,
      status: 'Confirmada',
      meetingLink: 'https://meet.google.com/xyz-cs-dev'
    };
    setMeetings(prev => [newMeeting, ...prev]);
  };

  const sendMessage = (siteId: SiteId, sender: 'cliente' | 'admin', text: string) => {
    const newMsg: DirectMessage = {
      id: `msg-${Date.now()}`,
      siteId,
      sender,
      text,
      timestamp: new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }),
      read: false
    };
    setMessages(prev => [...prev, newMsg]);
  };

  return (
    <AppContext.Provider value={{
      viewMode,
      setViewMode,
      activeSiteId,
      setActiveSiteId,
      themeMode,
      toggleThemeMode,
      userSession,
      loginWithCredentials,
      logout,
      isLoginModalOpen,
      setIsLoginModalOpen,
      sites,
      updateSiteConfig,
      changeRequests,
      addChangeRequest,
      updateRequestStatus,
      meetings,
      bookMeeting,
      messages,
      sendMessage,
      projectsShowcase: PROJECTS_SHOWCASE
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe usarse dentro de un AppProvider');
  }
  return context;
};
