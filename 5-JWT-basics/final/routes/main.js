const express = require('express');
const router = express.Router();

const { login, dashboard } = require('../controllers/main');

router.route('/dashboard').get(dashboard);
router.route('/login').post(login); // get user creds

module.exports = router;
