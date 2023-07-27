const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/users', userController.getUsers);
router.delete('/users/:id', userController.deleteUser);
router.patch('/users/:userId', userController.updateUser);

module.exports = router;
