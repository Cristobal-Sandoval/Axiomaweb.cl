import { describe, it, expect } from 'vitest';
import { APP_CONFIG } from './credentials';

describe('APP_CONFIG', () => {
  it('has admin emails configured', () => {
    expect(APP_CONFIG.admin.emails).toBeDefined();
    expect(APP_CONFIG.admin.emails.length).toBeGreaterThan(0);
    expect(APP_CONFIG.admin.emails[0]).toContain('@');
  });

  it('has client default password', () => {
    expect(APP_CONFIG.clients.defaultPassword).toBeDefined();
    expect(typeof APP_CONFIG.clients.defaultPassword).toBe('string');
  });

  it('has valid coupon codes', () => {
    expect(APP_CONFIG.coupons.validCodes).toContain('INAUGURACION10');
    expect(APP_CONFIG.coupons.validCodes.length).toBeGreaterThan(0);
  });

  it('has default discount set', () => {
    expect(APP_CONFIG.coupons.defaultDiscount).toBe(10);
  });
});
