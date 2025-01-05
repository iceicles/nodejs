const CustomError = require('../errors');

/* 
looks for the user requesting the resource and checks for the resource user id
--> user's can only see their info and admins can see any users' info
 */
const checkPermissions = (requestUser, resourceUserId) => {
  // console.log(requestUser);
  // console.log(resourceUserId);
  // console.log(typeof resourceUserId);

  // unless the user role is admin, we throw an error
  if (requestUser.role === 'admin') return; // then we're good -> proceed to send the user in response in getSingleUser
  if (requestUser.userId === resourceUserId.toString()) return; // this is the case where the userId from the token matches the user._id in the db
  // technically authenticate worked, but you can't access this if you don't meet the above two criterias
  throw new CustomError.UnauthenticatedError(
    'Not authorized to access this route'
  );
};

module.exports = checkPermissions;
