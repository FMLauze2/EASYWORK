import express from 'express';
import multer from 'multer';
import pkg from 'pg';
const { Pool, types } = pkg;
import path from 'path';
import fs from 'fs';

// Force le driver pg à retourner les dates comme des strings brutes, pas comme des objets Date
types.setTypeParser(1082, val => val); // 1082 = type DATE dans PostgreSQL

const STATUTS_AUTORISES = ['en attente', 'entretien', 'refusée', 'acceptée'];

function normaliserDate(valeur) {
  if (typeof valeur !== 'string') return valeur || null;
  return valeur.includes('T') ? valeur.split('T')[0] : valeur;
}

function supprimerScreenshot(relPath) {
  if (!relPath) return;
  const absolutePath = path.resolve(relPath);
  try {
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }
  } catch (err) {
    console.warn('Impossible de supprimer le fichier screenshot', absolutePath, err);
  }
}

// Multer config pour upload d'image
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 Mo max
});

const router = express.Router();
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'easywork',
  password: 'postgre',
  port: 5432,
});

// Liste des candidatures
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM candidatures ORDER BY date_candidature DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des candidatures', error);
    res.status(500).json({ error: 'Impossible de récupérer les candidatures' });
  }
});

// Ajout d'une candidature
router.post('/', upload.single('screenshot'), async (req, res) => {
  let { entreprise, poste, date_candidature, date_reponse, date_relance, statut, notes } = req.body;

  const champsDates = {
    date_candidature: normaliserDate(date_candidature),
    date_reponse: normaliserDate(date_reponse),
    date_relance: normaliserDate(date_relance)
  };

  try {
    let screenshot_url = null;
    if (req.file) {
      const ext = path.extname(req.file.originalname || '');
      const newFilename = req.file.filename + ext;
      const newPath = path.join('uploads', newFilename);
      fs.renameSync(req.file.path, newPath);
      screenshot_url = `uploads/${newFilename}`;
    }

    const result = await pool.query(
      `INSERT INTO candidatures (entreprise, poste, date_candidature, date_reponse, date_relance, statut, notes, screenshot_url)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [
        entreprise,
        poste,
        champsDates.date_candidature,
        champsDates.date_reponse,
        champsDates.date_relance,
        statut,
        notes,
        screenshot_url
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erreur lors de la création de la candidature', error);
    res.status(500).json({ error: 'Impossible de créer la candidature' });
  }
});

// Suppression d'une candidature
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM candidatures WHERE id = $1 RETURNING screenshot_url',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Candidature introuvable' });
    }

    supprimerScreenshot(result.rows[0].screenshot_url);
    res.status(204).send();
  } catch (error) {
    console.error('Erreur lors de la suppression de la candidature', error);
    res.status(500).json({ error: 'Impossible de supprimer la candidature' });
  }
});

// Mise à jour du statut
router.patch('/:id/statut', async (req, res) => {
  const { id } = req.params;
  const { statut } = req.body || {};

  if (!statut || !STATUTS_AUTORISES.includes(statut)) {
    return res.status(400).json({ error: 'Statut invalide' });
  }

  try {
    const result = await pool.query(
      'UPDATE candidatures SET statut = $1 WHERE id = $2 RETURNING *',
      [statut, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Candidature introuvable' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut', error);
    res.status(500).json({ error: 'Impossible de mettre à jour le statut' });
  }
});

export default router;
