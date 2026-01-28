# 📚 Système de Gestion des Notes - Projet Monolithique

Application monolithique pour gérer les étudiants et leurs notes.

## 🏗️ Architecture

- **Backend**: Node.js + Express + PostgreSQL (Port 3001)
- **Frontend**: React + Vite (Port 5173)
- **Base de données**: PostgreSQL (`gestion_notes_mono`)

## 📋 Prérequis

- Node.js (v18 ou supérieur)
- PostgreSQL installé et en cours d'exécution
- npm ou yarn

## 🚀 Installation

### 1. Créer la base de données

Exécutez le script SQL pour créer la base de données :

```bash
psql -U postgres -f backend/init-db.sql
```

Entrez le mot de passe de l'utilisateur `postgres` lorsque demandé.

### 2. Installer les dépendances du backend

```bash
cd backend
npm install
```

### 3. Installer les dépendances du frontend

```bash
cd ../frontend
npm install
```

## ▶️ Démarrage

### Démarrer le backend

```bash
cd backend
npm start
```

Le serveur démarre sur `http://localhost:3001`

### Démarrer le frontend

Dans un nouveau terminal :

```bash
cd frontend
npm run dev
```

L'application est accessible sur `http://localhost:5173`

## 🔌 API Endpoints

### Étudiants

- `GET /api/etudiants` - Liste tous les étudiants
- `GET /api/etudiants/:id` - Récupère un étudiant par ID
- `POST /api/etudiants` - Crée un nouvel étudiant
- `PUT /api/etudiants/:id` - Met à jour un étudiant
- `DELETE /api/etudiants/:id` - Supprime un étudiant

### Notes

- `GET /api/notes` - Liste toutes les notes (avec infos étudiants)
- `GET /api/notes/:id` - Récupère une note par ID
- `GET /api/notes/etudiant/:etudiantId` - Récupère les notes d'un étudiant
- `POST /api/notes` - Crée une nouvelle note
- `PUT /api/notes/:id` - Met à jour une note
- `DELETE /api/notes/:id` - Supprime une note

## 🗄️ Structure de la base de données

### Table `etudiants`

- `id` (SERIAL PRIMARY KEY)
- `nom` (VARCHAR)
- `prenom` (VARCHAR)
- `email` (VARCHAR UNIQUE)
- `date_creation` (TIMESTAMP)

### Table `notes`

- `id` (SERIAL PRIMARY KEY)
- `etudiant_id` (INTEGER, clé étrangère)
- `matiere` (VARCHAR)
- `note` (DECIMAL, 0-20)
- `date_evaluation` (DATE)
- `date_creation` (TIMESTAMP)

## 🎨 Fonctionnalités

- ✅ Gestion complète des étudiants (CRUD)
- ✅ Gestion complète des notes (CRUD)
- ✅ Interface utilisateur moderne et réactive
- ✅ Validation des données côté serveur et client
- ✅ Interface en français
