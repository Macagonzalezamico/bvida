const express = require('express');
const router = express.Router();
const Cabana = require('../models/Cabana');

// Obtener todas las cabañas
router.get('/', async (req, res) => {
  const cabanas = await Cabana.find();
  res.json(cabanas);
});

// Crear una cabaña
router.post('/', async (req, res) => {
  const cabana = new Cabana(req.body);
  await cabana.save();
  res.status(201).json(cabana);
});

// Actualizar una cabaña
router.put('/:id', async (req, res) => {
  const cabana = await Cabana.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(cabana);
});

// Eliminar una cabaña
router.delete('/:id', async (req, res) => {
  await Cabana.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router; 