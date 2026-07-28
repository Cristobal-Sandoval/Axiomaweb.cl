import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDocumentTitle } from './useDocumentTitle';

describe('useDocumentTitle', () => {
  const originalTitle = document.title;

  beforeEach(() => {
    document.title = originalTitle;
  });

  afterEach(() => {
    document.title = originalTitle;
  });

  it('sets the document title with the base suffix', () => {
    renderHook(() => useDocumentTitle('Panel del Cliente'));
    expect(document.title).toContain('Panel del Cliente');
    expect(document.title).toContain('Axioma Web');
  });

  it('sets base title when no argument given', () => {
    renderHook(() => useDocumentTitle());
    expect(document.title).toBe('Axioma Web — Desarrollo Web & Software Corporativo');
  });

  it('updates title on argument change', () => {
    const { rerender } = renderHook(({ title }: { title?: string } = {}) => useDocumentTitle(title), {
      initialProps: { title: 'Inicio' }
    });
    expect(document.title).toContain('Inicio');

    rerender({ title: 'Admin' });
    expect(document.title).toContain('Admin');
  });
});
