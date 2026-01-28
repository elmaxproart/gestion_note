# 🐳 Guide Docker - Gestion des Notes

Ce guide explique comment utiliser Docker et Docker Compose pour déployer les applications.

## Prérequis

- Docker installé (version 20.10+)
- Docker Compose installé (version 2.0+)

## 🚀 Démarrage rapide

### Option 1 : Architecture Monolithique

```bash
cd monolitique
docker-compose up --build
```

**Services disponibles** :
- Frontend : http://localhost:5173
- Backend API : http://localhost:3001
- PostgreSQL : localhost:5432

**Pour arrêter** :
```bash
docker-compose down
```

**Pour arrêter et supprimer les volumes** :
```bash
docker-compose down -v
```

---

### Option 2 : Architecture Microservices

```bash
cd microservices
docker-compose up --build
```

**Services disponibles** :
- Frontend : http://localhost:5174
- Service Étudiants : http://localhost:3002
- Service Notes : http://localhost:3003
- PostgreSQL Étudiants : localhost:5433
- PostgreSQL Notes : localhost:5434

**Pour arrêter** :
```bash
docker-compose down
```

**Pour arrêter et supprimer les volumes** :
```bash
docker-compose down -v
```

---

## 📦 Structure Docker

### Monolithique

```
monolitique/
├── docker-compose.yml       # Orchestration des services
├── backend/
│   ├── Dockerfile          # Image Node.js pour l'API
│   └── .dockerignore
└── frontend/
    ├── Dockerfile          # Image Node.js pour React
    └── .dockerignore
```

**Services Docker** :
1. `postgres` - Base de données PostgreSQL
2. `backend` - API Express (Port 3001)
3. `frontend` - Application React (Port 5173)

### Microservices

```
microservices/
├── docker-compose.yml           # Orchestration complète
├── student-service/
│   ├── Dockerfile
│   └── .dockerignore
├── notes-service/
│   ├── Dockerfile
│   └── .dockerignore
└── frontend/
    ├── Dockerfile
    └── .dockerignore
```

**Services Docker** :
1. `postgres-students` - Base de données étudiants (Port 5433)
2. `postgres-notes` - Base de données notes (Port 5434)
3. `student-service` - Microservice étudiants (Port 3002)
4. `notes-service` - Microservice notes (Port 3003)
5. `frontend` - Application React (Port 5174)

---

## 🔧 Commandes utiles

### Voir les logs

```bash
# Tous les services
docker-compose logs -f

# Un service spécifique
docker-compose logs -f backend
docker-compose logs -f student-service
```

### Reconstruire les images

```bash
# Forcer la reconstruction
docker-compose up --build --force-recreate
```

### Lister les conteneurs

```bash
docker-compose ps
```

### Accéder à un conteneur

```bash
# Monolithique
docker exec -it monolitique-backend sh
docker exec -it monolitique-postgres psql -U postgres -d gestion_notes_mono

# Microservices
docker exec -it microservices-student-service sh
docker exec -it microservices-postgres-students psql -U postgres -d students_db
```

### Nettoyer complètement

```bash
# Arrêter et supprimer tout (conteneurs, réseaux, volumes, images)
docker-compose down -v --rmi all
```

---

## 🗄️ Volumes Docker

Les données PostgreSQL sont persistées dans des volumes Docker :

### Monolithique
- `monolitique_postgres_data` - Données de la base monolithique

### Microservices
- `microservices_postgres_students_data` - Données des étudiants
- `microservices_postgres_notes_data` - Données des notes

**Lister les volumes** :
```bash
docker volume ls
```

**Supprimer un volume** :
```bash
docker volume rm monolitique_postgres_data
```

---

## 🌐 Réseaux Docker

Chaque architecture utilise son propre réseau isolé :

- `monolitique-network` - Réseau pour l'architecture monolithique
- `microservices-network` - Réseau pour les microservices

Les services sur le même réseau peuvent communiquer entre eux par leur nom de service.

---

## 🔐 Variables d'environnement

Les configurations sont gérées via des variables d'environnement dans `docker-compose.yml` :

### Backend / Services

```yaml
environment:
  - NODE_ENV=production
  - DB_HOST=postgres
  - DB_PORT=5432
  - DB_USER=postgres
  - DB_PASSWORD=postgres
  - DB_NAME=gestion_notes_mono
```

Pour personnaliser, vous pouvez créer un fichier `.env` ou modifier `docker-compose.yml`.

---

## 🐛 Dépannage

### Problème : Port déjà utilisé

```bash
# Vérifier les ports utilisés
netstat -ano | findstr :5432
netstat -ano | findstr :3001

# Modifier le port dans docker-compose.yml
ports:
  - "5555:5432"  # Utilise le port 5555 au lieu de 5432
```

### Problème : Base de données non initialisée

```bash
# Supprimer le volume et redémarrer
docker-compose down -v
docker-compose up --build
```

### Problème : Erreur de connexion à la base

- Vérifier que le service PostgreSQL est en `healthy` :
  ```bash
  docker-compose ps
  ```
- Vérifier les logs :
  ```bash
  docker-compose logs postgres
  ```

---

## 🚀 Déploiement en production

### Recommandations

1. **Utiliser des secrets** au lieu de mots de passe en clair
2. **Configurer HTTPS** avec un reverse proxy (nginx, traefik)
3. **Limiter les ressources** des conteneurs
4. **Sauvegarder les volumes** régulièrement
5. **Utiliser Docker Swarm ou Kubernetes** pour l'orchestration

### Exemple avec limites de ressources

```yaml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

---

## 📊 Monitoring

### Statistiques des conteneurs

```bash
# En temps réel
docker stats

# Pour un conteneur spécifique
docker stats monolitique-backend
```

### Health checks

Les services PostgreSQL incluent des health checks automatiques. Les autres services démarrent uniquement quand la base est prête.

---

## 🎯 Avantages de Docker

✅ **Portabilité** : Fonctionne partout (Windows, Mac, Linux)  
✅ **Isolation** : Chaque service dans son propre conteneur  
✅ **Reproductibilité** : Même environnement en dev et prod  
✅ **Scalabilité** : Facile de répliquer les services  
✅ **Gestion des dépendances** : Tout inclus dans l'image  
