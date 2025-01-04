const express = require('express');

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require('../controllers/user');

const router = express.Router();

router.route('/').get(getAllUsers);

// the next three routes are specifically placed above the route with /:id bc /showMe (or /updateUser or /updateUserPassword) will be treated as path param & will throw an err
// a workaround will be to have something like /user(or admin) /showMe (or updateUser, updateUserPassword)
router.route('/showMe').get(showCurrentUser);
router.route('/updateUser').patch(updateUser);
router.route('/updateUserPassword').patch(updateUserPassword);

router.route('/:id').get(getSingleUser);

module.exports = router;
