const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  // wrapping in try/catch block to gracefully handle invalid body requests as setup and validated in our schema
  try {
    // remember - req.body is the body attached to the request...
    // ...and 'app.use(express.json())' middleware parses the body of the request of type json and attaches it to req property
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID }); // or findById(taskId)
    if (!task) {
      // if task ID is right length but doesn't exist
      return res.status(404).json({ msg: `No task with id : ${taskID}` });
    }
    res.status(200).send({ task });
  } catch (error) {
    // if taskID is wrong length (responds with mongoose err msg)
    res.status(500).json({ msg: error });
  }
};

const updateTask = (req, res) => {
  res.send('update task');
};

const deleteTask = (req, res) => {
  res.send('delete task');
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
