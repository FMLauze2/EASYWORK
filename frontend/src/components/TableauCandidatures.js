import React, { useState } from 'react';
import ModalDetailCandidature from './ModalDetailCandidature';

export default function TableauCandidatures({ candidatures, onSupprimer, onModifierStatut, onModifierDate }) {
  const [selectedCandidature, setSelectedCandidature] = useState(null);
  
  const handleDateChange = (id, field, value) => {
    if (onModifierDate) onModifierDate(id, field, value);
  };
  function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = dateStr.split('T')[0];
    const [y, m, d2] = d.split('-');
    if (!y || !m || !d2) return dateStr;
    return `${d2}/${m}/${y}`;
  }
  return (
    <div className="flex-1 overflow-auto flex flex-col">
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
          {candidatures.map(c => (
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
              <td className="px-4 py-3 align-middle">{c.notes}</td>
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
                <button onClick={()=>onSupprimer(c.id)} className="bg-red-100 text-red-700 rounded-lg px-2 py-1 font-semibold hover:bg-red-200 transition">Supprimer</button>
                <select value={c.statut} onChange={e=>onModifierStatut(c.id,e.target.value)} className="border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition">
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
          ))}
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
