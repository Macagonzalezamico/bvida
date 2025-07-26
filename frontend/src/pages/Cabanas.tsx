import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Cabanas = () => {
  const navigate = useNavigate();
  
  const alojamiento = {
    id: 1,
    nombre: "Departamentos BuenaVida",
    capacidad: "6 personas",
    precio: "$25,000",
    descripcion: "Dos departamentos idénticos con vista panorámica al mar, perfectos para familias o grupos de amigos. Ambos departamentos cuentan con las mismas características y comodidades.",
    caracteristicasEspecificas: [
      "2 departamentos disponibles",
      "Vista directa al mar",
      "Quincho equipado",
      "Mismas características en ambos"
    ],
    destacado: "2 Departamentos"
  };

  const serviciosIncluidos = [
    "Ropa de cama y toallas",
    "Implementos de cocina completos",
    "WiFi de alta velocidad",
    "TV satelital",
    "Estacionamiento privado",
    "Acceso a pileta",
    "Quincho compartido",
    "Cámaras de seguridad 24/7",
    "Check-in flexible",
    "Atención personalizada"
  ];

  return (
    <div className="cabanas-page">


      <div className="container">
        {/* Tarjeta única de alojamiento */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '3rem',
          width: '95%',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              background: 'var(--white)',
              border: '1.5px solid var(--primary-color)',
              borderRadius: '24px',
              boxShadow: '0 8px 32px rgba(212, 175, 55, 0.15)',
              overflow: 'hidden',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              width: '100%'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 16px 48px rgba(212, 175, 55, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(212, 175, 55, 0.15)';
            }}
          >
            {/* Header con imagen placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{
                height: '450px',
                background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color), var(--secondary-color))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <img 
                src="/Cabaña1.jpg" 
                alt="Departamento BuenaVida" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
                onError={(e) => {
                  // Fallback si la imagen no se encuentra
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) {
                    fallback.style.display = 'flex';
                  }
                }}
              />
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  fontSize: '4rem',
                  opacity: 0.8,
                  display: 'none' // Se mostrará solo si la imagen falla
                }}
              >
                🏠
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(255, 255, 255, 0.9)',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--primary-color)',
                  cursor: 'pointer'
                }}
              >
                {alojamiento.destacado}
              </motion.div>
            </motion.div>

            {/* Contenido */}
            <div style={{ padding: '4rem' }}>
              <h3 style={{
                fontSize: '2.5rem',
                fontWeight: 700,
                color: 'var(--primary-dark)',
                marginBottom: '0.5rem',
                background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {alojamiento.nombre}
              </h3>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem'
              }}>
                <span style={{ fontSize: '1.1rem' }}>👥</span>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                  {alojamiento.capacidad}
                </span>
              </div>

              <p style={{
                color: 'var(--text-primary)',
                lineHeight: 1.6,
                marginBottom: '2.5rem',
                fontSize: '1.2rem'
              }}>
                {alojamiento.descripcion}
              </p>

              {/* Características específicas */}
              {alojamiento.caracteristicasEspecificas.length > 0 && (
                <div style={{
                  marginBottom: '1.5rem',
                  padding: '1rem',
                  background: 'rgba(212, 175, 55, 0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(212, 175, 55, 0.1)'
                }}>
                  <div style={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'var(--primary-color)',
                    marginBottom: '0.75rem'
                  }}>
                    Características destacadas:
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}>
                    {alojamiento.caracteristicasEspecificas.map((caracteristica, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.9rem',
                        color: 'var(--text-primary)'
                      }}>
                        <span style={{ color: 'var(--primary-color)' }}>✨</span>
                        {caracteristica}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Precio y botón */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <div style={{
                    fontSize: '2.5rem',
                    fontWeight: 700,
                    color: 'var(--primary-color)'
                  }}>
                    {alojamiento.precio}
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)'
                  }}>
                    por noche
                  </div>
                </div>
              </div>

              <motion.button 
                className="btn btn-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -3,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ 
                  scale: 0.95,
                  transition: { duration: 0.1 }
                }}
                style={{
                  width: '100%',
                  padding: '2rem',
                  fontSize: '1.3rem',
                  fontWeight: 600
                }}
                onClick={() => navigate('/reservas')}
              >
                <motion.span
                  animate={{ 
                    x: [0, 2, 0],
                    transition: { 
                      duration: 1.5, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  Reservar Ahora
                </motion.span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Card principal de información general */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            background: 'var(--white)',
            border: '1.5px solid var(--primary-color)',
            borderRadius: '24px',
            boxShadow: '0 4px 24px rgba(212, 175, 55, 0.10)',
            padding: '2.5rem',
            margin: '2rem auto 3rem auto',
            textAlign: 'center',
            width: '95%',
            maxWidth: 'none'
          }}
        >
          <div style={{ 
            fontWeight: 900, 
            fontSize: '2.2rem', 
            color: 'var(--primary-dark)', 
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color), var(--secondary-color))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Experiencia de Alojamiento Completa
          </div>
          <div style={{ 
            fontSize: '1.1rem', 
            color: 'var(--text-secondary)', 
            marginBottom: '2rem',
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Disfruta de nuestras casas completamente equipadas con vista al mar, pileta, quincho y todas las comodidades para una estadía inolvidable.
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: 0.6,
              duration: 0.8,
              type: "spring",
              stiffness: 80
            }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            style={{
              background: 'rgba(212, 175, 55, 0.05)',
              border: '1px solid rgba(212, 175, 55, 0.1)',
              borderRadius: '16px',
              padding: '1.5rem',
              marginBottom: '2rem'
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: 'var(--primary-color)',
                marginBottom: '1rem',
                textAlign: 'center'
              }}
            >
              Todas nuestras casas incluyen:
            </motion.div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '0.75rem'
            }}>
              {[
                { icon: '🏠', text: '2 habitaciones amplias' },
                { icon: '🚿', text: 'Baño completo + ante baño' },
                { icon: '🏊', text: 'Pileta de natación' },
                { icon: '📶', text: 'WiFi de alta velocidad' },
                { icon: '📺', text: 'TV satelital' },
                { icon: '🛏️', text: 'Ropa de cama incluida' },
                { icon: '🚗', text: 'Estacionamiento privado' },
                { icon: '🍳', text: 'Cocina completa' },
                { icon: '📹', text: 'Cámaras de seguridad' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: 1 + index * 0.1,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 120
                  }}
                  whileHover={{ 
                    x: 5,
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <motion.span 
                    style={{ color: 'var(--primary-color)' }}
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 1.5 + index * 0.1,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  >
                    {item.icon}
                  </motion.span>
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem'
          }}>
            {serviciosIncluidos.map((servicio, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  delay: 0.4 + index * 0.1,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  background: 'rgba(212, 175, 55, 0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(212, 175, 55, 0.1)',
                  cursor: 'pointer'
                }}
              >
                <motion.span 
                  style={{ fontSize: '1.2rem' }}
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  ✓
                </motion.span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{servicio}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Información adicional */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            delay: 1.2,
            duration: 0.8,
            type: "spring",
            stiffness: 80
          }}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
          style={{
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05), rgba(255, 255, 255, 0.8))',
            border: '2px solid var(--primary-color)',
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(212, 175, 55, 0.15)',
            padding: '3rem',
            textAlign: 'center',
            backdropFilter: 'blur(10px)'
          }}
        >
          
                      <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'flex-start',
              gap: '2rem',
              flexWrap: 'wrap'
            }}>
                          {[
                { icon: '🏠', title: 'Check-in/Check-out', text: 'Check-in: 15:00hs | Check-out: 10:00hs' },
                { icon: '📞', title: 'Reservas', text: 'Reserva con anticipación' },
                { icon: '🐕', title: 'Mascotas', text: 'Se aceptan mascotas' },
                { icon: '🚗', title: 'Estacionamiento', text: 'Incluido sin costo adicional' }
              ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: 1.6 + index * 0.1,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  x: 5,
                  scale: 1.03,
                  transition: { duration: 0.2 }
                }}
                style={{
                  padding: '1.5rem',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.7)',
                  border: '1.5px solid rgba(212, 175, 55, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 16px rgba(212, 175, 55, 0.1)',
                  minWidth: '200px',
                  flex: '1'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(212, 175, 55, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(212, 175, 55, 0.1)';
                }}
              >
                <motion.h3 
                  style={{ 
                    color: 'var(--primary-color)', 
                    marginBottom: '0.75rem',
                    fontSize: '1.1rem',
                    fontWeight: 600
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.icon} {item.title}
                </motion.h3>
                <motion.p 
                  style={{ color: 'var(--text-primary)' }}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.text}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cabanas; 