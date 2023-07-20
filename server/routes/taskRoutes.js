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
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid token' });
      }
  
      req.user = user;
      next();
    });
}


router.get('/tasks', taskController.getTasks);
router.post('/tasks', taskController.createTask);
router.delete('/tasks/:id', taskController.deleteTask);
router.put('/tasks/:taskId', taskController.updateTask);

module.exports = router;