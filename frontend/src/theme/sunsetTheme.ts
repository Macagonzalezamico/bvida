// Tema premium para El Paraíso - Experiencia hotelera de lujo
export const sunsetTheme = {
  colors: {
    // Paleta premium inspirada en resorts de lujo
    primary: {
      main: '#D4AF37',      // Oro elegante
      light: '#E6C85C',     // Oro champagne
      dark: '#B8941F',      // Oro viejo
      darker: '#9A7B1A',    // Oro profundo
    },
    secondary: {
      main: '#2C5F7F',      // Azul marina sofisticado
      light: '#4A7BA7',     // Azul acero
      dark: '#1B4A66',      // Azul profundo
      darker: '#0F3A52',    // Azul noche
    },
    accent: {
      main: '#8B4513',      // Marrón tierra elegante
      light: '#A0522D',     // Marrón cálido
      dark: '#654321',      // Marrón chocolate
      coral: '#FF7F7F',     // Coral suave
    },
    neutral: {
      white: '#FFFFFF',
      cream: '#F8F6F0',     // Crema marfil
      beige: '#F5F2E9',     // Beige arena
      pearl: '#F2F0E6',     // Perla
      stone: '#E8E4D9',     // Piedra natural
      charcoal: '#2F2F2F',  // Carbón elegante
    },
    // Colores de texto premium
    text: {
      primary: '#1A1A1A',   // Negro profundo
      secondary: '#4A4A4A', // Gris carbón
      tertiary: '#6B6B6B',  // Gris medio
      light: '#FFFFFF',     // Blanco puro
      gold: '#D4AF37',      // Oro para elementos especiales
    },
    // Colores de fondo premium
    background: {
      primary: 'rgba(248, 246, 240, 0.98)', // Crema translúcido
      glass: 'rgba(255, 255, 255, 0.15)',   // Cristal premium
      dark: 'rgba(26, 26, 26, 0.85)',       // Oscuro elegante
      overlay: 'rgba(212, 175, 55, 0.05)',  // Overlay dorado sutil
    },
    // Gradientes premium
    gradients: {
      sunset: 'linear-gradient(135deg, #D4AF37 0%, #E6C85C 25%, #FF7F7F 50%, #2C5F7F 75%, #4A7BA7 100%)',
      ocean: 'linear-gradient(135deg, #2C5F7F 0%, #4A7BA7 50%, #1B4A66 100%)',
      gold: 'linear-gradient(135deg, #D4AF37 0%, #E6C85C 50%, #B8941F 100%)',
      earth: 'linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #654321 100%)',
      luxury: 'linear-gradient(135deg, #1A1A1A 0%, #2F2F2F 25%, #D4AF37 50%, #2C5F7F 75%, #4A7BA7 100%)',
    },
  },
  // Sombras premium
  shadows: {
    xs: '0 1px 3px rgba(0, 0, 0, 0.05)',
    sm: '0 2px 8px rgba(212, 175, 55, 0.15)',
    md: '0 4px 16px rgba(44, 95, 127, 0.20)',
    lg: '0 8px 32px rgba(26, 26, 26, 0.25)',
    xl: '0 12px 48px rgba(26, 26, 26, 0.30)',
    '2xl': '0 16px 64px rgba(26, 26, 26, 0.35)',
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
    luxury: '0 8px 32px rgba(212, 175, 55, 0.25), 0 2px 16px rgba(44, 95, 127, 0.15)',
    glow: '0 0 20px rgba(212, 175, 55, 0.4), 0 0 40px rgba(212, 175, 55, 0.2)',
  },
  // Bordes premium
  borders: {
    subtle: '1px solid rgba(212, 175, 55, 0.20)',
    glass: '1px solid rgba(255, 255, 255, 0.25)',
    elegant: '2px solid rgba(44, 95, 127, 0.30)',
    luxury: '1px solid rgba(212, 175, 55, 0.40)',
    radius: {
      none: '0',
      xs: '2px',
      sm: '4px',
      base: '8px',
      md: '12px',
      lg: '16px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '32px',
      full: '50px',
    },
  },
  // Efectos de cristal premium
  glass: {
    subtle: {
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(20px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
    },
    medium: {
      background: 'rgba(255, 255, 255, 0.12)',
      backdropFilter: 'blur(25px) saturate(160%)',
      border: '1px solid rgba(255, 255, 255, 0.25)',
    },
    strong: {
      background: 'rgba(255, 255, 255, 0.18)',
      backdropFilter: 'blur(30px) saturate(140%)',
      border: '1px solid rgba(255, 255, 255, 0.35)',
    },
    luxury: {
      background: 'rgba(248, 246, 240, 0.15)',
      backdropFilter: 'blur(25px) saturate(150%) contrast(110%)',
      border: '1px solid rgba(212, 175, 55, 0.25)',
    },
  },
  // Animaciones premium
  animations: {
    duration: {
      instant: '0.1s',
      fast: '0.2s',
      normal: '0.3s',
      medium: '0.4s',
      slow: '0.6s',
      slower: '0.8s',
      slowest: '1.2s',
    },
    easing: {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
      luxury: 'cubic-bezier(0.4, 0, 0.2, 1)',
      smooth: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
  // Tipografía premium
  typography: {
    fontFamily: {
      primary: "'Playfair Display', 'Times New Roman', serif", // Elegante para títulos
      secondary: "'Inter', 'Segoe UI', 'Helvetica Neue', sans-serif", // Moderno para cuerpo
      accent: "'Crimson Text', 'Georgia', serif", // Sofisticado para detalles
    },
    fontSize: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem',  // 60px
      '7xl': '4.5rem',   // 72px
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
    letterSpacing: {
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },
  // Espaciado
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

// Función helper para aplicar estilos de cristal premium
export const applyGlassEffect = (type: 'subtle' | 'medium' | 'strong' | 'luxury' = 'medium') => {
  const theme = sunsetTheme.glass[type];
  return {
    background: theme.background,
    backdropFilter: theme.backdropFilter,
    border: theme.border,
    WebkitBackdropFilter: theme.backdropFilter, // Safari support
  };
};

// Función helper para gradientes premium
export const createGradient = (colors: string[], direction: string = '135deg', type: 'linear' | 'radial' = 'linear') => {
  if (type === 'radial') {
    return `radial-gradient(ellipse at center, ${colors.join(', ')})`;
  }
  return `linear-gradient(${direction}, ${colors.join(', ')})`;
};

// Función helper para sombras premium
export const createShadow = (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'luxury' | 'glow' = 'md') => {
  return sunsetTheme.shadows[size];
};

// Función helper para obtener colores con transparencia
export const withOpacity = (color: string, opacity: number) => {
  // Convierte hex a rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Función helper para transiciones suaves
export const createTransition = (properties: string[], duration: string = '0.3s', easing: string = 'luxury') => {
  const easingValue = sunsetTheme.animations.easing[easing as keyof typeof sunsetTheme.animations.easing] || easing;
  return properties.map(prop => `${prop} ${duration} ${easingValue}`).join(', ');
};

// Configuración de fuentes premium
export const fontImports = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&display=swap');
`;

export default sunsetTheme; 