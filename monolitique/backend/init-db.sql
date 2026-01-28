-- Créer la base de données pour l'application monolithique
CREATE DATABASE gestion_notes_mono;

-- Se connecter à la base de données
\c gestion_notes_mono;

-- Créer la table des étudiants
CREATE TABLE etudiants (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Créer la table des notes
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    etudiant_id INTEGER NOT NULL REFERENCES etudiants(id) ON DELETE CASCADE,
    matiere VARCHAR(100) NOT NULL,
    note DECIMAL(5,2) NOT NULL CHECK (note >= 0 AND note <= 20),
    date_evaluation DATE DEFAULT CURRENT_DATE,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insérer des données de test
INSERT INTO etudiants (nom, prenom, email) VALUES
    ('Dupont', 'Jean', 'jean.dupont@example.com'),
    ('Martin', 'Marie', 'marie.martin@example.com'),
    ('Durand', 'Paul', 'paul.durand@example.com');

INSERT INTO notes (etudiant_id, matiere, note) VALUES
    (1, 'Mathématiques', 15.5),
    (1, 'Physique', 14.0),
    (2, 'Mathématiques', 17.5),
    (2, 'Informatique', 18.0),
    (3, 'Physique', 12.5);
