import React, { memo } from 'react';
import './GlassCard.css';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = memo(({ children, className = '', onClick }) => {
  return (
    <div 
      className={`glass-card ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
});

GlassCard.displayName = 'GlassCard';

export default GlassCard; 