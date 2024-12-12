const Job = require('../models/Jobs');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllJobs = async (req, res) => {
  // filter jobs for specific/unique users
  const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt');
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  // short form - const {user: {userId}, params: {id: jobId} } = req
  const { id: jobId } = req.params;
  const { userId } = req.user;

  const job = await Job.findOne({ createdBy: userId, _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  // add createdBy property on req.body object
  // set the value of createdBy to the userId from req.user
  // req.user has userId and name properties as created in auth middleware
  // and since this middleware gets called first before any job route, we get access to it
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job }); // testing authmiddleware for this route
};

const updateJob = async (req, res) => {
  res.send('update job');
};

const deleteJob = async (req, res) => {
  res.send('delete job');
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
