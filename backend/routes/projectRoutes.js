const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');

// Public: list and view
router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProjectById);

// Protected: create, update, delete
router.post('/', authMiddleware, projectController.createProject);
router.put('/:id', authMiddleware, projectController.updateProject);
router.delete('/:id', authMiddleware, projectController.deleteProject);

module.exports = router;
