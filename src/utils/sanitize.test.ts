import { describe, it, expect } from 'vitest';
import { sanitizeHTML, sanitizeEmail } from './sanitize';

describe('sanitizeHTML', () => {
  it('escapes < and >', () => {
    expect(sanitizeHTML('<script>alert("xss")</script>')).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
  });

  it('escapes double quotes', () => {
    expect(sanitizeHTML('attr="value"')).toBe('attr=&quot;value&quot;');
  });

  it('escapes single quotes', () => {
    expect(sanitizeHTML("it's")).toBe('it&#x27;s');
  });

  it('escapes ampersands', () => {
    expect(sanitizeHTML('a & b')).toBe('a &amp; b');
  });

  it('returns safe string unchanged', () => {
    expect(sanitizeHTML('Hello, world!')).toBe('Hello, world!');
  });

  it('handles empty string', () => {
    expect(sanitizeHTML('')).toBe('');
  });
});

describe('sanitizeEmail', () => {
  it('trims whitespace', () => {
    expect(sanitizeEmail('  user@test.cl  ')).toBe('user@test.cl');
  });

  it('lowercases the email', () => {
    expect(sanitizeEmail('USER@TEST.CL')).toBe('user@test.cl');
  });

  it('removes invalid characters', () => {
    expect(sanitizeEmail('us er@te st.cl')).toBe('user@test.cl');
  });

  it('preserves valid email', () => {
    expect(sanitizeEmail('cristobal.sandoval@axiomaweb.cl')).toBe('cristobal.sandoval@axiomaweb.cl');
  });

  it('handles empty string', () => {
    expect(sanitizeEmail('')).toBe('');
  });
});
