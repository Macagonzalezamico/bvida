# Dockerfile para frontend Vite - Desarrollo
FROM node:20-slim
WORKDIR /app
COPY package*.json ./
COPY vite.config.* ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "4000"] 