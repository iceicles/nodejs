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
note: all the MWs passed here are callbacks (which gets immediately invokved by express) so we cannot immediately invoke/execute/call functions here. we have to return another function which can be invoked later by express. this is why authorizePermissions('admin', 'owner') works!
*/
router
  .route('/')
  .get(
    authenticateUser,
    authorizePermissions(
      'admin' /*  'owner', etc.. (only users you want to access getAllUsers route) */
    ),
    getAllUsers
  );

// the next three routes are specifically placed above the route with /:id bc /showMe (or /updateUser or /updateUserPassword) will be treated as path param & will throw an err
// a workaround will be to have something like /user(or admin) /showMe (or updateUser, updateUserPassword)
router.route('/showMe').get(authenticateUser, showCurrentUser);
router.route('/updateUser').patch(authenticateUser, updateUser);
router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword);

router.route('/:id').get(authenticateUser, getSingleUser);

module.exports = router;
