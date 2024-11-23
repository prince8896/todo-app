const express = require('express');
const  taskController = require('../controllers/taskController');

const router = express.Router();

router.get('/getAllTasks', taskController.getAllTasks);
router.post('/createTasks', taskController.createTask);
router.put('/UpdateTasks/:id', taskController.updateTask);
router.delete('/deletedTasks/:id', taskController.deleteTask);
router.patch('/markTasks/:id/complete', taskController.markTaskAsCompleted);

module.exports = router;
