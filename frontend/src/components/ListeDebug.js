import React from 'react';

export default function ListeDebug({ candidatures }) {
  function formatDate(dateStr) {
    if (!dateStr) return '';
    // Prend la partie avant le T si besoin
    const d = dateStr.split('T')[0];
    const [y, m, d2] = d.split('-');
    if (!y || !m || !d2) return dateStr;
    return `${d2}/${m}/${y}`;
  }
  return (
    <table border="1" style={{margin:'2em auto',fontSize:'1.2em'}}>
      <thead>
        <tr>
          <th>Entreprise</th>
          <th>Poste</th>
          <th>Date candidature</th>
          <th>Date réponse</th>
          <th>Date relance</th>
          <th>Statut</th>
          <th>Notes</th>
          <th>Brut candidature</th>
          <th>Brut réponse</th>
          <th>Brut relance</th>
        </tr>
      </thead>
      <tbody>
        {candidatures.map(c => (
          <tr key={c.id}>
            <td>{c.entreprise}</td>
            <td>{c.poste}</td>
            <td>{formatDate(c.date_candidature)}</td>
            <td>{formatDate(c.date_reponse)}</td>
            <td>{formatDate(c.date_relance)}</td>
            <td>{c.statut}</td>
            <td>{c.notes}</td>
            <td>{c.date_candidature}</td>
            <td>{c.date_reponse}</td>
            <td>{c.date_relance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
