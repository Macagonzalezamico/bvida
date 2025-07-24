// Tema de atardecer/amanecer y playa para El Paraíso
export const sunsetTheme = {
  colors: {
    // Colores principales
    primary: {
      main: '#ff6b35',      // Naranja atardecer
      light: '#ff8c42',     // Naranja claro
      dark: '#e55a2b',      // Naranja oscuro
    },
    secondary: {
      main: '#1e90ff',      // Azul mar
      light: '#87ceeb',     // Azul cielo
      dark: '#0066cc',      // Azul profundo
    },
    accent: {
      main: '#ffd700',      // Dorado sol
      light: '#f4d03f',     // Amarillo arena
      dark: '#f39c12',      // Naranja dorado
    },
    // Colores de texto
    text: {
      primary: '#2c3e50',   // Azul oscuro
      secondary: '#7f8c8d', // Gris azulado
      light: '#ecf0f1',     // Gris claro
    },
    // Colores de fondo
    background: {
      light: 'rgba(255, 255, 255, 0.95)',
      glass: 'rgba(255, 255, 255, 0.1)',
      dark: 'rgba(0, 0, 0, 0.1)',
    },
    // Gradientes
    gradients: {
      sunset: 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 25%, #ffd700 50%, #1e90ff 75%, #87ceeb 100%)',
      ocean: 'linear-gradient(135deg, #1e90ff 0%, #87ceeb 50%, #4682b4 100%)',
      sand: 'linear-gradient(135deg, #f4d03f 0%, #f39c12 50%, #e67e22 100%)',
      sky: 'linear-gradient(180deg, #ff7e5f 0%, #feb47b 15%, #ffd89b 30%, #87ceeb 50%, #4682b4 70%, #1e3a8a 85%, #0f172a 100%)',
    },
  },
  // Sombras
  shadows: {
    sm: '0 2px 8px rgba(255, 107, 53, 0.2)',
    md: '0 4px 16px rgba(255, 107, 53, 0.25)',
    lg: '0 8px 32px rgba(255, 107, 53, 0.3)',
    neon: '0 0 10px rgba(255, 107, 53, 0.8), 0 0 20px rgba(255, 107, 53, 0.5), 0 0 30px rgba(255, 107, 53, 0.3)',
  },
  // Bordes
  borders: {
    glass: '1px solid rgba(255, 255, 255, 0.2)',
    radius: {
      sm: '8px',
      md: '12px',
      lg: '20px',
      full: '50px',
    },
  },
  // Efectos de vidrio
  glass: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  // Animaciones
  animations: {
    duration: {
      fast: '0.2s',
      normal: '0.3s',
      slow: '0.5s',
    },
    easing: {
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
    },
  },
  // Tipografía
  typography: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
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

// Función helper para aplicar estilos de vidrio
export const applyGlassEffect = (opacity: number = 0.1, blur: number = 15) => ({
  background: `rgba(255, 255, 255, ${opacity})`,
  backdropFilter: `blur(${blur}px)`,
  border: '1px solid rgba(255, 255, 255, 0.2)',
});

// Función helper para gradientes
export const createGradient = (colors: string[], direction: string = '135deg') => 
  `linear-gradient(${direction}, ${colors.join(', ')})`;

// Función helper para sombras
export const createShadow = (color: string, intensity: number = 0.2) => 
  `0 4px 16px rgba(255, 107, 53, ${intensity})`;

export default sunsetTheme; 