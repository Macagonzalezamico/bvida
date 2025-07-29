import React, { useState, useEffect } from 'react';
import CalendarioTurnero from '../components/CalendarioTurnero';
import '../styles/Turnero.css';

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

const Turnero: React.FC = () => {
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

  const API_BASE = 'http://localhost:5000/turnero';

  useEffect(() => {
    cargarReservas();
  }, []);

  useEffect(() => {
    if (fecha && tipoReserva) {
      verificarDisponibilidad();
    }
  }, [fecha, tipoReserva, casa]);

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
      
      if (tipoReserva === 'alojamiento' || tipoReserva === 'combo') {
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
    if (tipoReserva === 'pesca') {
      return cantidadPersonas * 15000; // $15,000 por persona
    } else if (tipoReserva === 'alojamiento') {
      const entrada = new Date(fechaEntrada);
      const salida = new Date(fechaSalida);
      const dias = Math.ceil((salida.getTime() - entrada.getTime()) / (1000 * 60 * 60 * 24));
      return dias * 25000; // $25,000 por día
    } else if (tipoReserva === 'combo') {
      const entrada = new Date(fechaEntrada);
      const salida = new Date(fechaSalida);
      const dias = Math.ceil((salida.getTime() - entrada.getTime()) / (1000 * 60 * 60 * 24));
      const montoPesca = cantidadPersonas * 15000; // $15,000 por persona
      const montoAlojamiento = dias * 25000; // $25,000 por día
      return montoPesca + montoAlojamiento;
    }
    return 0;
  };

  const getTipoDisplay = (tipo: string) => {
    switch (tipo) {
      case 'pesca_embarcada':
        return '🎣 Pesca Embarcada';
      case 'alojamiento_casa1':
        return '🏠 Casa 1';
      case 'alojamiento_casa2':
        return '🏠 Casa 2';
      case 'combo_pesca_casa1':
        return '🎣🏠 Combo Pesca + Casa 1';
      case 'combo_pesca_casa2':
        return '🎣🏠 Combo Pesca + Casa 2';
      default:
        return tipo;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const monto = calcularMonto();
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
        monto,
        observaciones
      };

      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservaData),
      });

      if (response.ok) {
        const nuevaReserva = await response.json();
        setSuccess('¡Reserva creada exitosamente!');
        setReservas([...reservas, nuevaReserva]);
        limpiarFormulario();
        verificarDisponibilidad();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Error al crear la reserva');
      }
    } catch (error) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const limpiarFormulario = () => {
    setNombre('');
    setEmail('');
    setTelefono('');
    setObservaciones('');
    setCantidadPersonas(1);
  };

  const cancelarReserva = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
      try {
        const response = await fetch(`${API_BASE}/${id}/cancelar`, {
          method: 'PUT',
        });
        
        if (response.ok) {
          setReservas(reservas.map(r => 
            r._id === id ? { ...r, estado: 'cancelada' } : r
          ));
          setSuccess('Reserva cancelada exitosamente');
          verificarDisponibilidad();
        }
      } catch (error) {
        setError('Error al cancelar la reserva');
      }
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
    if (tipoReserva === 'pesca' || tipoReserva === 'combo') {
      setFecha(date.toISOString().split('T')[0]);
    }
  };

  return (
    <div className="turnero-container">
      <div className="turnero-header">
        <h1>🏖️ Sistema de Turnero - BuenaVida</h1>
        <p>Reserva tu salida de pesca embarcada, alojamiento o combo completo</p>
      </div>

      <div className="turnero-content">
        {/* Formulario de Reserva */}
        <div className="formulario-reserva">
          <h2>📝 Nueva Reserva</h2>
          
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={handleSubmit}>
            {/* Tipo de Reserva */}
            <div className="form-group">
              <label>Tipo de Reserva:</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    value="pesca"
                    checked={tipoReserva === 'pesca'}
                    onChange={(e) => setTipoReserva(e.target.value as 'pesca' | 'alojamiento' | 'combo')}
                  />
                  🎣 Pesca Embarcada
                </label>
                <label>
                  <input
                    type="radio"
                    value="alojamiento"
                    checked={tipoReserva === 'alojamiento'}
                    onChange={(e) => setTipoReserva(e.target.value as 'pesca' | 'alojamiento' | 'combo')}
                  />
                  🏠 Alojamiento en Casa
                </label>
                <label>
                  <input
                    type="radio"
                    value="combo"
                    checked={tipoReserva === 'combo'}
                    onChange={(e) => setTipoReserva(e.target.value as 'pesca' | 'alojamiento' | 'combo')}
                  />
                  🎣🏠 Combo Pesca + Alojamiento
                </label>
              </div>
            </div>

            {/* Casa (para alojamiento y combo) */}
            {(tipoReserva === 'alojamiento' || tipoReserva === 'combo') && (
              <div className="form-group">
                <label>Casa:</label>
                <select value={casa} onChange={(e) => setCasa(e.target.value as 'casa1' | 'casa2')}>
                  <option value="casa1">🏠 Casa 1</option>
                  <option value="casa2">🏠 Casa 2</option>
                </select>
              </div>
            )}

            {/* Turno (para pesca y combo) */}
            {(tipoReserva === 'pesca' || tipoReserva === 'combo') && (
              <div className="form-group">
                <label>Turno de Pesca Embarcada:</label>
                <select value={turno} onChange={(e) => setTurno(e.target.value as '8:00-12:00' | '14:00-18:00')}>
                  <option value="8:00-12:00">🌅 8:00 - 12:00 (Mañana)</option>
                  <option value="14:00-18:00">🌇 14:00 - 18:00 (Tarde)</option>
                </select>
              </div>
            )}

            {/* Fechas */}
            <div className="form-group">
              {tipoReserva === 'pesca' ? (
                <label>Fecha de Pesca Embarcada:</label>
              ) : tipoReserva === 'alojamiento' ? (
                <label>Fechas de Alojamiento:</label>
              ) : (
                <label>Fechas del Combo:</label>
              )}
              
              {tipoReserva === 'pesca' ? (
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              ) : tipoReserva === 'alojamiento' ? (
                <div className="fechas-alojamiento">
                  <div>
                    <label>Entrada:</label>
                    <input
                      type="date"
                      value={fechaEntrada}
                      onChange={(e) => setFechaEntrada(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div>
                    <label>Salida:</label>
                    <input
                      type="date"
                      value={fechaSalida}
                      onChange={(e) => setFechaSalida(e.target.value)}
                      min={fechaEntrada || new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                </div>
              ) : (
                <div className="fechas-combo">
                  <div>
                    <label>Fecha de Pesca:</label>
                    <input
                      type="date"
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div>
                    <label>Entrada alojamiento:</label>
                    <input
                      type="date"
                      value={fechaEntrada}
                      onChange={(e) => setFechaEntrada(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div>
                    <label>Salida alojamiento:</label>
                    <input
                      type="date"
                      value={fechaSalida}
                      onChange={(e) => setFechaSalida(e.target.value)}
                      min={fechaEntrada || new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Cantidad de Personas */}
            <div className="form-group">
              <label>Cantidad de Personas:</label>
              <input
                type="number"
                value={cantidadPersonas}
                onChange={(e) => setCantidadPersonas(parseInt(e.target.value))}
                min="1"
                max={tipoReserva === 'pesca' ? 6 : 8}
                required
              />
              <small>Máximo {tipoReserva === 'pesca' ? 6 : 8} personas</small>
            </div>

            {/* Información Personal */}
            <div className="form-group">
              <label>Nombre Completo:</label>
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
            <div className="precio-info">
              <h3>💰 Precio Total: {formatearPrecio(calcularMonto())}</h3>
              {tipoReserva === 'combo' && (
                <div className="precio-desglose">
                  <p>Desglose:</p>
                  <p>• Pesca: {formatearPrecio(cantidadPersonas * 15000)}</p>
                  <p>• Alojamiento: {formatearPrecio(fechaEntrada && fechaSalida ? 
                    Math.ceil((new Date(fechaSalida).getTime() - new Date(fechaEntrada).getTime()) / (1000 * 60 * 60 * 24)) * 25000 : 0)}</p>
                </div>
              )}
            </div>

            <button type="submit" disabled={loading} className="btn-reservar">
              {loading ? 'Creando Reserva...' : '📅 Crear Reserva'}
            </button>
          </form>
        </div>

        {/* Calendario y Disponibilidad */}
        <div className="disponibilidad-section">
          <h2>📅 Calendario de Disponibilidad</h2>
          
          <CalendarioTurnero
            tipo={tipoReserva}
            casa={(tipoReserva === 'alojamiento' || tipoReserva === 'combo') ? casa : undefined}
            onDateSelect={handleDateSelect}
            selectedDate={selectedDate}
          />
          
          <h3>📊 Detalles de Disponibilidad</h3>
          
          {tipoReserva === 'pesca' && fecha && (
            <div className="disponibilidad-pesca">
              <h3>Turnos de Pesca Embarcada para {formatearFecha(fecha)}:</h3>
              {Object.entries(disponibilidad as DisponibilidadPesca).map(([turno, info]) => (
                <div key={turno} className={`turno-info ${info.disponible ? 'disponible' : 'no-disponible'}`}>
                  <h4>🎣 {turno}</h4>
                  <p>Estado: {info.disponible ? '✅ Disponible' : '❌ Completo'}</p>
                  <p>Personas reservadas: {info.personasReservadas || 0}/6</p>
                  <p>Capacidad restante: {info.capacidadRestante || 0} personas</p>
                </div>
              ))}
            </div>
          )}

          {tipoReserva === 'alojamiento' && fechaEntrada && fechaSalida && (
            <div className="disponibilidad-alojamiento">
              <h3>Disponibilidad para {casa === 'casa1' ? '🏠 Casa 1' : '🏠 Casa 2'}:</h3>
              <div className={`casa-info ${(disponibilidad as DisponibilidadAlojamiento).disponible ? 'disponible' : 'no-disponible'}`}>
                <p>Estado: {(disponibilidad as DisponibilidadAlojamiento).disponible ? '✅ Disponible' : '❌ Ocupada'}</p>
                {(disponibilidad as DisponibilidadAlojamiento).reservas && (disponibilidad as DisponibilidadAlojamiento).reservas!.length > 0 && (
                  <div>
                    <p>Reservas existentes:</p>
                    <ul>
                      {(disponibilidad as DisponibilidadAlojamiento).reservas!.map((reserva: Reserva, index: number) => (
                        <li key={index}>
                          {formatearFecha(reserva.fechaEntrada!)} - {formatearFecha(reserva.fechaSalida!)} 
                          ({reserva.nombre})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {tipoReserva === 'combo' && fecha && fechaEntrada && fechaSalida && (
            <div className="disponibilidad-combo">
              <h3>Disponibilidad del Combo para {casa === 'casa1' ? '🏠 Casa 1' : '🏠 Casa 2'}:</h3>
              
              {/* Disponibilidad de Alojamiento */}
              <div className="combo-alojamiento">
                <h4>🏠 Alojamiento:</h4>
                <div className={`casa-info ${(disponibilidad as DisponibilidadCombo).alojamiento.disponible ? 'disponible' : 'no-disponible'}`}>
                  <p>Estado: {(disponibilidad as DisponibilidadCombo).alojamiento.disponible ? '✅ Disponible' : '❌ Ocupada'}</p>
                </div>
              </div>

              {/* Disponibilidad de Pesca */}
              <div className="combo-pesca">
                <h4>🎣 Pesca Embarcada para {formatearFecha(fecha)}:</h4>
                {Object.entries((disponibilidad as DisponibilidadCombo).pesca).map(([turno, info]) => (
                  <div key={turno} className={`turno-info ${info.disponible ? 'disponible' : 'no-disponible'}`}>
                    <h5>🎣 {turno}</h5>
                    <p>Estado: {info.disponible ? '✅ Disponible' : '❌ Completo'}</p>
                    <p>Personas reservadas: {info.personasReservadas || 0}/6</p>
                    <p>Capacidad restante: {info.capacidadRestante || 0} personas</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Lista de Reservas */}
        <div className="reservas-section">
          <h2>📋 Mis Reservas</h2>
          <div className="reservas-list">
            {reservas.length === 0 ? (
              <p>No hay reservas registradas</p>
            ) : (
              reservas.map((reserva) => (
                <div key={reserva._id} className={`reserva-card ${reserva.estado}`}>
                  <div className="reserva-header">
                    <h3>
                      {getTipoDisplay(reserva.tipo)}
                    </h3>
                    <span className={`estado ${reserva.estado}`}>
                      {reserva.estado === 'pendiente' ? '⏳ Pendiente' : 
                       reserva.estado === 'confirmada' ? '✅ Confirmada' : '❌ Cancelada'}
                    </span>
                  </div>
                  
                  <div className="reserva-details">
                    <p><strong>Cliente:</strong> {reserva.nombre}</p>
                    <p><strong>Email:</strong> {reserva.email}</p>
                    <p><strong>Teléfono:</strong> {reserva.telefono}</p>
                    <p><strong>Personas:</strong> {reserva.cantidadPersonas}</p>
                    
                    {reserva.tipo === 'pesca_embarcada' ? (
                      <>
                        <p><strong>Fecha:</strong> {formatearFecha(reserva.fechaPesca!)}</p>
                        <p><strong>Turno:</strong> {reserva.turnoPesca}</p>
                      </>
                    ) : reserva.tipo.startsWith('alojamiento_') ? (
                      <>
                        <p><strong>Entrada:</strong> {formatearFecha(reserva.fechaEntrada!)}</p>
                        <p><strong>Salida:</strong> {formatearFecha(reserva.fechaSalida!)}</p>
                      </>
                    ) : (
                      <>
                        <p><strong>Fecha Pesca:</strong> {formatearFecha(reserva.fechaPesca!)}</p>
                        <p><strong>Turno Pesca:</strong> {reserva.turnoPesca}</p>
                        <p><strong>Entrada:</strong> {formatearFecha(reserva.fechaEntrada!)}</p>
                        <p><strong>Salida:</strong> {formatearFecha(reserva.fechaSalida!)}</p>
                      </>
                    )}
                    
                    <p><strong>Precio:</strong> {formatearPrecio(reserva.monto)}</p>
                    {reserva.observaciones && (
                      <p><strong>Observaciones:</strong> {reserva.observaciones}</p>
                    )}
                  </div>
                  
                  {reserva.estado !== 'cancelada' && (
                    <div className="reserva-actions">
                      <button 
                        onClick={() => cancelarReserva(reserva._id)}
                        className="btn-cancelar"
                      >
                        ❌ Cancelar
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Turnero; 