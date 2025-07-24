import React, { memo } from 'react';
import './SunsetButton.css';

interface SunsetButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const SunsetButton: React.FC<SunsetButtonProps> = memo(({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button'
}) => {
  return (
    <button
      type={type}
      className={`sunset-btn sunset-btn-${variant} sunset-btn-${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="sunset-btn-content">
        {children}
      </span>
      <div className="sunset-btn-glow"></div>
    </button>
  );
});

SunsetButton.displayName = 'SunsetButton';

export default SunsetButton; 