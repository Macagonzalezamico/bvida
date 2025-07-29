const express = require('express');
const router = express.Router();
const Reserva = require('../models/Reserva');

// Obtener todas las reservas
router.get('/', async (req, res) => {
  try {
    const { tipo, fecha, casa } = req.query;
    let filter = {};
    
    if (tipo) filter.tipo = tipo;
    if (fecha) {
      const fechaInicio = new Date(fecha);
      fechaInicio.setHours(0, 0, 0, 0);
      const fechaFin = new Date(fecha);
      fechaFin.setHours(23, 59, 59, 999);
      
      if (tipo === 'pesca') {
        filter.fecha = { $gte: fechaInicio, $lte: fechaFin };
      } else {
        filter.$or = [
          { fechaEntrada: { $lte: fechaFin, $gte: fechaInicio } },
          { fechaSalida: { $gte: fechaInicio, $lte: fechaFin } },
          { $and: [{ fechaEntrada: { $lte: fechaInicio } }, { fechaSalida: { $gte: fechaFin } }] }
        ];
      }
    }
    if (casa) filter.casa = casa;
    
    const reservas = await Reserva.find(filter).sort({ fecha: 1 });
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
      // Verificar disponibilidad de turnos de pesca
      reservas = await Reserva.find({
        tipo: 'pesca',
        fecha: { $gte: fechaConsulta, $lte: fechaFin },
        estado: { $ne: 'cancelada' }
      });
      
      const turnos = ['8:00-12:00', '14:00-18:00'];
      turnos.forEach(turno => {
        const reservasTurno = reservas.filter(r => r.turno === turno);
        const personasReservadas = reservasTurno.reduce((sum, r) => sum + r.cantidadPersonas, 0);
        disponibilidad[turno] = {
          disponible: personasReservadas < 6,
          personasReservadas,
          capacidadRestante: Math.max(0, 6 - personasReservadas),
          reservas: reservasTurno
        };
      });
    } else {
      // Verificar disponibilidad de alojamiento
      if (!casa) {
        return res.status(400).json({ error: 'Casa es requerida para alojamiento' });
      }
      
      reservas = await Reserva.find({
        tipo: 'alojamiento',
        casa: casa,
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
        tipo: 'pesca',
        turno: turno,
        fecha: { $gte: fechaReserva, $lte: fechaFin },
        estado: { $ne: 'cancelada' }
      });
      
      const personasReservadas = reservasExistentes.reduce((sum, r) => sum + r.cantidadPersonas, 0);
      if (personasReservadas + cantidadPersonas > 6) {
        conflicto = true;
      }
    } else {
      if (!casa || !fechaEntrada || !fechaSalida) {
        return res.status(400).json({ error: 'Casa, fecha de entrada y salida son requeridos para alojamiento' });
      }
      
      const reservasExistentes = await Reserva.find({
        tipo: 'alojamiento',
        casa: casa,
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
    }
    
    if (conflicto) {
      return res.status(409).json({ error: 'No hay disponibilidad para la fecha y horario seleccionados' });
    }
    
    // Crear la reserva
    const reserva = new Reserva({
      tipo,
      casa,
      turno,
      fecha: tipo === 'pesca' ? new Date(fecha) : undefined,
      fechaEntrada: tipo === 'alojamiento' ? new Date(fechaEntrada) : undefined,
      fechaSalida: tipo === 'alojamiento' ? new Date(fechaSalida) : undefined,
      cantidadPersonas,
      nombre,
      email,
      telefono,
      monto,
      observaciones
    });
    
    await reserva.save();
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