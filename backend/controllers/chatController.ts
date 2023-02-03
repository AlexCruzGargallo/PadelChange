import { Request, Response } from "express";
import bcrypt, { hash } from "bcrypt";
import Utilities from "../utilities/utilities";
import Chat from "../models/ChatSchema";
import Jwt from "../utilities/jwt";

class ChatController {
  public async start(req: any, res: Response) {
    try {
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
  public async getUnreadChats(req: any, res: Response) {
    try {
      let unreadChats = 0;
      const chats = await Chat.find({ members: req.params.id });
      chats.map((chat: any) => {
        let unread = false;
        chat.messages.map((msg: any) => {
          if (msg.isread == false) {
            unread = true;
          }
        });
        if (unread) {
          unreadChats += 1;
        }
      });

      if (!chats) {
        throw new Error("No se encontraron chats");
      }

      res.send(unreadChats.toString());
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  }

  public async saveMessage(req: any, res: Response) {
    try {
      const chat = await Chat.findOne({ _id: req.body.chat_id });

      let messages = chat.messages;
      let newMessage = req.body;
      messages.push(newMessage);

      chat.messages = messages;



      await chat.save();

      res.send({
        chat: chat,
      });
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  }

  public async readMessage(req: any, res: Response) {
    try {
      const chat = await Chat.findOne({ _id: req.params.id });

      let messages = chat.messages;
      messages.map((message: any) => {
        message.isread = true;
      });
      
      chat.messages = messages;
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
