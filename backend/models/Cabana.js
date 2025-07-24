const mongoose = require('mongoose');

const CabanaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  imagenes: [String],
  precioPorNoche: { type: Number, required: true },
  capacidad: { type: Number, required: true },
  servicios: [String]
});

module.exports = mongoose.model('Cabana', CabanaSchema); 