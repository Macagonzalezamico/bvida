const mongoose = require('mongoose');

const ContactoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  asunto: {
    type: String,
    required: true,
    trim: true
  },
  mensaje: {
    type: String,
    required: true,
    trim: true
  },
  leido: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Índices para optimizar consultas
ContactoSchema.index({ email: 1 });
ContactoSchema.index({ leido: 1 });
ContactoSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Contacto', ContactoSchema); 