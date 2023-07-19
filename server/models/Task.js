const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    // Add any other required fields for your tasks
  });
  
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;