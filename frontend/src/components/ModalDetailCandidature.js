import React from 'react';

export default function ModalDetailCandidature({ candidature, onClose }) {
  if (!candidature) return null;

  function formatDate(dateStr) {
    if (!dateStr) return '-';
    const d = dateStr.split('T')[0];
    const [y, m, d2] = d.split('-');
    return `${d2}/${m}/${y}`;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-indigo-600 text-white px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-2xl font-bold">Détails de la candidature</h2>
          <button onClick={onClose} className="text-white hover:bg-indigo-700 rounded-full p-2 transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-600">Entreprise</label>
              <p className="text-lg font-bold text-gray-900">{candidature.entreprise}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600">Poste</label>
              <p className="text-lg font-bold text-gray-900">{candidature.poste}</p>
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
            <p className="mt-1">
              <span className={
                `inline-block px-4 py-2 rounded-full text-sm font-bold shadow ` +
                (candidature.statut === 'en attente' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                 candidature.statut === 'entretien' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                 candidature.statut === 'refusée' ? 'bg-red-100 text-red-700 border border-red-200' :
                 candidature.statut === 'acceptée' ? 'bg-green-100 text-green-700 border border-green-200' :
                 'bg-gray-100 text-gray-700 border border-gray-200')
              }>
                {candidature.statut}
              </span>
            </p>
          </div>

          {candidature.notes && (
            <div>
              <label className="text-sm font-semibold text-gray-600">Notes</label>
              <p className="text-base text-gray-900 bg-gray-50 p-3 rounded-lg mt-1">{candidature.notes}</p>
            </div>
          )}

          {candidature.screenshot_url && (
            <div>
              <label className="text-sm font-semibold text-gray-600 block mb-2">Screenshot</label>
              <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                <img 
                  src={`http://localhost:3001/${candidature.screenshot_url}`} 
                  alt="Screenshot candidature" 
                  className="w-full h-auto max-h-96 object-contain"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999">Image non disponible</text></svg>';
                  }}
                />
              </div>
              <a 
                href={`http://localhost:3001/${candidature.screenshot_url}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block mt-2 text-indigo-600 hover:text-indigo-800 font-semibold"
              >
                Ouvrir en plein écran →
              </a>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 rounded-b-2xl border-t">
          <button 
            onClick={onClose} 
            className="w-full bg-indigo-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-indigo-700 transition"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
