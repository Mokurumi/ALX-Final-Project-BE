const express = require('express');
const auth = require('../middleware/auth');
const taskRouter = express.Router();

const {
  getAllTasks,
  getOneTask,
  createTask,
  deleteTask,
  updateTask,
} = require('../controller/taskController/taskController');

taskRouter.post('/', auth, createTask);
taskRouter.get('/:taskId', auth, getOneTask);
taskRouter.get('/:filter?', auth, getAllTasks);
taskRouter.put('/:taskId', auth, updateTask);
taskRouter.delete('/:taskId', auth, deleteTask);
module.exports = taskRouter;
