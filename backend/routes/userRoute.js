const express=require('express');
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser } = require('../controllers/userController');
const { isAuthenticateUser, authorizedRole } = require('../middleware/auth');
const router=express.Router();


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logoutUser);

router.route("/me").get(isAuthenticateUser,getUserDetails);

router.route("/password/update").put(isAuthenticateUser,updatePassword);

router.route("/me/update").put(isAuthenticateUser,updateProfile);

router.route("/admin/users").get(isAuthenticateUser,authorizedRole("admin"),getAllUser);

router.route("/admin/user/:id")
    .get(isAuthenticateUser,authorizedRole("admin"),getSingleUser)
    .put(isAuthenticateUser,authorizedRole("admin"),updateUserRole)
    .delete(isAuthenticateUser,authorizedRole("admin"),deleteUser);

module.exports=router;