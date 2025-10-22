# Frontend Dockerfile 
FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar sólo dependencias
COPY package*.json ./

# Instalar dependencias en la imagen
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto que la app escucha
EXPOSE 5173

# Comando por defecto al iniciar el contenedor
CMD ["npm", "run", "dev", "--", "--host"]
