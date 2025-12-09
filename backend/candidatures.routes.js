import express from 'express';
import multer from 'multer';
import pkg from 'pg';
const { Pool, types } = pkg;
import path from 'path';
import fs from 'fs';

// Force le driver pg à retourner les dates comme des strings brutes, pas comme des objets Date
types.setTypeParser(1082, val => val); // 1082 = type DATE dans PostgreSQL

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
  const result = await pool.query('SELECT * FROM candidatures ORDER BY date_candidature DESC');
  res.json(result.rows);
});

// Ajout d'une candidature
router.post('/', upload.single('screenshot'), async (req, res) => {
  let { entreprise, poste, date_candidature, date_reponse, date_relance, statut, notes } = req.body;
  // Correction sûre des champs date
  if (typeof date_candidature === 'string' && date_candidature.includes('T')) {
    date_candidature = date_candidature.split('T')[0];
  }
  if (typeof date_reponse === 'string' && date_reponse.includes('T')) {
    date_reponse = date_reponse.split('T')[0];
  }
  if (typeof date_relance === 'string' && date_relance.includes('T')) {
    date_relance = date_relance.split('T')[0];
  }
  
  let screenshot_url = null;
  if (req.file) {
    const ext = path.extname(req.file.originalname);
    const newFilename = req.file.filename + ext;
    const newPath = path.join('uploads', newFilename);
    fs.renameSync(req.file.path, newPath);
    // Utilise des slashes pour l'URL (compatible web)
    screenshot_url = `uploads/${newFilename}`;
  }
  
  const result = await pool.query(
    `INSERT INTO candidatures (entreprise, poste, date_candidature, date_reponse, date_relance, statut, notes, screenshot_url)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [entreprise, poste, date_candidature, date_reponse, date_relance, statut, notes, screenshot_url]
  );
  res.status(201).json(result.rows[0]);
});

export default router;
