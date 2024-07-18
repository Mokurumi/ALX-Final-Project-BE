const Task = require('../../models/task');

const getAllTasks = async (req, res) => {
  try {
    const user = req.user;
    const filter = req.params.filter;
    let tasks = [];
    if (filter) {
      tasks = await Task.find({
        owner: user._id,
        status: filter,
      });
    } else {
      tasks = await Task.find({
        owner: user._id,
      });
    }
    return res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err.message || err.toString(),
    });
  }
};

const getOneTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findOne({
      _id: taskId,
    });
    return res.json(task);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err.message || err.toString(),
    });
  }
};

const createTask = async (req, res) => {
  console.log(req);
  if (!req.body.taskName)
    return res.status(400).json({
      error: 'missing taskName',
    });
  const user = req.user;
  try {
    let task = new Task({
      taskName: req.body.taskName,
      description:
        req.body.description === undefined ? '' : req.body.description,
      owner: user._id,
      taskStatus: req.body.taskStatus,
      category: req.body.category,
      priority: req.body.priority,
      dueDate: req.body.dueDate,
      assignedTo: req.body.assignedTo,
    });
    task = await task.save();
    return res.status(201).json(task);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err.message || err.toString(),
    });
  }
};

const updateTask = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: taskId,
      },
      req.body,
      {
        new: true,
      },
    );

    return res.json(task);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err.message || err.toString(),
    });
  }
};

const deleteTask = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const task = await Task.findOneAndDelete({
      _id: taskId,
    });
    return res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err.message || err.toString(),
    });
  }
};

module.exports = {
  getAllTasks,
  getOneTask,
  createTask,
  updateTask,
  deleteTask,
};
