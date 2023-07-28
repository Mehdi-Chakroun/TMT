const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../authMiddleware');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/users', authenticateToken, userController.getUsers);
router.delete('/users/:id', authenticateToken, userController.deleteUser);
router.patch('/users/:userId', authenticateToken, userController.updateUser);

module.exports = router;
