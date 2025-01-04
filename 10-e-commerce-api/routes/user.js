const express = require('express');

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require('../controllers/user');

const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

/* 
--> the order of authentication  and authorize is important here
-- > we authtenticate first (which means we verify the user's creds via jwt.verify and pass req.user which contains user name, role, id) then we authorize based on the roles received from authenticating 
*/
router.route('/').get(authenticateUser, authorizePermissions, getAllUsers);

// the next three routes are specifically placed above the route with /:id bc /showMe (or /updateUser or /updateUserPassword) will be treated as path param & will throw an err
// a workaround will be to have something like /user(or admin) /showMe (or updateUser, updateUserPassword)
router.route('/showMe').get(showCurrentUser);
router.route('/updateUser').patch(updateUser);
router.route('/updateUserPassword').patch(updateUserPassword);

router.route('/:id').get(authenticateUser, getSingleUser);

module.exports = router;
