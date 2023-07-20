const Task = require('../models/Task');
const Comment = require('../models/Comment');


async function getTasks(req, res) {
    try {
        const tasks = await Task.find().populate('assignees', 'fistName lastName').populate('comments');
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
async function deleteTask(req, res) {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);
        res.json(deletedTask);
      } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
async function updateTask(req, res) {
  try {
    const taskId = req.params.taskId;
    const { title, type, description, dueDate, assignees } = req.body;

    // Find the task by ID
    const taskToUpdate = await Task.findById(taskId);

    if (!taskToUpdate) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Update the task properties
    taskToUpdate.title = title;
    taskToUpdate.type = type;
    taskToUpdate.description = description;
    taskToUpdate.dueDate = new Date(dueDate); // Convert dueDate string to Date object
    taskToUpdate.assignees = assignees;

    // Save the updated task to the database
    const updatedTask = await taskToUpdate.save();

    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


// Example code to add a comment to a task
const createComment = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { text, user } = req.body;
    // Create a new comment
    const newComment = new Comment({text, user});

    // Save the new comment to the database
    const savedComment = await newComment.save();

    // Find the task and add the comment reference to the task's comments array
    const task = await Task.findById(taskId);
    task.comments.push(savedComment._id);
    await task.save();
    res.status(201).json(savedComment);

  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
    getTasks,
    createTask,
    deleteTask,
    updateTask,
    createComment
  };