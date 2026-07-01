import { useEffect, useRef } from 'react';

/**
 * Custom cursor system with smooth lerp-based following,
 * hover state changes, and glow effects.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let rafId;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const handleMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const animate = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.15);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.15);

      dot.style.left = `${target.current.x}px`;
      dot.style.top = `${target.current.y}px`;
      ring.style.left = `${pos.current.x}px`;
      ring.style.top = `${pos.current.y}px`;

      rafId = requestAnimationFrame(animate);
    };

    // Add hover detection for interactive elements
    const interactiveSelectors = 'a, button, input, textarea, [data-cursor-hover]';
    
    const addHoverListeners = () => {
      document.querySelectorAll(interactiveSelectors).forEach(el => {
        el.addEventListener('mouseenter', () => {
          dot.classList.add('hovering');
          ring.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
          dot.classList.remove('hovering');
          ring.classList.remove('hovering');
        });
      });
    };

    // Observe DOM changes to add listeners to new elements
    const observer = new MutationObserver(() => {
      addHoverListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', handleMove);
    addHoverListeners();
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
