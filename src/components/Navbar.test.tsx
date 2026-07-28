import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppProvider } from '../context/AppContext';
import { Navbar } from './Navbar';

function renderNavbar() {
  return render(
    <AppProvider>
      <Navbar />
    </AppProvider>
  );
}

describe('Navbar', () => {
  it('renders the brand name', () => {
    renderNavbar();
    expect(screen.getByText('Axioma Web')).toBeInTheDocument();
  });

  it('renders the WhatsApp CTA button', () => {
    renderNavbar();
    expect(screen.getByText('Cotización WhatsApp')).toBeInTheDocument();
  });

  it('renders the theme toggle button', () => {
    renderNavbar();
    const toggleBtn = screen.getByRole('button', { name: /cambiar tema/i });
    expect(toggleBtn).toBeInTheDocument();
  });

  it('renders mobile bottom navigation', () => {
    renderNavbar();
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('WhatsApp')).toBeInTheDocument();
  });

  it('renders promo banner with 10% OFF', () => {
    renderNavbar();
    expect(screen.getAllByText(/10% OFF/).length).toBeGreaterThan(0);
  });
});
