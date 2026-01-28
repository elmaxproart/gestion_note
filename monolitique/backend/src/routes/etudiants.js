import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// GET tous les étudiants
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM etudiants ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// GET un étudiant par ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM etudiants WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Étudiant non trouvé' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// POST créer un étudiant
router.post('/', async (req, res) => {
    try {
        const { nom, prenom, email } = req.body;
        const result = await pool.query(
            'INSERT INTO etudiants (nom, prenom, email) VALUES ($1, $2, $3) RETURNING *',
            [nom, prenom, email]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// PUT modifier un étudiant
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, prenom, email } = req.body;
        const result = await pool.query(
            'UPDATE etudiants SET nom = $1, prenom = $2, email = $3 WHERE id = $4 RETURNING *',
            [nom, prenom, email, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Étudiant non trouvé' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// DELETE supprimer un étudiant
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM etudiants WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Étudiant non trouvé' });
        }
        res.json({ message: 'Étudiant supprimé avec succès' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

export default router;
