import { useEffect, useRef, useState } from 'react';

// Hook para optimizar animaciones basado en performance del dispositivo
export const useOptimizedAnimation = () => {
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Detectar preferencia de movimiento reducido
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    // Detectar performance del dispositivo
    const detectPerformance = () => {
      // Verificar memoria disponible
      const memory = (navigator as unknown as { deviceMemory?: number })?.deviceMemory;
      const isLowMemory = memory && memory <= 4;

      // Verificar número de cores
      const cores = navigator.hardwareConcurrency;
      const isLowCores = cores && cores <= 2;

      // Verificar conexión de red
      const connection = (navigator as unknown as { connection?: { effectiveType: string } })?.connection;
      const isSlowConnection = connection && (
        connection.effectiveType === '2g' || 
        connection.effectiveType === 'slow-2g'
      );

      setIsLowPerformance(isLowMemory || isLowCores || isSlowConnection || false);
    };

    detectPerformance();

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Configuraciones optimizadas basadas en performance
  const animationConfig = {
    shouldAnimate: !prefersReducedMotion && !isLowPerformance,
    particleCount: isLowPerformance ? 2 : prefersReducedMotion ? 0 : 6,
    animationDuration: isLowPerformance ? 30 : 60, // segundos
    blurIntensity: isLowPerformance ? 8 : 15, // px
    waveCount: isLowPerformance ? 2 : 4,
    showSun: !isLowPerformance,
    showRays: !isLowPerformance && !prefersReducedMotion,
    reducedEffects: isLowPerformance || prefersReducedMotion
  };

  return {
    isLowPerformance,
    prefersReducedMotion,
    animationConfig
  };
};

// Hook para RAF optimizado (simplificado) - removido para evitar errores de TypeScript

// Hook para detectar visibilidad del componente (Intersection Observer)
export const useInView = (threshold: number = 0.1) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, isInView };
};