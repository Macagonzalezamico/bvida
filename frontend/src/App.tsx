import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import Cabanas from './pages/Cabanas';
import Pesca from './pages/Pesca';
import Reservas from './pages/Reservas';
import Contacto from './pages/Contacto';
import AnimatedBackground from './components/AnimatedBackground';

const Navbar = () => {
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
          <img src="/logo.png" alt="Buena Vida Logo" className="nav-logo" />
        </Link>
      </div>
      <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={closeMobileMenu}>
          Inicio
        </Link>
        <Link to="/cabanas" className={`nav-link ${isActive('/cabanas') ? 'active' : ''}`} onClick={closeMobileMenu}>
          Cabañas
        </Link>
        <Link to="/pesca" className={`nav-link ${isActive('/pesca') ? 'active' : ''}`} onClick={closeMobileMenu}>
          Pesca
        </Link>
        <Link to="/reservas" className={`nav-link ${isActive('/reservas') ? 'active' : ''}`} onClick={closeMobileMenu}>
          Reservas
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
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <AnimatedBackground />
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cabanas" element={<Cabanas />} />
            <Route path="/pesca" element={<Pesca />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
