# 🚀 Guide de Démarrage Rapide

## Démarrer le projet avec Docker

### Monolithique

```powershell
# 1. Nettoyer (si vous avez déjà lancé)
cd C:\Users\PC\Downloads\test\monolitique
docker-compose down -v

# 2. Démarrer
docker-compose up --build

# 3. Ouvrir dans le navigateur
# http://localhost:5173
```

### Microservices

```powershell
# 1. Nettoyer (si vous avez déjà lancé)
cd C:\Users\PC\Downloads\test\microservices
docker-compose down -v

# 2. Démarrer
docker-compose up --build

# 3. Ouvrir dans le navigateur
# http://localhost:5174
```

## 🐛 Si vous avez des erreurs

### Erreur "port already allocated"

PostgreSQL local utilise déjà le port. Le monolithique utilise maintenant le port 5435 au lieu de 5432.

### Erreur "database already exists"

```powershell
# Nettoyer complètement
docker-compose down -v
docker system prune -f

# Puis relancer
docker-compose up --build
```

### Erreur avec les conteneurs

```powershell
# Arrêter tous les conteneurs Docker
docker stop $(docker ps -aq)

# Supprimer tous les conteneurs
docker rm $(docker ps -aq)

# Supprimer tous les volumes
docker volume prune -f

# Relancer
docker-compose up --build
```

## ✅ Le système fonctionne quand vous voyez :

```
monolitique-postgres  | database system is ready to accept connections
monolitique-backend   | Serveur monolithique démarré sur http://localhost:3001
monolitique-frontend  | ready in XXX ms
```

Puis ouvrez **http://localhost:5173** dans votre navigateur !
