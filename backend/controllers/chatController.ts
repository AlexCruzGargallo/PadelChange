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

  public async saveMessage(req: any, res: Response) {
    try {
      const chat = await Chat.findOne({_id :req.body.chat_id});

      let messages = chat.messages;
      let newMessage = req.body;
      messages.push(newMessage);

      chat.messages = messages;

      console.log("CHAT:",chat)
      
      await chat.save();

      res.send({
        chat: chat,
      });
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  }
}

export default ChatController;
