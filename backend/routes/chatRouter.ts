import express from "express";
import ChatController from "../controllers/chatController";

const router = express.Router();
const chatController = new ChatController();

router.post("/create", chatController.start);
router.get("/", chatController.getChats);
router.put("/message", chatController.saveMessage);

export default router;
