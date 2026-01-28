# 🧪 Guide de Test - Système de Gestion des Notes

Ce guide explique comment tester les deux architectures (monolithique et microservices).

## 📋 Prérequis

Choisissez **UNE** des deux options :

### Option 1 : Avec Docker (Recommandé - Plus simple)
- ✅ Docker Desktop installé et démarré
- ✅ Aucune installation de PostgreSQL ou Node.js requise

### Option 2 : Sans Docker (Installation locale)
- ✅ Node.js 18+ installé
- ✅ PostgreSQL installé et démarré
- ✅ npm ou yarn

---

## 🐳 Option 1 : Test avec Docker (Recommandé)

C'est la méthode la plus simple car tout est automatique !

### Test de l'architecture Monolithique

```powershell
# 1. Aller dans le dossier monolithique
cd C:\Users\PC\Downloads\test\monolitique

# 2. Démarrer tous les services
docker-compose up --build
```

**Ce qui se passe** :
- 📦 Docker télécharge les images nécessaires
- 🗄️ Crée et initialise la base de données PostgreSQL
- 🔧 Installe les dépendances Node.js
- 🚀 Démarre le backend (API)
- 🌐 Démarre le frontend (React)

**Attendez de voir** :
```
monolitique-postgres   | database system is ready to accept connections
monolitique-backend    | Serveur monolithique démarré sur http://localhost:3001
monolitique-frontend   | ready in XXX ms
```

**Accès** :
- Frontend : http://localhost:5173
- API : http://localhost:3001

### Test de l'architecture Microservices

```powershell
# 1. Arrêter le monolithique (Ctrl+C dans le terminal)
# 2. Aller dans le dossier microservices
cd C:\Users\PC\Downloads\test\microservices

# 3. Démarrer tous les services
docker-compose up --build
```

**Ce qui se passe** :
- 🗄️ Crée 2 bases de données PostgreSQL (étudiants + notes)
- 🔧 Démarre le service étudiants (Port 3002)
- 🔧 Démarre le service notes (Port 3003)
- 🌐 Démarre le frontend (Port 5174)

**Accès** :
- Frontend : http://localhost:5174
- Service Étudiants : http://localhost:3002
- Service Notes : http://localhost:3003

---

## 💻 Option 2 : Test sans Docker (Installation locale)

### Étape 1 : Initialiser les bases de données

```powershell
cd C:\Users\PC\Downloads\test

# Exécuter le script d'initialisation
.\setup-databases.ps1
```

Entrez le mot de passe PostgreSQL quand demandé.

### Étape 2 : Tester le Monolithique

**Terminal 1 - Backend** :
```powershell
cd C:\Users\PC\Downloads\test\monolitique\backend
npm install
npm start
```

Attendez : `Serveur monolithique démarré sur http://localhost:3001`

**Terminal 2 - Frontend** :
```powershell
cd C:\Users\PC\Downloads\test\monolitique\frontend
npm install
npm run dev
```

Attendez : `Local: http://localhost:5173/`

### Étape 3 : Tester les Microservices

**Terminal 1 - Service Étudiants** :
```powershell
cd C:\Users\PC\Downloads\test\microservices\student-service
npm install
npm start
```

**Terminal 2 - Service Notes** :
```powershell
cd C:\Users\PC\Downloads\test\microservices\notes-service
npm install
npm start
```

**Terminal 3 - Frontend** :
```powershell
cd C:\Users\PC\Downloads\test\microservices\frontend
npm install
npm run dev
```

---

## 🧪 Tests fonctionnels

Une fois l'application démarrée, testez ces scénarios :

### 1. Test des Étudiants

#### a) Affichage initial
- ✅ Ouvrez http://localhost:5173 (mono) ou http://localhost:5174 (micro)
- ✅ Cliquez sur l'onglet "👨‍🎓 Étudiants"
- ✅ Vérifiez que 3 étudiants s'affichent (données de test)

#### b) Ajouter un étudiant
1. Remplissez le formulaire :
   - Nom : `Leblanc`
   - Prénom : `Sophie`
   - Email : `sophie.leblanc@example.com`
2. Cliquez sur "Ajouter"
3. ✅ Vérifiez que l'étudiant apparaît dans la liste

#### c) Modifier un étudiant
1. Cliquez sur "Modifier" pour un étudiant
2. Changez le prénom
3. Cliquez sur "Mettre à jour"
4. ✅ Vérifiez que les modifications sont sauvegardées

#### d) Supprimer un étudiant
1. Cliquez sur "Supprimer" pour un étudiant
2. Confirmez la suppression
3. ✅ Vérifiez qu'il disparaît de la liste

### 2. Test des Notes

#### a) Affichage initial
- ✅ Cliquez sur l'onglet "📝 Notes"
- ✅ Vérifiez que 5 notes s'affichent

#### b) Ajouter une note
1. Remplissez le formulaire :
   - Étudiant : Sélectionnez dans la liste
   - Matière : `Chimie`
   - Note : `16.5`
2. Cliquez sur "Ajouter"
3. ✅ Vérifiez que la note apparaît

#### c) Validation
1. Essayez d'entrer une note > 20
2. ✅ Vérifiez que c'est rejeté
3. Essayez d'entrer une note < 0
4. ✅ Vérifiez que c'est rejeté

### 3. Test de persistance

1. Ajoutez un étudiant et une note
2. Rafraîchissez la page (F5)
3. ✅ Vérifiez que les données sont toujours là

### 4. Test de la suppression en cascade (Monolithique uniquement)

1. Créez un étudiant
2. Créez une note pour cet étudiant
3. Supprimez l'étudiant
4. ✅ Vérifiez que la note est aussi supprimée

---

## 🔍 Test des APIs directement

Utilisez un outil comme **Postman**, **Insomnia**, ou **curl**.

### Monolithique (Port 3001)

#### GET - Liste des étudiants
```bash
curl http://localhost:3001/api/etudiants
```

**Réponse attendue** : JSON avec tableau d'étudiants

#### POST - Créer un étudiant
```bash
curl -X POST http://localhost:3001/api/etudiants \
  -H "Content-Type: application/json" \
  -d "{\"nom\":\"Test\",\"prenom\":\"User\",\"email\":\"test@example.com\"}"
```

#### GET - Liste des notes
```bash
curl http://localhost:3001/api/notes
```

#### POST - Créer une note
```bash
curl -X POST http://localhost:3001/api/notes \
  -H "Content-Type: application/json" \
  -d "{\"etudiant_id\":1,\"matiere\":\"Test\",\"note\":15.5}"
```

### Microservices

#### Service Étudiants (Port 3002)
```bash
curl http://localhost:3002/api/etudiants
```

#### Service Notes (Port 3003)
```bash
curl http://localhost:3003/api/notes
```

---

## 🗄️ Test de la base de données

### Avec Docker

```bash
# Monolithique
docker exec -it monolitique-postgres psql -U postgres -d gestion_notes_mono

# Microservices - Étudiants
docker exec -it microservices-postgres-students psql -U postgres -d students_db

# Microservices - Notes
docker exec -it microservices-postgres-notes psql -U postgres -d notes_db
```

### Sans Docker

```bash
# Monolithique
psql -U postgres -d gestion_notes_mono

# Microservices
psql -U postgres -d students_db
psql -U postgres -d notes_db
```

**Commandes SQL utiles** :
```sql
-- Voir les tables
\dt

-- Voir les étudiants
SELECT * FROM etudiants;

-- Voir les notes
SELECT * FROM notes;

-- Compter les enregistrements
SELECT COUNT(*) FROM etudiants;

-- Quitter
\q
```

---

## 📊 Test de performance (Optionnel)

### Avec Apache Bench

```bash
# Installer Apache Bench
# Windows: Inclus avec XAMPP ou télécharger Apache

# Test GET étudiants (1000 requêtes, 10 concurrentes)
ab -n 1000 -c 10 http://localhost:3001/api/etudiants
```

### Avec Artillery (Recommandé)

```bash
# Installer
npm install -g artillery

# Test de charge
artillery quick --count 10 --num 100 http://localhost:3001/api/etudiants
```

---

## 🐛 Dépannage

### Problème : "Port déjà utilisé"

**Avec Docker** :
```bash
# Voir ce qui utilise le port
netstat -ano | findstr :5432
netstat -ano | findstr :3001

# Tuer le processus (remplacer PID)
taskkill /PID <numéro_processus> /F
```

**Solution** : Modifier le port dans `docker-compose.yml` :
```yaml
ports:
  - "5555:5432"  # Utilise 5555 au lieu de 5432
```

### Problème : "Cannot connect to database"

**Vérifier que PostgreSQL est démarré** :
```bash
# Avec Docker
docker-compose ps

# Sans Docker (Windows)
services.msc  # Chercher "postgresql"
```

**Vérifier les logs** :
```bash
docker-compose logs postgres
```

### Problème : "Frontend ne se connecte pas à l'API"

1. Vérifiez que le backend est démarré
2. Ouvrez la console du navigateur (F12)
3. Cherchez les erreurs CORS ou réseau
4. Vérifiez les URLs dans le code frontend

### Problème : "npm install échoue"

```bash
# Nettoyer le cache npm
npm cache clean --force

# Supprimer node_modules
rm -rf node_modules
rm package-lock.json

# Réinstaller
npm install
```

---

## ✅ Checklist de test complète

### Tests fonctionnels
- [ ] Affichage initial des données (étudiants et notes)
- [ ] Ajout d'un étudiant
- [ ] Modification d'un étudiant
- [ ] Suppression d'un étudiant
- [ ] Ajout d'une note
- [ ] Modification d'une note
- [ ] Suppression d'une note
- [ ] Validation des formulaires (champs requis, email unique)
- [ ] Validation des notes (0-20)
- [ ] Persistance des données après refresh

### Tests techniques
- [ ] API accessible (Postman/curl)
- [ ] Base de données accessible (psql)
- [ ] Frontend responsive (mobile/desktop)
- [ ] Console navigateur sans erreur
- [ ] Logs backend sans erreur

### Tests Docker
- [ ] docker-compose up réussit
- [ ] Tous les conteneurs démarrent (docker ps)
- [ ] Health checks OK
- [ ] Volumes créés (docker volume ls)
- [ ] Réseaux créés (docker network ls)
- [ ] Restart après docker-compose down/up

### Comparaison architectures
- [ ] Monolithique fonctionne
- [ ] Microservices fonctionne
- [ ] Interfaces visuellement différentes (couleurs)
- [ ] Les deux affichent les mêmes fonctionnalités

---

## 🎯 Test de production (Avancé)

### 1. Build de production

```bash
# Frontend
cd frontend
npm run build
npm run preview

# Vérifier que le build fonctionne
```

### 2. Variables d'environnement

Créer un fichier `.env` :
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=votre_mot_de_passe
DB_NAME=gestion_notes_mono
NODE_ENV=production
```

### 3. Test de déploiement

Si vous avez un serveur :
```bash
# Cloner le repo
git clone https://github.com/elmaxproart/gestion_note.git
cd gestion_note

# Démarrer avec Docker
cd monolitique
docker-compose up -d

# Vérifier les logs
docker-compose logs -f
```

---

## 📈 Métriques de succès

Le système fonctionne correctement si :

✅ **Disponibilité** : Tous les services démarrent sans erreur  
✅ **Fonctionnalité** : CRUD complet opérationnel  
✅ **Performance** : Réponse < 500ms pour les requêtes API  
✅ **Persistance** : Données conservées après redémarrage  
✅ **UI/UX** : Interface réactive et sans bug visuel  
✅ **Isolation** : Les deux architectures fonctionnent indépendamment  

---

## 🎓 Prochaines étapes

Après avoir testé le système, vous pouvez :

1. **Améliorer** : Ajouter des fonctionnalités (recherche, tri, pagination)
2. **Sécuriser** : Ajouter authentification/autorisation
3. **Optimiser** : Ajouter du caching, indexation BDD
4. **Monitorer** : Intégrer des logs et métriques
5. **Déployer** : Mettre en production sur un cloud provider

Bon test ! 🚀
