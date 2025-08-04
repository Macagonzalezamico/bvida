const nodemailer = require('nodemailer');

// Configuración del transportador de email
const transporter = nodemailer.createTransporter({
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

module.exports = {
  enviarEmailContacto,
  enviarEmailConfirmacion
}; 