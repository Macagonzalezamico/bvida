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
    max: function() { 
      return this.tipo === 'pesca_embarcada' ? 6 : 8; // Máximo 6 para pesca, 8 para alojamiento/combo
    }
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

// Índices para optimizar consultas
ReservaSchema.index({ tipo: 1, fechaPesca: 1 });
ReservaSchema.index({ tipo: 1, fechaEntrada: 1, fechaSalida: 1 });
ReservaSchema.index({ estado: 1 });

module.exports = mongoose.model('Reserva', ReservaSchema); 