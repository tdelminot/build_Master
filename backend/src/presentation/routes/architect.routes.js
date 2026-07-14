// backend/src/presentation/routes/architect.routes.js
const express = require('express');
const router = express.Router();

module.exports = (controller) => {
  // GET /api/architects - Récupérer tous les architectes
  router.get('/', (req, res) => controller.getAll(req, res));
  
  // GET /api/architects/:id - Récupérer un architecte par ID
  router.get('/:id', (req, res) => controller.getById(req, res));
  
  // GET /api/architects/specialty/:specialty - Récupérer par spécialité
  router.get('/specialty/:specialty', (req, res) => controller.getBySpecialty(req, res));
  
  return router;
};