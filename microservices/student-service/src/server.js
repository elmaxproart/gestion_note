import express from 'express';
import cors from 'cors';
import etudiantsRoutes from './routes/etudiants.js';

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/etudiants', etudiantsRoutes);

// Route de test
app.get('/', (req, res) => {
    res.json({ message: 'Microservice Étudiants' });
});

app.listen(PORT, () => {
    console.log(`Service Étudiants démarré sur http://localhost:${PORT}`);
});
