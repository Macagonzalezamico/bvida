const nodemailer = require('nodemailer');

// Configuración del transportador de email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'makagonzalez17@gmail.com',
    pass: process.env.EMAIL_PASS // Esta será una contraseña de aplicación de Gmail
  }
});

// Función para enviar email de contacto
const enviarEmailContacto = async (datosContacto) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'makagonzalez17@gmail.com',
      to: 'makagonzalez17@gmail.com',
      subject: `Nuevo mensaje de contacto: ${datosContacto.asunto}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Nuevo Mensaje de Contacto - Bvida
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Información del Contacto:</h3>
            <p><strong>Nombre:</strong> ${datosContacto.nombre}</p>
            <p><strong>Email:</strong> ${datosContacto.email}</p>
            <p><strong>Asunto:</strong> ${datosContacto.asunto}</p>
          </div>
          
          <div style="background-color: #e9ecef; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">Mensaje:</h3>
            <p style="line-height: 1.6; color: #495057;">${datosContacto.mensaje.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="background-color: #d4edda; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #155724;">
              <strong>Fecha de envío:</strong> ${new Date().toLocaleString('es-AR', {
                timeZone: 'America/Argentina/Buenos_Aires'
              })}
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
            <p style="color: #6c757d; font-size: 14px;">
              Este mensaje fue enviado desde el formulario de contacto de Bvida
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado exitosamente:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error al enviar email:', error);
    throw error;
  }
};

// Función para enviar email de confirmación al usuario
const enviarEmailConfirmacion = async (datosContacto) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'makagonzalez17@gmail.com',
      to: datosContacto.email,
      subject: 'Confirmación de mensaje recibido - Bvida',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #28a745; padding-bottom: 10px;">
            Mensaje Recibido - Bvida
          </h2>
          
          <div style="background-color: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #155724; margin-top: 0;">¡Gracias por contactarnos!</h3>
            <p style="color: #155724;">
              Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.
            </p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Resumen de tu mensaje:</h3>
            <p><strong>Asunto:</strong> ${datosContacto.asunto}</p>
            <p><strong>Mensaje:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff;">
              ${datosContacto.mensaje.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
            <p style="color: #6c757d; font-size: 14px;">
              Si tienes alguna pregunta urgente, puedes contactarnos directamente a: 
              <a href="mailto:makagonzalez17@gmail.com" style="color: #007bff;">makagonzalez17@gmail.com</a>
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email de confirmación enviado:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error al enviar email de confirmación:', error);
    throw error;
  }
};

// Función para enviar email de confirmación de reserva
const enviarEmailConfirmacionReserva = async (datosReserva) => {
  try {
    const getTipoDisplay = (tipo) => {
      switch (tipo) {
        case 'pesca_embarcada': return '🎣 Pesca Embarcada';
        case 'alojamiento_casa1': return '🏠 Alojamiento Casa 1';
        case 'alojamiento_casa2': return '🏠 Alojamiento Casa 2';
        case 'combo_pesca_casa1': return '🎣🏠 Combo Pesca + Casa 1';
        case 'combo_pesca_casa2': return '🎣🏠 Combo Pesca + Casa 2';
        default: return tipo;
      }
    };

    const formatearFecha = (fecha) => {
      return new Date(fecha).toLocaleDateString('es-AR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    const formatearPrecio = (precio) => {
      return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS'
      }).format(precio);
    };

    const mailOptions = {
      from: process.env.EMAIL_USER || 'makagonzalez17@gmail.com',
      to: datosReserva.email,
      subject: `Confirmación de Reserva - ${getTipoDisplay(datosReserva.tipo)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #28a745; padding-bottom: 10px;">
            Confirmación de Reserva - Bvida
          </h2>
          
          <div style="background-color: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #155724; margin-top: 0;">¡Reserva Confirmada!</h3>
            <p style="color: #155724;">
              Hemos recibido tu reserva y la hemos procesado exitosamente. A continuación encontrarás todos los detalles.
            </p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Detalles de la Reserva:</h3>
            <p><strong>Tipo de Reserva:</strong> ${getTipoDisplay(datosReserva.tipo)}</p>
            <p><strong>Nombre:</strong> ${datosReserva.nombre}</p>
            <p><strong>Email:</strong> ${datosReserva.email}</p>
            <p><strong>Teléfono:</strong> ${datosReserva.telefono}</p>
            <p><strong>Cantidad de Personas:</strong> ${datosReserva.cantidadPersonas}</p>
            <p><strong>Monto Total:</strong> ${formatearPrecio(datosReserva.monto)}</p>
            ${datosReserva.turnoPesca ? `<p><strong>Turno de Pesca:</strong> ${datosReserva.turnoPesca}</p>` : ''}
            ${datosReserva.fechaPesca ? `<p><strong>Fecha de Pesca:</strong> ${formatearFecha(datosReserva.fechaPesca)}</p>` : ''}
            ${datosReserva.fechaEntrada ? `<p><strong>Fecha de Entrada:</strong> ${formatearFecha(datosReserva.fechaEntrada)}</p>` : ''}
            ${datosReserva.fechaSalida ? `<p><strong>Fecha de Salida:</strong> ${formatearFecha(datosReserva.fechaSalida)}</p>` : ''}
            ${datosReserva.observaciones ? `<p><strong>Observaciones:</strong> ${datosReserva.observaciones}</p>` : ''}
          </div>
          
          <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #856404; margin-top: 0;">Información Importante:</h3>
            <ul style="color: #856404;">
              <li>Tu reserva está en estado <strong>pendiente</strong> hasta confirmar el pago</li>
              <li>Para confirmar tu reserva, realiza el pago del 30% del monto total</li>
              <li>Puedes cancelar gratuitamente hasta 48 horas antes de la fecha</li>
              <li>Para consultas, contactanos a: <a href="mailto:makagonzalez17@gmail.com" style="color: #007bff;">makagonzalez17@gmail.com</a></li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
            <p style="color: #6c757d; font-size: 14px;">
              Gracias por elegir Bvida. ¡Esperamos verte pronto!
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email de confirmación de reserva enviado exitosamente:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error al enviar email de confirmación de reserva:', error);
    throw error;
  }
};

module.exports = {
  enviarEmailContacto,
  enviarEmailConfirmacion,
  enviarEmailConfirmacionReserva
}; 