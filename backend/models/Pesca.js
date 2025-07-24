const mongoose = require('mongoose');

const PescaSchema = new mongoose.Schema({
  descripcion: { type: String, required: true },
  imagenes: [String],
  precioPorSalida: { type: Number, required: true },
  cupo: { type: Number, required: true },
  duracionHoras: { type: Number, required: true }
});

module.exports = mongoose.model('Pesca', PescaSchema); 