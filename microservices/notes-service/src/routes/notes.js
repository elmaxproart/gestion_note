import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// GET toutes les notes
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM notes ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// GET une note par ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM notes WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Note non trouvée' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// GET notes d'un étudiant
router.get('/etudiant/:etudiantId', async (req, res) => {
    try {
        const { etudiantId } = req.params;
        const result = await pool.query(
            'SELECT * FROM notes WHERE etudiant_id = $1 ORDER BY date_evaluation DESC',
            [etudiantId]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// POST créer une note
router.post('/', async (req, res) => {
    try {
        const { etudiant_id, matiere, note } = req.body;
        const result = await pool.query(
            'INSERT INTO notes (etudiant_id, matiere, note) VALUES ($1, $2, $3) RETURNING *',
            [etudiant_id, matiere, note]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// PUT modifier une note
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { etudiant_id, matiere, note } = req.body;
        const result = await pool.query(
            'UPDATE notes SET etudiant_id = $1, matiere = $2, note = $3 WHERE id = $4 RETURNING *',
            [etudiant_id, matiere, note, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Note non trouvée' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// DELETE supprimer une note
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM notes WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Note non trouvée' });
        }
        res.json({ message: 'Note supprimée avec succès' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

export default router;
