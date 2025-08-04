const express = require('express');
const router = express.Router();

// Modelo para mensajes de contacto
const Contacto = require('../models/Contacto');

// Servicio de email
const { enviarEmailContacto, enviarEmailConfirmacion } = require('../config/email');

// Obtener todos los mensajes de contacto
router.get('/', async (req, res) => {
  try {
    const mensajes = await Contacto.find().sort({ createdAt: -1 });
    res.json(mensajes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear un nuevo mensaje de contacto
router.post('/', async (req, res) => {
  try {
    const { nombre, email, asunto, mensaje } = req.body;
    
    // Validaciones básicas
    if (!nombre || !email || !asunto || !mensaje) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Formato de email inválido' });
    }
    
    // Crear el mensaje
    const nuevoMensaje = new Contacto({
      nombre,
      email,
      asunto,
      mensaje
    });
    
    await nuevoMensaje.save();
    
    // Enviar email de notificación al administrador
    try {
      await enviarEmailContacto({ nombre, email, asunto, mensaje });
      console.log('Email de notificación enviado al administrador');
    } catch (emailError) {
      console.error('Error al enviar email de notificación:', emailError);
      // No fallamos la respuesta si el email falla, solo lo registramos
    }
    
    // Enviar email de confirmación al usuario
    try {
      await enviarEmailConfirmacion({ nombre, email, asunto, mensaje });
      console.log('Email de confirmación enviado al usuario');
    } catch (emailError) {
      console.error('Error al enviar email de confirmación:', emailError);
      // No fallamos la respuesta si el email falla, solo lo registramos
    }
    
    res.status(201).json({
      success: true,
      message: 'Mensaje enviado exitosamente. Te hemos enviado un email de confirmación.',
      data: nuevoMensaje
    });
  } catch (error) {
    console.error('Error en POST /contacto:', error);
    res.status(500).json({ error: error.message });
  }
});

// Obtener un mensaje específico
router.get('/:id', async (req, res) => {
  try {
    const mensaje = await Contacto.findById(req.params.id);
    if (!mensaje) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }
    res.json(mensaje);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Marcar mensaje como leído
router.put('/:id/leer', async (req, res) => {
  try {
    const mensaje = await Contacto.findByIdAndUpdate(
      req.params.id,
      { leido: true },
      { new: true }
    );
    if (!mensaje) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }
    res.json(mensaje);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un mensaje
router.delete('/:id', async (req, res) => {
  try {
    const mensaje = await Contacto.findByIdAndDelete(req.params.id);
    if (!mensaje) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }
    res.json({ message: 'Mensaje eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 