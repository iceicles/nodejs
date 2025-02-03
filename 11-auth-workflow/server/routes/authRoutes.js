const express = require('express');
const router = express.Router();

const { authenticateUser } = require('../middleware/authentication');

const {
  register,
  login,
  logout,
  verifyEmail,
} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
// the reason we add the authenticateUser middleware before logout controller is..
// ..we need to get req.user to remove the token from the db and auth MW attaches it
router.delete('/logout', authenticateUser, logout);
router.post('/verify-email', verifyEmail);

module.exports = router;
