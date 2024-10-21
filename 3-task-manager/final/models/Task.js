const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
});

// collection name = Task (note: mongoose saves this as plural lowercase, hence it'll be tasks)
// schema (aka data model) = TaskSchema
module.exports = mongoose.model('Task', TaskSchema);
