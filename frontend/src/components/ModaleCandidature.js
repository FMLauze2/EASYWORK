import React from 'react';

export default function ModaleCandidature({ candidature, onClose }) {
  if (!candidature) return null;

  function formatDate(dateStr) {
    if (!dateStr) return '-';
    const d = dateStr.split('T')[0];
    const [y, m, d2] = d.split('-');
    if (!y || !m || !d2) return dateStr;
    return `${d2}/${m}/${y}`;
  }

  const getStatutStyle = (statut) => {
    switch(statut) {
      case 'en attente': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'entretien': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'refusée': return 'bg-red-100 text-red-700 border-red-200';
      case 'acceptée': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-indigo-600 text-white px-6 py-4 rounded-t-2xl flex justify-between items-center">
          <h2 className="text-2xl font-bold">Détails de la candidature</h2>
          <button onClick={onClose} className="text-white hover:bg-indigo-700 rounded-full w-8 h-8 flex items-center justify-center transition">✕</button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-600">Entreprise</label>
              <p className="text-lg font-medium text-gray-900">{candidature.entreprise}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600">Poste</label>
              <p className="text-lg font-medium text-gray-900">{candidature.poste}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-600">Date candidature</label>
              <p className="text-base text-gray-900">{formatDate(candidature.date_candidature)}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600">Date réponse</label>
              <p className="text-base text-gray-900">{formatDate(candidature.date_reponse)}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600">Date relance</label>
              <p className="text-base text-gray-900">{formatDate(candidature.date_relance)}</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">Statut</label>
            <div className="mt-1">
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold shadow-sm border ${getStatutStyle(candidature.statut)}`}>
                {candidature.statut}
              </span>
            </div>
          </div>

          {candidature.notes && (
            <div>
              <label className="text-sm font-semibold text-gray-600">Notes</label>
              <p className="text-base text-gray-900 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">{candidature.notes}</p>
            </div>
          )}

          {candidature.screenshot_url && (
            <div>
              <label className="text-sm font-semibold text-gray-600">Screenshot</label>
              <div className="mt-2 border rounded-lg overflow-hidden bg-gray-50">
                <img 
                  src={`http://localhost:3001/${candidature.screenshot_url}`} 
                  alt="Screenshot candidature" 
                  className="w-full h-auto cursor-pointer hover:opacity-90 transition"
                  onClick={() => window.open(`http://localhost:3001/${candidature.screenshot_url}`, '_blank')}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Cliquez sur l'image pour l'ouvrir en plein écran</p>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 rounded-b-2xl border-t">
          <button onClick={onClose} className="w-full bg-indigo-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-indigo-700 transition">
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
