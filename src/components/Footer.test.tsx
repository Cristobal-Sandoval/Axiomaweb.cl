import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders the brand name', () => {
    render(<Footer />);
    expect(screen.getByText('Axioma Web')).toBeInTheDocument();
  });

  it('renders contact email link', () => {
    render(<Footer />);
    const email = screen.getByText('contacto@axiomaweb.cl');
    expect(email).toBeInTheDocument();
    expect(email.closest('a')).toHaveAttribute('href', 'mailto:contacto@axiomaweb.cl');
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
