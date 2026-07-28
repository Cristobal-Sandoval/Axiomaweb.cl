import React, { useState } from 'react';
import { CreditCard, CheckCircle2, ShieldCheck, X, Tag, ArrowRight, Lock } from 'lucide-react';
import { APP_CONFIG } from '../config/credentials';

interface MercadoPagoModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTypeLabel: string;
  baseAmountCLP: number;
  selectedExtras: string[];
}

export const MercadoPagoModal: React.FC<MercadoPagoModalProps> = ({
  isOpen,
  onClose,
  projectTypeLabel,
  baseAmountCLP,
  selectedExtras
}) => {
  const [couponInput, setCouponInput] = useState('INAUGURACION10');
  const [discountPercent, setDiscountPercent] = useState(APP_CONFIG.coupons.defaultDiscount);
  const [couponApplied, setCouponApplied] = useState(true);
  const [couponError, setCouponError] = useState('');

  // Datos del Cliente para Factura / Checkout Mercado Pago
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'webpay' | 'mp_wallet'>('card');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  if (!isOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponInput.trim().toUpperCase();
    if (APP_CONFIG.coupons.validCodes.includes(clean)) {
      setDiscountPercent(APP_CONFIG.coupons.defaultDiscount);
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Código no válido. Usa INAUGURACION10 para 10% OFF');
      setCouponApplied(false);
      setDiscountPercent(0);
    }
  };

  const discountAmount = Math.round((baseAmountCLP * discountPercent) / 100);
  const finalAmountCLP = baseAmountCLP - discountAmount;

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError('');

    if (!customerName || !customerEmail) {
      setPaymentError('Por favor completa tu nombre y correo electrónico para la boleta/factura.');
      return;
    }

    setPaymentSuccess(true);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(5, 6, 12, 0.92)',
      backdropFilter: 'blur(16px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div className="glass-card" style={{
        width: '100%',
        maxWidth: '540px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '28px',
        background: 'linear-gradient(180deg, rgba(20, 24, 48, 0.98) 0%, rgba(10, 12, 26, 0.98) 100%)',
        border: '1px solid var(--border-glow)',
        borderRadius: 'var(--radius-xl)',
        position: 'relative'
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            background: 'rgba(255,255,255,0.06)', border: 'none', color: '#94a3b8',
            width: '32px', height: '32px', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {!paymentSuccess ? (
          <>
            {/* Header del Checkout Mercado Pago */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '14px',
                background: 'linear-gradient(135deg, #009ee3, #0072bb)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', margin: '0 auto 10px'
              }}>
                <CreditCard size={24} />
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Pagar con Mercado Pago</h2>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '2px' }}>
                Acepta Webpay, Redcompra, Tarjetas de Crédito y Débito en cuotas.
              </p>
            </div>

            {/* Resumen del Pedido */}
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', marginBottom: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', fontWeight: 600 }}>PROYECTO SELECCIONADO:</span>
              <h3 style={{ fontSize: '1.1rem', color: '#a5b4fc', marginBottom: '6px' }}>{projectTypeLabel}</h3>

              {selectedExtras.length > 0 && (
                <ul style={{ listStyle: 'none', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {selectedExtras.map((ex, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 size={14} style={{ color: '#10b981' }} />
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '10px' }}>
                <span>Subtotal Base:</span>
                <strong>${baseAmountCLP.toLocaleString('es-CL')} CLP</strong>
              </div>

              {couponApplied && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--c-mint-cyan)', marginTop: '4px' }}>
                  <span>Descuento Inauguración (10% OFF):</span>
                  <strong>-${discountAmount.toLocaleString('es-CL')} CLP</strong>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800, color: '#6ee7b7', borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '10px', marginTop: '8px' }}>
                <span>Total a Pagar:</span>
                <span>${finalAmountCLP.toLocaleString('es-CL')} CLP</span>
              </div>
            </div>

            {/* Input de Código de Descuento */}
            <form onSubmit={handleApplyCoupon} style={{ marginBottom: '20px' }}>
              <label className="form-label">¿Tienes un Código de Descuento?:</label>
              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Ej: INAUGURACION30"
                    style={{ paddingLeft: '36px', textTransform: 'uppercase' }}
                  />
                  <Tag size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: '#ec4899' }} />
                </div>
                <button type="submit" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                  Aplicar
                </button>
              </div>
              {couponApplied && (
                <span style={{ fontSize: '0.78rem', color: 'var(--c-mint-cyan)', display: 'block', marginTop: '4px', fontWeight: 600 }}>
                  ✓ ¡Cupón de 10% OFF por Inauguración Aplicado!
                </span>
              )}
              {couponError && (
                <span style={{ fontSize: '0.78rem', color: '#ef4444', display: 'block', marginTop: '4px' }}>
                  {couponError}
                </span>
              )}
            </form>

            {/* Formulario de Checkout del Cliente */}
            <form onSubmit={handleProcessPayment} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Nombre Completo (para Titular de la Boleta):</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Juan Pérez"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Correo Electrónico:</label>
                <input 
                  type="email" 
                  className="form-input" 
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="juan@empresa.cl"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Medio de Pago Mercado Pago:</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    type="button" 
                    onClick={() => setSelectedMethod('card')}
                    style={{ flex: 1, padding: '10px', borderRadius: '8px', border: selectedMethod === 'card' ? '2px solid #009ee3' : '1px solid #334155', background: selectedMethod === 'card' ? 'rgba(0,158,227,0.15)' : 'rgba(0,0,0,0.3)', color: 'white', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    💳 Tarjetas / Webpay
                  </button>

                  <button 
                    type="button" 
                    onClick={() => setSelectedMethod('mp_wallet')}
                    style={{ flex: 1, padding: '10px', borderRadius: '8px', border: selectedMethod === 'mp_wallet' ? '2px solid #009ee3' : '1px solid #334155', background: selectedMethod === 'mp_wallet' ? 'rgba(0,158,227,0.15)' : 'rgba(0,0,0,0.3)', color: 'white', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    💙 Dinero en Mercado Pago
                  </button>
                </div>
              </div>

              {paymentError && (
                <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid #ef4444', color: '#fca5a5', padding: '10px', borderRadius: '8px', fontSize: '0.82rem', textAlign: 'center' }}>
                  {paymentError}
                </div>
              )}

              <button 
                type="submit" 
                className="btn-primary" 
                style={{ padding: '14px', background: 'linear-gradient(135deg, #009ee3, #0072bb)', marginTop: '8px' }}
              >
                <Lock size={16} />
                <span>Pagar con Mercado Pago (${finalAmountCLP.toLocaleString('es-CL')} CLP)</span>
                <ArrowRight size={18} />
              </button>

              <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <ShieldCheck size={14} style={{ color: '#10b981' }} />
                <span>Pago procesado con cifrado SSL 256-bit por Mercado Pago Chile</span>
              </div>
            </form>
          </>
        ) : (
          /* PANTALLA DE ÉXITO PAGO SIMULADO */
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', margin: '0 auto 16px'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#6ee7b7', marginBottom: '8px' }}>
              ¡Pago Confirmado por Mercado Pago!
            </h3>

            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '20px' }}>
              Gracias <strong>{customerName}</strong>. Hemos generado el comprobante de tu proyecto <strong>{projectTypeLabel}</strong> con el 30% OFF aplicado (${finalAmountCLP.toLocaleString('es-CL')} CLP).
            </p>

            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '16px', borderRadius: '12px', fontSize: '0.85rem', color: '#a5b4fc', marginBottom: '24px', textAlign: 'left' }}>
              <p>📌 <strong>Cliente:</strong> {customerName} ({customerEmail})</p>
              <p>📌 <strong>Proyecto:</strong> {projectTypeLabel}</p>
              <p>📌 <strong>Código de Descuento:</strong> INAUGURACION10 (-10% OFF)</p>
              <p>📌 <strong>Monto Pagado:</strong> ${finalAmountCLP.toLocaleString('es-CL')} CLP</p>
              <p>📌 <strong>Estado:</strong> Transacción Aprobada (Mercado Pago Chile)</p>
            </div>

            <button onClick={onClose} className="btn-primary" style={{ padding: '12px 24px' }}>
              <span>Cerrar y Volver a la Agencia</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
