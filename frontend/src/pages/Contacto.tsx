import { motion } from 'framer-motion';
import { useState } from 'react';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.');
        setFormData({
          nombre: '',
          email: '',
          asunto: '',
          mensaje: ''
        });
      } else {
        setError(data.error || 'Error al enviar el mensaje. Por favor, intenta nuevamente.');
      }
    } catch (error) {
      setError('Error de conexión. Por favor, verifica tu conexión e intenta nuevamente.');
    } finally {
      setLoading(false);
    }
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
                <p style={{ color: '#111' }}>+54 2920-474498</p>
                <p style={{ color: '#111' }}>+54 2920 252023</p>
              </div>
              
              <div className="contacto-card">
                <div className="contacto-icon">📧</div>
                <h3>Email</h3>
                <p style={{ color: '#111' }}>makagonzalez17@gmail.com</p>
              </div>
              
              <div className="contacto-card">
                <div className="contacto-icon">📍</div>
                <h3>Ubicación</h3>
                <p style={{ color: '#111' }}>Balneario Los Pocitos</p>
                <p style={{ color: '#111' }}>Provincia de Buenos Aires</p>
                <p style={{ color: '#111' }}>Argentina</p>
              </div>
              
              <div className="contacto-card">
                <div className="contacto-icon">⏰</div>
                <h3>Horarios</h3>
                <p style={{ color: '#111' }}>Lunes a Domingo</p>
                <p style={{ color: '#111' }}>8:00 AM - 8:00 PM</p>
                <p style={{ color: '#111' }}>Atención 24/7 para emergencias</p>
              </div>
            </div>

            <div className="redes-sociales">
              <h3>Síguenos en redes sociales</h3>
              <div className="redes-icons">
                <a href="https://www.facebook.com/PosadaBuenaVida" target="_blank" rel="noopener noreferrer" className="red-social">📘 Facebook</a>
                <a href="https://www.instagram.com/buenavidapesca/" target="_blank" rel="noopener noreferrer" className="red-social">📷 Instagram</a>
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
            
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            
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

            <button 
              type="submit" 
              className="btn btn-primary btn-large"
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </motion.form>
        </div>

        {/* Sección de Ubicación con Google Maps */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="ubicacion-section"
        >
          <h2>📍 Nuestra Ubicación</h2>
          <p>Encuéntranos en el hermoso Balneario Los Pocitos</p>
          
          <div className="mapa-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3272.1234567890123!2d-62.422777!3d-40.436519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDI2JzExLjQiUyA2MsKwMjUnMjIuMCJX!5e0!3m2!1ses!2sar!4v1234567890123"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Bvida - Balneario Los Pocitos"
            ></iframe>
          </div>

                      <div className="direccion-info">
              <div className="direccion-card">
                <h3>🚗 Cómo llegar</h3>
                <p><strong>Dirección:</strong> Balneario Los Pocitos, Provincia de Buenos Aires, Argentina</p>
                <p><strong>Coordenadas:</strong> -40.436519, -62.422777</p>
                <p><strong>Distancia desde Buenos Aires:</strong> ~400 km</p>
              </div>
            </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contacto; 