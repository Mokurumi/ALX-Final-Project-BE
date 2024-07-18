const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  taskStatus: {
    type: String,
    required: true,
    enum: ['pending', 'active', 'completed'],
    default: 'pending',
  },
  category: {
    type: String,
    required: true,
    enum: [
      'work',
      'personal',
      'academic',
      'health',
      'financial',
      'travel',
      'others',
    ],
    default: 'others',
  },
  priority: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high'],
    default: 'low',
  },
  dueDate: {
    type: Date,
    // required: true,
    default: Date.now() + 7 * 24 * 60 * 60 * 1000,
  },
  assignedTo: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
