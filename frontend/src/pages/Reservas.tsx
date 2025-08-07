import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CalendarioTurnero from '../components/CalendarioTurnero';
import '../styles/Reservas.css';

interface Reserva {
  _id: string;
  tipo: 'pesca_embarcada' | 'alojamiento_casa1' | 'alojamiento_casa2' | 'combo_pesca_casa1' | 'combo_pesca_casa2';
  turnoPesca?: '8:00-12:00' | '14:00-18:00';
  fechaPesca?: string;
  fechaEntrada?: string;
  fechaSalida?: string;
  cantidadPersonas: number;
  nombre: string;
  email: string;
  telefono: string;
  estado: 'pendiente' | 'confirmada' | 'cancelada';
  monto: number;
  observaciones?: string;
}

interface DisponibilidadPesca {
  [key: string]: {
    disponible: boolean;
    personasReservadas?: number;
    capacidadRestante?: number;
    reservas?: Reserva[];
  };
}

interface DisponibilidadAlojamiento {
  disponible: boolean;
  reservas?: Reserva[];
}

interface DisponibilidadCombo {
  alojamiento: {
    disponible: boolean;
    reservas?: Reserva[];
  };
  pesca: {
    [key: string]: {
      disponible: boolean;
      personasReservadas?: number;
      capacidadRestante?: number;
      reservas?: Reserva[];
    };
  };
}

type Disponibilidad = DisponibilidadPesca | DisponibilidadAlojamiento | DisponibilidadCombo;

const Reservas: React.FC = () => {
  const [tipoReserva, setTipoReserva] = useState<'pesca' | 'alojamiento' | 'combo'>('pesca');
  const [casa, setCasa] = useState<'casa1' | 'casa2'>('casa1');
  const [turno, setTurno] = useState<'8:00-12:00' | '14:00-18:00'>('8:00-12:00');
  const [fecha, setFecha] = useState('');
  const [fechaEntrada, setFechaEntrada] = useState('');
  const [fechaSalida, setFechaSalida] = useState('');
  const [cantidadPersonas, setCantidadPersonas] = useState(1);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [disponibilidad, setDisponibilidad] = useState<Disponibilidad>({});
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [calendarRefreshTrigger, setCalendarRefreshTrigger] = useState(0);
  const [reservaCreada, setReservaCreada] = useState<Reserva | null>(null);
  const [mostrarPago, setMostrarPago] = useState(false);
  const [verificandoPago, setVerificandoPago] = useState(false);

  const API_BASE = 'http://localhost:5000/turnero';

  useEffect(() => {
    cargarReservas();
  }, []);

  useEffect(() => {
    if (fecha && tipoReserva) {
      verificarDisponibilidad();
    }
  }, [fecha, tipoReserva, casa]);

  // Verificar estado de reserva pendiente cada 10 segundos
  useEffect(() => {
    if (reservaCreada && reservaCreada.estado === 'pendiente') {
      const interval = setInterval(() => {
        verificarEstadoReserva();
      }, 10000); // Verificar cada 10 segundos

      return () => clearInterval(interval);
    }
  }, [reservaCreada]);

  const cargarReservas = async () => {
    try {
      const response = await fetch(`${API_BASE}?tipo=${tipoReserva}`);
      const data = await response.json();
      setReservas(data);
    } catch (error) {
      console.error('Error al cargar reservas:', error);
    }
  };

  const verificarDisponibilidad = async () => {
    try {
      const params = new URLSearchParams({
        tipo: tipoReserva,
        fecha: fecha
      });
      
      if ((tipoReserva === 'alojamiento' || tipoReserva === 'combo') && casa) {
        params.append('casa', casa);
      }
      
      const response = await fetch(`${API_BASE}/disponibilidad?${params}`);
      const data = await response.json();
      setDisponibilidad(data);
    } catch (error) {
      console.error('Error al verificar disponibilidad:', error);
    }
  };

  const calcularMonto = () => {
    // Para pruebas: $1 por persona
    return cantidadPersonas * 1;
    
    // Código original para producción:
    /*
    if (tipoReserva === 'pesca') {
      return 15000 * cantidadPersonas;
    } else if (tipoReserva === 'alojamiento') {
      return 25000 * cantidadPersonas;
    } else if (tipoReserva === 'combo') {
      return (15000 + 25000 - 5000) * cantidadPersonas; // Descuento de combo
    }
    return 0;
    */
  };

  const getTipoDisplay = (tipo: string) => {
    switch (tipo) {
      case 'pesca_embarcada': return '🎣 Pesca Embarcada';
      case 'alojamiento_casa1': return '🏠 Casa 1';
      case 'alojamiento_casa2': return '🏠 Casa 2';
      case 'combo_pesca_casa1': return '🎣🏠 Combo Casa 1';
      case 'combo_pesca_casa2': return '🎣🏠 Combo Casa 2';
      default: return tipo;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let tipoEspecifico = '';
      if (tipoReserva === 'pesca') {
        tipoEspecifico = 'pesca_embarcada';
      } else if (tipoReserva === 'alojamiento') {
        tipoEspecifico = casa === 'casa1' ? 'alojamiento_casa1' : 'alojamiento_casa2';
      } else if (tipoReserva === 'combo') {
        tipoEspecifico = casa === 'casa1' ? 'combo_pesca_casa1' : 'combo_pesca_casa2';
      }

      const reservaData = {
        tipo: tipoReserva,
        casa: (tipoReserva === 'alojamiento' || tipoReserva === 'combo') ? casa : undefined,
        turno: (tipoReserva === 'pesca' || tipoReserva === 'combo') ? turno : undefined,
        fecha: (tipoReserva === 'pesca' || tipoReserva === 'combo') ? fecha : undefined,
        fechaEntrada: (tipoReserva === 'alojamiento' || tipoReserva === 'combo') ? fechaEntrada : undefined,
        fechaSalida: (tipoReserva === 'alojamiento' || tipoReserva === 'combo') ? fechaSalida : undefined,
        cantidadPersonas,
        nombre,
        email,
        telefono,
        observaciones,
        monto: calcularMonto()
      };

      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservaData),
      });

      if (response.ok) {
        const reservaData = await response.json();
        setReservaCreada(reservaData);
        setSuccess('¡Reserva creada exitosamente! La reserva está pendiente de pago. Completa el pago para confirmarla.');
        setMostrarPago(true);
        cargarReservas();
        setCalendarRefreshTrigger(prev => prev + 1); // Forzar actualización del calendario
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al crear la reserva');
      }
    } catch (error) {
      setError('Error de conexión. Por favor, verifica tu conexión e intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const limpiarFormulario = () => {
    setFecha('');
    setFechaEntrada('');
    setFechaSalida('');
    setCantidadPersonas(1);
    setNombre('');
    setEmail('');
    setTelefono('');
    setObservaciones('');
    setSelectedDate(undefined);
    setReservaCreada(null);
    setMostrarPago(false);
  };

  const crearPreferenciaPago = async () => {
    if (!reservaCreada) return;
    
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/pagos/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          descripcion: `Reserva ${getTipoDisplay(reservaCreada.tipo)} - ${reservaCreada.nombre}`,
          monto: reservaCreada.monto,
          reservaId: reservaCreada._id
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Redirigir a MercadoPago
        window.location.href = data.init_point;
      } else {
        setError('Error al crear la preferencia de pago');
      }
    } catch (error) {
      setError('Error de conexión al procesar el pago');
    } finally {
      setLoading(false);
    }
  };

  const verificarEstadoReserva = async () => {
    if (!reservaCreada) return;
    
    try {
      setVerificandoPago(true);
      const response = await fetch(`${API_BASE}/${reservaCreada._id}`);
      
      if (response.ok) {
        const reservaActualizada = await response.json();
        
        if (reservaActualizada.estado === 'confirmada') {
          setSuccess('¡Pago confirmado! Tu reserva ha sido confirmada exitosamente. Revisa tu email para más detalles.');
          setReservaCreada(reservaActualizada);
          cargarReservas();
          setCalendarRefreshTrigger(prev => prev + 1);
          
          // Limpiar después de 5 segundos
          setTimeout(() => {
            limpiarFormulario();
          }, 5000);
        }
      }
    } catch (error) {
      console.error('Error al verificar estado de reserva:', error);
    } finally {
      setVerificandoPago(false);
    }
  };

  const cancelarReserva = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setSuccess('Reserva cancelada exitosamente');
        cargarReservas();
      } else {
        setError('Error al cancelar la reserva');
      }
    } catch (error) {
      setError('Error de conexión');
    }
  };

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES');
  };

  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(precio);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const fechaFormateada = date.toISOString().split('T')[0];
    
    if (tipoReserva === 'pesca') {
      setFecha(fechaFormateada);
    } else if (tipoReserva === 'alojamiento') {
      setFechaEntrada(fechaFormateada);
    }
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
        {/* Información de Reservas - Ocupa todo el ancho arriba */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="reserva-box info-section-full"
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

        {/* Formulario y Calendario - Lado a lado abajo */}
        <div className="formulario-calendario-container">
          {/* Columna Izquierda: Formulario */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="reserva-box"
          >
            <h2>📝 Nueva Reserva</h2>
            
              {/* Tipo de Reserva */}
              <div className="tipo-reserva-section">
                <h3>Tipo de Reserva:</h3>
                <div className="opciones-reserva">
                  <div 
                    className={`opcion-reserva ${tipoReserva === 'pesca' ? 'seleccionada' : ''}`}
                    onClick={() => setTipoReserva('pesca')}
                  >
                    <div className="opcion-icono">🎣</div>
                    <div className="opcion-contenido">
                      <h4>Pesca Embarcada</h4>
                    </div>
                    <div className="opcion-check">✓</div>
                  </div>
                  
                  <div 
                    className={`opcion-reserva ${tipoReserva === 'alojamiento' ? 'seleccionada' : ''}`}
                    onClick={() => setTipoReserva('alojamiento')}
                  >
                    <div className="opcion-icono">🏠</div>
                    <div className="opcion-contenido">
                      <h4>Alojamiento en Casa</h4>
                    </div>
                    <div className="opcion-check">✓</div>
                  </div>
                  
                  <div 
                    className={`opcion-reserva ${tipoReserva === 'combo' ? 'seleccionada' : ''}`}
                    onClick={() => setTipoReserva('combo')}
                  >
                    <div className="opcion-icono">🎣🏠</div>
                    <div className="opcion-contenido">
                      <h4>Combo Pesca + Alojamiento</h4>
                    </div>
                    <div className="opcion-check">✓</div>
                  </div>
                </div>
              </div>

              {/* Casa (solo para alojamiento y combo) */}
              {(tipoReserva === 'alojamiento' || tipoReserva === 'combo') && (
                <div className="form-group">
                  <label>Casa:</label>
                  <div className="casa-options">
                    <button
                      type="button"
                      className={`casa-btn ${casa === 'casa1' ? 'active' : ''}`}
                      onClick={() => setCasa('casa1')}
                    >
                      Casa 1
                    </button>
                    <button
                      type="button"
                      className={`casa-btn ${casa === 'casa2' ? 'active' : ''}`}
                      onClick={() => setCasa('casa2')}
                    >
                      Casa 2
                    </button>
                  </div>
                </div>
              )}

              {/* Turno (solo para pesca y combo) */}
              {(tipoReserva === 'pesca' || tipoReserva === 'combo') && (
                <div className="form-group">
                  <label>Turno:</label>
                  <div className="turno-options">
                    <button
                      type="button"
                      className={`turno-btn ${turno === '8:00-12:00' ? 'active' : ''}`}
                      onClick={() => setTurno('8:00-12:00')}
                    >
                      8:00 - 12:00
                    </button>
                    <button
                      type="button"
                      className={`turno-btn ${turno === '14:00-18:00' ? 'active' : ''}`}
                      onClick={() => setTurno('14:00-18:00')}
                    >
                      14:00 - 18:00
                    </button>
                  </div>
                </div>
              )}

              {/* Fechas del Combo */}
              {tipoReserva === 'combo' && (
                <div className="combo-fechas">
                  <h4>Fechas del Combo</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Fecha de Pesca:</label>
                      <input
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Entrada Alojamiento:</label>
                      <input
                        type="date"
                        value={fechaEntrada}
                        onChange={(e) => setFechaEntrada(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Salida Alojamiento:</label>
                      <input
                        type="date"
                        value={fechaSalida}
                        onChange={(e) => setFechaSalida(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Fecha única para pesca o alojamiento */}
              {tipoReserva !== 'combo' && (
                <div className="form-group">
                  <label>
                    {tipoReserva === 'pesca' ? 'Fecha de Pesca:' : 'Fecha de Entrada:'}
                  </label>
                  <input
                    type="date"
                    value={tipoReserva === 'pesca' ? fecha : fechaEntrada}
                    onChange={(e) => {
                      if (tipoReserva === 'pesca') {
                        setFecha(e.target.value);
                      } else {
                        setFechaEntrada(e.target.value);
                      }
                    }}
                    required
                  />
                </div>
              )}

              {/* Fecha de salida para alojamiento */}
              {tipoReserva === 'alojamiento' && (
                <div className="form-group">
                  <label>Fecha de Salida:</label>
                  <input
                    type="date"
                    value={fechaSalida}
                    onChange={(e) => setFechaSalida(e.target.value)}
                    required
                  />
                </div>
              )}

              {/* Cantidad de personas */}
              <div className="form-group">
                <label>Cantidad de Personas:</label>
                <input
                  type="number"
                  min="1"
                  max={tipoReserva === 'pesca' ? 6 : 8}
                  value={cantidadPersonas}
                  onChange={(e) => setCantidadPersonas(parseInt(e.target.value))}
                  required
                />
              </div>

              {/* Información personal */}
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Teléfono:</label>
                <input
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Observaciones:</label>
                <textarea
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Precio */}
              <div className="precio-section">
                <h3>Precio Total: {formatearPrecio(calcularMonto())}</h3>
                {tipoReserva === 'combo' && (
                  <div className="precio-desglose">
                    <p>Desglose:</p>
                    <ul>
                      <li>Pesca Embarcada: {formatearPrecio(15000 * cantidadPersonas)}</li>
                      <li>Alojamiento: {formatearPrecio(25000 * cantidadPersonas)}</li>
                      <li>Descuento Combo: -{formatearPrecio(5000 * cantidadPersonas)}</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Botón de envío */}
              {!mostrarPago ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="btn-reservar"
                >
                  {loading ? 'Enviando...' : 'Reservar'}
                </button>
              ) : (
                <div className="pago-section">
                  <div className="reserva-info-pago">
                    <h4>🔄 Reserva Pendiente de Pago</h4>
                    <p><strong>ID:</strong> {reservaCreada?._id}</p>
                    <p><strong>Estado:</strong> <span className="estado-pendiente">Pendiente</span></p>
                    <p><strong>Monto:</strong> {formatearPrecio(reservaCreada?.monto || 0)}</p>
                    <p><strong>Nota:</strong> La reserva se confirmará automáticamente al completar el pago</p>
                  </div>
                  <button
                    type="button"
                    onClick={crearPreferenciaPago}
                    disabled={loading}
                    className="btn-pagar"
                  >
                    {loading ? 'Procesando...' : '💳 Pagar con MercadoPago'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      // Simular pago exitoso para desarrollo
                      setSuccess('¡Pago simulado exitosamente! (Modo desarrollo)');
                      setReservaCreada(prev => prev ? {...prev, estado: 'confirmada', pagado: true} : null);
                      cargarReservas();
                      setCalendarRefreshTrigger(prev => prev + 1);
                    }}
                    className="btn-pagar-simulado"
                  >
                    🧪 Simular Pago (Desarrollo)
                  </button>
                  <button
                    type="button"
                    onClick={verificarEstadoReserva}
                    disabled={verificandoPago}
                    className="btn-verificar"
                  >
                    {verificandoPago ? 'Verificando...' : '🔄 Verificar Estado del Pago'}
                  </button>
                  <button
                    type="button"
                    onClick={limpiarFormulario}
                    className="btn-nueva-reserva"
                  >
                    Nueva Reserva
                  </button>
                </div>
              )}

              {/* Mensajes de estado */}
              {error && <div className="error-message">{error}</div>}
              {success && <div className="success-message">{success}</div>}
            </motion.div>

          {/* Columna Derecha: Calendario */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="reserva-box"
          >
            <CalendarioTurnero
              tipo={tipoReserva}
              casa={casa}
              onDateSelect={handleDateSelect}
              selectedDate={selectedDate}
              refreshTrigger={calendarRefreshTrigger}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Reservas; 