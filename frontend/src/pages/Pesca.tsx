import { motion } from 'framer-motion';

const Pesca = () => {
  const serviciosPesca = [
    {
      id: 1,
      nombre: "Pesca de Medio Día",
      duracion: "4 horas",
      precio: "$8,000",
      descripcion: "Ideal para principiantes. Incluye equipamiento y guía experto.",
      incluye: ["Equipamiento completo", "Guía experto", "Seguro", "Bebidas"]
    },
    {
      id: 2,
      nombre: "Pesca Completa",
      duracion: "8 horas",
      precio: "$15,000",
      descripcion: "Experiencia completa de pesca con almuerzo incluido.",
      incluye: ["Equipamiento completo", "Guía experto", "Almuerzo", "Bebidas", "Seguro"]
    },
    {
      id: 3,
      nombre: "Pesca Nocturna",
      duracion: "6 horas",
      precio: "$12,000",
      descripcion: "Pesca nocturna especializada en especies que pican de noche.",
      incluye: ["Equipamiento nocturno", "Guía especializado", "Cena", "Bebidas", "Seguro"]
    }
  ];

  return (
    <div className="pesca-page">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="page-header"
      >
        <h1 className="page-title">Pesca Embarcada</h1>
        <p className="page-subtitle">Experiencias únicas de pesca con los mejores guías</p>
      </motion.div>

      <div className="container">
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
                <p className="pesca-descripcion">{servicio.descripcion}</p>
                <div className="pesca-incluye">
                  <h4>Incluye:</h4>
                  <ul>
                    {servicio.incluye.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="pesca-precio">
                  <span className="precio">{servicio.precio}</span>
                  <span className="por-persona">por persona</span>
                </div>
                <button className="btn btn-primary">Reservar</button>
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
              <p>Reserva con 24 horas de anticipación</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Pesca; 