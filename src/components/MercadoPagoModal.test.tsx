import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MercadoPagoModal } from './MercadoPagoModal';

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
  projectTypeLabel: 'Web Pro Pyme (Desde $249.990 CLP)',
  baseAmountCLP: 249990,
  selectedExtras: ['Dominio .CL Gratis']
};

describe('MercadoPagoModal', () => {
  it('renders nothing when closed', () => {
    const { container } = render(<MercadoPagoModal {...defaultProps} isOpen={false} />);
    expect(container.innerHTML).toBe('');
  });

  it('renders the modal when open', () => {
    render(<MercadoPagoModal {...defaultProps} />);
    expect(screen.getByText('Pagar con Mercado Pago')).toBeInTheDocument();
  });

  it('displays project info', () => {
    render(<MercadoPagoModal {...defaultProps} />);
    expect(screen.getByText(/Web Pro Pyme/)).toBeInTheDocument();
  });

  it('displays selected extras', () => {
    render(<MercadoPagoModal {...defaultProps} />);
    expect(screen.getByText('Dominio .CL Gratis')).toBeInTheDocument();
  });

  it('shows coupon pre-applied with 10% OFF', () => {
    render(<MercadoPagoModal {...defaultProps} />);
    expect(screen.getAllByText(/10% OFF/).length).toBeGreaterThan(0);
  });

  it('shows error when submitting empty form', () => {
    render(<MercadoPagoModal {...defaultProps} />);
    const payBtn = screen.getByRole('button', { name: /pagar con mercado pago/i });
    const form = payBtn.closest('form');
    fireEvent.submit(form!);
    expect(screen.getByText(/completa tu nombre y correo/)).toBeInTheDocument();
  });

  it('shows success screen after payment', async () => {
    render(<MercadoPagoModal {...defaultProps} />);

    fireEvent.change(screen.getByPlaceholderText('Juan Pérez'), { target: { value: 'Juan Perez' } });
    fireEvent.change(screen.getByPlaceholderText('juan@empresa.cl'), { target: { value: 'juan@test.cl' } });

    const payBtn = screen.getByRole('button', { name: /pagar con mercado pago/i });
    const form = payBtn.closest('form');
    fireEvent.submit(form!);

    expect(await screen.findByText(/Pago Confirmado/, {}, { timeout: 2000 })).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    render(<MercadoPagoModal {...defaultProps} />);
    const closeBtn = screen.getByRole('button', { name: '' });
    fireEvent.click(closeBtn.closest('button')!);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('shows coupon error for invalid code', () => {
    render(<MercadoPagoModal {...defaultProps} />);
    const input = screen.getByPlaceholderText(/INAUGURACION30/i);
    fireEvent.change(input, { target: { value: 'INVALIDO' } });

    const applyBtn = screen.getByRole('button', { name: 'Aplicar' });
    fireEvent.click(applyBtn);

    expect(screen.getByText(/Código no válido/)).toBeInTheDocument();
  });
});
