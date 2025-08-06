const mongoose = require('mongoose');

const ReservaSchema = new mongoose.Schema({
  tipo: { 
    type: String, 
    enum: ['pesca_embarcada', 'alojamiento_casa1', 'alojamiento_casa2', 'combo_pesca_casa1', 'combo_pesca_casa2'], 
    required: true 
  },
  // Campos específicos para pesca embarcada
  turnoPesca: { 
    type: String, 
    enum: ['8:00-12:00', '14:00-18:00'], 
    required: function() { 
      return this.tipo === 'pesca_embarcada' || this.tipo.startsWith('combo_pesca_'); 
    }
  },
  fechaPesca: { 
    type: Date, 
    required: function() { 
      return this.tipo === 'pesca_embarcada' || this.tipo.startsWith('combo_pesca_'); 
    }
  },
  // Campos específicos para alojamiento
  fechaEntrada: { 
    type: Date, 
    required: function() { 
      return this.tipo.startsWith('alojamiento_') || this.tipo.startsWith('combo_pesca_'); 
    }
  },
  fechaSalida: { 
    type: Date, 
    required: function() { 
      return this.tipo.startsWith('alojamiento_') || this.tipo.startsWith('combo_pesca_'); 
    }
  },
  cantidadPersonas: { 
    type: Number, 
    required: true,
    min: 1,
    max: 8 // Máximo general, la validación específica se hará en el middleware
  },
  nombre: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  telefono: { 
    type: String, 
    required: true 
  },
  estado: { 
    type: String, 
    enum: ['pendiente', 'confirmada', 'cancelada'], 
    default: 'pendiente' 
  },
  monto: { 
    type: Number, 
    required: true 
  },
  pagado: { 
    type: Boolean, 
    default: false 
  },
  mercadopagoId: { 
    type: String 
  },
  observaciones: { 
    type: String 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true
});

// Middleware para validar cantidad de personas según el tipo
ReservaSchema.pre('save', function(next) {
  if (this.tipo === 'pesca_embarcada' || this.tipo.startsWith('combo_pesca_')) {
    if (this.cantidadPersonas > 6) {
      return next(new Error('Máximo 6 personas para pesca embarcada'));
    }
  } else if (this.tipo.startsWith('alojamiento_')) {
    if (this.cantidadPersonas > 8) {
      return next(new Error('Máximo 8 personas para alojamiento'));
    }
  }
  next();
});

// Índices para optimizar consultas
ReservaSchema.index({ tipo: 1, fechaPesca: 1 });
ReservaSchema.index({ tipo: 1, fechaEntrada: 1, fechaSalida: 1 });
ReservaSchema.index({ estado: 1 });

module.exports = mongoose.model('Reserva', ReservaSchema); 