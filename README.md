# 🎓 Système de Gestion des Notes

Ce projet contient deux implémentations d'un système de gestion des notes pour étudiants :

1. **Architecture Monolithique** (`/monolitique`)
2. **Architecture Microservices** (`/microservices`)

## 📁 Structure du projet

```
test/
├── monolitique/
│   ├── backend/          # API Node.js + Express
│   │   ├── src/
│   │   ├── package.json
│   │   └── init-db.sql
│   ├── frontend/         # React + Vite
│   │   ├── src/
│   │   ├── package.json
│   │   └── index.html
│   └── README.md
│
└── microservices/
    ├── student-service/  # Service Étudiants (Port 3002)
    │   ├── src/
    │   ├── package.json
    │   └── init-db.sql
    ├── notes-service/    # Service Notes (Port 3003)
    │   ├── src/
    │   ├── package.json
    │   └── init-db.sql
    ├── frontend/         # React + Vite (Port 5174)
    │   ├── src/
    │   ├── package.json
    │   └── index.html
    └── README.md
```

## 🎯 Objectif

Comparer deux architectures différentes pour un même cas d'usage :
- Gestion des étudiants
- Gestion des notes

## 🚀 Démarrage rapide

### Monolithique

```bash
cd monolitique

```

### Microservices

```bash
cd microservices
```

## 🔍 Comparaison des architectures

### Architecture Monolithique

**Avantages :**
- Plus simple à déployer
- Moins de overhead réseau
- Transactions ACID simplement gérées
- Parfait pour des petits projets

**Inconvénients :**
- Scaling horizontal plus difficile
- Couplage fort entre les modules
- Impossibilité de déployer indépendamment les fonctionnalités

### Architecture Microservices

**Avantages :**
- Scaling indépendant des services
- Isolation des pannes
- Flexibilité technologique
- Déploiement indépendant

**Inconvénients :**
- Plus complexe à gérer
- Overhead réseau
- Gestion des transactions distribuées plus complexe

## 🗄️ Bases de données

- **Monolithique** : 1 base de données (`gestion_notes_mono`)
- **Microservices** : 2 bases de données (`students_db`, `notes_db`)

Toutes utilisent PostgreSQL avec l'utilisateur `postgres`.

## 🎨 Interfaces

Les deux frontends ont des interfaces similaires mais avec des couleurs différentes :
- **Monolithique** : Thème violet/bleu
- **Microservices** : Thème rose/violet

## 📝 Fonctionnalités

Les deux implémentations offrent les mêmes fonctionnalités :
- ✅ CRUD complet pour les étudiants
- ✅ CRUD complet pour les notes
- ✅ Interface
- ✅ Validation des données

## 🛠️ Technologies utilisées

- **Backend** : Node.js, Express.js
- **Frontend** : React, Vite
- **Base de données** : PostgreSQL
- **CSS** : Vanilla CSS avec gradients modernes
