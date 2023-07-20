const User = require('../models/User'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
    try {
        const { username, password } = req.body;
    
        // Check if the username is already taken
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          return res.status(409).json({ error: 'Username already exists' });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create a new user
        const newUser = new User({ username, password: hashedPassword });
        const savedUser = await newUser.save();
    
        res.status(201).json(savedUser);
      } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
async function loginUser(req, res) {
    try {
        const { username, password } = req.body;
    
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
          return res.status(401).json({ error: 'Invalid username or password' });
        }
    
        // Compare the password with the hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid username or password' });
        }
    
        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    
        res.json({ token });
      } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
async function getUsers(req, res) {
    try {
        const users = await User.find();
        res.json(users);
      } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
module.exports = {
    registerUser,
    loginUser,
    getUsers
};