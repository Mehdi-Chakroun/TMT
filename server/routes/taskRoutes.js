const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const taskController = require('../controllers/taskController');

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ error: 'Access token not found' });
    }
    
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      return res.status(403).json({ error: 'Invalid token' });
    };
}


router.get('/tasks', authenticateToken, taskController.getTasks);
router.post('/tasks', taskController.createTask);
router.delete('/tasks/:id', taskController.deleteTask);
router.put('/tasks/:taskId', taskController.updateTask);
router.post('/tasks/:taskId/comments', taskController.createComment);
module.exports = router;