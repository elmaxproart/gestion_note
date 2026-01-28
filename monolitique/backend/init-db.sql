
CREATE TABLE IF NOT EXISTS etudiants (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY,
    etudiant_id INTEGER NOT NULL REFERENCES etudiants(id) ON DELETE CASCADE,
    matiere VARCHAR(100) NOT NULL,
    note DECIMAL(5,2) NOT NULL CHECK (note >= 0 AND note <= 20),
    date_evaluation DATE DEFAULT CURRENT_DATE,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO etudiants (nom, prenom, email) VALUES
    ('maxym', 'tene', 'maxym.tene@gmail.com'), 
    ('Ngongan', 'yann', 'yann.ngongan@gmail.com'),
    ('pafing', 'ndine', 'pafing.ndine@gmail.com')
ON CONFLICT (email) DO NOTHING;

INSERT INTO notes (etudiant_id, matiere, note) VALUES
    (1, 'Mathématiques', 15.5),
    (1, 'Physique', 14.0),
    (2, 'Mathématiques', 17.5),
    (2, 'Informatique', 18.0),
    (3, 'Physique', 12.5)
ON CONFLICT DO NOTHING;
