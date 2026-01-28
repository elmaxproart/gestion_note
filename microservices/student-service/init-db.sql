-- Créer la base de données pour le service étudiants
CREATE DATABASE students_db;

-- Se connecter à la base de données
\c students_db;

-- Créer la table des étudiants
CREATE TABLE etudiants (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insérer des données de test
INSERT INTO etudiants (nom, prenom, email) VALUES
    ('Dupont', 'Jean', 'jean.dupont@example.com'),
    ('Martin', 'Marie', 'marie.martin@example.com'),
    ('Durand', 'Paul', 'paul.durand@example.com');
