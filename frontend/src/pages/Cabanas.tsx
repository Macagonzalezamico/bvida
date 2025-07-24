import { motion } from 'framer-motion';

const Cabanas = () => {
  const cabanas = [
    {
      id: 1,
      nombre: "Cabaña Familiar",
      capacidad: "4 personas",
      precio: "$15,000",
      descripcion: "Cabaña espaciosa con 2 habitaciones, cocina completa y terraza privada.",
      comodidades: ["2 habitaciones", "Cocina completa", "Terraza", "Parrilla", "WiFi"]
    },
    {
      id: 2,
      nombre: "Cabaña Romántica",
      capacidad: "2 personas",
      precio: "$10,000",
      descripcion: "Cabaña ideal para parejas con vista al lago y jacuzzi privado.",
      comodidades: ["1 habitación", "Jacuzzi", "Vista al lago", "Terraza", "WiFi"]
    },
    {
      id: 3,
      nombre: "Cabaña Grupal",
      capacidad: "6 personas",
      precio: "$20,000",
      descripcion: "Cabaña grande perfecta para grupos familiares o de amigos.",
      comodidades: ["3 habitaciones", "Sala de estar", "Parrilla grande", "Estacionamiento", "WiFi"]
    }
  ];

  return (
    <div className="cabanas-page">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="page-header"
      >
        <h1 className="page-title">Nuestras Cabañas</h1>
        <p className="page-subtitle">Descanso y confort en medio de la naturaleza</p>
      </motion.div>

      <div className="container">
        <div className="cabanas-grid">
          {cabanas.map((cabana, index) => (
            <motion.div
              key={cabana.id}
              className="cabana-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="cabana-image">
                <div className="image-placeholder">🏡</div>
              </div>
              <div className="cabana-content">
                <h3 className="cabana-nombre">{cabana.nombre}</h3>
                <p className="cabana-capacidad">{cabana.capacidad}</p>
                <p className="cabana-descripcion">{cabana.descripcion}</p>
                <div className="cabana-comodidades">
                  {cabana.comodidades.map((comodidad, i) => (
                    <span key={i} className="comodidad-tag">{comodidad}</span>
                  ))}
                </div>
                <div className="cabana-precio">
                  <span className="precio">{cabana.precio}</span>
                  <span className="por-noche">por noche</span>
                </div>
                <button className="btn btn-primary">Reservar</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cabanas; 