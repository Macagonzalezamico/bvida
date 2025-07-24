# PAUTAS - Infraestructura y Metodología de Desarrollo Web

Este documento contiene la arquitectura completa, tecnologías, metodologías y patrones utilizados en el proyecto D-web. Sirve como guía de referencia para replicar este "esqueleto" en futuros proyectos web similares.

## 📋 Tabla de Contenidos

1. [Stack Tecnológico](#stack-tecnológico)
2. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
3. [Sistema de Diseño](#sistema-de-diseño)
4. [Metodologías de Desarrollo](#metodologías-de-desarrollo)
5. [Infraestructura y Deploy](#infraestructura-y-deploy)
6. [Patrones de Código](#patrones-de-código)
7. [SEO y Analytics](#seo-y-analytics)
8. [Guía de Reutilización](#guía-de-reutilización)

---

## 🚀 Stack Tecnológico

### Frontend Core
- **React 18** - Biblioteca de UI con Concurrent Features y Suspense
- **TypeScript** - Tipado estático para mayor robustez del código
- **Vite 4.5** - Build tool rápido con HMR optimizado
- **React Router DOM** - Navegación SPA con lazy loading

### Styling y UI
- **Tailwind CSS 3.x** - Framework utility-first con configuración personalizada
- **PostCSS** - Procesamiento de CSS con autoprefixer
- **Lucide React** - Iconografía consistente y optimizada
- **Custom CSS Classes** - Sistema de componentes (.glass-effect, .gradient-text, etc.)

### Animaciones y 3D
- **Framer Motion 10.x** - Animaciones declarativas y transiciones de página
- **React Three Fiber** - Integración de Three.js con React
- **@react-three/drei** - Helpers y componentes 3D pre-construidos
- **Three.js** - Gráficos 3D para efectos visuales avanzados

### Formularios y Comunicación
- **React Hook Form** - Gestión de formularios con validación
- **EmailJS** - Envío de emails sin backend
- **WhatsApp API** - Integración directa para comunicación

### Analytics y SEO
- **Google Analytics 4** - Tracking de eventos y conversiones
- **React Helmet** - Meta tags dinámicos
- **Structured Data (JSON-LD)** - Rich snippets para SEO

---

## 🏗️ Arquitectura del Proyecto

### Estructura de Directorios
```
dweb/
├── public/                     # Assets estáticos
│   ├── sitemap.xml            # SEO: Mapa del sitio
│   ├── robots.txt             # SEO: Directivas para crawlers
│   └── favicon.ico            # Branding
├── src/
│   ├── components/            # Componentes reutilizables
│   │   ├── HeroSection.tsx
│   │   ├── OverviewSection.tsx
│   │   ├── IASection.tsx
│   │   ├── ChatBotSection.tsx
│   │   └── ...
│   ├── pages/                 # Páginas principales
│   │   ├── HomePage.tsx
│   │   ├── PortfolioPage.tsx
│   │   └── ContactPage.tsx
│   ├── hooks/                 # Hooks personalizados
│   │   └── useContactForm.ts
│   ├── utils/                 # Utilidades
│   │   └── analytics.ts
│   └── index.css              # Estilos globales
├── scripts/                   # Scripts de deploy
│   ├── deploy.sh
│   └── deploy_firebase.sh
├── docker-compose.yml         # Orquestación de contenedores
├── docker-compose.override.yml # Config específica de desarrollo
├── Dockerfile                 # Multi-stage build
├── vite.config.ts            # Configuración de Vite
├── tailwind.config.js        # Sistema de diseño
├── firebase.json             # Configuración Firebase Hosting
└── CLAUDE.md                 # Documentación de desarrollo
```

### Patrón de Composición
- **Pages**: Contenedores que componen secciones
- **Sections**: Componentes de sección reutilizables
- **Components**: Elementos UI específicos
- **Hooks**: Lógica de negocio encapsulada
- **Utils**: Funciones puras y helpers

---

## 🎨 Sistema de Diseño

### Paleta de Colores (Firebase Theme)
```javascript
// Colores principales
primary: {
  400: '#f97316', // orange-500
  500: '#ef4444', // red-500
  600: '#eab308'  // yellow-500
}

// Gradientes característicos
'from-orange-500 to-red-500'
'from-yellow-400 to-orange-400'
'from-orange-500 via-red-500 to-orange-500'
```

### Tipografía
- **Cuerpo**: Inter (importada de Google Fonts)
- **Títulos**: Space Grotesk (importada de Google Fonts)
- **Jerarquía**: text-sm/base/lg/xl/2xl/4xl/6xl

### Componentes de Diseño
```css
/* Clases personalizadas en index.css */
.glass-effect {
  backdrop-filter: blur(16px);
  background: rgba(17, 24, 39, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.gradient-text {
  background: linear-gradient(to right, #f97316, #ef4444);
  -webkit-background-clip: text;
  color: transparent;
}

.btn-primary {
  @apply bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 
         text-white font-bold py-3 px-8 rounded-2xl 
         shadow-2xl border border-orange-400/30;
}
```

### Animaciones Personalizadas
```javascript
// tailwind.config.js
keyframes: {
  float: {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-20px)' }
  },
  glow: {
    '0%, 100%': { opacity: '0.5' },
    '50%': { opacity: '1' }
  }
}
```

---

## 🛠️ Metodologías de Desarrollo

### Desarrollo Local
```bash
# Método directo
npm install
npm run dev        # Puerto 9999

# Método Docker (recomendado)
./scripts/deploy.sh dev
docker-compose up --build dweb-dev
```

### Patrones de Componentes

#### 1. Componente con Animaciones
```typescript
interface ComponentProps {
  // Props tipadas
}

const Component: React.FC<ComponentProps> = ({ props }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["2%", "-2%"])
  const isInView = useInView(sectionRef, { once: true })

  return (
    <motion.section
      ref={sectionRef}
      style={{ y }}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      className="relative py-20"
    >
      {/* Contenido */}
    </motion.section>
  )
}
```

#### 2. Hook Personalizado
```typescript
export const useCustomHook = () => {
  const [state, setState] = useState(initialState)
  
  const handleAction = useCallback(() => {
    // Lógica de negocio
  }, [dependencies])

  return {
    state,
    actions: { handleAction },
    // Otros valores expuestos
  }
}
```

#### 3. Navegación con Scroll
```typescript
const scrollToSection = (sectionName: string) => {
  const element = document.querySelector(`[data-section="${sectionName}"]`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// En el componente destino
<motion.section data-section="section-name">
```

---

## 🐳 Infraestructura y Deploy

### Containerización Docker

#### Multi-stage Dockerfile
```dockerfile
# Etapa de construcción
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:alpine AS production
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Etapa de desarrollo
FROM node:18-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 9999
CMD ["npm", "run", "dev"]
```

#### Docker Compose
```yaml
version: '3.8'
services:
  dweb-dev:
    build:
      context: .
      target: development
    ports:
      - "9999:9999"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - CHOKIDAR_USEPOLLING=true

  dweb-prod:
    build:
      context: .
      target: production
    ports:
      - "3004:80"
    profiles:
      - production
```

### Scripts de Deploy

#### Desarrollo
```bash
#!/bin/bash
# scripts/deploy.sh dev
docker-compose up --build dweb-dev
```

#### Producción Firebase
```bash
#!/bin/bash
# scripts/deploy_firebase.sh
npm run build
firebase deploy --only hosting
```

### Configuración de Puertos
- **Desarrollo**: 9999 (Docker y local)
- **Producción Local**: 3004 (vista previa)
- **Firebase**: 443/80 (HTTPS/HTTP)

---

## 🔧 Patrones de Código

### Estructura de Páginas
```typescript
const HomePage: React.FC = () => {
  return (
    <>
      <FloatingShapes />      // Elementos animados globales
      <HeroSection />         // Sección principal
      <OverviewSection />     // Servicios con navegación
      <IASection />           // Secciones específicas
      <ChatBotSection />
      <ContactCTA />          // Llamada a la acción
    </>
  )
}
```

### Gestión de Estado
- **Local**: useState, useReducer
- **Formularios**: React Hook Form
- **Animaciones**: Framer Motion state
- **Scroll**: useScroll, useTransform

### Optimizaciones de Performance
```javascript
// vite.config.js - Code splitting
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom'],
        animations: ['framer-motion'],
        three: ['@react-three/fiber', '@react-three/drei', 'three'],
        icons: ['lucide-react'],
        routing: ['react-router-dom']
      }
    }
  }
}
```

---

## 📊 SEO y Analytics

### SEO Técnico
1. **Meta Tags Dinámicos**
   ```typescript
   <Helmet>
     <title>Título específico por página</title>
     <meta name="description" content="Descripción optimizada" />
     <meta property="og:title" content="Open Graph" />
   </Helmet>
   ```

2. **Structured Data**
   ```javascript
   const structuredData = {
     "@context": "https://schema.org",
     "@type": "Organization",
     "name": "D-web",
     // ... más propiedades
   }
   ```

3. **Sitemap y Robots**
   - `public/sitemap.xml`: URLs principales con prioridades
   - `public/robots.txt`: Directivas para crawlers

### Google Analytics 4
```typescript
// utils/analytics.ts
export const trackEvent = (action: string, category: string, label?: string) => {
  gtag('event', action, {
    event_category: category,
    event_label: label
  })
}

// Eventos específicos
export const trackContactForm = () => trackEvent('form_submit', 'contact')
export const trackCTAClick = (cta: string) => trackEvent('click', 'cta', cta)
```

---

## 📖 Guía de Reutilización

### Para Crear un Nuevo Proyecto Similar

#### 1. Clonar Estructura Base
```bash
# Copiar archivos de configuración esenciales
cp vite.config.ts nuevo-proyecto/
cp tailwind.config.js nuevo-proyecto/
cp docker-compose.yml nuevo-proyecto/
cp Dockerfile nuevo-proyecto/
cp -r scripts/ nuevo-proyecto/
```

#### 2. Adaptar Configuraciones
- **package.json**: Cambiar name, description, scripts si necesario
- **firebase.json**: Configurar nuevo proyecto Firebase
- **tailwind.config.js**: Ajustar colores de marca
- **vite.config.ts**: Modificar chunks según dependencias

#### 3. Estructura de Componentes Reusables
```typescript
// Componentes base reutilizables
- HeroSection (adaptable con props)
- OverviewSection (modificar tarjetas según servicios)
- ContactCTA (personalizar copy y enlaces)
- FloatingShapes (efectos de fondo universales)
```

#### 4. Sistema de Diseño Personalizable
```javascript
// En tailwind.config.js - cambiar paleta de marca
colors: {
  primary: {
    400: '#tu-color-principal',
    500: '#tu-color-secundario',
    600: '#tu-color-acento'
  }
}

// Gradientes coherentes
'from-primary-500 to-primary-600'
```

#### 5. Servicios Externos a Configurar
- **EmailJS**: Crear cuenta y configurar templates
- **Google Analytics**: Crear propiedad GA4
- **Firebase Hosting**: Configurar proyecto
- **WhatsApp Business**: Configurar número de contacto

### Checklist de Configuración Nueva
- [ ] Configurar variables de entorno (.env)
- [ ] Adaptar meta tags y SEO por industria
- [ ] Personalizar paleta de colores en Tailwind
- [ ] Configurar EmailJS con templates específicos
- [ ] Crear proyecto Firebase y actualizar configs
- [ ] Adaptar sitemap.xml con nuevas URLs
- [ ] Configurar Google Analytics 4
- [ ] Personalizar favicon y assets de marca
- [ ] Adaptar copy y contenido por industria
- [ ] Configurar Docker con puertos específicos

### Mantenimiento y Actualizaciones
- **Dependencias**: Revisar actualizaciones mensuales
- **SEO**: Monitorear Google Search Console
- **Performance**: Usar Lighthouse y Web Vitals
- **Analytics**: Revisar métricas semanalmente
- **Seguridad**: Auditorías npm regulares

---

## 🎯 Ventajas de Este Stack

### Desarrollo
- ✅ **Hot Reload Instantáneo** con Vite
- ✅ **Tipado Seguro** con TypeScript
- ✅ **Componentes Reutilizables** con React
- ✅ **Animaciones Declarativas** con Framer Motion

### Producción
- ✅ **Build Optimizado** con chunking automático
- ✅ **Deploy Automático** con scripts
- ✅ **CDN Global** con Firebase Hosting
- ✅ **Performance Excelente** (90+ Lighthouse)

### Mantenimiento
- ✅ **Contenedores Reproducibles** con Docker
- ✅ **Documentación Completa** con CLAUDE.md
- ✅ **Estructura Escalable** y modular
- ✅ **SEO y Analytics Integrados**

---

Este documento sirve como blueprint completo para replicar la arquitectura, metodologías y patrones utilizados en D-web en futuros proyectos web similares.