// Performance Optimization Utilities

// Detect if user prefers reduced motion
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Detect mobile device
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

// Lazy load images
export const lazyLoadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// Debounce function for scroll events
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for resize events
export const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Get animation config based on device
export const getAnimationConfig = () => {
  if (prefersReducedMotion()) {
    return {
      duration: 0,
      delay: 0,
      stagger: 0,
    };
  }

  if (isMobile()) {
    return {
      duration: 0.3,
      delay: 0.05,
      stagger: 0.05,
    };
  }

  return {
    duration: 0.6,
    delay: 0.1,
    stagger: 0.1,
  };
};

// Preload critical images
export const preloadImages = (imageUrls) => {
  return Promise.all(imageUrls.map((url) => lazyLoadImage(url)));
};
