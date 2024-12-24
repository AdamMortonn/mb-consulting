import { useState, useEffect } from 'react';

export const useCountUp = (end, duration = 2500, startOnView = true) => {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(!startOnView);

  useEffect(() => {
    let observer;
    if (startOnView) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCount(0);
            setIsInView(true);
          } else {
            setIsInView(false);
          }
        },
        { threshold: 0.1 }
      );
    }

    const element = document.querySelector('.stats-container');
    if (element && observer) {
      observer.observe(element);
    }

    return () => {
      if (element && observer) {
        observer.unobserve(element);
      }
    };
  }, [startOnView]);

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      
      // Easing function for smooth deceleration
      const easeOutQuart = (x) => 1 - Math.pow(1 - x, 4);
      
      if (progress < duration) {
        const progressRatio = easeOutQuart(progress / duration);
        setCount(Math.min(Math.floor(progressRatio * end), end));
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(step);
  }, [end, duration, isInView]);

  return count;
}; 