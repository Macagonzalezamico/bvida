# 📧 Guía Completa: Sistema de Email con Gmail para Proyectos Web

## 🎯 Descripción General

Esta guía te enseñará a implementar un sistema completo de envío de emails usando Gmail en cualquier proyecto web (Node.js/Express, React, Vue, etc.). El sistema incluye:

- ✅ **Emails de contacto** (formularios de contacto)
- ✅ **Emails de confirmación** (para usuarios)
- ✅ **Emails de recuperación de contraseñas**
- ✅ **Templates HTML personalizables**
- ✅ **Configuración segura con contraseñas de aplicación**

---

## 📋 Prerrequisitos

### 1. Cuenta de Gmail
- Tener una cuenta de Gmail activa
- Acceso a la configuración de seguridad de Google

### 2. Proyecto Web
- Backend en Node.js/Express (o similar)
- Frontend (React, Vue, Angular, etc.)
- Base de datos (MongoDB, MySQL, PostgreSQL, etc.)

---

## 🔐 Configuración de Gmail

### Paso 1: Habilitar Verificación en 2 Pasos

1. Ve a [myaccount.google.com](https://myaccount.google.com)
2. Inicia sesión con tu cuenta de Gmail
3. Navega a **Seguridad** → **Verificación en 2 pasos**
4. Activa la verificación en 2 pasos
5. Completa el proceso de configuración

### Paso 2: Generar Contraseña de Aplicación

1. Ve a [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Selecciona **"Otra"** en el menú desplegable
3. Ponle un nombre descriptivo (ej: "Mi Sitio Web Contacto")
4. Haz clic en **"Generar"**
5. **Copia la contraseña de 16 caracteres** (ej: `abcd efgh ijkl mnop`)

> ⚠️ **Importante:** Guarda esta contraseña en un lugar seguro. No la compartas.

---

## 🛠️ Implementación en el Backend

### Paso 1: Instalar Dependencias

```bash
npm install nodemailer
```

### Paso 2: Crear Configuración de Email

Crea el archivo `config/email.js`:

```javascript
const nodemailer = require('nodemailer');

// Configuración del transportador de email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'tu-email@gmail.com',
    pass: process.env.EMAIL_PASS // Contraseña de aplicación de 16 caracteres
  }
});

// Función para enviar email de contacto
const enviarEmailContacto = async (datosContacto) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'tu-email@gmail.com',
      to: 'tu-email@gmail.com', // Email donde recibirás los mensajes
      subject: `Nuevo mensaje de contacto: ${datosContacto.asunto}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Nuevo Mensaje de Contacto - Tu Sitio Web
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
              <strong>Fecha de envío:</strong> ${new Date().toLocaleString('es-AR')}
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
      from: process.env.EMAIL_USER || 'tu-email@gmail.com',
      to: datosContacto.email,
      subject: 'Confirmación de mensaje recibido - Tu Sitio Web',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #28a745; padding-bottom: 10px;">
            Mensaje Recibido - Tu Sitio Web
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

// Función para enviar email de recuperación de contraseña
const enviarEmailRecuperacion = async (email, token, nombreUsuario) => {
  try {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'tu-email@gmail.com',
      to: email,
      subject: 'Recuperación de Contraseña - Tu Sitio Web',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #dc3545; padding-bottom: 10px;">
            Recuperación de Contraseña - Tu Sitio Web
          </h2>
          
          <div style="background-color: #f8d7da; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #721c24; margin-top: 0;">Hola ${nombreUsuario},</h3>
            <p style="color: #721c24;">
              Has solicitado restablecer tu contraseña. Haz clic en el botón de abajo para continuar.
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" 
               style="background-color: #dc3545; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Restablecer Contraseña
            </a>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #6c757d; font-size: 14px;">
              Si no solicitaste este cambio, puedes ignorar este email. El enlace expirará en 1 hora.
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email de recuperación enviado:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error al enviar email de recuperación:', error);
    throw error;
  }
};

module.exports = {
  enviarEmailContacto,
  enviarEmailConfirmacion,
  enviarEmailRecuperacion
};
```

### Paso 3: Crear Modelo de Base de Datos

Crea el archivo `models/Contacto.js`:

```javascript
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
```

### Paso 4: Crear Rutas de API

Crea el archivo `routes/contacto.js`:

```javascript
const express = require('express');
const router = express.Router();

// Modelo para mensajes de contacto
const Contacto = require('../models/Contacto');

// Servicio de email
const { enviarEmailContacto, enviarEmailConfirmacion } = require('../config/email');

// Obtener todos los mensajes de contacto (para panel admin)
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
```

### Paso 5: Configurar Variables de Entorno

Crea el archivo `.env`:

```bash
# Configuración de Base de Datos
MONGODB_URI=mongodb://localhost:27017/tu_base_de_datos

# Configuración de Email
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu_contraseña_de_aplicacion_de_16_caracteres

# Configuración del servidor
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Paso 6: Configurar CORS (si usas frontend separado)

En tu archivo principal del backend (`app.js`):

```javascript
const express = require('express');
const cors = require('cors');
const contactoRouter = require('./routes/contacto');

const app = express();

// Configuración de CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:4000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Rutas
app.use('/contacto', contactoRouter);

// ... resto de tu configuración
```

---

## 🎨 Implementación en el Frontend

### Paso 1: Crear Componente de Formulario de Contacto

```jsx
// ContactForm.jsx
import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:5000/contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
      } else {
        setError(data.error || 'Error al enviar el mensaje');
      }
    } catch (error) {
      setError('Error de conexión. Por favor, verifica tu conexión e intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form">
      <h2>Contacto</h2>
      
      {success && (
        <div className="success-message">
          ¡Mensaje enviado exitosamente! Te hemos enviado un email de confirmación.
        </div>
      )}
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre *</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="asunto">Asunto *</label>
          <input
            type="text"
            id="asunto"
            name="asunto"
            value={formData.asunto}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="mensaje">Mensaje *</label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            rows="5"
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="submit-button"
        >
          {loading ? 'Enviando...' : 'Enviar Mensaje'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
```

### Paso 2: Estilos CSS (opcional)

```css
/* ContactForm.css */
.contact-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.submit-button {
  background-color: #007bff;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.success-message {
  background-color: #d4edda;
  color: #155724;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
}
```

---

## 🐳 Configuración con Docker (Opcional)

Si usas Docker, actualiza tu `docker-compose.yml`:

```yaml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
    restart: unless-stopped
    
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/tu_base_de_datos
      - EMAIL_USER=tu-email@gmail.com
      - EMAIL_PASS=tu_contraseña_de_aplicacion_de_16_caracteres
      - FRONTEND_URL=http://localhost:3000
    depends_on:
      - mongo
    restart: unless-stopped
    
  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
      
volumes:
  mongo_data:
```

---

## 🎨 Personalización de Templates de Email

### ¿Es Editable el Formato del Email?

**¡SÍ!** Los templates HTML son completamente personalizables. Puedes:

1. **Cambiar colores y estilos**
2. **Agregar tu logo**
3. **Modificar el contenido**
4. **Usar diferentes layouts**
5. **Agregar botones y enlaces**

### Ejemplo de Template Personalizado:

```javascript
const enviarEmailPersonalizado = async (datos) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: datos.email,
    subject: 'Asunto personalizado',
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px;">
        <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <img src="https://tu-sitio.com/logo.png" alt="Logo" style="max-width: 200px; margin-bottom: 20px;">
          
          <h1 style="color: #333; text-align: center; margin-bottom: 30px;">
            ¡Bienvenido a Tu Sitio Web!
          </h1>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #007bff; margin-top: 0;">Hola ${datos.nombre},</h2>
            <p style="color: #495057; line-height: 1.6;">
              ${datos.mensaje}
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://tu-sitio.com" 
               style="background: linear-gradient(45deg, #007bff, #0056b3); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">
              Visitar Sitio Web
            </a>
          </div>
          
          <div style="border-top: 1px solid #dee2e6; padding-top: 20px; text-align: center; color: #6c757d; font-size: 14px;">
            <p>© 2024 Tu Sitio Web. Todos los derechos reservados.</p>
            <p>Si tienes preguntas, contacta a: <a href="mailto:soporte@tu-sitio.com" style="color: #007bff;">soporte@tu-sitio.com</a></p>
          </div>
        </div>
      </div>
    `
  };
  
  return await transporter.sendMail(mailOptions);
};
```

---

## 🔐 Recuperación de Contraseñas

### ¿Se Puede Usar para Recuperación de Contraseñas?

**¡SÍ!** Este método es perfecto para emails de recuperación. Aquí tienes un ejemplo completo:

### Paso 1: Crear Token de Recuperación

```javascript
// models/User.js
const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

// Método para generar token de recuperación
UserSchema.methods.generatePasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
    
  this.resetPasswordExpires = Date.now() + 3600000; // 1 hora
  
  return resetToken;
};

module.exports = mongoose.model('User', UserSchema);
```

### Paso 2: Ruta de Recuperación

```javascript
// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { enviarEmailRecuperacion } = require('../config/email');

// Solicitar recuperación de contraseña
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    // Generar token de recuperación
    const resetToken = user.generatePasswordResetToken();
    await user.save();
    
    // Enviar email de recuperación
    await enviarEmailRecuperacion(email, resetToken, user.nombre || 'Usuario');
    
    res.json({ 
      success: true, 
      message: 'Email de recuperación enviado' 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Resetear contraseña con token
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');
    
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ error: 'Token inválido o expirado' });
    }
    
    // Actualizar contraseña
    user.password = await bcrypt.hash(newPassword, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    
    res.json({ 
      success: true, 
      message: 'Contraseña actualizada correctamente' 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

---

## 🧪 Pruebas y Verificación

### Paso 1: Probar el Sistema

1. **Inicia tu aplicación**
2. **Ve al formulario de contacto**
3. **Envía un mensaje de prueba**
4. **Verifica que recibas:**
   - ✅ Mensaje de éxito en la página
   - 📧 Email de confirmación
   - 📧 Email de notificación

### Paso 2: Verificar Logs

```bash
# Ver logs del backend
docker logs -f tu-contenedor-backend

# O si no usas Docker
npm start
```

### Paso 3: Solución de Problemas Comunes

| Error | Solución |
|-------|----------|
| `Invalid login` | Verifica la contraseña de aplicación |
| `Less secure app access` | Usa contraseñas de aplicación, no acceso menos seguro |
| `CORS error` | Configura CORS correctamente |
| `Email no llega` | Revisa carpeta de spam, verifica logs |

---

## 🔒 Consideraciones de Seguridad

### ✅ Buenas Prácticas:

1. **Usa contraseñas de aplicación** (no contraseñas normales)
2. **Configura variables de entorno** (no hardcodees credenciales)
3. **Valida emails** en el frontend y backend
4. **Limita rate limiting** para evitar spam
5. **Usa HTTPS** en producción
6. **Sanitiza inputs** para prevenir XSS

### ❌ Evita:

1. **Hardcodear credenciales** en el código
2. **Usar contraseñas normales** de Gmail
3. **No validar inputs** del usuario
4. **No configurar CORS** correctamente
5. **No manejar errores** de envío de email

---

## 🚀 Despliegue en Producción

### Variables de Entorno en Producción:

```bash
# Heroku
heroku config:set EMAIL_USER=tu-email@gmail.com
heroku config:set EMAIL_PASS=tu_contraseña_de_aplicacion

# Vercel
# Agrega en el dashboard de Vercel

# Railway
# Agrega en el dashboard de Railway

# DigitalOcean App Platform
# Agrega en el dashboard de DigitalOcean
```

### Configuración de Dominio:

```javascript
// En producción, actualiza las URLs
const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
```

---

## 📚 Recursos Adicionales

- [Documentación de Nodemailer](https://nodemailer.com/)
- [Gmail API](https://developers.google.com/gmail/api)
- [Google App Passwords](https://support.google.com/accounts/answer/185833)
- [Email Templates](https://github.com/leemunroe/responsive-html-email-template)

---

## 🎉 ¡Listo!

Con esta guía tienes todo lo necesario para implementar un sistema completo de email en cualquier proyecto web. El sistema es:

- ✅ **Escalable** - Funciona para cualquier tamaño de proyecto
- ✅ **Seguro** - Usa las mejores prácticas de seguridad
- ✅ **Personalizable** - Templates HTML completamente editables
- ✅ **Versátil** - Sirve para contactos, recuperación de contraseñas, newsletters, etc.

¡Ahora puedes replicar este sistema en cualquier proyecto web que hagas! 🚀 