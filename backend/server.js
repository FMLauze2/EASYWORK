
import express from 'express';
import cors from 'cors';
import candidaturesRouter from './candidatures.routes.js';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

// Servir les fichiers uploadés
app.use('/uploads', express.static(path.resolve('uploads')));

app.use('/api/candidatures', candidaturesRouter);

app.listen(3001, () => console.log('Backend OK'));
