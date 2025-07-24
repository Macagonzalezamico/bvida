const express = require('express');
const router = express.Router();
const Pesca = require('../models/Pesca');

// Obtener todos los servicios de pesca
router.get('/', async (req, res) => {
  const pescas = await Pesca.find();
  res.json(pescas);
});

// Crear un servicio de pesca
router.post('/', async (req, res) => {
  const pesca = new Pesca(req.body);
  await pesca.save();
  res.status(201).json(pesca);
});

// Actualizar un servicio de pesca
router.put('/:id', async (req, res) => {
  const pesca = await Pesca.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(pesca);
});

// Eliminar un servicio de pesca
router.delete('/:id', async (req, res) => {
  await Pesca.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router; 