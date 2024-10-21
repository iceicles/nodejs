const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [20, 'name cannot be more than 20 characters'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// collection name = Task (note: mongoose saves this as plural lowercase, hence it'll be tasks)
// schema (aka data model) = TaskSchema
module.exports = mongoose.model('Task', TaskSchema);
