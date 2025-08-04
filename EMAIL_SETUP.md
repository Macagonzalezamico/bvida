# 📧 Configuración de Email - Bvida

## 🎯 ¿Qué hace el sistema de email?

Cuando alguien envía un mensaje desde el formulario de contacto:

1. **📥 Email de notificación** → Se envía a `makagonzalez17@gmail.com` con los detalles del mensaje
2. **✅ Email de confirmación** → Se envía al usuario que envió el mensaje
3. **💾 Guardado en BD** → El mensaje se guarda en MongoDB para referencia

## ⚙️ Configuración paso a paso

### 1. Habilitar verificación en 2 pasos en Gmail

1. Ve a tu cuenta de Google
2. Configuración → Seguridad → Verificación en 2 pasos
3. Activa la verificación en 2 pasos

### 2. Generar contraseña de aplicación

1. Ve a tu cuenta de Google
2. Configuración → Seguridad → Verificación en 2 pasos
3. Al final de la página, haz clic en "Contraseñas de aplicación"
4. Selecciona "Otra" y ponle un nombre (ej: "Bvida Contacto")
5. Copia la contraseña generada (16 caracteres)

### 3. Configurar las variables de entorno

Edita el archivo `docker-compose.yml` y cambia esta línea:

```yaml
- EMAIL_PASS=tu_contraseña_de_aplicacion_aqui
```

Por tu contraseña real:

```yaml
- EMAIL_PASS=abcd efgh ijkl mnop
```

### 4. Reiniciar los contenedores

```bash
docker compose down
docker compose up --build -d
```

## 🧪 Probar el sistema

1. Ve a `http://localhost:4000`
2. Navega a la sección **Contacto**
3. Llena el formulario y envía un mensaje
4. Verifica que recibas:
   - ✅ Mensaje de éxito en la página
   - 📧 Email de confirmación en tu email
   - 📧 Email de notificación en `makagonzalez17@gmail.com`

## 🔧 Solución de problemas

### Error: "Invalid login"
- Verifica que la verificación en 2 pasos esté activada
- Asegúrate de usar la contraseña de aplicación, no tu contraseña normal

### Error: "Less secure app access"
- Las contraseñas de aplicación son más seguras que "acceso de apps menos seguras"
- No necesitas habilitar acceso de apps menos seguras

### No llegan los emails
- Revisa la carpeta de spam
- Verifica que las variables de entorno estén correctas
- Revisa los logs del contenedor: `docker logs bvida-backend-1`

## 📋 Variables de entorno necesarias

```bash
EMAIL_USER=makagonzalez17@gmail.com
EMAIL_PASS=tu_contraseña_de_aplicacion_de_16_caracteres
```

## 🎉 ¡Listo!

Una vez configurado, cada mensaje del formulario de contacto llegará directamente a tu email con un diseño profesional y toda la información del contacto. 