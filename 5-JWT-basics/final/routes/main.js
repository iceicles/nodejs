const express = require('express');
const router = express.Router();

const { login, dashboard } = require('../controllers/main');
const authMiddleware = require('../middleware/auth');

// authMiddleware is executed first before dashboard is called
router.route('/dashboard').get(authMiddleware, dashboard);
router.route('/login').post(login); // get user creds

module.exports = router;
