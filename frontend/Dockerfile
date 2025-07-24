# Dockerfile para frontend Vite
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
COPY vite.config.* ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-slim
WORKDIR /app
COPY --from=build /app/dist ./dist
RUN npm install -g serve
EXPOSE 4000
CMD ["serve", "-s", "dist", "-l", "4000"] 