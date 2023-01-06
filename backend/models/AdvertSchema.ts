import mongoose from "mongoose";
const { Schema } = mongoose;

const AdvertSchema = new Schema({
  user_id: { type: String, required: true },
  images: [{ type: String }],
  sell_item: { type: String, required: true },
  racket_state: { type: String, required: true },
  want_items: [{ type: String }],
  accept_offers: { type: Boolean, required: true },
  start_date: { type: Date, required: true },
  final_date: { type: Date },
  description: { type: String, required: true },
  tags: [{ type: String, required: true }],
  location: [{}],
});

export default mongoose.model("Advert", AdvertSchema);
