/**
 * Basic sanitization function to prevent XSS and strip HTML tags.
 * For production, consider using a more robust library like DOMPurify if needed.
 */
export function sanitizeInput(str: string): string {
  if (!str || typeof str !== 'string') return '';
  
  return str
    .replace(/<[^>]*>?/gm, '') // Strip HTML tags
    .replace(/[&<>"']/g, function(m) {
      const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };
      return map[m];
    })
    .trim();
}

/**
 * Sanitizes an entire object's string properties (useful for form submissions).
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized = { ...obj };
  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitizeInput(sanitized[key]) as any;
    }
  }
  return sanitized;
}
