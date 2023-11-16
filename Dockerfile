FROM node:18-alpine

WORKDIR /app
# seteamos el directorio del container a /app

COPY package.json ./

RUN npm install

COPY . .
# copiamos el resto de la aplicacion al directorio, incluye todos los archivos menos los aclarados en el .dockerignore
RUN npm run build

COPY .next ./.next
# copiamos la carpeta .next que se genera al iniciar el proyecto al directorio
CMD ["npm", "run", "dev"]