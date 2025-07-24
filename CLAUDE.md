# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack booking application for "El Paraíso" - a vacation rental service that manages cabins (cabañas) and fishing (pesca) bookings. The project uses a React TypeScript frontend with Chakra UI and an Express.js backend with MongoDB.

## Architecture

- **Frontend**: React 19 + TypeScript + Vite development server
  - Located in `/frontend/`
  - Uses Chakra UI component library
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
npm run dev          # Start Vite development server
npm run build        # Build for production (TypeScript compile + Vite build)
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

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
- TypeScript with strict typing
- Functional components with hooks
- CSS modules for styling
- React Router for client-side routing

### Database Models
- User: nombre, email, telefono, esAdmin
- Reserva: booking model with payment tracking
- Cabana & Pesca: rental property models

## Important Notes

- The application handles reservation management and payment processing
- MercadoPago integration requires proper token configuration
- MongoDB connection uses environment variables for flexibility
- Frontend uses modern React patterns (React 19, TypeScript, Vite)