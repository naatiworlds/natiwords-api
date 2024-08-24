const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');
const { createProject, getProjects } = require('../controllers/projectController');

router.post('/', authenticate, createProject);
router.get('/', getProjects);

module.exports = router;
