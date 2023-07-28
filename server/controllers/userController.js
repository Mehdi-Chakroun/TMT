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
    
        res.json({ token, firstName: user.firstName, lastName: user.lastName, role: user.role});
      } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
async function getUsers(req, res) {
    try {
      if (req.user.role === 'ADMIN' || req.user.role === 'SUPER_ADMIN') {
        const users = await User.find();
        res.json(users);
      } else {
        res.status(403).json({ error: 'Unauthorized' });
      }
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

const updateUser = async (req, res) => {
  try {
    const { username, firstName, lastName, role } = req.body; // Assuming the fields you want to update are in the request body
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }    
    user.username = username || user.username;
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.role = role || user.role;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
    console.error('Error updating user:', error);
  }
};

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    deleteUser,
    updateUser
};