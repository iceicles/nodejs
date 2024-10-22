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

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true, // get back new item (without it, it'll respond the old one)
      runValidators: true, // make sure it follows our schema validation
    });

    if (!task) {
      return res.status(404).json({ msg: `No task with id : ${taskID}` });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });

    if (!task) {
      return res.status(404).json({ msg: `No task with id : ${taskID}` });
    }

    res.status(200).json({ task });
    // don't need to send a response when you're deleting something -
    // res.status(200).send();
    // res.status(200).json({task: null, status: 'success'});
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
