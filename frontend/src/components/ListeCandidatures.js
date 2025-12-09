import React, { useState } from 'react';
import ModalDetailCandidature from './ModalDetailCandidature';

export default function ListeCandidatures({ candidatures }) {
  const [selectedCandidature, setSelectedCandidature] = useState(null);

  function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = dateStr.split('T')[0];
    const [y, m, d2] = d.split('-');
    if (!y || !m || !d2) return dateStr;
    return `${d2}/${m}/${y}`;
  }

  return (
    <>
      <table className="w-full bg-white rounded-xl shadow border border-gray-200 mt-8">
        <thead>
          <tr className="bg-indigo-50 text-indigo-800">
            <th className="px-4 py-2">Entreprise</th>
            <th className="px-4 py-2">Poste</th>
            <th className="px-4 py-2">Date candidature</th>
            <th className="px-4 py-2">Date réponse</th>
            <th className="px-4 py-2">Date relance</th>
            <th className="px-4 py-2">Statut</th>
            <th className="px-4 py-2">Notes</th>
          </tr>
        </thead>
        <tbody>
          {candidatures.map(c => (
            <tr 
              key={c.id} 
              className="border-b last:border-b-0 hover:bg-indigo-100 transition cursor-pointer"
              onClick={() => {
                console.log('Clic sur candidature:', c);
                setSelectedCandidature(c);
              }}
            >
              <td className="px-4 py-2">{c.entreprise}</td>
              <td className="px-4 py-2">{c.poste}</td>
              <td className="px-4 py-2">{formatDate(c.date_candidature)}</td>
              <td className="px-4 py-2">{formatDate(c.date_reponse)}</td>
              <td className="px-4 py-2">{formatDate(c.date_relance)}</td>
              <td className="px-4 py-2">{c.statut}</td>
              <td className="px-4 py-2">{c.notes}</td>
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
    </>
  );
}
