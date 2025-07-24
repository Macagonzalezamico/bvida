const express = require('express');
const router = express.Router();
const { MercadoPagoConfig, Preference } = require('mercadopago');
require('dotenv').config();

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_TOKEN });
const preference = new Preference(client);

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
      metadata: { reservaId }
    };
    const response = await preference.create({ body });
    res.json({ init_point: response.init_point });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 