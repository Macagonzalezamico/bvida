import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/PagoFallido.css';

const PagoFallido: React.FC = () => {
  const [searchParams] = useSearchParams();
  const reservaId = searchParams.get('reserva');

  return (
    <div className="pago-fallido-page">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="failure-container"
      >
        <div className="failure-icon">
          ❌
        </div>
        
        <h1>Pago No Completado</h1>
        <p className="failure-message">
          El pago no se pudo completar. Tu reserva sigue pendiente de confirmación.
        </p>

        <div className="info-box">
          <h3>¿Qué puedes hacer?</h3>
          <ul>
            <li>Intentar el pago nuevamente desde la página de reservas</li>
            <li>Verificar que tu método de pago esté habilitado</li>
            <li>Contactarnos si tienes problemas con el pago</li>
          </ul>
        </div>

        <div className="actions">
          <Link to="/reservas" className="btn-reintentar">
            Reintentar Pago
          </Link>
          <Link to="/contacto" className="btn-contacto">
            Contactar Soporte
          </Link>
          <Link to="/" className="btn-inicio">
            Volver al Inicio
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PagoFallido; 