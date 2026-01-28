import express from 'express';
import cors from 'cors';
import notesRoutes from './routes/notes.js';

const app = express();
const PORT = 3003;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/notes', notesRoutes);

// Route de test
app.get('/', (req, res) => {
    res.json({ message: 'Microservice Notes' });
});

app.listen(PORT, () => {
    console.log(`Service Notes démarré sur http://localhost:${PORT}`);
});
