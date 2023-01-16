import mongoose from "mongoose";
const { Schema } = mongoose;

const ChatSchema = new Schema({
  members: [{ type: String, required: true }],
  advert_id: { type: String, required: true },
});

export default mongoose.model("Chat", ChatSchema);
