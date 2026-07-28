import React, { Suspense } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';
import { MessageCircle } from 'lucide-react';
import { useDocumentTitle } from './hooks/useDocumentTitle';
import './styles/main.css';

const ClientDashboard = React.lazy(() => import('./components/ClientDashboard').then(m => ({ default: m.ClientDashboard })));
const AdminDashboard = React.lazy(() => import('./components/AdminDashboard').then(m => ({ default: m.AdminDashboard })));

const DASHBOARD_FALLBACK = (
  <div className="loading-skeleton" style={{ padding: '40px', textAlign: 'center' }}>
    <div className="spinner" />
    <p style={{ marginTop: '16px', color: 'var(--text-muted)' }}>Cargando panel...</p>
  </div>
);

const MainContent: React.FC = () => {
  const { viewMode } = useApp();

  const titles: Record<string, string | undefined> = {
    'landing': undefined,
    'client-panel': 'Panel del Cliente',
    'admin-panel': 'Panel Admin Maestro'
  };
  useDocumentTitle(titles[viewMode]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      <Navbar />

      <main id="main-content" style={{ flexGrow: 1 }}>
        {viewMode === 'landing' && <LandingPage />}
        {viewMode === 'client-panel' && (
          <Suspense fallback={DASHBOARD_FALLBACK}>
            <ClientDashboard />
          </Suspense>
        )}
        {viewMode === 'admin-panel' && (
          <Suspense fallback={DASHBOARD_FALLBACK}>
            <AdminDashboard />
          </Suspense>
        )}
      </main>

      <LoginModal />

      <a 
        href="https://wa.me/56956628609?text=Hola%20Cristóbal,%20quiero%20cotizar%20mi%20página%20web" 
        target="_blank" 
        rel="noopener noreferrer"
        className="floating-whatsapp"
        title="Cotizar por WhatsApp con Cristóbal (+569 5662 8609)"
      >
        <MessageCircle size={32} />
      </a>

      <Footer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
