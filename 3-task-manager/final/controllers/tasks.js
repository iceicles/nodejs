const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID }); // or findById(taskId)
  if (!task) {
    // if task ID is right length but doesn't exist
    return res.status(404).json({ msg: `No task with id : ${taskID}` });
  }
  res.status(200).send({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true, // get back new item (without it, it'll respond the old one)
    runValidators: true, // make sure it follows our schema validation
  });

  if (!task) {
    return res.status(404).json({ msg: `No task with id : ${taskID}` });
  }

  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });

  if (!task) {
    return res.status(404).json({ msg: `No task with id : ${taskID}` });
  }

  res.status(200).json({ task });
  // don't need to send a response when you're deleting something -
  // res.status(200).send();
  // res.status(200).json({task: null, status: 'success'});
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
