const User = require('../models/User'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
    try {
        const { username, password, firstName, lastName, role } = req.body;
    
        // Check if the username is already taken
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          return res.status(409).json({ error: 'Username already exists' });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create a new user
        const newUser = new User({ username, password: hashedPassword, firstName, lastName, role });
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
async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        res.json(deletedUser);
      } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
async function updateUser(req, res) {
  try {
    const userId = req.params.userId;
    const { firstName, lastName, username, password, role } = req.body;

    // Find the user by ID
    const userToUpdate = await User.findById(userId);

    if (!userToUpdate) {
      return res.status(404).json({ error: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Update the user properties
    userToUpdate.firstName = firstName;
    userToUpdate.lastName = lastName;
    userToUpdate.username = username;
    userToUpdate.password = hashedPassword; // Note: You should hash the password before saving in production.
    userToUpdate.role = role;

    

    // Save the updated user to the database
    const updatedUser = await userToUpdate.save();

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
module.exports = {
    registerUser,
    loginUser,
    getUsers,
    deleteUser,
    updateUser
};