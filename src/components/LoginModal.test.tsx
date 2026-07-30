import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { AppProvider, useApp } from '../context/AppContext';
import { LoginModal } from './LoginModal';

function TestHarness() {
  const { setIsLoginModalOpen } = useApp();
  React.useEffect(() => { setIsLoginModalOpen(true); }, [setIsLoginModalOpen]);
  return <LoginModal />;
}

function renderModalOpen() {
  return render(
    <AppProvider>
      <TestHarness />
    </AppProvider>
  );
}

describe('LoginModal', () => {
  it('renders nothing when not provided (default closed)', () => {
    const { container } = render(<AppProvider><LoginModal /></AppProvider>);
    expect(container.innerHTML).toBe('');
  });

  it('renders the modal when opened via context', () => {
    renderModalOpen();
    expect(screen.getByText('Iniciar Sesión en el Portal')).toBeInTheDocument();
  });

  it('shows the client tab by default', () => {
    renderModalOpen();
    const clientTab = screen.getByText('Panel de Cliente');
    expect(clientTab).toBeInTheDocument();
    expect(clientTab.closest('button')).toHaveStyle({ background: '#6366f1' });
  });

  it('can switch to admin tab', () => {
    renderModalOpen();
    fireEvent.click(screen.getByText('Panel Admin (Axioma Web)'));
    expect(screen.getByText('Ingresar como Admin Maestro')).toBeInTheDocument();
  });

  it('has quick-select demo client buttons', () => {
    renderModalOpen();
    expect(screen.getByText(/CardPoint/)).toBeInTheDocument();
    expect(screen.getByText(/Beast Gym/)).toBeInTheDocument();
    expect(screen.getByText(/Studio Vanessa/)).toBeInTheDocument();
  });

  it('shows error on empty client login submit', () => {
    renderModalOpen();
    const emailInput = screen.getByPlaceholderText('ejemplo@cliente.cl');
    fireEvent.change(emailInput, { target: { value: '' } });
    const submitBtn = screen.getByRole('button', { name: /ingresar y mantener sesión/i });
    const form = submitBtn.closest('form');
    fireEvent.submit(form!);
    expect(screen.getByText(/ingresa tu correo y contraseña/i)).toBeInTheDocument();
  });

  it('has admin email pre-filled in admin tab', () => {
    renderModalOpen();
    fireEvent.click(screen.getByText('Panel Admin (Axioma Web)'));
    const adminEmailInput = screen.getByDisplayValue(/cristobal.sandoval/i);
    expect(adminEmailInput).toBeInTheDocument();
  });

  it('closes modal via close button', () => {
    renderModalOpen();
    const closeButton = document.querySelector('[data-close-modal]') as HTMLElement;
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    expect(screen.queryByText('Iniciar Sesión en el Portal')).not.toBeInTheDocument();
  });
});
