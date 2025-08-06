const express = require('express');
const router = express.Router();
const Reserva = require('../models/Reserva');
const { enviarEmailConfirmacionReserva } = require('../config/email');

// Obtener todas las reservas
router.get('/', async (req, res) => {
  try {
    const { tipo, fecha, casa } = req.query;
    let filter = {};
    
    if (tipo) {
      if (tipo === 'pesca') {
        filter.tipo = 'pesca_embarcada';
      } else if (tipo === 'alojamiento') {
        if (casa === 'casa1') {
          filter.tipo = 'alojamiento_casa1';
        } else if (casa === 'casa2') {
          filter.tipo = 'alojamiento_casa2';
        } else {
          filter.tipo = { $in: ['alojamiento_casa1', 'alojamiento_casa2'] };
        }
      } else if (tipo === 'combo') {
        if (casa === 'casa1') {
          filter.tipo = 'combo_pesca_casa1';
        } else if (casa === 'casa2') {
          filter.tipo = 'combo_pesca_casa2';
        } else {
          filter.tipo = { $in: ['combo_pesca_casa1', 'combo_pesca_casa2'] };
        }
      }
    }
    
    if (fecha) {
      const fechaInicio = new Date(fecha);
      fechaInicio.setHours(0, 0, 0, 0);
      const fechaFin = new Date(fecha);
      fechaFin.setHours(23, 59, 59, 999);
      
      if (tipo === 'pesca') {
        filter.fechaPesca = { $gte: fechaInicio, $lte: fechaFin };
      } else if (tipo === 'alojamiento' || tipo === 'combo') {
        filter.$or = [
          { fechaEntrada: { $lte: fechaFin, $gte: fechaInicio } },
          { fechaSalida: { $gte: fechaInicio, $lte: fechaFin } },
          { $and: [{ fechaEntrada: { $lte: fechaInicio } }, { fechaSalida: { $gte: fechaFin } }] }
        ];
      }
    }
    
    const reservas = await Reserva.find(filter).sort({ createdAt: -1 });
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener disponibilidad para una fecha específica
router.get('/disponibilidad', async (req, res) => {
  try {
    const { tipo, fecha, casa } = req.query;
    
    if (!tipo || !fecha) {
      return res.status(400).json({ error: 'Tipo y fecha son requeridos' });
    }
    
    const fechaConsulta = new Date(fecha);
    fechaConsulta.setHours(0, 0, 0, 0);
    const fechaFin = new Date(fecha);
    fechaFin.setHours(23, 59, 59, 999);
    
    let reservas;
    let disponibilidad = {};
    
    if (tipo === 'pesca') {
      // Verificar disponibilidad de turnos de pesca embarcada
      reservas = await Reserva.find({
        tipo: 'pesca_embarcada',
        fechaPesca: { $gte: fechaConsulta, $lte: fechaFin },
        estado: { $ne: 'cancelada' }
      });
      
      const turnos = ['8:00-12:00', '14:00-18:00'];
      turnos.forEach(turno => {
        const reservasTurno = reservas.filter(r => r.turnoPesca === turno);
        const personasReservadas = reservasTurno.reduce((sum, r) => sum + r.cantidadPersonas, 0);
        disponibilidad[turno] = {
          disponible: personasReservadas < 6,
          personasReservadas,
          capacidadRestante: Math.max(0, 6 - personasReservadas),
          reservas: reservasTurno
        };
      });
    } else if (tipo === 'alojamiento') {
      // Verificar disponibilidad de alojamiento
      if (!casa) {
        return res.status(400).json({ error: 'Casa es requerida para alojamiento' });
      }
      
      const tipoCasa = casa === 'casa1' ? 'alojamiento_casa1' : 'alojamiento_casa2';
      
      reservas = await Reserva.find({
        tipo: tipoCasa,
        estado: { $ne: 'cancelada' },
        $or: [
          { fechaEntrada: { $lte: fechaFin, $gte: fechaConsulta } },
          { fechaSalida: { $gte: fechaConsulta, $lte: fechaFin } },
          { $and: [{ fechaEntrada: { $lte: fechaConsulta } }, { fechaSalida: { $gte: fechaFin } }] }
        ]
      });
      
      disponibilidad = {
        disponible: reservas.length === 0,
        reservas: reservas
      };
    } else if (tipo === 'combo') {
      // Verificar disponibilidad de combo (pesca + alojamiento)
      if (!casa) {
        return res.status(400).json({ error: 'Casa es requerida para combo' });
      }
      
      const tipoCombo = casa === 'casa1' ? 'combo_pesca_casa1' : 'combo_pesca_casa2';
      
      // Verificar disponibilidad de alojamiento para combo
      const reservasAlojamiento = await Reserva.find({
        tipo: tipoCombo,
        estado: { $ne: 'cancelada' },
        $or: [
          { fechaEntrada: { $lte: fechaFin, $gte: fechaConsulta } },
          { fechaSalida: { $gte: fechaConsulta, $lte: fechaFin } },
          { $and: [{ fechaEntrada: { $lte: fechaConsulta } }, { fechaSalida: { $gte: fechaFin } }] }
        ]
      });
      
      // Verificar disponibilidad de pesca para combo
      const reservasPesca = await Reserva.find({
        tipo: tipoCombo,
        fechaPesca: { $gte: fechaConsulta, $lte: fechaFin },
        estado: { $ne: 'cancelada' }
      });
      
      const turnos = ['8:00-12:00', '14:00-18:00'];
      const disponibilidadTurnos = {};
      
      turnos.forEach(turno => {
        const reservasTurno = reservasPesca.filter(r => r.turnoPesca === turno);
        const personasReservadas = reservasTurno.reduce((sum, r) => sum + r.cantidadPersonas, 0);
        disponibilidadTurnos[turno] = {
          disponible: personasReservadas < 6,
          personasReservadas,
          capacidadRestante: Math.max(0, 6 - personasReservadas),
          reservas: reservasTurno
        };
      });
      
      disponibilidad = {
        alojamiento: {
          disponible: reservasAlojamiento.length === 0,
          reservas: reservasAlojamiento
        },
        pesca: disponibilidadTurnos
      };
    }
    
    res.json(disponibilidad);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear una nueva reserva
router.post('/', async (req, res) => {
  try {
    const {
      tipo,
      casa,
      turno,
      fecha,
      fechaEntrada,
      fechaSalida,
      cantidadPersonas,
      nombre,
      email,
      telefono,
      monto,
      observaciones
    } = req.body;
    
    // Validaciones básicas
    if (!tipo || !cantidadPersonas || !nombre || !email || !telefono || !monto) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }
    
    // Determinar el tipo específico de reserva
    let tipoReserva;
    if (tipo === 'pesca') {
      tipoReserva = 'pesca_embarcada';
    } else if (tipo === 'alojamiento') {
      if (casa === 'casa1') {
        tipoReserva = 'alojamiento_casa1';
      } else if (casa === 'casa2') {
        tipoReserva = 'alojamiento_casa2';
      } else {
        return res.status(400).json({ error: 'Casa debe ser casa1 o casa2' });
      }
    } else if (tipo === 'combo') {
      if (casa === 'casa1') {
        tipoReserva = 'combo_pesca_casa1';
      } else if (casa === 'casa2') {
        tipoReserva = 'combo_pesca_casa2';
      } else {
        return res.status(400).json({ error: 'Casa debe ser casa1 o casa2 para combo' });
      }
    } else {
      return res.status(400).json({ error: 'Tipo debe ser pesca, alojamiento o combo' });
    }
    
    // Validar disponibilidad antes de crear la reserva
    let conflicto = false;
    
    if (tipo === 'pesca') {
      if (!turno || !fecha) {
        return res.status(400).json({ error: 'Turno y fecha son requeridos para pesca' });
      }
      
      const fechaReserva = new Date(fecha);
      fechaReserva.setHours(0, 0, 0, 0);
      const fechaFin = new Date(fecha);
      fechaFin.setHours(23, 59, 59, 999);
      
      const reservasExistentes = await Reserva.find({
        tipo: 'pesca_embarcada',
        turnoPesca: turno,
        fechaPesca: { $gte: fechaReserva, $lte: fechaFin },
        estado: { $ne: 'cancelada' }
      });
      
      const personasReservadas = reservasExistentes.reduce((sum, r) => sum + r.cantidadPersonas, 0);
      if (personasReservadas + cantidadPersonas > 6) {
        conflicto = true;
      }
    } else if (tipo === 'alojamiento') {
      if (!fechaEntrada || !fechaSalida) {
        return res.status(400).json({ error: 'Fecha de entrada y salida son requeridos para alojamiento' });
      }
      
      const reservasExistentes = await Reserva.find({
        tipo: tipoReserva,
        estado: { $ne: 'cancelada' },
        $or: [
          { fechaEntrada: { $lt: fechaSalida, $gte: fechaEntrada } },
          { fechaSalida: { $gt: fechaEntrada, $lte: fechaSalida } },
          { $and: [{ fechaEntrada: { $lte: fechaEntrada } }, { fechaSalida: { $gte: fechaSalida } }] }
        ]
      });
      
      if (reservasExistentes.length > 0) {
        conflicto = true;
      }
    } else if (tipo === 'combo') {
      if (!turno || !fecha || !fechaEntrada || !fechaSalida) {
        return res.status(400).json({ error: 'Turno, fecha de pesca, entrada y salida son requeridos para combo' });
      }
      
      // Verificar disponibilidad de pesca para combo
      const fechaReserva = new Date(fecha);
      fechaReserva.setHours(0, 0, 0, 0);
      const fechaFin = new Date(fecha);
      fechaFin.setHours(23, 59, 59, 999);
      
      const reservasPescaExistentes = await Reserva.find({
        $or: [
          { tipo: 'pesca_embarcada' },
          { tipo: tipoReserva }
        ],
        turnoPesca: turno,
        fechaPesca: { $gte: fechaReserva, $lte: fechaFin },
        estado: { $ne: 'cancelada' }
      });
      
      const personasReservadasPesca = reservasPescaExistentes.reduce((sum, r) => sum + r.cantidadPersonas, 0);
      if (personasReservadasPesca + cantidadPersonas > 6) {
        conflicto = true;
      }
      
      // Verificar disponibilidad de alojamiento para combo
      const reservasAlojamientoExistentes = await Reserva.find({
        $or: [
          { tipo: tipoReserva.replace('combo_pesca_', 'alojamiento_') },
          { tipo: tipoReserva }
        ],
        estado: { $ne: 'cancelada' },
        $or: [
          { fechaEntrada: { $lt: fechaSalida, $gte: fechaEntrada } },
          { fechaSalida: { $gt: fechaEntrada, $lte: fechaSalida } },
          { $and: [{ fechaEntrada: { $lte: fechaEntrada } }, { fechaSalida: { $gte: fechaSalida } }] }
        ]
      });
      
      if (reservasAlojamientoExistentes.length > 0) {
        conflicto = true;
      }
    }
    
    if (conflicto) {
      return res.status(409).json({ error: 'No hay disponibilidad para la fecha y horario seleccionados' });
    }
    
    // Crear la reserva
    const reservaData = {
      tipo: tipoReserva,
      cantidadPersonas,
      nombre,
      email,
      telefono,
      monto,
      observaciones
    };
    
    if (tipo === 'pesca') {
      reservaData.turnoPesca = turno;
      reservaData.fechaPesca = new Date(fecha);
    } else if (tipo === 'alojamiento') {
      reservaData.fechaEntrada = new Date(fechaEntrada);
      reservaData.fechaSalida = new Date(fechaSalida);
    } else if (tipo === 'combo') {
      reservaData.turnoPesca = turno;
      reservaData.fechaPesca = new Date(fecha);
      reservaData.fechaEntrada = new Date(fechaEntrada);
      reservaData.fechaSalida = new Date(fechaSalida);
    }
    
    const reserva = new Reserva(reservaData);
    await reserva.save();
    
    // NO enviar email aquí - se enviará solo después del pago aprobado
    console.log(`Reserva ${reserva._id} creada en estado pendiente`);
    
    res.status(201).json(reserva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener una reserva específica
router.get('/:id', async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id);
    if (!reserva) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.json(reserva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar una reserva
router.put('/:id', async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!reserva) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.json(reserva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cancelar una reserva
router.put('/:id/cancelar', async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndUpdate(
      req.params.id,
      { estado: 'cancelada' },
      { new: true }
    );
    if (!reserva) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.json(reserva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Confirmar una reserva
router.put('/:id/confirmar', async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndUpdate(
      req.params.id,
      { estado: 'confirmada' },
      { new: true }
    );
    if (!reserva) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.json(reserva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar una reserva
router.delete('/:id', async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndDelete(req.params.id);
    if (!reserva) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.json({ message: 'Reserva eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 