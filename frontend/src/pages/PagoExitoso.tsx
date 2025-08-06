import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/PagoExitoso.css';

interface Reserva {
  _id: string;
  tipo: string;
  nombre: string;
  email: string;
  monto: number;
  estado: string;
  fechaPesca?: string;
  fechaEntrada?: string;
  fechaSalida?: string;
  cantidadPersonas: number;
}

const PagoExitoso: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [reserva, setReserva] = useState<Reserva | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const reservaId = searchParams.get('reserva');

  useEffect(() => {
    const verificarReserva = async () => {
      if (!reservaId) {
        setError('No se encontró información de la reserva');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/turnero/${reservaId}`);
        if (response.ok) {
          const reservaData = await response.json();
          setReserva(reservaData);
        } else {
          setError('No se pudo obtener la información de la reserva');
        }
      } catch (error) {
        setError('Error de conexión');
      } finally {
        setLoading(false);
      }
    };

    verificarReserva();
  }, [reservaId]);

  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(precio);
  };

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-AR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTipoDisplay = (tipo: string) => {
    switch (tipo) {
      case 'pesca_embarcada': return '🎣 Pesca Embarcada';
      case 'alojamiento_casa1': return '🏠 Alojamiento Casa 1';
      case 'alojamiento_casa2': return '🏠 Alojamiento Casa 2';
      case 'combo_pesca_casa1': return '🎣🏠 Combo Pesca + Casa 1';
      case 'combo_pesca_casa2': return '🎣🏠 Combo Pesca + Casa 2';
      default: return tipo;
    }
  };

  if (loading) {
    return (
      <div className="pago-exitoso-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Verificando tu pago...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pago-exitoso-page">
        <div className="error-container">
          <h2>❌ Error</h2>
          <p>{error}</p>
          <Link to="/reservas" className="btn-volver">
            Volver a Reservas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pago-exitoso-page">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="success-container"
      >
        <div className="success-icon">
          ✅
        </div>
        
        <h1>¡Pago Confirmado!</h1>
        <p className="success-message">
          Tu reserva ha sido confirmada exitosamente. Hemos enviado un email con todos los detalles.
        </p>

        {reserva && (
          <div className="reserva-details">
            <h3>Detalles de tu Reserva</h3>
            <div className="detail-item">
              <strong>Tipo:</strong> {getTipoDisplay(reserva.tipo)}
            </div>
            <div className="detail-item">
              <strong>Nombre:</strong> {reserva.nombre}
            </div>
            <div className="detail-item">
              <strong>Email:</strong> {reserva.email}
            </div>
            <div className="detail-item">
              <strong>Personas:</strong> {reserva.cantidadPersonas}
            </div>
            <div className="detail-item">
              <strong>Monto:</strong> {formatearPrecio(reserva.monto)}
            </div>
            {reserva.fechaPesca && (
              <div className="detail-item">
                <strong>Fecha de Pesca:</strong> {formatearFecha(reserva.fechaPesca)}
              </div>
            )}
            {reserva.fechaEntrada && (
              <div className="detail-item">
                <strong>Fecha de Entrada:</strong> {formatearFecha(reserva.fechaEntrada)}
              </div>
            )}
            {reserva.fechaSalida && (
              <div className="detail-item">
                <strong>Fecha de Salida:</strong> {formatearFecha(reserva.fechaSalida)}
              </div>
            )}
            <div className="detail-item">
              <strong>Estado:</strong> 
              <span className="estado-confirmada">Confirmada</span>
            </div>
          </div>
        )}

        <div className="actions">
          <Link to="/reservas" className="btn-nueva-reserva">
            Hacer Nueva Reserva
          </Link>
          <Link to="/" className="btn-inicio">
            Volver al Inicio
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PagoExitoso; 