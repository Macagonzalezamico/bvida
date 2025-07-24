const mongoose = require('mongoose');

const ReservaSchema = new mongoose.Schema({
  tipo: { type: String, enum: ['cabana', 'pesca'], required: true },
  servicioId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'tipo' },
  usuario: { type: String, required: true },
  fecha: { type: Date, required: true },
  noches: { type: Number }, // solo para cabañas
  cantidadPersonas: { type: Number },
  pagado: { type: Boolean, default: false },
  monto: { type: Number, required: true },
  mercadopagoId: { type: String }
});

module.exports = mongoose.model('Reserva', ReservaSchema); 