import mongoose from "mongoose";
const { Schema } = mongoose;

const MessageSchema = new Schema({
  chat_id: { type: String, required: true },
  author: { type: String, required: true },
  body: { type: String, required: true },
  date: { type: Date, required: true },
});

const ChatSchema = new Schema({
  members: [{ type: String, required: true }],
  advert_id: { type: String, required: true },
  messages: [{ type: MessageSchema, default: {} }],
});

export default mongoose.model("Chat", ChatSchema);
