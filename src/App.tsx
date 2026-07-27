import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { ClientDashboard } from './components/ClientDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { LoginModal } from './components/LoginModal';
import { Footer } from './components/Footer';
import { MessageCircle } from 'lucide-react';
import './styles/main.css';

const MainContent: React.FC = () => {
  const { viewMode } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <main style={{ flexGrow: 1 }}>
        {viewMode === 'landing' && <LandingPage />}
        {viewMode === 'client-panel' && <ClientDashboard />}
        {viewMode === 'admin-panel' && <AdminDashboard />}
      </main>

      {/* Modal Unificado de Login / Acceso */}
      <LoginModal />

      {/* Botón flotante de WhatsApp en Desktop */}
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
