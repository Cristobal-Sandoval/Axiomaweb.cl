const HTML_ESCAPE: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;'
};

export function sanitizeHTML(str: string): string {
  return str.replace(/[&<>"']/g, (match) => HTML_ESCAPE[match]);
}

export function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase().replace(/[^a-z0-9@._-]/g, '');
}
