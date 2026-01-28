# Architecture Comparison

## Architecture Monolithique

```
┌─────────────────────────────────────────┐
│         Frontend React (Port 5173)      │
│         Thème: Violet/Bleu              │
└───────────────┬─────────────────────────┘
                │ HTTP/REST
                │
┌───────────────▼─────────────────────────┐
│         Backend Express (Port 3001)     │
│  ┌──────────────┬─────────────────┐     │
│  │ Routes       │ Routes          │     │
│  │ /etudiants   │ /notes          │     │
│  └──────────────┴─────────────────┘     │
└───────────────┬─────────────────────────┘
                │ PostgreSQL Driver
                │
┌───────────────▼─────────────────────────┐
│    PostgreSQL: gestion_notes_mono       │
│  ┌──────────────┬─────────────────┐     │
│  │ etudiants    │ notes           │     │
│  │ (id, nom,    │ (id, matiere,   │     │
│  │  prenom,     │  note,          │     │
│  │  email)      │  etudiant_id)   │     │
│  └──────────────┴─────────────────┘     │
└─────────────────────────────────────────┘
```

**Avantages** :
- Déploiement simple (1 serveur)
- Transactions ACID faciles
- Moins de latence réseau
- Code centralisé

**Inconvénients** :
- Couplage fort
- Scaling uniquement vertical
- Point de défaillance unique
- Déploiement monobloc

---

## Architecture Microservices

```
┌──────────────────────────────────────────────────┐
│         Frontend React (Port 5174)               │
│         Thème: Rose/Violet                       │
└────────────┬────────────────────┬────────────────┘
             │                    │
             │ HTTP/REST          │ HTTP/REST
             │                    │
┌────────────▼───────────┐  ┌────▼────────────────┐
│  Student Service       │  │  Notes Service      │
│  (Port 3002)           │  │  (Port 3003)        │
│  ┌──────────────────┐  │  │  ┌───────────────┐  │
│  │ Routes           │  │  │  │ Routes        │  │
│  │ /etudiants       │  │  │  │ /notes        │  │
│  └──────────────────┘  │  │  └───────────────┘  │
└────────────┬───────────┘  └────┬────────────────┘
             │                   │
             │ PG Driver         │ PG Driver
             │                   │
┌────────────▼───────────┐  ┌───▼─────────────────┐
│ PostgreSQL             │  │ PostgreSQL          │
│ students_db            │  │ notes_db            │
│  ┌──────────────────┐  │  │  ┌───────────────┐  │
│  │ etudiants        │  │  │  │ notes         │  │
│  │ (id, nom,        │  │  │  │ (id, matiere, │  │
│  │  prenom, email)  │  │  │  │  note,        │  │
│  └──────────────────┘  │  │  │  etudiant_id) │  │
│                        │  │  └───────────────┘  │
└────────────────────────┘  └─────────────────────┘
```

**Avantages** :
- Scaling horizontal indépendant
- Isolation des pannes
- Déploiement indépendant
- Technologies différentes possibles
- Équipes autonomes

**Inconvénients** :
- Complexité opérationnelle
- Latence réseau accrue
- Transactions distribuées complexes
- Duplication de code possible
- Infrastructure plus lourde

---

## Ports utilisés

| Service | Monolithique | Microservices |
|---------|--------------|---------------|
| **Frontend** | 5173 | 5174 |
| **Backend Principal** | 3001 | - |
| **Service Étudiants** | - | 3002 |
| **Service Notes** | - | 3003 |

---

## Flux de données

### Monolithique - Créer une note

```
Frontend → Backend (3001) → PostgreSQL (gestion_notes_mono)
   ↑                                         ↓
   └─────────────── Réponse ─────────────────┘
```

### Microservices - Créer une note

```
Frontend → Service Notes (3003) → PostgreSQL (notes_db)
   ↑             ↓                      ↓
   │         (Valide)                   │
   │             ↓                      │
   └────── Réponse ─────────────────────┘

Note: Le frontend doit d'abord récupérer la liste des étudiants
      depuis le Service Étudiants (3002) pour remplir le dropdown
```

---

## Comparaison de performance

| Opération | Monolithique | Microservices |
|-----------|--------------|---------------|
| **Créer un étudiant** | 1 requête | 1 requête |
| **Créer une note** | 1 requête | 1 requête* |
| **Afficher les notes** | 1 requête (JOIN) | 2 requêtes** |
| **Latence** | ~10-20ms | ~20-40ms |

\* Nécessite d'avoir récupéré la liste des étudiants au préalable  
** Une requête pour les notes + une pour les étudiants (pour afficher les noms)

---

## Évolutivité

### Scénario : 10x plus d'utilisateurs

**Monolithique** :
```
1 serveur → 10 serveurs identiques (load balancer)
           + 1 BDD plus puissante
```

**Microservices** :
```
Si seulement les consultations de notes augmentent:
- Service Notes: 1 → 10 instances
- Service Étudiants: 1 instance (inchangé)
- BDD Notes: scaling horizontal possible
- BDD Étudiants: inchangée
```

**Économies** : Microservices plus économique si un seul service est sollicité
