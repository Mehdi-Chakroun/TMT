const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { authenticateToken } = require('../authMiddleware');


router.get('/tasks', authenticateToken, taskController.getTasks);
router.post('/tasks', taskController.createTask);
router.delete('/tasks/:id', taskController.deleteTask);
router.put('/tasks/:taskId', taskController.updateTask);
router.post('/tasks/:taskId/comments', taskController.createComment);
router.patch('/tasks/:id', taskController.patchTask);
module.exports = router;