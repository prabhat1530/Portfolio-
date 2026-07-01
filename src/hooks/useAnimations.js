import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for Intersection Observer-based scroll reveals.
 * Elements become visible with animation when they enter the viewport.
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: options.threshold || 0.15,
        rootMargin: options.rootMargin || '0px 0px -60px 0px',
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return [ref, isRevealed];
}

/**
 * Custom hook for staggered reveal of child elements.
 */
export function useStaggerReveal(itemCount, baseDelay = 100) {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const getDelay = (index) => `${index * baseDelay}ms`;

  return [ref, isRevealed, getDelay];
}

/**
 * Custom hook for mouse position tracking (used for parallax, cursor, etc.)
 */
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return position;
}

/**
 * Custom hook for counting up animation.
 */
export function useCountUp(target, duration = 2000, startOnReveal = false, isRevealed = true) {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    if (!isRevealed) return;

    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        countRef.current = requestAnimationFrame(animate);
      }
    };

    countRef.current = requestAnimationFrame(animate);
    return () => {
      if (countRef.current) cancelAnimationFrame(countRef.current);
    };
  }, [target, duration, isRevealed]);

  return count;
}

/**
 * Custom hook for magnetic hover effect.
 */
export function useMagnetic(strength = 0.3) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Don't apply on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const handleMove = (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    };

    const handleLeave = () => {
      element.style.transform = 'translate(0, 0)';
      element.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => {
        element.style.transition = '';
      }, 500);
    };

    element.addEventListener('mousemove', handleMove);
    element.addEventListener('mouseleave', handleLeave);

    return () => {
      element.removeEventListener('mousemove', handleMove);
      element.removeEventListener('mouseleave', handleLeave);
    };
  }, [strength]);

  return ref;
}

/**
 * Custom hook for tilt effect on cards.
 */
export function useTilt(maxTilt = 8) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia('(hover: none)').matches) return;

    const handleMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - y) * maxTilt;
      const rotateY = (x - 0.5) * maxTilt;
      
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleLeave = () => {
      element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    element.addEventListener('mousemove', handleMove);
    element.addEventListener('mouseleave', handleLeave);

    return () => {
      element.removeEventListener('mousemove', handleMove);
      element.removeEventListener('mouseleave', handleLeave);
    };
  }, [maxTilt]);

  return ref;
}
