import { useState, useEffect } from 'react';
import './index.css';

const STUDENT_API = 'http://localhost:3002/api';
const NOTES_API = 'http://localhost:3003/api';

function App() {
    const [activeTab, setActiveTab] = useState('etudiants');
    const [etudiants, setEtudiants] = useState([]);
    const [notes, setNotes] = useState([]);
    const [formData, setFormData] = useState({});
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        fetchEtudiants();
        fetchNotes();
    }, []);

    const fetchEtudiants = async () => {
        try {
            const response = await fetch(`${STUDENT_API}/etudiants`);
            const data = await response.json();
            setEtudiants(data);
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    const fetchNotes = async () => {
        try {
            const response = await fetch(`${NOTES_API}/notes`);
            const data = await response.json();
            setNotes(data);
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    const handleSubmitEtudiant = async (e) => {
        e.preventDefault();
        try {
            const url = editMode
                ? `${STUDENT_API}/etudiants/${formData.id}`
                : `${STUDENT_API}/etudiants`;
            const method = editMode ? 'PUT' : 'POST';

            await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            fetchEtudiants();
            setFormData({});
            setEditMode(false);
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    const handleSubmitNote = async (e) => {
        e.preventDefault();
        try {
            const url = editMode
                ? `${NOTES_API}/notes/${formData.id}`
                : `${NOTES_API}/notes`;
            const method = editMode ? 'PUT' : 'POST';

            await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            fetchNotes();
            setFormData({});
            setEditMode(false);
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    const handleDelete = async (type, id) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer?')) return;

        try {
            const api = type === 'etudiants' ? STUDENT_API : NOTES_API;
            await fetch(`${api}/${type}/${id}`, { method: 'DELETE' });
            if (type === 'etudiants') fetchEtudiants();
            else fetchNotes();
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    const handleEdit = (type, item) => {
        setFormData(item);
        setEditMode(true);
        setActiveTab(type);
    };

    const handleCancel = () => {
        setFormData({});
        setEditMode(false);
    };

    const getEtudiantById = (id) => {
        const etudiant = etudiants.find((e) => e.id === id);
        return etudiant ? `${etudiant.nom} ${etudiant.prenom}` : 'Inconnu';
    };

    return (
        <div className="app">
            <div className="header">
                <h1>🚀 Gestion des Notes</h1>
                <p>Architecture Microservices</p>
                <div className="services-badge">
                    🔹 Service Étudiants (3002) | 🔹 Service Notes (3003)
                </div>
            </div>

            <div className="container">
                <div className="tabs">
                    <button
                        className={`tab ${activeTab === 'etudiants' ? 'active' : ''}`}
                        onClick={() => setActiveTab('etudiants')}
                    >
                         Étudiants
                    </button>
                    <button
                        className={`tab ${activeTab === 'notes' ? 'active' : ''}`}
                        onClick={() => setActiveTab('notes')}
                    >
                        Notes
                    </button>
                </div>

                {activeTab === 'etudiants' && (
                    <div className="section">
                        <h2>{editMode ? 'Modifier' : 'Ajouter'} un Étudiant</h2>
                        <form className="form" onSubmit={handleSubmitEtudiant}>
                            <div className="form-group">
                                <label>Nom</label>
                                <input
                                    type="text"
                                    value={formData.nom || ''}
                                    onChange={(e) =>
                                        setFormData({ ...formData, nom: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Prénom</label>
                                <input
                                    type="text"
                                    value={formData.prenom || ''}
                                    onChange={(e) =>
                                        setFormData({ ...formData, prenom: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={formData.email || ''}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                {editMode ? 'Mettre à jour' : 'Ajouter'}
                            </button>
                            {editMode && (
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleCancel}
                                >
                                    Annuler
                                </button>
                            )}
                        </form>

                        <h2>Liste des Étudiants</h2>
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nom</th>
                                        <th>Prénom</th>
                                        <th>Email</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {etudiants.map((etudiant) => (
                                        <tr key={etudiant.id}>
                                            <td>{etudiant.id}</td>
                                            <td>{etudiant.nom}</td>
                                            <td>{etudiant.prenom}</td>
                                            <td>{etudiant.email}</td>
                                            <td className="actions">
                                                <button
                                                    className="btn btn-edit"
                                                    onClick={() => handleEdit('etudiants', etudiant)}
                                                >
                                                    Modifier
                                                </button>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() =>
                                                        handleDelete('etudiants', etudiant.id)
                                                    }
                                                >
                                                    Supprimer
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {etudiants.length === 0 && (
                                <div className="empty-state">Aucun étudiant</div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'notes' && (
                    <div className="section">
                        <h2>{editMode ? 'Modifier' : 'Ajouter'} une Note</h2>
                        <form className="form" onSubmit={handleSubmitNote}>
                            <div className="form-group">
                                <label>Étudiant</label>
                                <select
                                    value={formData.etudiant_id || ''}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            etudiant_id: parseInt(e.target.value),
                                        })
                                    }
                                    required
                                >
                                    <option value="">Sélectionner un étudiant</option>
                                    {etudiants.map((etudiant) => (
                                        <option key={etudiant.id} value={etudiant.id}>
                                            {etudiant.nom} {etudiant.prenom}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Matière</label>
                                <input
                                    type="text"
                                    value={formData.matiere || ''}
                                    onChange={(e) =>
                                        setFormData({ ...formData, matiere: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Note (sur 20)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="20"
                                    value={formData.note || ''}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            note: parseFloat(e.target.value),
                                        })
                                    }
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                {editMode ? 'Mettre à jour' : 'Ajouter'}
                            </button>
                            {editMode && (
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleCancel}
                                >
                                    Annuler
                                </button>
                            )}
                        </form>

                        <h2>Liste des Notes</h2>
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Étudiant (ID)</th>
                                        <th>Matière</th>
                                        <th>Note</th>
                                        <th>Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {notes.map((note) => (
                                        <tr key={note.id}>
                                            <td>{note.id}</td>
                                            <td>
                                                {getEtudiantById(note.etudiant_id)} ({note.etudiant_id})
                                            </td>
                                            <td>{note.matiere}</td>
                                            <td>
                                                <strong>{note.note}/20</strong>
                                            </td>
                                            <td>
                                                {new Date(note.date_evaluation).toLocaleDateString()}
                                            </td>
                                            <td className="actions">
                                                <button
                                                    className="btn btn-edit"
                                                    onClick={() => handleEdit('notes', note)}
                                                >
                                                    Modifier
                                                </button>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => handleDelete('notes', note.id)}
                                                >
                                                    Supprimer
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {notes.length === 0 && (
                                <div className="empty-state">Aucune note</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
