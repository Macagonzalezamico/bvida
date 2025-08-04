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
      </div>
    </div>
  );
};

export default Contacto; 