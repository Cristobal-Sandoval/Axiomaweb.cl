export type ViewMode = 'landing' | 'client-panel' | 'admin-panel';

export type SiteId = 'cardpoint' | 'beast-training' | 'studio-vanessa';

export type UserRole = 'guest' | 'client' | 'admin';

export type ThemeMode = 'dark' | 'light';

export interface UserSession {
  role: UserRole;
  siteId?: SiteId;
  email?: string;
  clientName?: string;
}

export interface ClientSiteConfig {
  id: SiteId;
  name: string;
  category: string;
  clientName: string;
  clientEmail: string;
  bannerText: string;
  bannerActive: boolean;
  bannerBgColor: string;
  heroTitle: string;
  heroSubtitle: string;
  whatsappPhone: string;
  businessHours: string;
  themeStyle: 'dark-neon' | 'fitness-emerald' | 'aesthetic-rose' | 'ocean-cyan';
  promoDiscountActive: boolean;
  promoText: string;
  liveUrl: string;
  githubUrl: string;
  status: string;
  lastUpdated: string;
}

export interface ChangeRequest {
  id: string;
  siteId: SiteId;
  clientName: string;
  title: string;
  description: string;
  priority: 'Baja' | 'Media' | 'Alta' | 'Urgente';
  status: 'Pendiente' | 'En Proceso' | 'Completada' | 'Rechazada';
  createdAt: string;
}

export interface MeetingBooking {
  id: string;
  siteId: SiteId;
  clientName: string;
  clientEmail?: string;
  date: string;
  time: string;
  topic: string;
  status: 'Confirmada' | 'Pendiente' | 'Cancelada';
  meetingLink?: string;
}

export interface DirectMessage {
  id: string;
  siteId: SiteId;
  sender: 'cliente' | 'admin';
  text: string;
  timestamp: string;
  read: boolean;
}

export interface ProjectShowcase {
  id: SiteId;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  statusText: string;
  highlightStats: string;
  colorGradient: string;
  previewBanner: string;
  previewImage?: string;
}
