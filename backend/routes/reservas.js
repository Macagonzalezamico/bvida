const express = require('express');
const router = express.Router();
const Reserva = require('../models/Reserva');

// Obtener todas las reservas
router.get('/', async (req, res) => {
  const reservas = await Reserva.find();
  res.json(reservas);
});

// Crear una reserva
router.post('/', async (req, res) => {
  const reserva = new Reserva(req.body);
  await reserva.save();
  res.status(201).json(reserva);
});

// Actualizar estado de pago
router.put('/:id/pago', async (req, res) => {
  const reserva = await Reserva.findByIdAndUpdate(req.params.id, { pagado: true, mercadopagoId: req.body.mercadopagoId }, { new: true });
  res.json(reserva);
});

module.exports = router; 