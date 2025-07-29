import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, Suspense, lazy, memo } from 'react';
import './App.css';

// Componente de fondo que funciona
const AnimatedBackground = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1,
      backgroundImage: 'url("/los-pocitosjpg.webp")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      opacity: 0.7
    }}>
    </div>
  );
};

// Lazy loading de páginas para mejor performance
const Home = lazy(() => import('./pages/Home'));
const Cabanas = lazy(() => import('./pages/Cabanas'));
const Pesca = lazy(() => import('./pages/Pesca'));
const Reservas = lazy(() => import('./pages/Reservas'));
const Turnero = lazy(() => import('./pages/Turnero'));
const Contacto = lazy(() => import('./pages/Contacto'));

// Componente de loading optimizado
const PageLoader = () => (
  <div className="page-loader">
    <div className="loader-content">
      <div className="loader-spinner"></div>
      <p>Cargando...</p>
    </div>
  </div>
);

const Navbar = memo(() => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/" onClick={closeMobileMenu}>
          <img 
            src="/logo.png" 
            alt="BuenaVida Logo" 
            className="nav-logo" 
            loading="lazy"
            decoding="async"
          />
        </Link>
      </div>
      <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={closeMobileMenu}>
          Inicio
        </Link>
        <Link to="/cabanas" className={`nav-link ${isActive('/cabanas') ? 'active' : ''}`} onClick={closeMobileMenu}>
          Alojamientos
        </Link>
        <Link to="/pesca" className={`nav-link ${isActive('/pesca') ? 'active' : ''}`} onClick={closeMobileMenu}>
          Pesca
        </Link>
        <Link to="/reservas" className={`nav-link ${isActive('/reservas') ? 'active' : ''}`} onClick={closeMobileMenu}>
          Reservas
        </Link>
        <Link to="/turnero" className={`nav-link ${isActive('/turnero') ? 'active' : ''}`} onClick={closeMobileMenu}>
          Turnero
        </Link>
        <Link to="/contacto" className={`nav-link ${isActive('/contacto') ? 'active' : ''}`} onClick={closeMobileMenu}>
          Contacto
        </Link>
      </div>
      <div className="nav-mobile-toggle" onClick={toggleMobileMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
});

const App = () => {
  return (
    <Router>
      <div className="app">
        <AnimatedBackground />
        <Navbar />
        <main className="main-content">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cabanas" element={<Cabanas />} />
              <Route path="/pesca" element={<Pesca />} />
              <Route path="/reservas" element={<Reservas />} />
              <Route path="/turnero" element={<Turnero />} />
              <Route path="/contacto" element={<Contacto />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
