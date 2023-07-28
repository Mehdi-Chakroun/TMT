const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName:{ type: String, required: true },
    lastName:{ type: String, required: true },
    role: { type: String, enum: ['SUPER_ADMIN', 'ADMIN', 'USER'], required: true }
  });
  
const User = mongoose.model('User', userSchema);
module.exports = User;