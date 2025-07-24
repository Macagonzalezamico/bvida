import React from 'react';
import './AnimatedBackground.css';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="animated-background">
      {/* Sol */}
      <div className="sun">
        <div className="sun-core"></div>
        <div className="sun-rays"></div>
      </div>
      
      {/* Nubes */}
      <div className="clouds">
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
        <div className="cloud cloud-4"></div>
      </div>
      
      {/* Mar */}
      <div className="ocean">
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="wave wave-3"></div>
        <div className="wave wave-4"></div>
        <div className="wave wave-5"></div>
      </div>
      
      {/* Arena */}
      <div className="sand"></div>
      
      {/* Partículas de luz */}
      <div className="light-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}></div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground; 