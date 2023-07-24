const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true},
    description: String,
    state: { type: String, enum: ['TODO', 'IN_PROGRESS', 'DONE'], required: true, default: 'todo'},
    assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    dueDate: { type: Date, required: true },
    type: { type: String, enum: [
      'config',
      'integration',
      'consulting',
      'development',
      'training',
      'maintenance',
      'security',
      'testing'
    ], required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
  });
  
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;