const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true},
    description: String,
    state: { type: String, enum: ['todo', 'inProgress', 'inReview', 'done'], required: true, default: 'todo'},
    assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    dueDate: { type: Date, required: true },
    type: { type: String, enum: ['config', 'integration', 'consulting'], required: true }
    
  });
  
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;