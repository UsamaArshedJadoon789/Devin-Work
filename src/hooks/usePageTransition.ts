import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const usePageTransition = (element: HTMLElement | null) => {
  const timeline = useRef<gsap.core.Timeline>();

  useEffect(() => {
    if (!element) return;

    timeline.current = gsap.timeline()
      .from(element, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
      });

    return () => {
      timeline.current?.kill();
    };
  }, [element]);

  return timeline.current;
};
