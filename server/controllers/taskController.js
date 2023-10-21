const Task = require('../models/Task');
const Comment = require('../models/Comment');
const User = require('../models/User');

async function getTasks(req, res) {
  try {
    const user =  await User.findById(req.user.userId);
    const userRole = user.role;
    if (userRole === 'USER') {
      
      const tasks = await Task.find({ assignees: req.user.userId }).populate('assignees', 'firstName lastName').populate('createdBy', 'firstName lastName');
      res.json(tasks);
    } else {
      const tasks = await Task.find().populate('assignees', 'firstName lastName').populate('createdBy', 'firstName lastName');
      res.json(tasks);
    }
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
}

async function createTask(req, res) {
    try {
        const { title, description, state, assignees, dueDate, type, createdBy } = req.body;
        const dueDateObj = new Date(dueDate);
        const createdByUser = await User.findOne({ username: createdBy });
        if (!createdByUser) {
          return res.status(404).json({ error: 'User not found' });
        }
        const newTask = new Task({ title, description, state, assignees, dueDate: dueDateObj, type, createdBy: createdByUser });
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

    const taskToUpdate = await Task.findById(taskId);

    if (!taskToUpdate) {
      return res.status(404).json({ error: 'Task not found' });
    }

    taskToUpdate.title = title;
    taskToUpdate.type = type;
    taskToUpdate.description = description;
    taskToUpdate.dueDate = new Date(dueDate); 
    taskToUpdate.assignees = assignees;

    const updatedTask = await taskToUpdate.save();

    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


const createComment = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { text, username } = req.body;
    const user = await User.findOne({ username });

    if(!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newComment = new Comment({text, user});

    const savedComment = await newComment.save();

    const task = await Task.findById(taskId);
    task.comments.push(savedComment._id);
    await task.save();
    res.status(201).json(savedComment);

  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getComments = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await task.populate({ path: 'comments', populate: { path: 'user', select: 'firstName lastName role' } });

    const comments = task.comments;

    res.status(200).json(comments);

  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

async function patchTask(req, res) {
  const { id } = req.params;
  const { state } = req.body;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    task.state = state;
    
    await task.save();

    const updatedTask = await Task.findById(id).populate('assignees', 'firstName lastName').populate({
      path: 'comments',
      populate: {
        path: 'user',
        select: 'firstName lastName',
      },
    })
    .populate('createdBy', 'firstName lastName');
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
    patchTask,
    getComments
  };