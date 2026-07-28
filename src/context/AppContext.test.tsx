import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AppProvider, useApp } from './AppContext';

function setup() {
  return renderHook(() => useApp(), {
    wrapper: ({ children }: { children: React.ReactNode }) => <AppProvider>{children}</AppProvider>
  });
}

describe('AppContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts in landing viewMode', () => {
    const { result } = setup();
    expect(result.current.viewMode).toBe('landing');
  });

  it('changes viewMode', () => {
    const { result } = setup();
    act(() => result.current.setViewMode('client-panel'));
    expect(result.current.viewMode).toBe('client-panel');
  });

  it('toggles theme mode', () => {
    const { result } = setup();
    const initial = result.current.themeMode;
    act(() => result.current.toggleThemeMode());
    expect(result.current.themeMode).toBe(initial === 'dark' ? 'light' : 'dark');
  });

  it('has sites defined', () => {
    const { result } = setup();
    expect(Object.keys(result.current.sites)).toHaveLength(3);
    expect(result.current.sites.cardpoint).toBeDefined();
    expect(result.current.sites['beast-training']).toBeDefined();
    expect(result.current.sites['studio-vanessa']).toBeDefined();
  });

  it('has projects showcase', () => {
    const { result } = setup();
    expect(result.current.projectsShowcase).toHaveLength(3);
  });

  it('updates site config', () => {
    const { result } = setup();
    act(() => result.current.updateSiteConfig('cardpoint', { heroTitle: 'Nuevo Título' }));
    expect(result.current.sites.cardpoint.heroTitle).toBe('Nuevo Título');
  });

  it('adds and manages change requests', () => {
    const { result } = setup();
    act(() => result.current.addChangeRequest({
      siteId: 'cardpoint',
      clientName: 'Test',
      title: 'Test Request',
      description: 'Test Description',
      priority: 'Alta'
    }));
    expect(result.current.changeRequests.length).toBeGreaterThan(0);
    const newReq = result.current.changeRequests[0];
    expect(newReq.status).toBe('Pendiente');

    act(() => result.current.updateRequestStatus(newReq.id, 'Completada'));
    const updated = result.current.changeRequests.find(r => r.id === newReq.id);
    expect(updated?.status).toBe('Completada');
  });

  it('sends and retrieves messages', () => {
    const { result } = setup();
    act(() => result.current.sendMessage('cardpoint', 'cliente', 'Hola!'));
    const msgs = result.current.messages.filter(m => m.siteId === 'cardpoint');
    expect(msgs.length).toBeGreaterThan(0);
    expect(msgs[msgs.length - 1].text).toBe('Hola!');
  });

  it('books a meeting', () => {
    const { result } = setup();
    act(() => result.current.bookMeeting({
      clientName: 'Test',
      clientEmail: 'test@test.cl',
      siteId: 'cardpoint',
      date: '2026-08-01',
      time: '15:00',
      topic: 'Revisión'
    }));
    expect(result.current.meetings.length).toBe(1);
    expect(result.current.meetings[0].status).toBe('Confirmada');
  });

  it('throws when useApp is used outside provider', () => {
    expect(() => renderHook(() => useApp())).toThrow();
  });
});
