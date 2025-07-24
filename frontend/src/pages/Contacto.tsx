import { motion } from 'framer-motion';
import { useState } from 'react';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Mensaje de contacto:', formData);
    // Aquí se enviaría al backend
  };

  return (
    <div className="contacto-page">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="page-header"
      >
        <h1 className="page-title">Contacto</h1>
        <p className="page-subtitle">Estamos aquí para ayudarte</p>
      </motion.div>

      <div className="container">
        <div className="contacto-content">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="contacto-info"
          >
            <h2>Información de Contacto</h2>
            
            <div className="contacto-cards">
              <div className="contacto-card">
                <div className="contacto-icon">📞</div>
                <h3>Teléfono</h3>
                <p>+54 9 11 1234-5678</p>
                <p>+54 9 11 8765-4321</p>
              </div>
              
              <div className="contacto-card">
                <div className="contacto-icon">📧</div>
                <h3>Email</h3>
                <p>info@elparaiso.com</p>
                <p>reservas@elparaiso.com</p>
              </div>
              
              <div className="contacto-card">
                <div className="contacto-icon">📍</div>
                <h3>Ubicación</h3>
                <p>Ruta Provincial 123</p>
                <p>Villa del Lago, Córdoba</p>
                <p>Argentina</p>
              </div>
              
              <div className="contacto-card">
                <div className="contacto-icon">🕒</div>
                <h3>Horarios</h3>
                <p>Lunes a Domingo</p>
                <p>8:00 AM - 8:00 PM</p>
                <p>Atención 24/7 para emergencias</p>
              </div>
            </div>

            <div className="redes-sociales">
              <h3>Síguenos en redes sociales</h3>
              <div className="redes-icons">
                <a href="#" className="red-social">📘 Facebook</a>
                <a href="#" className="red-social">📷 Instagram</a>
                <a href="#" className="red-social">🐦 Twitter</a>
                <a href="#" className="red-social">📺 YouTube</a>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="contacto-form"
            onSubmit={handleSubmit}
          >
            <h2>Envíanos un mensaje</h2>
            
            <div className="form-group">
              <label htmlFor="nombre">Nombre completo *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="asunto">Asunto *</label>
              <input
                type="text"
                id="asunto"
                name="asunto"
                value={formData.asunto}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="mensaje">Mensaje *</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                rows={6}
                required
                placeholder="Cuéntanos en qué podemos ayudarte..."
              />
            </div>

            <button type="submit" className="btn btn-primary btn-large">
              Enviar Mensaje
            </button>
          </motion.form>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mapa-section"
        >
          <h2>Ubicación</h2>
          <div className="mapa-container">
            <div className="mapa-placeholder">
              <div className="mapa-content">
                <h3>📍 El Paraíso</h3>
                <p>Ruta Provincial 123, Villa del Lago</p>
                <p>Córdoba, Argentina</p>
                <div className="mapa-info">
                  <p><strong>Coordenadas:</strong> -31.4167° S, -64.1833° W</p>
                  <p><strong>Distancia desde Córdoba:</strong> 45 km</p>
                  <p><strong>Tiempo de viaje:</strong> 1 hora en auto</p>
                </div>
                <button className="btn btn-secondary">Ver en Google Maps</button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contacto; 