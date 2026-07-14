// backend/src/presentation/routes/project.routes.js
const express = require('express');
const router = express.Router();

module.exports = (controller) => {
  // GET /api/projects - Récupérer tous les projets
  router.get('/', (req, res) => controller.getAll(req, res));
  
  // GET /api/projects/:id - Récupérer un projet par ID
  router.get('/:id', (req, res) => controller.getById(req, res));
  
  // GET /api/projects/architect/:architectId - Projets par architecte
  router.get('/architect/:architectId', (req, res) => controller.getByArchitect(req, res));
  
  // GET /api/projects/category/:category - Projets par catégorie
  router.get('/category/:category', (req, res) => controller.getByCategory(req, res));
  
  return router;
};