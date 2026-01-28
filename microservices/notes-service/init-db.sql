
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    etudiant_id INTEGER NOT NULL,
    matiere VARCHAR(100) NOT NULL,
    note DECIMAL(5,2) NOT NULL CHECK (note >= 0 AND note <= 20),
    date_evaluation DATE DEFAULT CURRENT_DATE,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO notes (etudiant_id, matiere, note) VALUES
    (1, 'Mathématiques', 15.5),
    (1, 'Physique', 14.0),
    (2, 'Mathématiques', 17.5),
    (2, 'Informatique', 18.0),
    (3, 'Physique', 12.5);
