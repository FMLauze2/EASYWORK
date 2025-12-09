import React from 'react';
import TableauCandidatures from '../components/TableauCandidatures';

export default function SuiviTableau({ candidatures, onSupprimer, onModifierStatut }) {
  return (
    <div className="w-screen h-screen min-h-0 min-w-0 flex flex-col bg-gray-50">
      <div className="flex-1 flex flex-col overflow-auto px-4 md:px-12 xl:px-32 py-6">
        <TableauCandidatures candidatures={candidatures} onSupprimer={onSupprimer} onModifierStatut={onModifierStatut} />
      </div>
    </div>
  );
}
