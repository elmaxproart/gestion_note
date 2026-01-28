
CREATE TABLE etudiants (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO etudiants (nom, prenom, email) VALUES
    ('maxym', 'tene', 'maxym.tene@gmail.com'), 
    ('Ngongan', 'yann', 'yann.ngongan@gmail.com'),
    ('pafing', 'ndine', 'pafing.ndine@gmail.com')
ON CONFLICT (email) DO NOTHING;