# 🚀 Système de Gestion des Notes - Architecture Microservices

Application basée sur des microservices pour gérer les étudiants et leurs notes.

## 🏗️ Architecture

Cette application est composée de **3 services indépendants** :

1. **Service Étudiants** (Port 3002)
   - Base de données: `students_db`
   - Gestion des étudiants
   
2. **Service Notes** (Port 3003)
   - Base de données: `notes_db`
   - Gestion des notes
   
3. **Frontend** (Port 5174)
   - Interface React
   - Communique avec les deux services

## 📋 Prérequis

- Node.js (v18 ou supérieur)
- PostgreSQL installé et en cours d'exécution
- npm ou yarn

## 🚀 Installation

### 1. Créer les bases de données

Exécutez les scripts SQL pour chaque service :

```bash
# Base de données du service étudiants
psql -U postgres -f student-service/init-db.sql

# Base de données du service notes
psql -U postgres -f notes-service/init-db.sql
```

Entrez le mot de passe de l'utilisateur `postgres` lorsque demandé.

### 2. Installer les dépendances

```bash
# Service Étudiants
cd student-service
npm install

# Service Notes
cd ../notes-service
npm install

# Frontend
cd ../frontend
npm install
```

## ▶️ Démarrage

Démarrez chaque service dans un terminal séparé :

### Terminal 1 - Service Étudiants

```bash
cd student-service
npm start
```

Le service démarre sur `http://localhost:3002`

### Terminal 2 - Service Notes

```bash
cd notes-service
npm start
```

Le service démarre sur `http://localhost:3003`

### Terminal 3 - Frontend

```bash
cd frontend
npm run dev
```

L'application est accessible sur `http://localhost:5174`

## 🔌 API Endpoints

### Service Étudiants (Port 3002)

- `GET /api/etudiants` - Liste tous les étudiants
- `GET /api/etudiants/:id` - Récupère un étudiant par ID
- `POST /api/etudiants` - Crée un nouvel étudiant
- `PUT /api/etudiants/:id` - Met à jour un étudiant
- `DELETE /api/etudiants/:id` - Supprime un étudiant

### Service Notes (Port 3003)

- `GET /api/notes` - Liste toutes les notes
- `GET /api/notes/:id` - Récupère une note par ID
- `GET /api/notes/etudiant/:etudiantId` - Récupère les notes d'un étudiant
- `POST /api/notes` - Crée une nouvelle note
- `PUT /api/notes/:id` - Met à jour une note
- `DELETE /api/notes/:id` - Supprime une note

## 🗄️ Structure des bases de données

### Base `students_db` - Table `etudiants`

- `id` (SERIAL PRIMARY KEY)
- `nom` (VARCHAR)
- `prenom` (VARCHAR)
- `email` (VARCHAR UNIQUE)
- `date_creation` (TIMESTAMP)

### Base `notes_db` - Table `notes`

- `id` (SERIAL PRIMARY KEY)
- `etudiant_id` (INTEGER) - Référence l'ID étudiant du service étudiants
- `matiere` (VARCHAR)
- `note` (DECIMAL, 0-20)
- `date_evaluation` (DATE)
- `date_creation` (TIMESTAMP)

## 🎨 Fonctionnalités

- ✅ Architecture microservices découplée
- ✅ Services indépendants avec leur propre base de données
- ✅ Gestion complète des étudiants (CRUD)
- ✅ Gestion complète des notes (CRUD)
- ✅ Interface utilisateur moderne et réactive
- ✅ Communication entre services via API REST
- ✅ Interface en français

## 💡 Avantages de l'architecture microservices

- **Scalabilité** : Chaque service peut être dimensionné indépendamment
- **Isolation** : Une panne dans un service n'affecte pas les autres
- **Flexibilité technologique** : Possibilité d'utiliser différentes technologies par service
- **Déploiement indépendant** : Chaque service peut être déployé séparément
