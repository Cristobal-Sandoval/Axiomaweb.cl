export const APP_CONFIG = {
  admin: {
    emails: [
      import.meta.env.VITE_ADMIN_EMAIL || 'cristobal.sandoval.balboa@gmail.com',
      import.meta.env.VITE_ADMIN_EMAIL_ALT || 'admin@cristobal.cl'
    ]
  },
  clients: {
    defaultPassword: import.meta.env.VITE_CLIENT_DEFAULT_PASSWORD || '123456',
  },
  coupons: {
    validCodes: ['INAUGURACION10', 'INAUGURACION', 'CRISTOBAL10', 'DESCUENTO10'],
    defaultDiscount: 10
  }
};
