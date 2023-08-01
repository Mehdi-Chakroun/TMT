const Task = require('../models/Task');
const Comment = require('../models/Comment');
const User = require('../models/User');

async function getTasks(req, res) {
  try {
    const user =  await User.findById(req.user.userId);
    const userRole = user.role;
    if (userRole === 'USER') {
      
      const tasks = await Task.find({ assignees: req.user.userId }).populate('assignees', 'fistName lastName').populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'firstName lastName', 
        },
      });
      res.json(tasks);
    } else {
      const tasks = await Task.find().populate('assignees', 'fistName lastName').populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'firstName lastName role',
        },
      });
      res.json(tasks);
    }
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Error fetching tasks' });
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

async function patchTask(req, res) {
  const { id } = req.params;
  const { state } = req.body;

  try {
    // Find the task by ID
    const task = await Task.findById(id);

    // If the task is not found, return a 404 response
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Update the state of the task
    task.state = state;
    
    // Save the updated task in the database
    await task.save();

    // Return the updated task as the response
    const updatedTask = await Task.findById(id).populate('assignees', 'firstName lastName').populate({
      path: 'comments',
      populate: {
        path: 'user',
        select: 'firstName lastName',
      },
    });
    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
    getTasks,
    createTask,
    deleteTask,
    updateTask,
    createComment,
    patchTask
  };