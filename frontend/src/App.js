
import './App.css'; // Optionnel, pour garder le fallback si besoin
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FormulaireCandidature from './components/FormulaireCandidature';
import TableauCandidatures from './components/TableauCandidatures';
import SuiviTableau from './pages/SuiviTableau';

const API_URL = 'http://localhost:3001/api/candidatures';

function App() {
  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCandidatures = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Erreur API');
      setCandidatures(await res.json());
      setError(null);
    } catch (e) {
      setError('Erreur chargement candidatures');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCandidatures(); }, []);

  const ajouterCandidature = async (form) => {
    // Envoie le formulaire en FormData pour supporter les fichiers
    const data = new FormData();
    Object.entries(form).forEach(([k,v]) => {
      if (v) data.append(k, v);
    });
    const res = await fetch(API_URL, { method:'POST', body:data });
    if (res.ok) fetchCandidatures();
  };

  const supprimerCandidature = async (id) => {
    if (!window.confirm('Supprimer ?')) return;
    const res = await fetch(`${API_URL}/${id}`, { method:'DELETE' });
    if (res.ok) fetchCandidatures();
  };

  const modifierStatut = async (id, statut) => {
    const res = await fetch(`${API_URL}/${id}/statut`, {
      method:'PATCH',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({statut})
    });
    if (res.ok) fetchCandidatures();
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen text-xl font-semibold">Chargement...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-600 text-lg">{error}</div>;



  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <Routes>
          <Route path="/" element={
            <>
              <h1 className="text-4xl font-extrabold text-center mt-12 mb-10 text-indigo-700 drop-shadow-sm tracking-tight">EasyWork - Suivi de candidatures</h1>
              <div className="max-w-5xl mx-auto px-4">
                {/* Résumé visuel des candidatures par statut */}
                <div className="flex flex-wrap justify-center gap-6 mb-8">
                  {['en attente','entretien','refusée','acceptée'].map(type => {
                    const count = candidatures.filter(c => c.statut === type).length;
                    const style = type === 'en attente' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                  type === 'entretien' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                                  type === 'refusée' ? 'bg-red-100 text-red-700 border-red-200' :
                                  type === 'acceptée' ? 'bg-green-100 text-green-700 border-green-200' :
                                  'bg-gray-100 text-gray-700 border-gray-200';
                    return (
                      <div key={type} className={`flex flex-col items-center px-6 py-4 rounded-xl border shadow-sm ${style}`}>
                        <span className="text-lg font-bold mb-1">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                        <span className="text-3xl font-extrabold">{count}</span>
                      </div>
                    );
                  })}
                </div>
                <FormulaireCandidature onAjouter={ajouterCandidature} />
              </div>
            </>
          } />
          <Route path="/suivi" element={
            <SuiviTableau candidatures={candidatures} onSupprimer={supprimerCandidature} onModifierStatut={modifierStatut} />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
