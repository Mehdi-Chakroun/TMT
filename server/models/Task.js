const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true},
    description: String,
    state: { type: String, enum: ['TODO', 'IN_PROGRESS', 'DONE', 'IN_REVIEW'], required: true, default: 'TODO'},
    assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    dueDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
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