import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders the brand name', () => {
    render(<Footer />);
    expect(screen.getByText('Axioma Web')).toBeInTheDocument();
  });

  it('renders contact email button', () => {
    render(<Footer />);
    const emailBtn = screen.getByText('Email de contacto');
    expect(emailBtn).toBeInTheDocument();
    expect(emailBtn.closest('a')).toHaveAttribute('href', 'mailto:cristobal.sandoval.balboa@gmail.com');
  });

  it('renders Nosotros link pointing to portfolio', () => {
    render(<Footer />);
    const nosotros = screen.getByText('Nosotros');
    expect(nosotros).toBeInTheDocument();
    expect(nosotros.closest('a')).toHaveAttribute('href', 'https://cristobalsandoval-portafolio.vercel.app/');
  });

  it('renders security badge', () => {
    render(<Footer />);
    expect(screen.getByText(/Infraestructura SSL/)).toBeInTheDocument();
  });

  it('renders social media links', () => {
    render(<Footer />);
    expect(screen.getByLabelText('Perfil LinkedIn')).toBeInTheDocument();
    expect(screen.getByLabelText('Instagram Oficial Axioma Web')).toBeInTheDocument();
  });

  it('renders the current year in copyright', () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});
