# Challenge S2 - Setup du Projet

Ce projet est une application web composée d'un backend en Node.js (avec MongoDB) et d'un frontend en Vue.js, tous deux orchestrés avec Docker et Docker Compose.

## Prérequis

- **Docker** et **Docker Compose** doivent être installés sur votre machine.
- Avoir un accès à une base de données MongoDB (ou un compte MongoDB Atlas pour un déploiement cloud et/ou MongoDB Compass).

## Initialisation du projet

Suivez les étapes ci-dessous pour cloner et configurer le projet.

### Étape 1 : Cloner le dépôt

Clonez ce dépôt en utilisant la commande suivante :

## git clone https://github.com/sharan1606/projet-semestre2-4IWJ.git
## cd projet-semestre2-4IWJ


### Étape 2 : Configurer les variables d'environnement

Créez un fichier .env à la racine du projet pour y placer les variables d'environnement du backend :

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/challenge_S2?retryWrites=true&w=majority
JWT_SECRET=votre_secret_jwt

### Étape 3 : Construire et démarrer les conteneurs Docker

Pour démarrer l'application, utilisez Docker Compose :

## docker-compose up --build