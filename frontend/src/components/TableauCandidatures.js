import React, { useMemo, useState } from 'react';
import ModalDetailCandidature from './ModalDetailCandidature';

const STATUS_FILTERS = [
  { value: 'all', label: 'Toutes', classes: 'bg-indigo-600 text-white' },
  { value: 'en attente', label: 'En attente', classes: 'bg-yellow-100 text-yellow-800 border border-yellow-200' },
  { value: 'entretien', label: 'Entretien', classes: 'bg-blue-100 text-blue-800 border border-blue-200' },
  { value: 'refusée', label: 'Refusée', classes: 'bg-red-100 text-red-700 border border-red-200' },
  { value: 'acceptée', label: 'Acceptée', classes: 'bg-green-100 text-green-700 border border-green-200' }
];

export default function TableauCandidatures({ candidatures, onSupprimer, onModifierStatut, onModifierDate }) {
  const [selectedCandidature, setSelectedCandidature] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleDateChange = (id, field, value) => {
    if (onModifierDate) onModifierDate(id, field, value);
  };

  const filteredCandidatures = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();
    return candidatures.filter(c => {
      const matchStatus = statusFilter === 'all' || c.statut === statusFilter;
      if (!normalizedTerm) return matchStatus;
      const haystack = [
        c.entreprise,
        c.poste,
        c.notes,
        c.date_candidature,
        c.date_reponse,
        c.date_relance
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return matchStatus && haystack.includes(normalizedTerm);
    });
  }, [candidatures, searchTerm, statusFilter]);
  function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = dateStr.split('T')[0];
    const [y, m, d2] = d.split('-');
    if (!y || !m || !d2) return dateStr;
    return `${d2}/${m}/${y}`;
  }
  return (
    <div className="flex-1 overflow-auto flex flex-col gap-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-white rounded-2xl px-5 py-4 shadow border border-gray-100">
        <div className="relative w-full md:max-w-sm">
          <input
            type="search"
            placeholder="Rechercher (entreprise, poste, note, date)"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M15 10a5 5 0 11-10 0 5 5 0 0110 0z" />
          </svg>
        </div>
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map(filter => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setStatusFilter(filter.value)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition shadow-sm ${
                statusFilter === filter.value
                  ? filter.classes
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-indigo-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
      <table className="w-full h-full bg-white text-base table-auto border-separate border-spacing-0 rounded-2xl shadow-lg border border-gray-100">
        <thead className="sticky top-0 z-10">
          <tr className="bg-indigo-50 text-indigo-800 text-lg">
            <th className="px-4 py-3 font-semibold">Entreprise</th>
            <th className="px-4 py-3 font-semibold">Poste</th>
            <th className="px-4 py-3 font-semibold">Date candidature</th>
            <th className="px-4 py-3 font-semibold">Date réponse</th>
            <th className="px-4 py-3 font-semibold">Date relance</th>
            <th className="px-4 py-3 font-semibold">Statut</th>
            <th className="px-4 py-3 font-semibold">Notes</th>
            <th className="px-4 py-3 font-semibold">Screenshot</th>
            <th className="px-4 py-3 font-semibold">Actions</th>
            <th className="px-4 py-3 font-semibold">Brut candidature</th>
            <th className="px-4 py-3 font-semibold">Brut réponse</th>
            <th className="px-4 py-3 font-semibold">Brut relance</th>
          </tr>
        </thead>
        <tbody>
          {filteredCandidatures.length === 0 ? (
            <tr>
              <td colSpan="12" className="px-4 py-10 text-center text-gray-500">
                Aucun résultat. Ajuste les filtres ou ajoute une candidature.
              </td>
            </tr>
          ) : (
            filteredCandidatures.map(c => (
              <tr 
                key={c.id} 
                className="border-b last:border-b-0 hover:bg-indigo-100 transition cursor-pointer"
                onClick={() => setSelectedCandidature(c)}
              >
                <td className="px-4 py-3 align-middle">{c.entreprise}</td>
                <td className="px-4 py-3 align-middle">{c.poste}</td>
                <td className="px-4 py-3 align-middle">{formatDate(c.date_candidature)}</td>
                <td className="px-4 py-3 align-middle">{formatDate(c.date_reponse)}</td>
                <td className="px-4 py-3 align-middle">{formatDate(c.date_relance)}</td>
                <td className="px-4 py-3 align-middle">
                  <span
                    className={
                      `inline-block px-3 py-1 rounded-full text-xs font-bold shadow-sm ` +
                      (c.statut === 'en attente' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                       c.statut === 'entretien' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                       c.statut === 'refusée' ? 'bg-red-100 text-red-700 border border-red-200' :
                       c.statut === 'acceptée' ? 'bg-green-100 text-green-700 border border-green-200' :
                       'bg-gray-100 text-gray-700 border-gray-200')
                    }
                  >
                    {c.statut}
                  </span>
                </td>
                <td className="px-4 py-3 align-middle max-w-[200px] text-sm text-gray-700 truncate">{c.notes}</td>
                <td className="px-4 py-3 align-middle text-center">
                  {c.screenshot_url && (
                    <a 
                      href={`http://localhost:3001/${c.screenshot_url}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-block hover:opacity-70 transition"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </a>
                  )}
                </td>
                <td className="px-4 py-3 flex flex-col gap-2 min-w-[120px]">
                  <button 
                    onClick={e => {
                      e.stopPropagation();
                      onSupprimer(c.id);
                    }}
                    className="bg-red-100 text-red-700 rounded-lg px-2 py-1 font-semibold hover:bg-red-200 transition"
                  >
                    Supprimer
                  </button>
                  <select 
                    value={c.statut}
                    onClick={e => e.stopPropagation()}
                    onChange={e => {
                      e.stopPropagation();
                      onModifierStatut(c.id, e.target.value);
                    }}
                    className="border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
                  >
                    <option value="en attente">En attente</option>
                    <option value="entretien">Entretien</option>
                    <option value="refusée">Refusée</option>
                    <option value="acceptée">Acceptée</option>
                  </select>
                </td>
                <td className="px-4 py-3 align-middle">{c.date_candidature}</td>
                <td className="px-4 py-3 align-middle">{c.date_reponse}</td>
                <td className="px-4 py-3 align-middle">{c.date_relance}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      
      {selectedCandidature && (
        <ModalDetailCandidature 
          candidature={selectedCandidature} 
          onClose={() => setSelectedCandidature(null)} 
        />
      )}
    </div>
  );
}
