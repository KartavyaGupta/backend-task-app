import express from "express";
const router = express.Router();
import checkUserAuth from "../middlewares/authMiddleware.js";
import UserController from "../controllers/userController.js";
//public routes
router.post("/signup", UserController.userRegistration);
router.post("/login", UserController.userLogin);
router.post("/changepassword", checkUserAuth);

//private route
router.post("/changePassword", UserController.changeUserPassword);

export default router;
