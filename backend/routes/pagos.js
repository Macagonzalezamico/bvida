const express = require('express');
const router = express.Router();
const { MercadoPagoConfig, Preference, Payment } = require('mercadopago');
const Reserva = require('../models/Reserva');
const { enviarEmailConfirmacionReserva } = require('../config/email');
require('dotenv').config();

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_TOKEN });
const preference = new Preference(client);
const payment = new Payment(client);

// Crear preferencia de pago
router.post('/crear', async (req, res) => {
  const { descripcion, monto, reservaId } = req.body;
  try {
    const body = {
      items: [
        {
          title: descripcion,
          unit_price: monto,
          quantity: 1
        }
      ],
      back_urls: {
        success: process.env.FRONTEND_URL + '/pago-exitoso?reserva=' + reservaId,
        failure: process.env.FRONTEND_URL + '/pago-fallido?reserva=' + reservaId
      },
      auto_return: 'approved',
      external_reference: reservaId,
      metadata: { reservaId }
    };
    const response = await preference.create({ body });
    res.json({ init_point: response.init_point });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Webhook para recibir notificaciones de MercadoPago
router.post('/webhook', async (req, res) => {
  try {
    const { type, data } = req.body;
    
    console.log('Webhook recibido:', { type, data });
    
    if (type === 'payment') {
      const paymentId = data.id;
      
      // Obtener detalles del pago desde MercadoPago
      const paymentDetails = await payment.get({ id: paymentId });
      
      console.log('Detalles del pago:', {
        id: paymentDetails.id,
        status: paymentDetails.status,
        status_detail: paymentDetails.status_detail,
        external_reference: paymentDetails.external_reference,
        metadata: paymentDetails.metadata
      });
      
      // Verificar si el pago fue aprobado
      if (paymentDetails.status === 'approved') {
        const reservaId = paymentDetails.metadata?.reservaId || paymentDetails.external_reference;
        
        if (reservaId) {
          // Buscar la reserva
          const reserva = await Reserva.findById(reservaId);
          
          if (reserva) {
            // Actualizar el estado de la reserva
            reserva.estado = 'confirmada';
            reserva.pagado = true;
            reserva.mercadopagoId = paymentId;
            await reserva.save();
            
            console.log(`✅ Reserva ${reservaId} confirmada por pago ${paymentId}`);
            console.log(`📧 Enviando email de confirmación a ${reserva.email}`);
            
            // Enviar email de confirmación de pago
            try {
              await enviarEmailConfirmacionReserva(reserva);
              console.log(`✅ Email de confirmación enviado exitosamente`);
            } catch (emailError) {
              console.error('❌ Error al enviar email de confirmación:', emailError);
            }
            
            // El calendario se actualizará automáticamente en el próximo refresh
            // ya que el componente CalendarioTurnero escucha los cambios en las reservas
          } else {
            console.error(`❌ Reserva ${reservaId} no encontrada`);
          }
        }
      } else if (paymentDetails.status === 'rejected' || paymentDetails.status === 'cancelled') {
        const reservaId = paymentDetails.metadata?.reservaId || paymentDetails.external_reference;
        
        if (reservaId) {
          // Marcar la reserva como cancelada si el pago fue rechazado
          const reserva = await Reserva.findById(reservaId);
          if (reserva) {
            reserva.estado = 'cancelada';
            await reserva.save();
            console.log(`Reserva ${reservaId} cancelada por pago rechazado ${paymentId}`);
          }
        }
      }
    }
    
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error('Error en webhook:', error);
    res.status(500).json({ error: error.message });
  }
});

// Ruta para verificar el estado de un pago
router.get('/verificar/:paymentId', async (req, res) => {
  try {
    const { paymentId } = req.params;
    const paymentDetails = await payment.get({ id: paymentId });
    
    res.json({
      id: paymentDetails.id,
      status: paymentDetails.status,
      status_detail: paymentDetails.status_detail,
      external_reference: paymentDetails.external_reference,
      metadata: paymentDetails.metadata
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 