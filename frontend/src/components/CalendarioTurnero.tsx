import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { format, isSameDay, addDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { es } from 'date-fns/locale';
import '../styles/CalendarioTurnero.css';

interface Reserva {
  _id: string;
  tipo: 'pesca_embarcada' | 'alojamiento_casa1' | 'alojamiento_casa2' | 'combo_pesca_casa1' | 'combo_pesca_casa2';
  turnoPesca?: '8:00-12:00' | '14:00-18:00';
  fechaPesca?: string;
  fechaEntrada?: string;
  fechaSalida?: string;
  cantidadPersonas: number;
  nombre: string;
  estado: 'pendiente' | 'confirmada' | 'cancelada';
}

interface CalendarioTurneroProps {
  tipo: 'pesca' | 'alojamiento' | 'combo';
  casa?: 'casa1' | 'casa2';
  onDateSelect: (date: Date) => void;
  selectedDate?: Date;
}

const CalendarioTurnero: React.FC<CalendarioTurneroProps> = ({
  tipo,
  casa,
  onDateSelect,
  selectedDate
}) => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const API_BASE = 'http://localhost:5000/turnero';

  useEffect(() => {
    cargarReservasMes();
  }, [tipo, casa, currentMonth]);

  const cargarReservasMes = async () => {
    setLoading(true);
    try {
      const inicioMes = startOfMonth(currentMonth);
      const finMes = endOfMonth(currentMonth);
      
      const params = new URLSearchParams({
        tipo: tipo,
        fecha: inicioMes.toISOString().split('T')[0]
      });
      
      if ((tipo === 'alojamiento' || tipo === 'combo') && casa) {
        params.append('casa', casa);
      }
      
      const response = await fetch(`${API_BASE}?${params}`);
      const data = await response.json();
      
      // Filtrar reservas del mes actual
      const reservasMes = data.filter((reserva: Reserva) => {
        if (tipo === 'pesca' && reserva.fechaPesca) {
          const fechaReserva = new Date(reserva.fechaPesca);
          return fechaReserva >= inicioMes && fechaReserva <= finMes && reserva.estado !== 'cancelada';
        } else if ((tipo === 'alojamiento' || tipo === 'combo') && reserva.fechaEntrada && reserva.fechaSalida) {
          const entrada = new Date(reserva.fechaEntrada);
          const salida = new Date(reserva.fechaSalida);
          return (
            (entrada >= inicioMes && entrada <= finMes) ||
            (salida >= inicioMes && salida <= finMes) ||
            (entrada <= inicioMes && salida >= finMes)
          ) && reserva.estado !== 'cancelada';
        }
        return false;
      });
      
      setReservas(reservasMes);
    } catch (error) {
      console.error('Error al cargar reservas:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDiasOcupados = (): Date[] => {
    const diasOcupados: Date[] = [];
    
    reservas.forEach(reserva => {
      if (tipo === 'pesca' && reserva.fechaPesca) {
        diasOcupados.push(new Date(reserva.fechaPesca));
      } else if ((tipo === 'alojamiento' || tipo === 'combo') && reserva.fechaEntrada && reserva.fechaSalida) {
        const entrada = new Date(reserva.fechaEntrada);
        const salida = new Date(reserva.fechaSalida);
        const dias = eachDayOfInterval({ start: entrada, end: salida });
        diasOcupados.push(...dias);
      }
    });
    
    return diasOcupados;
  };

  const getDisponibilidadDia = (date: Date): { disponible: boolean; info?: string } => {
    const diasOcupados = getDiasOcupados();
    const fecha = format(date, 'yyyy-MM-dd');
    
    if (tipo === 'pesca') {
      const reservasDia = reservas.filter(r => 
        r.fechaPesca && format(new Date(r.fechaPesca), 'yyyy-MM-dd') === fecha
      );
      
      const personasReservadas = reservasDia.reduce((sum, r) => sum + r.cantidadPersonas, 0);
      const disponible = personasReservadas < 6;
      
      return {
        disponible,
        info: disponible 
          ? `${6 - personasReservadas} lugares disponibles`
          : 'Completo'
      };
    } else {
      const ocupado = diasOcupados.some(dia => isSameDay(dia, date));
      return {
        disponible: !ocupado,
        info: ocupado ? 'Ocupado' : 'Disponible'
      };
    }
  };

  const tileClassName = ({ date }: { date: Date }) => {
    const disponibilidad = getDisponibilidadDia(date);
    const hoy = new Date();
    const esPasado = date < hoy;
    const esSeleccionado = selectedDate && isSameDay(date, selectedDate);
    
    let className = 'calendario-dia';
    
    if (esPasado) {
      className += ' dia-pasado';
    } else if (esSeleccionado) {
      className += ' dia-seleccionado';
    } else if (!disponibilidad.disponible) {
      className += ' dia-ocupado';
    } else {
      className += ' dia-disponible';
    }
    
    return className;
  };

  const tileContent = ({ date }: { date: Date }) => {
    const disponibilidad = getDisponibilidadDia(date);
    const hoy = new Date();
    const esPasado = date < hoy;
    
    if (esPasado) {
      return <div className="dia-indicador">❌</div>;
    }
    
    if (!disponibilidad.disponible) {
      return <div className="dia-indicador">🚫</div>;
    }
    
    return <div className="dia-indicador">✅</div>;
  };

  const handleDateChange = (value: any) => {
    if (value instanceof Date) {
      const hoy = new Date();
      if (value >= hoy) {
        onDateSelect(value);
      }
    }
  };

  const handleActiveStartDateChange = ({ activeStartDate }: { activeStartDate: Date | null }) => {
    if (activeStartDate) {
      setCurrentMonth(activeStartDate);
    }
  };

  const getTipoDisplay = () => {
    if (tipo === 'pesca') {
      return '🎣 Pesca Embarcada';
    } else if (tipo === 'alojamiento') {
      return casa === 'casa1' ? '🏠 Casa 1' : '🏠 Casa 2';
    } else {
      return casa === 'casa1' ? '🎣🏠 Combo Casa 1' : '🎣🏠 Combo Casa 2';
    }
  };

  return (
    <div className="calendario-turnero-container">
      <div className="calendario-header">
        <h3>📅 Calendario de Disponibilidad - {getTipoDisplay()}</h3>
        <div className="calendario-leyenda">
          <div className="leyenda-item">
            <span className="leyenda-color disponible"></span>
            <span>Disponible</span>
          </div>
          <div className="leyenda-item">
            <span className="leyenda-color ocupado"></span>
            <span>Ocupado</span>
          </div>
          <div className="leyenda-item">
            <span className="leyenda-color seleccionado"></span>
            <span>Seleccionado</span>
          </div>
          <div className="leyenda-item">
            <span className="leyenda-color pasado"></span>
            <span>Pasado</span>
          </div>
        </div>
      </div>
      
      <div className="calendario-wrapper">
        {loading && (
          <div className="calendario-loading">
            <div className="spinner"></div>
            <p>Cargando disponibilidad...</p>
          </div>
        )}
        
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileClassName={tileClassName}
          tileContent={tileContent}
          onActiveStartDateChange={handleActiveStartDateChange}
          locale="es"
          minDate={new Date()}
          maxDate={addDays(new Date(), 365)} // Máximo 1 año adelante
          className="calendario-personalizado"
        />
      </div>
      
      {selectedDate && (
        <div className="calendario-info">
          <h4>Información del día seleccionado:</h4>
          <p><strong>Fecha:</strong> {format(selectedDate, 'EEEE, d \'de\' MMMM \'de\' yyyy', { locale: es })}</p>
          <p><strong>Estado:</strong> {getDisponibilidadDia(selectedDate).info}</p>
        </div>
      )}
    </div>
  );
};

export default CalendarioTurnero; 