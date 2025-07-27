# 🏖️ BuenaVida - Posada y Pesca Embarcada

Sitio web moderno y responsivo para la Posada BuenaVida, especializada en alojamiento turístico y experiencias de pesca embarcada en la costa.

## ✨ Características Principales

### 🏠 **Alojamiento Premium**
- **Galería de Cabañas**: 5 imágenes interactivas de las cabañas disponibles
- **Características Unificadas**: 13 características únicas sin duplicaciones
- **Diseño Moderno**: Tarjetas con efectos hover y animaciones suaves
- **Información Detallada**: Precios, capacidades y servicios incluidos

### 🎣 **Pesca Embarcada**
- **3 Tipos de Experiencias**:
  - Pesca de Medio Día (4 horas)
  - Pesca Completa (8 horas)
  - Culebra (6 horas)
- **Imágenes Específicas**: Cada experiencia tiene su imagen correspondiente
- **Tarjetas Grandes**: Diseño prominente con imágenes completas
- **Información Completa**: Precios, duración y descripciones detalladas

### 🎨 **Diseño y UX**
- **Responsive Design**: Optimizado para móviles, tablets y desktop
- **Animaciones Fluidas**: Framer Motion para transiciones suaves
- **Paleta de Colores**: Dorado, azul marino y acentos cálidos
- **Tipografía Premium**: Playfair Display, Inter y Crimson Text
- **Efectos Visuales**: Glassmorphism, gradientes y sombras

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 18** con TypeScript
- **Vite** para desarrollo rápido
- **Framer Motion** para animaciones
- **CSS Modules** con variables CSS personalizadas
- **Responsive Design** con CSS Grid y Flexbox

### Backend
- **Node.js** con Express
- **MongoDB** para base de datos
- **MercadoPago** para pagos
- **JWT** para autenticación

### DevOps
- **Docker** y Docker Compose
- **Nginx** para servidor web
- **MongoDB** containerizado

## 📱 Páginas y Funcionalidades

### 🏠 **Página Principal (Home)**
- Hero section con logo animado
- Información general de la posada
- Botones de navegación principales
- Diseño premium con efectos visuales

### 🏡 **Cabañas**
- Galería interactiva con 5 imágenes
- Características unificadas (13 elementos)
- Información de precios y servicios
- Diseño de tarjetas moderno
- Efectos hover y animaciones

### 🎣 **Pesca**
- Imagen principal de embarcación (450px altura)
- 3 tarjetas de experiencias de pesca
- Imágenes específicas para cada tipo de pesca
- Información detallada de precios y servicios
- Diseño responsive y moderno

### 📅 **Reservas**
- Formulario de reserva completo
- Integración con sistema de pagos
- Información de políticas y condiciones
- Validación de formularios

### 📞 **Contacto**
- Información de contacto completa
- Redes sociales integradas
- Mapa de ubicación
- Formulario de contacto

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js 18+
- Docker y Docker Compose
- Git

### Instalación Local

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd bvida
```

2. **Instalar dependencias**
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

3. **Configurar variables de entorno**
```bash
# Backend (.env)
MONGODB_URI=mongodb://localhost:27017/bvida
MERCADOPAGO_TOKEN=tu_token_aqui
FRONTEND_URL=http://localhost:4001
```

4. **Ejecutar en desarrollo**
```bash
# Frontend
cd frontend
npm run dev

# Backend
cd backend
npm run dev
```

### Instalación con Docker

1. **Clonar y configurar**
```bash
git clone <repository-url>
cd bvida
```

2. **Ejecutar con Docker Compose**
```bash
docker compose up --build -d
```

3. **Acceder a la aplicación**
- Frontend: http://localhost:4001
- Backend API: http://localhost:5000
- MongoDB: localhost:27017

## 📁 Estructura del Proyecto

```
bvida/
├── frontend/
│   ├── src/
│   │   ├── components/          # Componentes reutilizables
│   │   ├── pages/              # Páginas principales
│   │   ├── hooks/              # Custom hooks
│   │   ├── theme/              # Configuración de tema
│   │   ├── styles/             # Estilos globales
│   │   └── assets/             # Imágenes y recursos
│   ├── public/                 # Archivos públicos
│   └── package.json
├── backend/
│   ├── models/                 # Modelos de MongoDB
│   ├── routes/                 # Rutas de la API
│   └── package.json
└── docker-compose.yml
```

## 🎨 Características de Diseño

### Paleta de Colores
- **Primario**: #D4AF37 (Dorado)
- **Secundario**: #2C5F7F (Azul marino)
- **Acento**: #8B4513 (Marrón)
- **Fondo**: #F8F6F0 (Crema)

### Tipografías
- **Títulos**: Playfair Display
- **Cuerpo**: Inter
- **Acentos**: Crimson Text

### Efectos Visuales
- **Glassmorphism**: Efectos de cristal
- **Gradientes**: Transiciones suaves de color
- **Sombras**: Efectos de profundidad
- **Animaciones**: Transiciones fluidas

## 📊 Funcionalidades Implementadas

### ✅ Completadas
- [x] Diseño responsive completo
- [x] Galería de cabañas con 5 imágenes
- [x] Características de alojamiento unificadas
- [x] Tarjetas de pesca con imágenes específicas
- [x] Imagen principal de embarcación optimizada
- [x] Animaciones con Framer Motion
- [x] Sistema de navegación
- [x] Formularios de contacto y reservas
- [x] Integración con Docker
- [x] Optimización de imágenes
- [x] CSS moderno con variables

### 🔄 En Desarrollo
- [ ] Sistema de pagos completo
- [ ] Panel de administración
- [ ] Sistema de reservas en tiempo real
- [ ] Galería de fotos expandida
- [ ] Blog de experiencias

## 🌐 URLs de Acceso

- **Sitio Principal**: http://localhost:4001
- **API Backend**: http://localhost:5000
- **Base de Datos**: localhost:27017

## 📞 Contacto

- **Instagram**: [@buenavidapesca](https://www.instagram.com/buenavidapesca/)
- **Facebook**: [Posada BuenaVida](https://www.facebook.com/PosadaBuenaVida)

## 📄 Licencia

Este proyecto es privado y pertenece a Posada BuenaVida.

---

**Desarrollado con ❤️ para BuenaVida**
