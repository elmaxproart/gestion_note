import express from 'express';
import cors from 'cors';
import etudiantsRoutes from './routes/etudiants.js';
import notesRoutes from './routes/notes.js';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/etudiants', etudiantsRoutes);
app.use('/api/notes', notesRoutes);

// Route de test
app.get('/', (req, res) => {
    res.json({ message: 'API Monolithique - Gestion des Notes' });
});

app.listen(PORT, () => {
    console.log(`Serveur monolithique démarré sur http://localhost:${PORT}`);
});
