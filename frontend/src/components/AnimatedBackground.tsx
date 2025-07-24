import React, { memo, useMemo } from 'react';
import { useOptimizedAnimation, useInView } from '../hooks/useOptimizedAnimation';
import './AnimatedBackground.css';

// Componente de partículas memoizado y optimizado
const Particles = memo(({ count, shouldAnimate }: { count: number; shouldAnimate: boolean }) => {
  const particles = useMemo(() => 
    [...Array(count)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 1
    })), [count]
  );

  if (!shouldAnimate || count === 0) return null;

  return (
    <div className="light-particles">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`
          }}
        />
      ))}
    </div>
  );
});

// Componente de olas memoizado con configuración dinámica
const Ocean = memo(({ waveCount, shouldAnimate }: { waveCount: number; shouldAnimate: boolean }) => {
  const waves = useMemo(() => 
    Array.from({ length: waveCount }, (_, i) => i + 1), 
    [waveCount]
  );

  return (
    <div className={`ocean ${!shouldAnimate ? 'static' : ''}`}>
      {waves.map(waveNum => (
        <div key={waveNum} className={`wave wave-${waveNum}`}></div>
      ))}
    </div>
  );
});

// Componente de sol memoizado con configuración dinámica
const Sun = memo(({ showSun, showRays, shouldAnimate }: { 
  showSun: boolean; 
  showRays: boolean; 
  shouldAnimate: boolean; 
}) => {
  if (!showSun) return null;

  return (
    <div className={`sun ${!shouldAnimate ? 'static' : ''}`}>
      <div className="sun-core"></div>
      {showRays && <div className="sun-rays"></div>}
    </div>
  );
});

const AnimatedBackground: React.FC = memo(() => {
  const { animationConfig } = useOptimizedAnimation();
  const { ref, isInView } = useInView(0.1);

  // Solo animar cuando está visible y las condiciones lo permiten
  const shouldAnimate = isInView && animationConfig.shouldAnimate;

  return (
    <div 
      ref={ref}
      className={`animated-background ${
        animationConfig.reducedEffects ? 'reduced-effects' : ''
      }`}
      style={{
        animationDuration: `${animationConfig.animationDuration}s`
      }}
    >
      <Sun 
        showSun={animationConfig.showSun} 
        showRays={animationConfig.showRays}
        shouldAnimate={shouldAnimate}
      />
      <Ocean 
        waveCount={animationConfig.waveCount}
        shouldAnimate={shouldAnimate}
      />
      <div className="sand"></div>
      <Particles 
        count={animationConfig.particleCount}
        shouldAnimate={shouldAnimate}
      />
    </div>
  );
});

AnimatedBackground.displayName = 'AnimatedBackground';

export default AnimatedBackground; 