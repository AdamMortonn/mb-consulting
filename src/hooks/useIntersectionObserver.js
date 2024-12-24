import { useEffect } from 'react';

export const useIntersectionObserver = (targetClass, threshold = 0.1) => {
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'none';
          entry.target.offsetHeight; // Trigger reflow
          entry.target.style.animation = '';
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: threshold
    });

    const targets = document.querySelectorAll(targetClass);
    targets.forEach(target => observer.observe(target));

    return () => {
      targets.forEach(target => observer.unobserve(target));
    };
  }, [targetClass, threshold]);
}; 