const express = require("express");
const router = express.Router();

const taskRepo = require('./repos/taskRepoSqLite');
const taskController = require('./controllers/taskController')(taskRepo);

// Rutas
router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;