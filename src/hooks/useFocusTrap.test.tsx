import { describe, it, expect, beforeEach } from 'vitest';
import { render, renderHook } from '@testing-library/react';
import { useFocusTrap } from './useFocusTrap';

describe('useFocusTrap', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('returns a ref object', () => {
    const { result } = renderHook(() => useFocusTrap(true));
    expect(result.current).toHaveProperty('current');
  });

  it('focuses the first focusable element when active', () => {
    function Trap() {
      const ref = useFocusTrap(true);
      return (
        <div ref={ref}>
          <button data-close-modal>Close</button>
          <input id="first" />
          <button id="last">Submit</button>
        </div>
      );
    }
    render(<Trap />);
    const closeBtn = document.querySelector('[data-close-modal]') as HTMLElement;
    expect(document.activeElement).toBe(closeBtn);
  });

  it('does not trap focus when inactive', () => {
    function NoTrap() {
      const ref = useFocusTrap(false);
      return (
        <div ref={ref}>
          <button>Inside</button>
        </div>
      );
    }
    const { container } = render(<NoTrap />);
    const insideBtn = container.querySelector('button') as HTMLElement;
    insideBtn.focus();
    expect(document.activeElement).toBe(insideBtn);
  });
});
