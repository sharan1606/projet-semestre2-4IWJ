FROM node:20.15.0 AS build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Étape 2 : Serveur NGINX pour servir les fichiers statiques
FROM nginx:alpine

# Copier les fichiers générés dans le dossier dist/ vers le serveur NGINX
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copier la configuration personnalisée NGINX
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]