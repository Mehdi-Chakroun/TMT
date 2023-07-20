const Task = require('../models/Task');


async function getTasks(req, res) {
    try {
        const tasks = await Task.find().populate('assignees');
        res.json(tasks);
      } catch (error) {
        console.error('Error retrieving tasks:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

async function createTask(req, res) {
    try {
        const { title, description, state, assignees, dueDate, type } = req.body;
        const dueDateObj = new Date(dueDate);
        const newTask = new Task({ title, description, state, assignees, dueDate: dueDateObj, type });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
      } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

module.exports = {
    getTasks,
    createTask
};