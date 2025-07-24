# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a premium full-stack booking application for "El Paraíso" - a luxury vacation rental service that manages cabins (cabañas) and fishing (pesca) bookings. The project features a sophisticated React TypeScript frontend with premium UI components and an Express.js backend with MongoDB. The application is designed to provide a first-class hotel chain experience with elegant branding and premium user interactions.

## Architecture

- **Frontend**: React 19 + TypeScript + Vite development server
  - Located in `/frontend/`
  - Premium UI with custom luxury components
  - Premium typography: Playfair Display (headings), Inter (body), Crimson Text (accents)
  - Sophisticated color palette: Gold (#D4AF37), Navy (#2C5F7F), Earth tones
  - Advanced animations and glass morphism effects
  - React Router for navigation
  - Pages: Home, Cabañas, Pesca, Reservas, Contacto
  
- **Backend**: Express.js REST API
  - Located in `/backend/`
  - MongoDB with Mongoose ODM
  - MercadoPago integration for payments
  - Models: User, Cabana, Pesca, Reserva
  - Routes: users, cabanas, pesca, reservas, pagos

- **Database**: MongoDB (via Docker)
- **Containerization**: Docker Compose setup

## Development Commands

### Frontend (run from /frontend/)
```bash
npm run dev          # Start Vite development server with premium components
npm run build        # Build for production (TypeScript compile + Vite build)
npm run lint         # Run ESLint with premium code standards
npm run preview      # Preview production build with luxury assets
```

### Premium Development Notes
- Always test premium animations on different devices
- Ensure glass morphism effects work across browsers
- Verify luxury typography renders correctly
- Test premium color contrasts for accessibility
- Validate sophisticated animations perform smoothly

### Backend (run from /backend/)
```bash
npm start            # Start Express server (production mode)
```

### Full Application
```bash
docker-compose up    # Start all services (frontend:4000, backend:5000, mongo:27017)
```

## Key Configurations

- **Frontend Port**: 4000 (Docker), dev server varies
- **Backend Port**: 5000
- **MongoDB**: Port 27017
- **Environment Variables**: 
  - `MONGODB_URI`: MongoDB connection string
  - `MERCADOPAGO_TOKEN`: Payment processing token
  - `FRONTEND_URL`: CORS configuration

## Code Patterns

### Backend Routes
- All routes follow REST conventions
- Use async/await for database operations
- Models are Mongoose schemas with validation
- Routes are modular (one file per resource)

### Frontend Components
- TypeScript with strict typing and premium interfaces
- Functional components with advanced hooks
- Premium CSS with luxury design system
- Custom glass morphism components (GlassCard, SunsetButton)
- Sophisticated animations and transitions
- Advanced backdrop filters and premium effects
- React Router for client-side routing
- Responsive design optimized for all devices

### Database Models
- User: nombre, email, telefono, esAdmin
- Reserva: booking model with payment tracking
- Cabana & Pesca: rental property models

## Premium Design System

### Color Palette
- **Primary Gold**: #D4AF37 (Elegant gold for luxury elements)
- **Champagne**: #E6C85C (Light gold accents)
- **Navy Blue**: #2C5F7F (Sophisticated blue for contrast)
- **Steel Blue**: #4A7BA7 (Secondary blue tones)
- **Earth Brown**: #8B4513 (Warm accent color)
- **Neutral Cream**: #F8F6F0 (Background base)
- **Deep Charcoal**: #1A1A1A (Premium text)

### Typography
- **Headings**: Playfair Display (serif, elegant)
- **Body Text**: Inter (sans-serif, modern)
- **Accents**: Crimson Text (serif, sophisticated)
- **Font weights**: 300-900 range for flexibility
- **Letter spacing**: Optimized for luxury feel

### Components
- **GlassCard**: Premium glass morphism component with advanced blur effects
- **SunsetButton**: Luxury button with gradient backgrounds and premium animations
- **AnimatedBackground**: Sophisticated day/night cycle with 180s duration
- **Premium animations**: Cubic-bezier timing functions for smooth transitions

### Animation System
- **Luxury atmosphere**: 180-second premium background cycle
- **Premium sun journey**: Sophisticated solar path animation
- **Elegant cloud movement**: 25-second smooth float cycles
- **Advanced wave motion**: Multi-layer ocean animation
- **Premium particles**: 6-second elegant floating effects

## Important Notes

- The application provides a luxury hotel chain experience
- Premium branding throughout all user interactions
- Advanced glass morphism and backdrop filters
- Sophisticated animation system for premium feel
- MercadoPago integration requires proper token configuration
- MongoDB connection uses environment variables for flexibility
- Frontend uses cutting-edge React patterns (React 19, TypeScript, Vite)
- All components designed for premium user experience