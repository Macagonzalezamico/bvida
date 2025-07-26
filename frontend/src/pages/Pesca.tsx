import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Pesca = () => {
  const navigate = useNavigate();
  const serviciosPesca = [
    {
      id: 1,
      nombre: "Pesca de Medio Día",
      duracion: "4 horas",
      precio: "$8,000",
      descripcion: "Disfruta de una jornada ideal para principiantes o quienes buscan una experiencia relajada en el agua."
    },
    {
      id: 2,
      nombre: "Pesca Completa",
      duracion: "8 horas",
      precio: "$15,000",
      descripcion: "Vive la experiencia completa de pesca, explorando los mejores puntos y técnicas durante todo el día."
    },
    {
      id: 3,
      nombre: "Culebra",
      duracion: "6 horas",
      precio: "$12,000",
      descripcion: "Disfruta de la pesca de culebra, una experiencia única y desafiante en la región."
    }
  ];

  return (
    <div className="pesca-page">
      {/* Eliminar el header duplicado de la página de pesca */}

      <div className="container">
        {/* Card principal de información general de pesca, branding web, con foto, más grande y con nuevo título */}
        <div style={{
          background: 'var(--white)',
          border: '1.5px solid var(--primary-color)',
          borderRadius: '24px',
          boxShadow: '0 4px 24px rgba(212, 175, 55, 0.10)',
          padding: '0',
          margin: '2rem 0 2.5rem 0',
          width: '100%',
          maxWidth: '1200px',
          marginLeft: 'auto',
          marginRight: 'auto',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '0',
        }}>
          <div style={{ width: '100%', height: '260px', background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color), var(--secondary-color))', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <img src="/embarcacion.jpg" alt="Embarcación BuenaVida" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 80%', borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }} />
          </div>
          <div style={{ padding: '2.5rem 2.5rem 2.5rem 2.5rem', width: '100%' }}>
            <div style={{ fontWeight: 900, fontSize: '2.5rem', color: 'var(--primary-dark)', letterSpacing: '0.01em', marginBottom: '0.5em', background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color), var(--secondary-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Pesca Embarcada
            </div>
            <div style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '1.5em' }}>
              Experiencias únicas de pesca con los mejores guías
            </div>
            <div style={{ fontSize: '1.08rem', color: 'var(--text-primary)', lineHeight: 1.7, maxWidth: 700, margin: '0 auto' }}>
              Todas nuestras salidas incluyen un <b style={{ color: 'var(--primary-color)' }}>guía especializado</b>, <b style={{ color: 'var(--primary-color)' }}>carnada de langostino</b> y <b style={{ color: 'var(--primary-color)' }}>seguro para los participantes</b>.<br/><br/>
              El equipo de pesca no está incluido en el precio y puede alquilarse con coste adicional.<br/>
              Si tienes tu propio equipo, ¡puedes traerlo sin problema!
            </div>
          </div>
        </div>

        <div className="pesca-grid">
          {serviciosPesca.map((servicio, index) => (
            <motion.div
              key={servicio.id}
              className="pesca-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="pesca-image">
                <div className="image-placeholder">🎣</div>
              </div>
              <div className="pesca-content">
                <h3 className="pesca-nombre">{servicio.nombre}</h3>
                <p className="pesca-duracion">{servicio.duracion}</p>
                <p className="pesca-descripcion" style={{ color: '#111' }}>{servicio.descripcion}</p>
                <div className="pesca-precio">
                  <span className="precio">{servicio.precio}</span>
                  <span className="por-persona">por persona</span>
                </div>
                <p style={{ color: '#111', fontWeight: 'bold', marginTop: '0.5rem' }}>Equipo de pesca con costo adicional.</p>
                <button 
                  className="btn btn-primary" 
                  onClick={() => navigate('/reservas')}
                >
                  Reservar
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="info-section"
        >
          <h2>Información Importante</h2>
          <div className="info-grid">
            <div className="info-item">
              <h3>🏖️ Horarios</h3>
              <p>Salidas desde las 6:00 AM hasta las 8:00 PM</p>
            </div>
            <div className="info-item">
              <h3>👥 Capacidad</h3>
              <p className="pesca-capacidad">👥 Capacidad: Mínimo 4 pescadores, máximo 10.</p>
            </div>
            <div className="info-item">
              <h3>🌤️ Clima</h3>
              <p>Las salidas dependen de las condiciones climáticas</p>
            </div>
            <div className="info-item">
              <h3>📞 Reservas</h3>
              <p>Reserva con anticipación</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Pesca; 