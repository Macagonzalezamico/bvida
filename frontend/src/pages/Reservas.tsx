import { motion } from 'framer-motion';
import { useState } from 'react';

const Reservas = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tipoServicio: 'cabaña',
    fechaLlegada: '',
    fechaSalida: '',
    personas: 1,
    mensaje: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos de reserva:', formData);
    // Aquí se enviaría al backend
  };

  return (
    <div className="reservas-page">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="page-header"
      >
        <h1 className="page-title">Reserva tu experiencia en BuenaVida</h1>
      </motion.div>

      <div className="container">
        <div className="reservas-content">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="reserva-info"
          >
            <h2>Información de Reserva</h2>
            <div className="info-cards">
              <div className="info-card">
                <h3>📅 Política de Reservas</h3>
                <ul>
                  <li>Reserva mínima con 24h de anticipación</li>
                  <li>Pago del 30% al momento de la reserva</li>
                  <li>Cancelación gratuita hasta 48h antes</li>
                  <li>Check-in: 15:00h / Check-out: 10:00h</li>
                </ul>
              </div>
              
              <div className="info-card">
                <h3>💳 Métodos de Pago</h3>
                <ul>
                  <li>MercadoPago</li>
                  <li>Transferencia bancaria</li>
                  <li>Efectivo al llegar</li>
                  <li>Tarjetas de crédito/débito</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="reserva-form"
            onSubmit={handleSubmit}
          >
            <h2>Formulario de Reserva</h2>
            
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

            <div className="form-row">
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
                <label htmlFor="telefono">Teléfono *</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="tipoServicio">Tipo de servicio *</label>
                <select
                  id="tipoServicio"
                  name="tipoServicio"
                  value={formData.tipoServicio}
                  onChange={handleChange}
                  required
                >
                  <option value="cabaña">Cabaña</option>
                  <option value="pesca">Pesca Embarcada</option>
                  <option value="combo">Cabaña + Pesca</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="personas">Número de personas *</label>
                <input
                  type="number"
                  id="personas"
                  name="personas"
                  min="1"
                  max="10"
                  value={formData.personas}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fechaLlegada">Fecha de llegada *</label>
                <input
                  type="date"
                  id="fechaLlegada"
                  name="fechaLlegada"
                  value={formData.fechaLlegada}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="fechaSalida">Fecha de salida *</label>
                <input
                  type="date"
                  id="fechaSalida"
                  name="fechaSalida"
                  value={formData.fechaSalida}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="mensaje">Mensaje adicional</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                rows={4}
                placeholder="Comentarios especiales, requerimientos específicos..."
              />
            </div>

            <button type="submit" className="btn btn-primary btn-large">
              Enviar Reserva
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Reservas; 