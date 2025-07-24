const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefono: { type: String },
  esAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', UserSchema); 