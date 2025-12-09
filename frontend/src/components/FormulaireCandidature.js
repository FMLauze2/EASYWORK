import React, { useState } from 'react';

export default function FormulaireCandidature({ onAjouter }) {
  const [form, setForm] = useState({
    entreprise: '', poste: '', date_candidature: '', date_reponse: '', date_relance: '', statut: 'en attente', notes: '', screenshot: null
  });
  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(f => ({ ...f, [name]: files ? files[0] : value }));
  };
  // Vérifie et force le format YYYY-MM-DD pour les dates avant envoi
  const handleSubmit = e => {
    e.preventDefault();
    const formCopy = { ...form };
    ["date_candidature", "date_reponse", "date_relance"].forEach(field => {
      if (formCopy[field]) {
        // Si la date contient un T (ex: 2025-12-31T00:00:00), on ne garde que la partie avant le T
        formCopy[field] = formCopy[field].split('T')[0];
      }
    });
    onAjouter(formCopy);
    setForm({ entreprise: '', poste: '', date_candidature: '', date_reponse: '', date_relance: '', statut: 'en attente', notes: '', screenshot: null });
  };

  const handleTest = () => {
    // Utilise la date locale brute du jour
    const now = new Date();
    const localDate = now.toLocaleDateString('fr-CA'); // format YYYY-MM-DD
    setForm({
      entreprise: 'Test',
      poste: 'Test',
      date_candidature: localDate,
      date_reponse: localDate,
      date_relance: localDate,
      statut: 'en attente',
      notes: 'Candidature test',
      screenshot: null
    });
  };
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 mb-10 flex flex-wrap gap-6 items-end shadow-lg border border-gray-100">
      <div className="flex flex-col flex-1 min-w-[200px]">
        <label className="text-sm font-medium text-gray-700 mb-1">Entreprise</label>
        <input name="entreprise" value={form.entreprise} onChange={handleChange} placeholder="Entreprise" required className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition" />
      </div>
      <div className="flex flex-col flex-1 min-w-[200px]">
        <label className="text-sm font-medium text-gray-700 mb-1">Poste</label>
        <input name="poste" value={form.poste} onChange={handleChange} placeholder="Poste" required className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition" />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Date candidature</label>
        <input name="date_candidature" type="date" value={form.date_candidature} onChange={handleChange} required className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition" />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Date réponse</label>
        <input name="date_reponse" type="date" value={form.date_reponse} onChange={handleChange} className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition" />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Date relance</label>
        <input name="date_relance" type="date" value={form.date_relance} onChange={handleChange} className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition" />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Statut</label>
        <select name="statut" value={form.statut} onChange={handleChange} className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition">
          <option value="en attente">En attente</option>
          <option value="entretien">Entretien</option>
          <option value="refusée">Refusée</option>
          <option value="acceptée">Acceptée</option>
        </select>
      </div>
      <div className="flex flex-col flex-1 min-w-[200px]">
        <label className="text-sm font-medium text-gray-700 mb-1">Notes</label>
        <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition" />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Screenshot</label>
        <input
          name="screenshot"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-100 file:text-indigo-700 file:font-semibold file:shadow-sm hover:file:bg-indigo-200 transition"
        />
      </div>
      <button type="submit" className="bg-indigo-600 text-white rounded-lg px-7 py-2 font-semibold shadow hover:bg-indigo-700 transition-all mt-2">Ajouter</button>
      <button type="button" onClick={handleTest} className="bg-gray-200 text-gray-700 rounded-lg px-7 py-2 font-semibold shadow hover:bg-gray-300 transition-all mt-2 ml-2">Ajouter un test</button>
    </form>
  );
}
