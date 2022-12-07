import mongoose from "mongoose";
const { Schema } = mongoose;

const RacketSchema = new Schema({
  brand: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
  season: { type: String, default: "" },
  frame_material: { type: String, default: "" },
  flat_material: { type: String, default: "" },
  rubber_material: { type: String, default: "" },
  touch: { type: String, default: "" },
  shape: { type: String, default: "" },
  weight: { type: String, default: "" },
  ovr_rating: { type: Number, default: 0 },
});

export default mongoose.model("Racket", RacketSchema);
