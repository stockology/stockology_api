import cookieParser from "cookie-parser";
import express from "express";
import {
  addToPlaylist,
  changePassword,
  contact,
  // contact,
  deleteMyProfile,
  deleteUser,
  forgetPassword,
  getAllUsers,
  getMyProfile,
  login,
  logout,
  register,
  removeFromPlaylist,
  resetPassword,
  updateProfile,
  updateprofilepicture,
  updateUserRole,
  webinar,
} from "../controllers/userController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();
router.use(cookieParser());

// To register a new user
router.route("/register").post(register);

// Login
router.route("/contact").post(contact);
router.route("/webinar").post(webinar);

// router.route("/contact").post(contact);

router.route("/login").post(login);

// logout
router.route("/logout").get(logout);

// Get my profile
router.route("/me").get(isAuthenticated, getMyProfile);

// Delete my profile
router.route("/me").delete(isAuthenticated, deleteMyProfile);

// ChangePassword
router.route("/changepassword").put(isAuthenticated, changePassword);

// UpdateProfile
router.route("/updateprofile").put(isAuthenticated, updateProfile);

// UpdateProfilePicture
router
  .route("/updateprofilepicture")
  .put(isAuthenticated, singleUpload, updateprofilepicture);

// ForgetPassword
router.route("/forgetpassword").post(forgetPassword);
// ResetPassword
router.route("/resetpassword/:token").put(resetPassword);

// AddtoPlaylist
router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist);

// RemoveFromPlaylist
router.route("/removefromplaylist").delete(isAuthenticated, removeFromPlaylist);

// Admin Routes
router.route("/admin/users").get(isAuthenticated, authorizeAdmin, getAllUsers);

router
  .route("/admin/user/:id")
  .put(isAuthenticated, authorizeAdmin, updateUserRole)
  .delete(isAuthenticated, authorizeAdmin, deleteUser);

export default router;
