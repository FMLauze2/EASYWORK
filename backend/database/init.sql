-- Script de création de la table candidatures pour EASYWORK
CREATE TABLE IF NOT EXISTS candidatures (
  id SERIAL PRIMARY KEY,
  entreprise VARCHAR(255) NOT NULL,
  poste VARCHAR(255) NOT NULL,
  date_candidature DATE NOT NULL,
  date_reponse DATE,
  date_relance DATE,
  statut VARCHAR(50) NOT NULL,
  notes TEXT,
  screenshot_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
