import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { BannerCarousel } from './BannerCarousel';

describe('BannerCarousel', () => {
  let intervalCallback: () => void;

  beforeEach(() => {
    intervalCallback = () => {};
    vi.spyOn(window, 'setInterval').mockImplementation((fn: TimerHandler) => {
      intervalCallback = fn as () => void;
      return 1 as unknown as number;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the first banner initially', () => {
    render(<BannerCarousel />);
    expect(screen.getByText(/Autogestión Total/)).toBeInTheDocument();
  });

  it('renders dot indicators', () => {
    render(<BannerCarousel />);
    const dots = screen.getAllByRole('button', { name: /ir al banner/i });
    expect(dots).toHaveLength(5);
  });

  it('advances to next slide after interval', () => {
    render(<BannerCarousel />);
    act(() => { intervalCallback(); });
    expect(screen.getByText(/Tiendas & E-Commerce/)).toBeInTheDocument();
  });

  it('wraps around after last slide', () => {
    render(<BannerCarousel />);
    act(() => { intervalCallback(); });
    act(() => { intervalCallback(); });
    act(() => { intervalCallback(); });
    act(() => { intervalCallback(); });
    act(() => { intervalCallback(); });
    expect(screen.getByText(/Autogestión Total/)).toBeInTheDocument();
  });
});
