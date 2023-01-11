import express from "express";
import UserController from "../controllers/userController";
import authenticateToken from "../middlewares/authenticate";

const router = express.Router();
const userController = new UserController();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/upload", userController.upload);
router.get("/:id", userController.getUserData);
router.put('/', authenticateToken, userController.update)

export default router;
