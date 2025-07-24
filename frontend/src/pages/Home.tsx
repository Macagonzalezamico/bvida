import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import SunsetButton from '../components/SunsetButton';

const Home = () => {
  return (
    <div className="home-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="hero"
        >
          <div className="hero-content">
            <h1 className="hero-title">Cabañas & Pesca El Paraíso</h1>
            <p className="hero-subtitle">
              Naturaleza, confort y la mejor pesca embarcada. Reservá tu experiencia única.
            </p>
            <div className="hero-buttons">
              <Link to="/cabanas">
                <SunsetButton variant="primary" size="lg" className="pulse">
                  <span>🏡</span>
                  Ver Cabañas
                </SunsetButton>
              </Link>
              <Link to="/pesca">
                <SunsetButton variant="secondary" size="lg">
                  <span>🎣</span>
                  Pesca Embarcada
                </SunsetButton>
              </Link>
            </div>
          </div>
        </motion.div>

        <section className="features-section">
          <h2 className="section-title">¿Por qué elegirnos?</h2>
          <div className="features-grid">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlassCard className="feature-card">
                <div className="feature-icon">🏡</div>
                <h3>Cabañas Cómodas</h3>
                <p>Alojamiento confortable con todas las comodidades para tu descanso.</p>
              </GlassCard>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <GlassCard className="feature-card">
                <div className="feature-icon">🎣</div>
                <h3>Pesca Embarcada</h3>
                <p>Experiencias únicas de pesca con guías expertos y equipamiento profesional.</p>
              </GlassCard>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <GlassCard className="feature-card">
                <div className="feature-icon">🌲</div>
                <h3>Naturaleza</h3>
                <p>Rodeado de paisajes naturales únicos y actividades al aire libre.</p>
              </GlassCard>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home; 