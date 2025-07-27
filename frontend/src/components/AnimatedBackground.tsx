import React, { memo } from 'react';
import './AnimatedBackground.css';

const AnimatedBackground: React.FC = memo(() => {
  console.log('AnimatedBackground component is rendering');
  
  return (
    <div className="animated-background">
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        backgroundColor: 'red',
        zIndex: -1
      }}>
        BACKGROUND TEST
      </div>
    </div>
  );
});

AnimatedBackground.displayName = 'AnimatedBackground';

export default AnimatedBackground; 