"use client";

import { useState, useEffect } from 'react';

export enum ScrollDirection {
  up = 'up',
  down = 'down',
}

interface UseScrollDirectionProps {
  scrollDownThreshold?: number;
  scrollUpThreshold?: number;
}

export const useScrollDirection = ({
  scrollDownThreshold = 0,
  scrollUpThreshold = 0,
}: UseScrollDirectionProps = {}): ScrollDirection | null => {
  const [scrollDir, setScrollDir] = useState<ScrollDirection | null>(null);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < 10) {
        ticking = false;
        return;
      }

      if (scrollY > lastScrollY && scrollY > scrollDownThreshold) {
        setScrollDir(ScrollDirection.down);
      } else if (scrollY < lastScrollY && scrollY > scrollUpThreshold) {
        setScrollDir(ScrollDirection.up);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollDownThreshold, scrollUpThreshold]);

  return scrollDir;
};
