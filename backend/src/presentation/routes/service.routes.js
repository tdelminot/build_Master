// backend/src/presentation/routes/service.routes.js
const express = require('express');
const router = express.Router();

module.exports = (controller) => {
  // GET /api/services - Récupérer tous les services
  router.get('/', (req, res) => controller.getAll(req, res));
  
  // GET /api/services/:id - Récupérer un service par ID
  router.get('/:id', (req, res) => controller.getById(req, res));
  
  // GET /api/services/category/:category - Récupérer les services par catégorie
  router.get('/category/:category', (req, res) => controller.getByCategory(req, res));
  
  return router;
};