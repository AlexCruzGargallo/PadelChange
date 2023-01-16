import { Request, Response } from "express";
import bcrypt, { hash } from "bcrypt";
import Utilities from "../utilities/utilities";
import Chat from "../models/ChatSchema";
import Jwt from "../utilities/jwt";

class ChatController {
  public async start(req: any, res: Response) {
    try {
      console.log("Starting chat...");
      console.log(req.body);

      const chatRating = new Chat(req.body);
      await chatRating.save();
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  }

  public async getChats(req: any, res: Response) {
    try {
      const chats = await Chat.find();

      if (!chats) {
        throw new Error("No se encontraron chats");
      }

      res.send({
        chats: chats,
      });
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  }
}

export default ChatController;
